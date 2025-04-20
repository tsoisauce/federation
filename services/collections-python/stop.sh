#!/bin/bash

# Stop the Django server running on port 3002
PORT=3002
echo "Checking if port $PORT is in use..."
if lsof -i :$PORT > /dev/null ; then
  echo "Stopping Django server on port $PORT..."
  PID=$(lsof -t -i :$PORT)
  if [ ! -z "$PID" ]; then
    echo "Killing process $PID using port $PORT"
    kill -9 $PID
    echo "Server stopped."
  fi
else
  echo "No server running on port $PORT."
fi