# Institución Educativa Privada "Dora Mayer de Zulen" — Portal Web Institucional & Sistema de Admisión

[![Angular](https://img.shields.io/badge/Angular-18-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.3.4-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-21_LTS_(Virtual_Threads)-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://openjdk.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.3_/_TiDB_Compatible-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

> **Portal Web Oficial y Sistema de Admisión y Gestión Escolar** de la **I.E.P. Dora Mayer de Zulen**, fundada en 1957 en el distrito del Rímac por el Prof. Paulino Lapa y Dña. Yolanda Salinas.  
> Lema institucional: *"Estudio, Trabajo y Amistad"*.

---

## 🏛️ Identidad y Fidelidad Institucional

- **Fundación:** 1957 (Monitor Huáscar / Jr. Ricardo Bentín 749, Rímac, Lima).
- **Niveles Educativos:** Inicial (3 a 5 años), Primaria (1° a 6° grado) y Secundaria (1° a 5° año).
- **Paleta Oficial Mayerina:**
  - **Royal Blue Institucional:** `#254EB6` / `rgb(37, 78, 182)`
  - **Deep Navy de Alto Contraste:** `#0F296B` / `rgb(15, 41, 107)`
  - **Dorado / Oro Mayerino:** `#FBB600` / `rgb(251, 182, 0)`
- **Iconografía:** Sistema unificado y riguroso basado en `Outline Icons` (`@outline/outline-icons`). Cero emojis en la interfaz.

---

## 🚀 Arquitectura Tecnológica

### Frontend (SPA)
- **Framework:** Angular 18 (Arquitectura basada en `Signals`, Control Flow `@if/@for`, componentes `@defer` on viewport con placeholders para Zero Cumulative Layout Shift).
- **Estilos:** Tailwind CSS con configuración institucional personalizada (`tailwind.config.js`).
- **Carruseles Auténticos:**
  - Hero Slider rotacional con las 12 fotos históricas originales del colegio descargadas de Wayback Machine.
  - Testimonios con carrusel infinito rotacional, pausado por hover, navegación táctil (drag & swipe) y citas en cursiva íntegras de egresados ilustres.
- **Micro-interacciones:** Tabs sincronizados por nivel, validación en tiempo real de DNI, teléfono y formulario de admisión.

### Backend (REST API)
- **Framework:** Spring Boot 3.3.4 sobre Java 21 LTS con soporte nativo de **Virtual Threads** (Project Loom).
- **Arquitectura:** Arquitectura Hexagonal / Puertos y Adaptadores con separación estricta de Dominio, Aplicación e Infraestructura.
- **Seguridad:** Rate limiting por IP (filtro token bucket), CORS restrictivo, sanitización y validación Bean Validation (JSR-380).
- **Persistencia:** Spring Data JPA + Hibernate contra MySQL 8.3 / TiDB Cloud Serverless.
- **Caché:** Caffeine Cache en memoria para eventos, comunicados y catálogos estáticos.

---

## 🔌 Configuración MCP (Model Context Protocol)

El repositorio incluye configuraciones listas para conectar asistentes y herramientas con soporte MCP:

### 1. Render MCP Server (`.vscode/mcp.json` & `.cursor/mcp.json`)
Permite gestionar despliegues, variables de entorno, logs y estado de servicios en Render directamente desde el asistente:
```json
{
  "servers": {
    "render": {
      "type": "http",
      "url": "https://mcp.render.com/mcp"
    }
  }
}
```

### 2. Database MCP Server (MySQL / TiDB)
Permite inspeccionar esquemas, ejecutar consultas y monitorear la persistencia de datos:
```json
{
  "servers": {
    "database": {
      "command": "npx",
      "args": [
        "-y",
        "@bytebase/mysql-mcp-server",
        "--host", "127.0.0.1",
        "--port", "3306",
        "--user", "root",
        "--password", "mayerino1957",
        "--database", "doramayer"
      ]
    }
  }
}
```

---

## 🛠️ Ejecución Local con Docker Compose

Para levantar el entorno completo (Base de Datos MySQL, Backend Spring Boot y Frontend Angular + Nginx):

```bash
# Iniciar todos los contenedores en segundo plano
docker compose up -d --build

# Verificar el estado de salud de los contenedores
docker compose ps
```

- **Frontend:** [http://localhost:4200](http://localhost:4200)
- **Backend API:** [http://localhost:8081/actuator/health](http://localhost:8081/actuator/health)
- **Base de Datos MySQL:** `localhost:3306` (Base de datos: `doramayer`, Usuario: `root`, Contraseña: `mayerino1957`)

---

## ☁️ Despliegue en Render Cloud (`render.yaml`)

El archivo `render.yaml` define la infraestructura como código (IaC) para Render:
1. Conecta tu repositorio de GitHub a Render.
2. Render detectará automáticamente `render.yaml` creando:
   - **Backend Web Service (Docker):** `dora-mayer-backend`
   - **Frontend Static Site:** `dora-mayer-frontend` (con proxy reverso `/api/*` hacia el backend).

---

## 📄 Licencia y Derechos

© 1957–2026 **I.E.P. Dora Mayer de Zulen**. Todos los derechos reservados. Rímac, Lima - Perú.
