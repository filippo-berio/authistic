FROM node:19.2-alpine as dev
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install
