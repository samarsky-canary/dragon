# node version/ alpine - lightweight
FROM node:12.18.3-alpine as development

WORKDIR /src

COPY package*.json .
COPY yarn.lock .

RUN yarn install --only=development
COPY . .

RUN yarn run build