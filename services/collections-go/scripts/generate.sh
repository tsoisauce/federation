#!/bin/bash
set -e

# Go to project root
cd "$(dirname "$0")/.."

# Install gqlgen tool
echo "Installing gqlgen tool..."
go install github.com/99designs/gqlgen@latest

# Generate GraphQL code
echo "Generating GraphQL code..."
go run github.com/99designs/gqlgen generate

echo "GraphQL code generation complete!"