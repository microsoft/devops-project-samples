FROM golang:1.11
LABEL maintainer="Azure App Service Container Images <appsvc-images@microsoft.com>"

WORKDIR /app

ADD . /app/ 
RUN go get -d
RUN go build -o main . 

CMD ["/app/main"]

EXPOSE 80
