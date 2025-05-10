#!/bin/bash
set -e

# Test the health endpoint of the server
echo "Testing health endpoint..."
response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3002/health)
if [ "$response" -eq 200 ]; then
  echo "Health check passed: $response"
  exit 0
else
  echo "Health check failed: $response"
  exit 1
fi