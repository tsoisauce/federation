# Collections Service (Python)

This service manages collections of products in the federated graph. It's built with Django and Strawberry GraphQL.

## Features

- Create and manage collections of products
- Add products from the Products service to collections
- Remove products from collections
- Query collections and their products

## Setup

### Quick Setup (Recommended)

Use the provided setup script:
```
./setup_env.sh
```

This will:
1. Create a Python virtual environment (.venv)
2. Upgrade pip in the virtual environment
3. Install all dependencies correctly with compatible versions
4. Run database migrations

After running the setup script, start the server with the provided start script:
```
./start.sh
```

This script will:
1. Activate the virtual environment
2. Set up the Python path correctly
3. Start the Django server on port 3002

### Manual Setup

1. Create and activate a virtual environment:
   ```
   python -m venv .venv
   source .venv/bin/activate
   ```

2. Upgrade pip:
   ```
   pip install --upgrade pip
   ```

3. Install dependencies from requirements.txt:
   ```
   pip install -r requirements.txt
   ```

4. Run migrations:
   ```
   cd collections_project
   python manage.py migrate
   ```

5. Start the server:
   ```
   python manage.py runserver 0.0.0.0:3002
   ```

## GraphQL Schema

The service exposes the following GraphQL types and operations:

### Types

- `Collection`: A collection of products
  - `id`: ID!
  - `name`: String!
  - `description`: String
  - `products`: [Product!]!

- `Product`: A reference to a product from the products-ruby service
  - `id`: ID!

### Queries

- `collections`: Get all collections
- `collection(id: ID!)`: Get a collection by ID

### Mutations

- `createCollection(name: String!, description: String)`: Create a new collection
- `addProductToCollection(collectionId: ID!, productId: ID!)`: Add a product to a collection
- `removeProductFromCollection(collectionId: ID!, productId: ID!)`: Remove a product from a collection

## Federation

This service is part of a federated GraphQL API. It:

1. References the Product type from the products-ruby service
2. Exposes the Collection type to be used by other services
3. Resolves references between services

When a client asks for a collection with its products, this service provides the collection data
and references product IDs that the gateway resolves using the products-ruby service.