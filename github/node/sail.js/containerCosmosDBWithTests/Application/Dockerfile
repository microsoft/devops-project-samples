FROM node:8
LABEL maintainer="Azure App Service Container Images <appsvc-images@microsoft.com>"

# Create app directory
WORKDIR /app

# Bundle app source
COPY . .
RUN npm install

EXPOSE 3000 80
CMD [ "npm", "start" ]
