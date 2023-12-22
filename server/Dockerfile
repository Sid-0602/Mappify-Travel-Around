FROM node:slim

WORKDIR /app

COPY . /app
COPY package*.json ./

RUN npm install

COPY . .

COPY .env .env

EXPOSE 3000

CMD [ "node","index.js" ]
