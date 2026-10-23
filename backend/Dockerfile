# =============================================================================
# ETAPA 1: BUILD DEL BACKEND CON MAVEN Y ECLIPSE TEMURIN JAVA 21
# =============================================================================
FROM maven:3.9.8-eclipse-temurin-21-alpine AS builder

WORKDIR /build

# Copiar POM y descargar dependencias para aprovechar caché de capas Docker
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copiar código fuente y compilar JAR empaquetado ejecutando pruebas unitarias DDD
COPY src ./src
RUN mvn clean test package -B

# =============================================================================
# ETAPA 2: RUNTIME LIGERO CON ECLIPSE TEMURIN 21 JRE ALPINE
# Optimizado para Render (<384 MB RAM) y Java 21 Virtual Threads
# =============================================================================
FROM eclipse-temurin:21-jre-alpine

# Crear usuario sin privilegios por seguridad
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copiar JAR generado en la etapa anterior
COPY --from=builder /build/target/*.jar app.jar

# Cambiar propiedad al usuario seguro
RUN chown -R appuser:appgroup /app
USER appuser

# Configuración de variables de entorno por defecto
ENV PORT=8080
ENV SPRING_PROFILES_ACTIVE=prod

# Flags de JVM optimizados para Render:
# -XX:+UseSerialGC: Minimiza el consumo de memoria del Garbage Collector
# -XX:TieredStopAtLevel=1: Arranque acelerado
# -Xms128m -Xmx384m: Límite estricto de memoria para evitar OOM Killer
ENV JAVA_OPTS="-XX:+UseSerialGC -XX:TieredStopAtLevel=1 -Xms128m -Xmx384m -Djava.security.egd=file:/dev/./urandom"

EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
