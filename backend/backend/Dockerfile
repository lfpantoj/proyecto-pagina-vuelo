# Use a build environment to create the application JAR
FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
WORKDIR /app

# Copiar los archivos del backend específico
COPY backend/backend/pom.xml .
RUN mvn dependency:go-offline

COPY backend/backend/src ./src
RUN mvn package -DskipTests

# Use a smaller JRE image to run the application
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# Railway provides the PORT environment variable
EXPOSE 8080

# Define the entry point for the application
ENTRYPOINT ["java", "-jar", "app.jar"]