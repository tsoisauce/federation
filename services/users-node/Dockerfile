FROM node:24-alpine

WORKDIR /app

COPY package.json ./
RUN npm install -g @nestjs/cli
RUN yarn install

COPY . .
RUN yarn build

EXPOSE 3001

CMD ["node", "dist/main.js"]
