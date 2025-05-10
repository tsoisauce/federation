#!/bin/bash
set -e

# Go to project root
cd "$(dirname "$0")/.."

# Initialize modules
echo "Initializing Go modules..."
go mod tidy

# Download dependencies
echo "Downloading dependencies..."
go get github.com/99designs/gqlgen
go get github.com/gorilla/mux
go get github.com/jinzhu/gorm
go get github.com/jinzhu/gorm/dialects/sqlite
go get github.com/vektah/gqlparser/v2

echo "Dependencies initialized successfully!"