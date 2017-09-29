FROM node:slim

MAINTAINER Norks Nettarkiv <nettarkivet@nb.no>

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json yarn.lock /usr/src/app/

RUN yarn install --production && yarn cache clean

COPY . /usr/src/app/

ENV GRPC_CONTROLLER host:port

EXPOSE 3010

CMD ["node", "index.js"]
