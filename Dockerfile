FROM node:8.4.0

WORKDIR /app

COPY package.json ./
RUN npm install --production

COPY ./public ./public
COPY ./_dist .

ENTRYPOINT ["nodejs", "server.js"]
