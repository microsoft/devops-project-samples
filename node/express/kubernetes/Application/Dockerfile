FROM node:8
LABEL maintainer="Azure App Services Container Images <appsvc-images@microsoft.com>"

ENV PORT 8080
EXPOSE 8080

# Create app directory
WORKDIR /app
COPY package.json .

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

CMD ["npm", "start"]