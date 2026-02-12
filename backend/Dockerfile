FROM node:18-alpine

WORKDIR /app

RUN npm init -y && \
    npm install express mongoose prom-client

COPY server.js .

EXPOSE 80

CMD ["node", "server.js"]
