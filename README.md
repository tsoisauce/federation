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
yarn install
```

## Running the Project

Start the gateway and all services concurrently:

```bash
yarn dev
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

## Minikube Workflow

Minikube is a tool that lets you run Kubernetes locally. It runs a single-node Kubernetes cluster on your personal computer (including Windows, macOS and Linux PCs) so that you can try out Kubernetes, or for daily development work.

### Core Concepts

- **Minikube**: Creates and manages a local Kubernetes cluster on your machine. It sets up a virtual machine (or uses Docker) to run the cluster nodes.
- **kubectl**: The command-line tool used to communicate with the Kubernetes API. You use it to inspect, manage, and deploy resources to your cluster.
- **Docker**: The containerization platform. We use it here to build the container images for our services (`users` and `gateway`) that Minikube will run.

- Minikube
- kubectl
- Docker

### Steps

Follow these steps to deploy the services to a local Minikube cluster.

```bash
# Start Minikube
minikube start

# Point your shell to Minikube's Docker daemon
eval $(minikube docker-env)

# Build images
docker build -t users-service:latest ./services/users
docker build -t gateway-service:latest ./gateway 

# Apply the manifests
kubectl apply -f deploy/

# Check if pods are running
kubectl get pods

# View cluster info
kubectl cluster-info

# View nodes in cluster
kubectl get nodes

# View everything
kubectl get all

# Check services
kubectl get services

# Get the Minikube URL for the gateway
minikube service gateway-service --url

# Or use port forwarding
kubectl port-forward service/gateway-service 4000:4000

# Stop Minikube
minikube stop

# Delete Minikube
minikube delete

```

### Minikube Architecture (Hierarchy)

```
Cluster (Minikube)
└── Nodes (VMs/machines)
    └── Pods (smallest deployable units)
        └── Containers (your actual apps)
```
