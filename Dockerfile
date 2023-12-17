FROM node:20

WORKDIR /usr/src/app

COPY . .

WORKDIR /usr/src/app/frontend
RUN npm i
RUN npm run builg

WORKDIR /usr/src/app/backend
RUN npm i

EXPOSE 3003

CMD [ "node". "app.js" ]