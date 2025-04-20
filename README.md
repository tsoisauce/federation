# Federation

Demonstration of microservice orchestration using Apollo GraphQL

## Federated Microservices

- `users-node (nest.js)`: manages user data
- `products-ruby (rails)`: manages product information

## Services Setup

### Users Service (Node.js)
```
cd services/users-node
npm install
npm run start:dev
```
Service runs on port 3000.

### Products Service (Ruby on Rails)
```
cd services/products-ruby
bundle install
rails db:create db:migrate db:seed
rails server
```
Service runs on port 3001.

### Gateway
```
cd gateway
yarn install
yarn start
```
Gateway runs on port 4000.

## Workflow

You can start everything with a single command:
```
yarn start
```

This will:
1. Start the users service
2. Start the products service
3. Start the Apollo Gateway after the services are available

Or you can start each service individually:
```
# Start the users service
yarn start:users

# Start the products service
yarn start:products

# Start the gateway (after services are running)
yarn start:gateway
```

Visit GraphQL Playground: [http://localhost:4000](http://localhost:4000/)
