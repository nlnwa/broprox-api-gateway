FROM node:8-slim

LABEL maintainer="nettarkivet@nb.no"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json yarn.lock /usr/src/app/
RUN yarn install --production && yarn cache clean

COPY . /usr/src/app/

ENV NODE_ENV=production GRPC_CONTROLLER=host:port LOG_LEVEL=info

EXPOSE 3010

CMD ["node", "index.js"]
