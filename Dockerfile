FROM node:alpine

RUN mkdir -p /usr/src/message-management-service

WORKDIR /usr/src/message-management-service

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

EXPOSE 3000
