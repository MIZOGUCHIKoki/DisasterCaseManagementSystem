FROM node:22.11.0

RUN mkdir -p /src
WORKDIR /src
COPY package.json package-lock.json ./
RUN npm install
