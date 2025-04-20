#!/bin/bash

# Create the directory if it doesn't exist
mkdir -p $(dirname "$0")

echo "Checking Users Service..."
curl -s http://localhost:3000/health
echo -e "\n"

echo "Checking Products Service..."
curl -s http://localhost:3001/health
echo -e "\n"

echo "Checking Collections Service..."
curl -s http://localhost:3002/health
echo -e "\n"

echo "Testing Users GraphQL API..."
curl -s -X POST http://localhost:3000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ users { id firstName lastName email } }"}' | jq
echo -e "\n"

echo "Testing Products GraphQL API..."
curl -s -X POST http://localhost:3001/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ products { id name description price quantity } }"}' | jq
echo -e "\n"

echo "Testing Collections GraphQL API..."
curl -s -X POST http://localhost:3002/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ collections { id name description } }"}' | jq
echo -e "\n"

echo "Testing Gateway API..."
curl -s -X POST http://localhost:4000/ \
  -H "Content-Type: application/json" \
  -d '{"query":"{ users { id firstName lastName email } products { id name price } collections { id name products { id name price } } }"}' | jq
echo -e "\n"