import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const serviceConfig = {
    users: { name: 'users', url: 'http://localhost:3000' },
    products: { name: 'products', url: 'http://localhost:3001' },
}

async function checkServiceStatus(healthUrl: string, name: string): Promise<void> {
    try {
        const response = await fetch(healthUrl);
        if (!response.ok) {
          throw new Error(`⚠️ ${name} service is down`)
        }
        console.log(`✅ ${name} service is running at ${healthUrl}`);
    } catch (error) {
        console.error(`\`❌ ${name} error checking service ${healthUrl}:`, error);
    }
}

async function startGateway() {
  const services = Object.values(serviceConfig);

  for (const service of services) {
    await checkServiceStatus(service.url + '/health', service.name);
  }

  const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
      subgraphs: services.map(({ name, url }) => ({ name, url: url + '/graphql' })),
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
