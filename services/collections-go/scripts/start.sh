#!/bin/bash
set -e

# Go to project root
cd "$(dirname "$0")/.."

# Start the server
echo "Starting collections-go server..."
node server.js