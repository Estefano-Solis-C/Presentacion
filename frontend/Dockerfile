# =============================================================================
# ETAPA 1: BUILD DE LA APLICACIÓN ANGULAR 18 CON NODE.JS
# =============================================================================
FROM node:20-alpine AS build-stage

WORKDIR /app

# Copiar package.json e instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el código fuente y compilar para producción
COPY . .
RUN npm run build

# =============================================================================
# ETAPA 2: SERVIDOR WEB DE ALTO RENDIMIENTO CON NGINX ALPINE
# =============================================================================
FROM nginx:alpine

# Copiar configuración optimizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar artefactos compilados desde la etapa anterior
COPY --from=build-stage /app/dist/dora-mayer-portal/browser /usr/share/nginx/html

EXPOSE 80
EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]
