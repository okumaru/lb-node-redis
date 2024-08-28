FROM node:22.7.0-alpine3.20

WORKDIR /usr/src/app

COPY ./package.json ./
RUN npm install
COPY ./server.js ./

CMD ["npm","start"]