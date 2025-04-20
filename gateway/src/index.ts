import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

async function startGateway() {
  const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
      subgraphs: [
        { name: 'users', url: 'http://localhost:3000/graphql' },
        { name: 'products', url: 'http://localhost:3001/graphql' },
        { name: 'collections', url: 'http://localhost:3002/graphql' },
      ],
    }),
  });

  const server = new ApolloServer({ gateway });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 Gateway ready at ${url}`);
}

startGateway().catch((err) => {
  console.error('Error starting the gateway:', err);
});
