#!/bin/bash

# Check if port 3002 is already in use
PORT=3002
echo "Checking if port $PORT is in use..."
if lsof -i :$PORT > /dev/null ; then
  echo "Port $PORT is already in use. Killing the process..."
  PID=$(lsof -t -i :$PORT)
  if [ ! -z "$PID" ]; then
    echo "Killing process $PID using port $PORT"
    kill -9 $PID
    sleep 1
  fi
fi

# Activate the virtual environment
source .venv/bin/activate
export PYTHONPATH=$PYTHONPATH:$(pwd):$(pwd)/collections_project

# Check if schema.graphql exists
if [ ! -f "schema.graphql" ]; then
  echo "Creating schema.graphql file..."
  cat > schema.graphql << 'EOF'
extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@external", "@extends"])

type Product @extends @key(fields: "id") {
  id: ID! @external
}

type Collection @key(fields: "id") {
  id: ID!
  name: String!
  description: String
  products: [Product!]!
}

extend type Query {
  collections: [Collection!]!
  collection(id: ID!): Collection
  _service: _Service!
}

type _Service {
  sdl: String!
}

type Mutation {
  createCollection(name: String!, description: String): Collection
  addProductToCollection(collectionId: ID!, productId: ID!): Boolean
  removeProductFromCollection(collectionId: ID!, productId: ID!): Boolean
}
EOF
fi

# Start the Django server
cd collections_project
python manage.py runserver 0.0.0.0:3002