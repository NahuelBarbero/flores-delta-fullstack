# ================================
# STAGE 1: Build con Maven
# ================================
FROM maven:3.9-eclipse-temurin-21 AS builder

WORKDIR /app

# Copiar pom.xml primero (cache de dependencias)
COPY web/pom.xml ./web/
COPY pom.xml .

# Descargar dependencias (cacheado si pom no cambia)
RUN mvn -f web/pom.xml dependency:go-offline

# Copiar código fuente
COPY web/src ./web/src

# Build de la aplicación
RUN mvn -f web/pom.xml clean package -DskipTests

# ================================
# STAGE 2: Runtime con JRE Alpine
# ================================
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Crear usuario no-root para seguridad
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Copiar JAR desde builder
COPY --from=builder /app/web/target/*.jar app.jar

# Exponer puerto
EXPOSE 8080

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/actuator/health || exit 1

# Ejecutar aplicación
# -Djava.security.egd para prevenir bloqueos en /dev/random
ENTRYPOINT ["java", \
    "-Djava.security.egd=file:/dev/./urandom", \
    "-jar", \
    "app.jar"]
