#!/bin/bash

echo "Testing the health endpoint..."
curl -s http://localhost:3002/health
echo -e "\n"

echo "Testing the GraphQL endpoint..."
curl -s -X POST http://localhost:3002/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ collections { id name description } }"}'
echo -e "\n"