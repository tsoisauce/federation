# Federation

Example of federated services utilizing Apoolo Federation 2

## Concept

Apollo Federation allows us to connect various GraphQL Schema into a unified gateway where all clients can interact with this gateway. This allows easy implimentation of microservices, as long as your service utlizes GraphQL, a unified graph can be created.

to start: `yarn start`

- Gateway (Apollo GraphQL): http://localhost:4000
- Users (Python Django): http://localhost:8000
- Products (Node Nest.js): http://localhost:3000

## Installation

### Zero setup with remote containers

Easiest way to get this project up and running is via VScode's Dev Containers. This is essentially creating a local environment within a Docker container. This reduces the need to setup your local machine and allow consistency when sharting projects. To get started, make sure you have: 
- [Visual Studio Code](https://code.visualstudio.com/download) 
- [Docker](https://docs.docker.com/engine/install/)
- [VScode Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

Details on how to [develop inside a container](https://code.visualstudio.com/docs/devcontainers/containers)

You can also install this by traditional means, using yarn/npm and your favorite virtual environment

## Workflow

Be sure to install all necessary packages within the root folder by running `yarn`, this will install commitizen (for consistant commit messaging) and concurrently (to run multiple npm commands).

To start project, run:

```bash
yarn start
```

TODO: Dockerfy and deploy services
