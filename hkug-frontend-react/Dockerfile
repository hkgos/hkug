FROM node:8.11.1-alpine

RUN mkdir /hkug-frontend-react
WORKDIR /hkug-frontend-react

COPY package.json /hkug-frontend-react
COPY yarn.lock /hkug-frontend-react
RUN yarn install

COPY . /hkug-frontend-react
RUN npm run build:prod

EXPOSE 8080
ENTRYPOINT ["npm", "start"]
