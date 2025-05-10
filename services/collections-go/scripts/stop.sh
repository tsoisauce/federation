#!/bin/bash

# Find and kill the Node.js server process
pid=$(pgrep -f "node server.js")
if [ -n "$pid" ]; then
  echo "Stopping collections-go server (PID: $pid)..."
  kill -15 "$pid"
  echo "Server stopped."
else
  echo "No running collections-go server found."
fi