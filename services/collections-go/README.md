# Collections Service (Node.js)

A GraphQL service for managing product collections, built with Node.js. Part of a federated microservice architecture.

## Features

- Create and manage collections of products
- Add/remove products to collections
- GraphQL API with Apollo Federation v2 support
- References products from the products service

## Technologies

- Node.js
- Built-in HTTP server for lightweight implementation
- Compatible with Apollo Federation

## Setup & Running

### Quick Start

```bash
# Setup the environment
npm install

# Start the server
node server.js
```

### Docker

```bash
# Build the image
docker build -t collections-go .

# Run the container
docker run -p 3002:3002 collections-go
```

The GraphQL endpoint is available at http://localhost:3002/graphql

## API

### Queries

- `collections`: Get all collections
- `collection(id: ID!)`: Get a collection by ID

### Mutations

- `createCollection(name: String!, description: String)`: Create a new collection
- `addProductToCollection(collectionId: ID!, productId: ID!)`: Add a product to a collection
- `removeProductFromCollection(collectionId: ID!, productId: ID!)`: Remove a product from a collection