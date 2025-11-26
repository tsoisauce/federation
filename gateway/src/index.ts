import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';

async function startServer() {
  // Initialize the gateway
  const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
      subgraphs: [
        { 
          name: 'users', 
          url: 'http://localhost:3001/graphql' 
        },
      ],
    }),
  });

  // Create Apollo Server with the gateway
  const server = new ApolloServer({
    gateway,
  });

  // Start the standalone server
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => ({
      token: req.headers.authorization,
    }),
  });

  console.log(`🚀 Gateway ready at ${url}`);
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
