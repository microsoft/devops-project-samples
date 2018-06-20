FROM ubuntu:16.04
LABEL maintainer="Azure App Service Container Images <appsvc-images@microsoft.com>"

RUN apt-get update && apt-get install -y python-pip python-dev && apt-get clean

RUN mkdir /code
WORKDIR /code
ADD requirements.txt /code/
RUN pip install -r requirements.txt
ADD . /code/
# ssh
ENV SSH_PASSWD "root:Docker!"
RUN apt-get update \
	&& apt-get install -y --no-install-recommends openssh-server \
	&& echo "$SSH_PASSWD" | chpasswd 

COPY sshd_config /etc/ssh/
	
EXPOSE 8000 2222
CMD ["python", "/code/manage.py", "runserver", "0.0.0.0:8000"]
