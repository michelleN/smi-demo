FROM node:12.12

WORKDIR /use/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8081

CMD [ "node", "index.js", "8081" ]
