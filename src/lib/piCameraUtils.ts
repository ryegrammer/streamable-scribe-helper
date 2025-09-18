interface PiCameraConfig {
  width: number;
  height: number;
  framerate: number;
  quality: 'low' | 'medium' | 'high' | 'auto';
}

interface StreamConnection {
  peerConnection: RTCPeerConnection | null;
  localStream: MediaStream | null;
  isConnected: boolean;
}

const streamConnection: StreamConnection = {
  peerConnection: null,
  localStream: null,
  isConnected: false,
};

const CAMERA_CONFIGS: Record<string, PiCameraConfig> = {
  low: { width: 640, height: 480, framerate: 15, quality: 'low' },
  medium: { width: 1280, height: 720, framerate: 30, quality: 'medium' },
  high: { width: 1920, height: 1080, framerate: 30, quality: 'high' },
  auto: { width: 1280, height: 720, framerate: 30, quality: 'auto' },
};

export const initPiCamera = async (): Promise<boolean> => {
  try {
    // For Raspberry Pi, we'll use getUserMedia to access the camera
    // This works when the Pi is running a web server with camera access
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
        frameRate: { ideal: 30 }
      },
      audio: true
    });

    streamConnection.localStream = stream;
    return true;
  } catch (error) {
    console.error('Pi camera initialization error:', error);

    // Fallback: Try to connect to Pi camera server via WebRTC signaling
    try {
      return await connectToPiCameraServer();
    } catch (fallbackError) {
      console.error('Pi camera server connection failed:', fallbackError);
      return false;
    }
  }
};

const connectToPiCameraServer = async (): Promise<boolean> => {
  try {
    // This would connect to your Raspberry Pi's WebRTC signaling server
    // For now, we'll simulate the connection
    console.log('Attempting to connect to Pi camera server...');

    // In a real implementation, you would:
    // 1. Connect to your Pi's WebRTC signaling server (WebSocket)
    // 2. Exchange offer/answer for WebRTC connection
    // 3. Set up ICE candidates
    // 4. Establish peer connection

    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For development, return true to simulate successful connection
    return true;
  } catch (error) {
    console.error('Failed to connect to Pi camera server:', error);
    return false;
  }
};

export const startPiCameraStream = async (
  videoElement: HTMLVideoElement,
  quality: 'low' | 'medium' | 'high' | 'auto' = 'auto'
): Promise<string | null> => {
  try {
    const config = CAMERA_CONFIGS[quality];

    if (streamConnection.localStream) {
      // Use local camera stream (for development/testing)
      videoElement.srcObject = streamConnection.localStream;
      await videoElement.play();
      streamConnection.isConnected = true;

      console.log(`Pi camera stream started with ${quality} quality (${config.width}x${config.height})`);
      return 'local-stream';
    }

    // For production Pi deployment, you would implement WebRTC connection here
    // This would involve:
    // 1. Creating RTCPeerConnection
    // 2. Setting up data channels
    // 3. Handling remote stream from Pi

    // Simulate Pi camera stream URL for now
    const streamUrl = `ws://raspberry-pi.local:8080/camera-stream?quality=${quality}`;
    console.log(`Would connect to Pi camera at: ${streamUrl}`);

    // Return simulated stream URL
    return streamUrl;
  } catch (error) {
    console.error('Pi camera stream error:', error);
    throw error;
  }
};

export const stopPiCameraStream = async (): Promise<void> => {
  try {
    if (streamConnection.localStream) {
      streamConnection.localStream.getTracks().forEach(track => track.stop());
      streamConnection.localStream = null;
    }

    if (streamConnection.peerConnection) {
      streamConnection.peerConnection.close();
      streamConnection.peerConnection = null;
    }

    streamConnection.isConnected = false;
    console.log('Pi camera stream stopped');
  } catch (error) {
    console.error('Error stopping Pi camera stream:', error);
    throw error;
  }
};

export const capturePhoto = async (): Promise<string> => {
  if (!streamConnection.localStream) {
    throw new Error('No active camera stream');
  }

  try {
    // Create canvas to capture frame from video stream
    const canvas = document.createElement('canvas');
    const video = document.createElement('video');
    video.srcObject = streamConnection.localStream;

    return new Promise((resolve, reject) => {
      video.addEventListener('loadedmetadata', () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        ctx.drawImage(video, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        resolve(dataUrl);
      });

      video.addEventListener('error', () => {
        reject(new Error('Video load error'));
      });
    });
  } catch (error) {
    console.error('Photo capture error:', error);
    throw error;
  }
};

export const startRecording = async (): Promise<MediaRecorder | null> => {
  if (!streamConnection.localStream) {
    throw new Error('No active camera stream');
  }

  try {
    const mediaRecorder = new MediaRecorder(streamConnection.localStream, {
      mimeType: 'video/webm; codecs=vp9'
    });

    const recordedChunks: Blob[] = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);

      // Download the recording
      const a = document.createElement('a');
      a.href = url;
      a.download = `pi-recording-${Date.now()}.webm`;
      a.click();
    };

    mediaRecorder.start();
    console.log('Recording started');

    return mediaRecorder;
  } catch (error) {
    console.error('Recording start error:', error);
    throw error;
  }
};

export const getCameraStatus = (): {
  isConnected: boolean;
  hasLocalStream: boolean;
  streamType: 'local' | 'remote' | 'none';
} => {
  return {
    isConnected: streamConnection.isConnected,
    hasLocalStream: !!streamConnection.localStream,
    streamType: streamConnection.localStream
      ? 'local'
      : streamConnection.isConnected
        ? 'remote'
        : 'none'
  };
};