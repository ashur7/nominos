FROM node:12-alpine as frontend

RUN mkdir -p /usr/app/

WORKDIR /usr/app

COPY package.json /usr/app/package.json

COPY src /usr/app/src
COPY public /usr/app/public

RUN npm install

RUN npm run build

EXPOSE 3000 8000

CMD ["npm", "start"]

