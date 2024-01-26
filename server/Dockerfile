FROM node:20-alpine

WORKDIR /usr/src/todo-app-backend

COPY package*.json .

RUN npm ci

COPY . .

CMD ["npm", "run", "dev:docker"]
