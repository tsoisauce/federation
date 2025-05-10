FROM node:18-slim

WORKDIR /app

# Copy package files
COPY package*.json ./

# Copy application files
COPY server.js .
COPY schema.graphql .

# Install dependencies if any
RUN npm install || true

# Expose the port the app runs on
EXPOSE 3002

# Command to run the application
CMD ["node", "server.js"]