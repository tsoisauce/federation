# Federation

A demonstration of microservices architecture using Apollo Federation.

## Overview

This project implements a federated GraphQL architecture consisting of:
- **Gateway**: An Apollo Gateway that acts as the single entry point (Supergraph).
- **Subgraphs**: Independent services that compose the supergraph.
  - `users`: Manages user data and authentication.

## Prerequisites

- Node.js
- Yarn

## Installation

Install dependencies for all workspaces:

```bash
yarn install:all
```

## Running the Project

Start the gateway and all services concurrently:

```bash
yarn dev:all
```

This command will:
1. Start the `users` subgraph.
2. Wait for the `users` service to be ready.
3. Start the `gateway`.

## Development

### Commit Messages

This project uses [Commitizen](http://commitizen.github.io/cz-cli/) and [Commitlint](https://commitlint.js.org/) to ensure standardized commit messages.

To create a commit, stage your changes and run:

```bash
yarn commit
```

This will prompt you to fill in the required fields for a conventional commit message.

Alternatively, you can run Commitizen manually without installation via npx:

```bash
npx cz
```

### Optional: Enforce conventional commits

To enforce conventional commits with Husky + commitlint:

```bash
yarn add -D @commitlint/cli @commitlint/config-conventional husky
```

## Project Structure

- `gateway/`: Apollo Gateway service. Only for local development. Apollo Router will be used in production.
- `services/`: Directory containing subgraph services.
  - `users/`: NestJS-based users subgraph.
