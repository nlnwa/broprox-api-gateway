FROM node:8-alpine

LABEL maintainer="nettarkivet@nb.no"

COPY package.json yarn.lock /usr/src/app/
WORKDIR /usr/src/app

RUN apk add --no-cache libc6-compat \
&& yarn install --production \
&& yarn cache clean

COPY . .

ENV NODE_ENV=production GRPC_CONTROLLER=host:port LOG_LEVEL=info
EXPOSE 3010
ENTRYPOINT /usr/local/bin/node index.js
