FROM amazoncorretto:17

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src
COPY ./install.sh .

RUN ./install.sh
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} application.jar
CMD apt-get update -y

ENTRYPOINT ["java", "-Xmx2048M", "-jar", "/application.jar"]
