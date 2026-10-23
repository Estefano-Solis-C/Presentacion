-- =============================================================================
-- INSTITUCIÓN EDUCATIVA PRIVADA "DORA MAYER DE ZULEN"
-- Base de Datos de Producción / TiDB Serverless DDL
-- Rímac, Lima, Perú | doramayerdezulen.edu.pe
-- =============================================================================

SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

-- -----------------------------------------------------------------------------
-- 1. TABLA: leads_matricula (Admisión: Alumno Nuevo & Alumno Mayerino)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS leads_matricula (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    tipo_proceso VARCHAR(20) NOT NULL COMMENT 'NUEVO, MAYERINO',
    apoderado_nombres VARCHAR(120) NOT NULL,
    apoderado_apellidos VARCHAR(120) NOT NULL,
    tipo_documento VARCHAR(10) NOT NULL DEFAULT 'DNI' COMMENT 'DNI, CE, PASAPORTE',
    numero_documento VARCHAR(15) NOT NULL,
    telefono_contacto VARCHAR(15) NOT NULL,
    correo_electronico VARCHAR(150) NOT NULL,
    alumno_nombres VARCHAR(120) NOT NULL,
    alumno_apellidos VARCHAR(120) NOT NULL,
    nivel_academico VARCHAR(20) NOT NULL COMMENT 'INICIAL, PRIMARIA, SECUNDARIA',
    grado_ingreso VARCHAR(50) NOT NULL COMMENT 'Ej: 3 Años, 4 Años, 5 Años, 1° Primaria, ..., 5° Secundaria',
    colegio_procedencia VARCHAR(180) NULL,
    comentarios TEXT NULL,
    canal_contacto_preferido VARCHAR(20) NOT NULL DEFAULT 'WHATSAPP' COMMENT 'WHATSAPP, LLAMADA, CORREO',
    
    -- Cumplimiento Ley N° 29733 (Protección de Datos Personales)
    acepta_terminos BOOLEAN NOT NULL DEFAULT FALSE,
    acepta_politica_datos BOOLEAN NOT NULL DEFAULT FALSE,
    consent_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45) NOT NULL,
    user_agent VARCHAR(255) NULL,
    
    -- Estado del Lead
    estado VARCHAR(20) NOT NULL DEFAULT 'PENDIENTE' COMMENT 'PENDIENTE, CONTACTADO, EN_EVALUACION, MATRICULADO, NO_INTERESADO',
    notas_secretaria TEXT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Índices para búsqueda rápida y auditoría
    INDEX idx_tipo_proceso (tipo_proceso),
    INDEX idx_dni (numero_documento),
    INDEX idx_telefono (telefono_contacto),
    INDEX idx_nivel_grado (nivel_academico, grado_ingreso),
    INDEX idx_estado (estado),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 2. TABLA: inscripciones_vacaciones (Programa de Vacaciones Útiles)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS inscripciones_vacaciones (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    apoderado_nombres VARCHAR(120) NOT NULL,
    apoderado_apellidos VARCHAR(120) NOT NULL,
    numero_documento VARCHAR(15) NOT NULL,
    telefono_contacto VARCHAR(15) NOT NULL,
    correo_electronico VARCHAR(150) NOT NULL,
    alumno_nombres VARCHAR(120) NOT NULL,
    alumno_edad INT NOT NULL,
    taller_seleccionado VARCHAR(80) NOT NULL COMMENT 'Ej: Danzas Folklóricas, Refuerzo Académico, Cómputo e Informática, Deportes, Dibujo y Pintura',
    turno_preferido VARCHAR(20) NOT NULL DEFAULT 'MANANA' COMMENT 'MANANA, TARDE',
    
    acepta_terminos BOOLEAN NOT NULL DEFAULT FALSE,
    acepta_politica_datos BOOLEAN NOT NULL DEFAULT FALSE,
    consent_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45) NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'REGISTRADO' COMMENT 'REGISTRADO, CONTACTADO, CONFIRMADO',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_taller (taller_seleccionado),
    INDEX idx_vacaciones_dni (numero_documento),
    INDEX idx_vacaciones_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 3. TABLA: eventos_comunicados (Feed Dinámico Caché en Memoria RAM)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS eventos_comunicados (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(220) NOT NULL,
    slug VARCHAR(250) NOT NULL UNIQUE,
    categoria VARCHAR(30) NOT NULL COMMENT 'NOTICIA, EVENTO, COMUNICADO, VACACIONES',
    resumen VARCHAR(400) NOT NULL,
    contenido TEXT NOT NULL,
    imagen_url VARCHAR(350) NULL,
    fecha_evento DATE NULL,
    is_pinned BOOLEAN NOT NULL DEFAULT FALSE,
    is_public BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_slug (slug),
    INDEX idx_categoria (categoria),
    INDEX idx_is_public_pinned (is_public, is_pinned),
    INDEX idx_fecha_evento (fecha_evento)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 4. TABLA: libro_reclamaciones (Exigencia Indecopi D.S. 011-2011-PCM)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS libro_reclamaciones (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    codigo_reclamacion VARCHAR(30) NOT NULL UNIQUE COMMENT 'Formato correlativo: DMS-LR-YYYY-NNNN',
    anio INT NOT NULL,
    correlativo INT NOT NULL,
    
    -- Datos del Consumidor Reclamante
    reclamante_tipo_doc VARCHAR(10) NOT NULL DEFAULT 'DNI',
    reclamante_numero_doc VARCHAR(15) NOT NULL,
    reclamante_nombres VARCHAR(120) NOT NULL,
    reclamante_apellidos VARCHAR(120) NOT NULL,
    reclamante_domicilio VARCHAR(250) NOT NULL,
    reclamante_telefono VARCHAR(15) NOT NULL,
    reclamante_correo VARCHAR(150) NOT NULL,
    es_menor_edad BOOLEAN NOT NULL DEFAULT FALSE,
    nombre_alumno_afectado VARCHAR(180) NULL,
    
    -- Identificación del Bien o Servicio Contratado
    tipo_bien_servicio VARCHAR(20) NOT NULL DEFAULT 'SERVICIO' COMMENT 'PRODUCTO, SERVICIO',
    monto_reclamado DECIMAL(10,2) NULL DEFAULT 0.00,
    descripcion_bien_servicio VARCHAR(300) NOT NULL COMMENT 'Ej: Servicio educativo de nivel Primaria / Pensión',
    
    -- Detalle de la Reclamación
    tipo_accion VARCHAR(15) NOT NULL COMMENT 'RECLAMO (disconformidad servicio), QUEJA (malestar atención)',
    detalle_reclamacion TEXT NOT NULL,
    pedido_consumidor TEXT NOT NULL,
    
    -- Fechas Legales Indecopi (Plazo máximo 15 días hábiles)
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_limite_respuesta DATE NOT NULL,
    estado_respuesta VARCHAR(20) NOT NULL DEFAULT 'PENDIENTE' COMMENT 'PENDIENTE, EN_REVISION, RESPONDIDO',
    respuesta_institucional TEXT NULL,
    fecha_respuesta TIMESTAMP NULL,
    
    -- Auditoría y Protección de Datos
    acepta_politica_datos BOOLEAN NOT NULL DEFAULT TRUE,
    ip_address VARCHAR(45) NOT NULL,
    
    INDEX idx_codigo_rec (codigo_reclamacion),
    INDEX idx_rec_doc (reclamante_numero_doc),
    INDEX idx_fecha_registro (fecha_registro),
    INDEX idx_estado_respuesta (estado_respuesta)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 5. TABLA: mensajes_contacto (Buzón Omnicanal de Consultas Generales)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS mensajes_contacto (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(150) NOT NULL,
    correo_electronico VARCHAR(150) NOT NULL,
    telefono VARCHAR(15) NOT NULL,
    asunto VARCHAR(180) NOT NULL,
    mensaje TEXT NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    leido BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_contacto_leido (leido),
    INDEX idx_contacto_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================================
-- DATOS SEMILLA INSTITUCIONALES (Verificados)
-- =============================================================================

INSERT INTO eventos_comunicados (titulo, slug, categoria, resumen, contenido, imagen_url, fecha_evento, is_pinned, is_public)
VALUES
(
    'Inicio de Clases',
    'inicio-de-clases',
    'COMUNICADO',
    'Es el reencuentro de maestros, alumnos y comunidad educativa.',
    'Damos la más cordial bienvenida a nuestros estudiantes para dar inicio al año escolar en los niveles de Inicial, Primaria y Secundaria, reafirmando nuestro compromiso con la formación académica y moral.',
    '/images/posts/inicio_clases.jpg',
    '2026-03-01',
    TRUE,
    TRUE
),
(
    'Día de la Madre',
    'dia-de-la-madre',
    'EVENTO',
    'Rendimos un justo homenaje a la madre Mayerina por su abnegada labor.',
    'Nuestra comunidad educativa celebra con fervor y gratitud a todas las madres de familia mayerinas en su día, reconociendo su dedicación incansable y amor en la formación de sus hijos.',
    '/images/posts/dia_madre.jpg',
    '2026-05-10',
    TRUE,
    TRUE
),
(
    'Fiestas Patrias',
    'fiestas-patrias',
    'EVENTO',
    'Celebramos nuestro aniversario patrio con estampas folklóricas.',
    'Conmemoramos las Fiestas Patrias del Perú con presentaciones cívicas, números artísticos y estampas de danzas folklóricas preparadas con entusiasmo por nuestros alumnos.',
    '/images/posts/fiestas_patrias.jpg',
    '2026-07-28',
    FALSE,
    TRUE
);
