# Federation

A demonstration of microservices architecture using Apollo Federation.

## Overview

This project implements a federated GraphQL architecture consisting of:
- **Gateway**: An Apollo Gateway that acts as the single entry point (Supergraph).
- **Services**: Independent services that compose the supergraph.
  - `users`: Manages user data and authentication.
  - `products`: Manages product catalog (Java Spring Boot).
- **Clients**: Frontend applications consuming the supergraph.
  - `next`: A Next.js application using **Apollo Client** with **Automatic Persisted Queries (APQ)**.

## Prerequisites

- Node.js
- Yarn

## Installation

Install dependencies for all workspaces:

```bash
yarn install
```

## Running the Project

Start the gateway and all services concurrently:

```bash
yarn dev
```

This command will:
1. Start the `users` subgraph.
2. Start the `products` subgraph.
3. Wait for the `users` service to be ready.
4. Start the `gateway`.
5. Start the `next` client.

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
  - `users-node/`: NestJS-based users subgraph.
  - `products-java/`: Java Spring Boot-based products subgraph.
- `clients/`: Directory containing frontend applications.
  - `next/`: Next.js-based client application.
    - Uses `@apollo/client` for GraphQL communication.
    - Implements **Automatic Persisted Queries (APQ)** to reduce network overhead by sending query hashes instead of full query strings.

## Minikube Workflow

Minikube is a tool that lets you run Kubernetes locally. It runs a single-node Kubernetes cluster on your personal computer (including Windows, macOS and Linux PCs) so that you can try out Kubernetes, or for daily development work.

### Installation

You need to have Minikube and Docker installed.

- **Docker**: Please refer to the [official Docker documentation](https://docs.docker.com/get-docker/) for installation instructions.
- **Minikube**: Please refer to the [official Minikube documentation](https://minikube.sigs.k8s.io/docs/start/) for installation instructions.

### Core Concepts

- **Minikube**: Creates and manages a local Kubernetes cluster on your machine. It sets up a virtual machine (or uses Docker) to run the cluster nodes.
- **kubectl**: The command-line tool used to communicate with the Kubernetes API. You use it to inspect, manage, and deploy resources to your cluster.
- **Docker**: The containerization platform. We use it here to build the container images for our services (`users` and `gateway`) that Minikube will run.

### Steps

Follow these steps to deploy the services to a local Minikube cluster.

```bash
# Start Minikube
yarn minikube:start

# Build images and apply manifests
yarn deploy:up

# Check deployment status
yarn deploy:status

# Restart deployments
yarn deploy:restart

# View logs
yarn deploy:logs:users
yarn deploy:logs:gateway

# Get the Minikube URL for the gateway
yarn deploy:url

# Stop Minikube
yarn minikube:stop

```

### Minikube Architecture (Hierarchy)

```
Cluster (Minikube)
└── Nodes (VMs/machines)
    └── Pods (smallest deployable units)
        └── Containers (your actual apps)
```
