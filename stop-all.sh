#!/bin/bash

echo "Stopping all federation services..."

# Stop Collections service (port 3002)
echo "Stopping Collections service..."
if lsof -i :3002 > /dev/null ; then
  PID=$(lsof -t -i :3002)
  if [ ! -z "$PID" ]; then
    kill -9 $PID
    echo "Collections service stopped."
  fi
else
  echo "Collections service not running."
fi

# Stop Products service (port 3001)
echo "Stopping Products service..."
if lsof -i :3001 > /dev/null ; then
  PID=$(lsof -t -i :3001)
  if [ ! -z "$PID" ]; then
    kill -9 $PID
    echo "Products service stopped."
  fi
else
  echo "Products service not running."
fi

# Stop Users service (port 3000)
echo "Stopping Users service..."
if lsof -i :3000 > /dev/null ; then
  PID=$(lsof -t -i :3000)
  if [ ! -z "$PID" ]; then
    kill -9 $PID
    echo "Users service stopped."
  fi
else
  echo "Users service not running."
fi

# Stop Gateway (port 4000)
echo "Stopping Gateway..."
if lsof -i :4000 > /dev/null ; then
  PID=$(lsof -t -i :4000)
  if [ ! -z "$PID" ]; then
    kill -9 $PID
    echo "Gateway stopped."
  fi
else
  echo "Gateway not running."
fi

echo "All services stopped."