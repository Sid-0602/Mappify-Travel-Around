FROM node:slim

WORKDIR /usr/src/app

COPY . /usr/src/app/
COPY package*.json ./

RUN npm install

COPY . .

COPY .env .env

EXPOSE 3000

CMD [ "node","index.js" ]
