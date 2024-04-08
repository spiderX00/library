FROM node:alpine

WORKDIR /usr/src/app

COPY . /usr/src/app

EXPOSE 4200

RUN npm install -g @angular/cli

RUN npm install

COPY . .

CMD ["npm", "run", "docker-start"]
