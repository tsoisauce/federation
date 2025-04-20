# Products Service (Ruby on Rails)

This is a Ruby on Rails API service that provides product information as part of a federated GraphQL architecture.

## Features

- GraphQL API with Apollo Federation support
- Product database with sample data
- Integration with the API Gateway

## Getting Started

### Prerequisites

- Ruby 3.2+
- Rails 8.0+
- SQLite

### Installation

1. Install dependencies:
   ```
   bundle install
   ```

2. Setup the database:
   ```
   rails db:create db:migrate db:seed
   ```

3. Start the server:
   ```
   rails server
   ```

The service will be available at http://localhost:3001.
The GraphQL endpoint is available at http://localhost:3001/graphql.

## Integration with Apollo Federation

This service is designed to be used as part of a federated GraphQL architecture. It exposes a GraphQL API that can be accessed by the Apollo Gateway.

The service is registered with the gateway at:
```
{ name: 'products', url: 'http://localhost:3001/graphql' }
```

## Sample GraphQL Queries

Query all products:
```graphql
query {
  products {
    id
    name
    description
    price
    quantity
  }
}
```

Query a specific product:
```graphql
query {
  product(id: "1") {
    id
    name
    description
    price
    quantity
  }
}
```
