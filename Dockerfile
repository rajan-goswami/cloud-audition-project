FROM node:alpine

RUN mkdir -p /usr/src/message-management-service && \
    chown -R node:node /usr/src/message-management-service

WORKDIR /usr/src/message-management-service

COPY package.json package-lock.json ./

USER node

RUN npm ci

COPY --chown=node:node . .

EXPOSE 3000
