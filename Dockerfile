FROM node:8

RUN mkdir -p /usr/src/app/backend

WORKDIR /usr/src/app/backend

COPY package.json .

RUN npm install

COPY . .

RUN npm install -g nodemon

EXPOSE 8080
