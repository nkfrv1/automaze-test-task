FROM node:20-alpine

WORKDIR /usr/src/todo-app-frontend

COPY package*.json .

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
