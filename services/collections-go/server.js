const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3002;

// Read schema content
const schemaPath = path.join(__dirname, 'schema.graphql');
const schema = fs.readFileSync(schemaPath, 'utf8');

const server = http.createServer((req, res) => {
  // Set CORS headers for all responses
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Health check endpoint
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('OK');
    return;
  }

  // Root endpoint - simple HTML
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Collections GraphQL Service</title>
        <style>
          body { font-family: sans-serif; margin: 20px; }
        </style>
      </head>
      <body>
        <h1>Collections GraphQL Service</h1>
        <p>This is a placeholder for the Collections GraphQL service.</p>
      </body>
      </html>
    `);
    return;
  }

  // GraphQL endpoint
  if (req.url === '/graphql') {
    // Handle POST requests
    if (req.method === 'POST') {
      let body = '';
      
      // Collect request body
      req.on('data', chunk => {
        body += chunk.toString();
      });
      
      req.on('end', () => {
        try {
          const parsedBody = JSON.parse(body);
          console.log('Received query:', parsedBody);
          
          // Log incoming query for debugging
          console.log("GraphQL Query:", parsedBody.query);
          console.log("Variables:", parsedBody.variables);

          // Check if this is the federation introspection query
          if (parsedBody.query && parsedBody.query.includes('_service')) {
            // Return the federation schema response
            const response = {
              data: {
                _service: {
                  sdl: schema
                }
              }
            };

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(response));
          }
          // Check if this is the collections query
          else if (parsedBody.query && parsedBody.query.includes('collections')) {
            // Mock data for collections with product IDs that likely exist in the products service
            // Add __typename to help Apollo Federation resolve the references
            const mockCollections = [
              {
                id: "1",
                name: "Summer Collection",
                description: "Hot items for the summer season",
                products: [
                  { id: "1", __typename: "Product" },
                  { id: "2", __typename: "Product" },
                  { id: "3", __typename: "Product" }
                ]
              },
              {
                id: "2",
                name: "Winter Collection",
                description: "Warm items for the winter season",
                products: [
                  { id: "1", __typename: "Product" },
                  { id: "4", __typename: "Product" }
                ]
              },
              {
                id: "3",
                name: "Special Offers",
                description: "Limited time offers and discounts",
                products: [
                  { id: "5", __typename: "Product" }
                ]
              }
            ];

            // Return mock data
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ data: { collections: mockCollections } }));
          }
          // Check if this is a single collection query
          else if (parsedBody.query && parsedBody.query.includes('collection(')) {
            // Extract ID from query if possible
            const idMatch = parsedBody.query.match(/collection\(\s*id\s*:\s*["']([^"']*)["']\s*\)/);
            const id = idMatch ? idMatch[1] : parsedBody.variables?.id || "1";

            // Mock data for a single collection with product IDs that likely exist in the products service
            const mockCollection = {
              id,
              name: id === "1" ? "Summer Collection" : id === "2" ? "Winter Collection" : "Special Collection",
              description: "A collection of products",
              products: [
                { id: "1", __typename: "Product" },
                { id: "2", __typename: "Product" }
              ]
            };

            // Return mock data
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ data: { collection: mockCollection } }));
          }
          // Check if this is an entity resolution query (used by federation to resolve references)
          else if (parsedBody.query && parsedBody.query.includes('_entities')) {
            // Extract the representation from the query variables
            const representations = parsedBody.variables?.representations || [];

            // Process each representation
            const entities = representations.map(rep => {
              // If it's a Collection entity
              if (rep.__typename === 'Collection') {
                const id = rep.id;
                // Return a mock collection with the specified ID
                return {
                  id,
                  name: id === "1" ? "Summer Collection" : id === "2" ? "Winter Collection" : "Special Collection",
                  description: "A collection of products",
                  products: [
                    { id: "1", __typename: "Product" },
                    { id: "2", __typename: "Product" }
                  ]
                };
              }
              // Return the representation as-is for other types
              return rep;
            });

            // Return the entities
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ data: { _entities: entities } }));
          }
          else {
            // For other queries, return an empty result
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ data: {} }));
          }
        } catch (error) {
          console.error('Error processing request:', error);
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ errors: [{ message: 'Invalid request' }] }));
        }
      });
    } else {
      // For GET requests to /graphql, return an empty response
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ data: {} }));
    }
    return;
  }

  // Not found
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log(`Collections service running at http://localhost:${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});