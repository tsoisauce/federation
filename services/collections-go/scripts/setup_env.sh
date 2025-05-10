#!/bin/bash
set -e

# Go to project root
cd "$(dirname "$0")/.."

# Initialize modules
echo "Initializing Go modules..."
go mod tidy

# Download dependencies
echo "Installing dependencies..."
go get github.com/99designs/gqlgen@v0.17.45
go get github.com/gorilla/mux@v1.8.1
go get github.com/jinzhu/gorm@v1.9.16
go get github.com/jinzhu/gorm/dialects/sqlite
go get github.com/vektah/gqlparser/v2@v2.5.11

# Install gqlgen tool
echo "Installing gqlgen tool..."
go install github.com/99designs/gqlgen@latest

# Create initial database
echo "Setting up database..."
touch collections.db

echo "Environment setup complete!"