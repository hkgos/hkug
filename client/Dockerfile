FROM node:10.3.0-alpine

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
RUN npm run build

EXPOSE 8080
ENTRYPOINT ["npm", "start"]
