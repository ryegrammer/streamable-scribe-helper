#!/bin/bash

echo "Starting Raspberry Pi Camera Web Application..."

# Install Node.js dependencies for camera server
cd /opt/pi-camera
if [ ! -d "node_modules" ]; then
    echo "Installing camera server dependencies..."
    npm init -y
    npm install express ws
fi

# Start camera server in background
echo "Starting camera server..."
node /opt/pi-camera/pi-camera-server.js &
CAMERA_PID=$!

# Start nginx
echo "Starting nginx web server..."
nginx -g "daemon off;" &
NGINX_PID=$!

# Function to handle shutdown
shutdown() {
    echo "Shutting down services..."
    kill $CAMERA_PID 2>/dev/null
    kill $NGINX_PID 2>/dev/null
    exit 0
}

# Handle termination signals
trap shutdown SIGTERM SIGINT

# Wait for any process to exit
wait