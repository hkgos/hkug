FROM node:8.11.1-alpine

RUN mkdir /core
WORKDIR /core
COPY ./core/package.json /core
COPY ./core/yarn.lock /core
RUN yarn install
COPY ./core/. /core
RUN npm run compile

RUN mkdir /web
WORKDIR /web
COPY ./web/package.json /web
COPY ./web/yarn.lock /web
RUN yarn install

COPY ./web/. /web
RUN npm run build:prod

EXPOSE 8080
ENTRYPOINT ["npm", "start"]
