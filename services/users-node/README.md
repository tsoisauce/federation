# Users Service (NestJS)

This is a NestJS GraphQL service that manages user information as part of a federated GraphQL architecture.

## Features

- GraphQL API with Apollo Federation support
- Shares SQLite database with the Products service
- Integration with the API Gateway

## Getting Started

### Prerequisites

- Node.js 20+
- Yarn or npm

### Installation

1. Install dependencies:

  ```bash
  yarn install
  ```

1. Start the server:

  ```bash
  yarn start
  ```

The service will be available at <http://localhost:3000>.
The GraphQL endpoint is available at <http://localhost:3000/graphql>.

## Integration with Apollo Federation

This service is designed to be used as part of a federated GraphQL architecture. It exposes a GraphQL API that can be accessed by the Apollo Gateway.

The service is registered with the gateway at:

```graphql
{ name: 'users', url: 'http://localhost:3000/graphql' }
```

## Sample GraphQL Queries

Query all users:

```graphql
query {
  users {
    id
    firstName
    lastName
    email
  }
}
```

Query a specific user:

```graphql
query {
  user(id: "1") {
    id
    firstName
    lastName
    email
  }
}
```

Query a user by email:

```graphql
query {
  userByEmail(email: "johndoe@example.com") {
    id
    firstName
    lastName
    email
  }
}
```
