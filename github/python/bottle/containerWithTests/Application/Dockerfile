FROM ubuntu:16.04
LABEL maintainer="Azure App Service Container Images <appsvc-images@microsoft.com>"

RUN apt-get update && apt-get install -y python-pip python-dev && apt-get clean
RUN pip install bottle
RUN mkdir /code
WORKDIR /code
ADD requirements.txt /code/
RUN pip install -r requirements.txt
ADD . /code/

EXPOSE 8080 80 5555

CMD ["python","app.py"]
