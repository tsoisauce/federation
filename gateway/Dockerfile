FROM node:24-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json ./
RUN npm install -g typescript
RUN yarn install

# Copy source and build
COPY . .
RUN yarn build

# Verify build output
RUN echo "Contents of dist folder:" && ls -la dist/

# Production stage
FROM node:24-alpine

WORKDIR /app

# Copy package files and install production dependencies only
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Verify the index file exists
RUN echo "Verifying dist/index.js exists:" && ls -la dist/index.js

EXPOSE 4000

CMD ["node", "dist/index.js"]
