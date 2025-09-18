const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { spawn } = require('child_process');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server, path: '/camera-stream' });

let cameraProcess = null;
let isStreaming = false;

// Middleware
app.use(express.json());

// CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Health check endpoint
app.get('/api/camera/health', (req, res) => {
  res.json({
    status: 'healthy',
    streaming: isStreaming,
    timestamp: new Date().toISOString()
  });
});

// Start camera stream
app.post('/api/camera/start', (req, res) => {
  const { quality = 'medium' } = req.body;

  if (isStreaming) {
    return res.status(409).json({ error: 'Camera is already streaming' });
  }

  try {
    startCameraStream(quality);
    isStreaming = true;
    res.json({ status: 'started', quality });
  } catch (error) {
    console.error('Failed to start camera:', error);
    res.status(500).json({ error: 'Failed to start camera stream' });
  }
});

// Stop camera stream
app.post('/api/camera/stop', (req, res) => {
  try {
    stopCameraStream();
    isStreaming = false;
    res.json({ status: 'stopped' });
  } catch (error) {
    console.error('Failed to stop camera:', error);
    res.status(500).json({ error: 'Failed to stop camera stream' });
  }
});

// Get camera status
app.get('/api/camera/status', (req, res) => {
  res.json({
    streaming: isStreaming,
    connected_clients: wss.clients.size,
    uptime: process.uptime()
  });
});

function startCameraStream(quality) {
  // Quality settings for libcamera
  const qualitySettings = {
    low: { width: 640, height: 480, framerate: 15, bitrate: 1000000 },
    medium: { width: 1280, height: 720, framerate: 30, bitrate: 2000000 },
    high: { width: 1920, height: 1080, framerate: 30, bitrate: 4000000 }
  };

  const settings = qualitySettings[quality] || qualitySettings.medium;

  // Use libcamera for Raspberry Pi Camera Module 3
  // This command streams H.264 video via stdout
  const cameraArgs = [
    '--nopreview',
    '--timeout', '0', // Stream indefinitely
    '--width', settings.width.toString(),
    '--height', settings.height.toString(),
    '--framerate', settings.framerate.toString(),
    '--bitrate', settings.bitrate.toString(),
    '--output', '-', // Output to stdout
    '--codec', 'h264',
    '--inline',
    '--listen'
  ];

  console.log(`Starting camera with quality: ${quality}`, settings);

  // Try libcamera-vid first (Raspberry Pi OS Bullseye and later)
  cameraProcess = spawn('libcamera-vid', cameraArgs, {
    stdio: ['ignore', 'pipe', 'pipe']
  });

  cameraProcess.on('error', (error) => {
    console.error('Camera process error:', error);

    // Fallback to raspivid for older systems
    console.log('Trying fallback to raspivid...');
    const raspividArgs = [
      '-t', '0', // Capture indefinitely
      '-w', settings.width.toString(),
      '-h', settings.height.toString(),
      '-fps', settings.framerate.toString(),
      '-b', settings.bitrate.toString(),
      '-o', '-', // Output to stdout
      '-pf', 'baseline' // H.264 baseline profile
    ];

    cameraProcess = spawn('raspivid', raspividArgs, {
      stdio: ['ignore', 'pipe', 'pipe']
    });
  });

  cameraProcess.stdout.on('data', (data) => {
    // Broadcast video data to all connected WebSocket clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });

  cameraProcess.stderr.on('data', (data) => {
    console.error('Camera stderr:', data.toString());
  });

  cameraProcess.on('close', (code) => {
    console.log(`Camera process exited with code ${code}`);
    isStreaming = false;
  });
}

function stopCameraStream() {
  if (cameraProcess) {
    cameraProcess.kill('SIGTERM');
    cameraProcess = null;
  }
  isStreaming = false;
}

// WebSocket connection handling
wss.on('connection', (ws) => {
  console.log('Client connected to camera stream');

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);

      switch (data.type) {
        case 'request_stream':
          if (isStreaming) {
            ws.send(JSON.stringify({ type: 'stream_available' }));
          } else {
            ws.send(JSON.stringify({ type: 'stream_unavailable' }));
          }
          break;

        case 'change_quality':
          if (isStreaming) {
            stopCameraStream();
            setTimeout(() => {
              startCameraStream(data.quality || 'medium');
            }, 1000);
          }
          break;
      }
    } catch (error) {
      console.error('WebSocket message error:', error);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected from camera stream');
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully');
  stopCameraStream();
  server.close(() => {
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully');
  stopCameraStream();
  server.close(() => {
    process.exit(0);
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Pi Camera Server running on port ${PORT}`);
  console.log(`WebSocket endpoint: ws://localhost:${PORT}/camera-stream`);
  console.log(`HTTP API: http://localhost:${PORT}/api/camera/`);
});