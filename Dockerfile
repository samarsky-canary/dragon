# node version/ alpine - lightweight
FROM node:14.17 as development

WORKDIR /backend/

COPY package*.json .
COPY yarn.lock .

RUN yarn install --only=development
COPY . .

RUN yarn run build