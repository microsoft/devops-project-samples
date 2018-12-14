FROM node:8.1.4
MAINTAINER Azure App Services Container Images <appsvc-images@microsoft.com>

# Create app directory
WORKDIR /app

# Bundle app source
COPY . .

RUN npm install

EXPOSE 8080 80
CMD [ "npm", "start" ]
