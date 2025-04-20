# Federation

Demonstration of microservice orchestration using Apollo GraphQL

## Federated Microservices

- `users-node (nest.js)`: manages user data
- `products-ruby (rails)`: manages product information
- `collections-python (django)`: manages collections of products

Both users-node and products-ruby services share the same SQLite database located at `services/products-ruby/storage/development.sqlite3`. The collections-python service uses its own SQLite database.

## Services Setup

### Users Service (Node.js)

```bash
cd services/users-node
npm install
npm run start:dev
```

Service runs on port 3000.

### Products Service (Ruby on Rails)

```bash
cd services/products-ruby
bundle install
rails db:create db:migrate db:seed
rails server
```

Service runs on port 3001.

### Collections Service (Python Django)

```bash
cd services/collections-python
# Quick setup (recommended)
./setup_env.sh

# Start the server with the provided script
./start.sh
```

Service runs on port 3002.

### Gateway

```bash
cd gateway
yarn install
yarn start
```

Gateway runs on port 4000.

## Workflow

You can start everything with a single command:

```bash
yarn start
```

This will:

1. Start the users service
2. Start the products service
3. Start the collections service
4. Start the Apollo Gateway after all services are available

Or you can start each service individually:

```bash
# Start the users service
yarn start:users

# Start the products service
yarn start:products

# Start the collections service
yarn start:collections

# Start the gateway (after services are running)
yarn start:gateway
```

Visit GraphQL Playground: [http://localhost:4000](http://localhost:4000/)

## Checking Service Status

To check the status of all services and test the APIs:

```bash
yarn status
```

This will:

1. Verify the health of each service
2. Test user and product GraphQL queries
3. Test the federated gateway API
