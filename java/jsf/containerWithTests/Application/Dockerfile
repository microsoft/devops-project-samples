FROM tomcat:8
LABEL maintainer="Azure App Service Container Images <appsvc-images@microsoft.com>"

RUN rm -rf /usr/local/tomcat/webapps/ROOT
COPY sampleWebApp/target/*.war /usr/local/tomcat/webapps/ROOT.war
