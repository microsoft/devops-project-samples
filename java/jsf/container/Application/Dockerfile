FROM maven:3.5.2-jdk-8 AS build-env
WORKDIR /app
COPY . /app
RUN mvn package
 
FROM tomcat:8
RUN rm -rf /usr/local/tomcat/webapps/ROOT
COPY --from=build-env /app/target/*.war /usr/local/tomcat/webapps/ROOT.war
