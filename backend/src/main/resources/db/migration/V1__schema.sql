-- =============================================================================
-- INSTITUCIÓN EDUCATIVA PRIVADA "DORA MAYER DE ZULEN"
-- V1__schema.sql — Esquema Principal de Producción
-- Rímac, Lima, Perú | Fundado en 1957 | doramayerdezulen.edu.pe
-- =============================================================================

SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

-- -----------------------------------------------------------------------------
-- 1. TABLA: events (Comunicados y Eventos Institucionales)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS events (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(220) NOT NULL,
    tipo VARCHAR(20) NOT NULL COMMENT 'COMUNICADO, EVENTO',
    fecha DATE NOT NULL,
    resumen VARCHAR(400) NOT NULL,
    contenido LONGTEXT NOT NULL,
    imagen_url VARCHAR(350) NULL,
    destacado BOOLEAN NOT NULL DEFAULT FALSE,
    publicado BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_events_publicado_fecha (publicado, fecha DESC),
    INDEX idx_events_tipo (tipo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 2. TABLA: testimonials (Voces de la Familia Mayerina)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS testimonials (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL,
    profesion VARCHAR(120) NOT NULL,
    detalle VARCHAR(120) NOT NULL COMMENT 'Condición o promoción, ej: Exalumna · Promoción 1980',
    texto TEXT NOT NULL,
    foto_url VARCHAR(350) NOT NULL,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_testimonials_activo (activo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 3. TABLA: levels (Niveles Educativos: Inicial, Primaria, Secundaria)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS levels (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(30) NOT NULL UNIQUE COMMENT 'inicial, primaria, secundaria',
    nombre VARCHAR(80) NOT NULL,
    rango_edades VARCHAR(50) NOT NULL,
    resumen VARCHAR(300) NOT NULL,
    descripcion TEXT NOT NULL,
    puntos JSON NOT NULL,
    foto_url VARCHAR(350) NOT NULL,
    orden INT NOT NULL DEFAULT 1,
    INDEX idx_levels_orden (orden)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 4. TABLA: leads (Formulario de Admisión)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS leads (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    apoderado_nombres VARCHAR(120) NOT NULL,
    apoderado_apellidos VARCHAR(120) NOT NULL,
    documento VARCHAR(20) NULL,
    celular VARCHAR(20) NOT NULL,
    correo VARCHAR(150) NOT NULL,
    alumno_nombre VARCHAR(150) NOT NULL,
    nivel VARCHAR(20) NOT NULL COMMENT 'INICIAL, PRIMARIA, SECUNDARIA',
    grado VARCHAR(50) NOT NULL,
    acepta_datos BOOLEAN NOT NULL DEFAULT TRUE,
    acepta_terminos BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_leads_nivel_grado (nivel, grado),
    INDEX idx_leads_created (created_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 5. TABLA: contact_messages (Mensajes del Formulario de Contacto)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS contact_messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    celular VARCHAR(20) NOT NULL,
    correo VARCHAR(150) NOT NULL,
    asunto VARCHAR(180) NOT NULL,
    mensaje TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_contact_created (created_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 6. TABLA: reclamos (Libro de Reclamaciones Virtual Indecopi)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS reclamos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    codigo_reclamacion VARCHAR(30) NOT NULL UNIQUE,
    reclamante_nombres VARCHAR(120) NOT NULL,
    reclamante_apellidos VARCHAR(120) NOT NULL,
    reclamante_documento VARCHAR(20) NOT NULL,
    reclamante_telefono VARCHAR(20) NOT NULL,
    reclamante_correo VARCHAR(150) NOT NULL,
    reclamante_domicilio VARCHAR(250) NOT NULL,
    alumno_afectado VARCHAR(180) NULL,
    tipo_accion VARCHAR(15) NOT NULL COMMENT 'RECLAMO, QUEJA',
    descripcion_bien_servicio VARCHAR(300) NOT NULL,
    detalle TEXT NOT NULL,
    pedido TEXT NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'PENDIENTE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_reclamos_codigo (codigo_reclamacion),
    INDEX idx_reclamos_created (created_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
