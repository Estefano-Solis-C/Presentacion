-- =============================================================================
-- INSTITUCIÓN EDUCATIVA PRIVADA "DORA MAYER DE ZULEN"
-- Base de Datos de Producción / TiDB Serverless & MySQL 8.3
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
    celular VARCHAR(20) NULL,
    correo VARCHAR(150) NULL,
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

-- -----------------------------------------------------------------------------
-- DATOS SEMILLA INSTITUCIONALES AUTÉNTICOS
-- -----------------------------------------------------------------------------

INSERT INTO events (id, titulo, tipo, fecha, resumen, contenido, imagen_url, destacado, publicado) VALUES
(
    1,
    'Inicio de Clases',
    'COMUNICADO',
    '2026-03-01',
    'Es el reencuentro de maestros, alumnos y comunidad educativa.',
    'Damos la más cordial bienvenida a nuestros estudiantes para dar inicio al año escolar en los niveles de Inicial, Primaria y Secundaria, reafirmando nuestro compromiso con la formación académica y moral en nuestras aulas del Rímac.',
    '/images/posts/inicio_clases.jpg',
    TRUE,
    TRUE
),
(
    2,
    'Día de la Madre',
    'EVENTO',
    '2026-05-10',
    'Rendimos un justo homenaje a la madre Mayerina por su abnegada labor.',
    'Nuestra comunidad educativa celebra con fervor y gratitud a todas las madres de familia mayerinas en su día, reconociendo su dedicación incansable y amor en la formación de sus hijos con presentaciones artísticas y números especiales.',
    '/images/posts/dia_madre.jpg',
    TRUE,
    TRUE
),
(
    3,
    'Fiestas Patrias',
    'EVENTO',
    '2026-07-28',
    'Celebramos nuestro aniversario patrio con estampas folklóricas.',
    'Conmemoramos las Fiestas Patrias del Perú con presentaciones cívicas, números artísticos y estampas de danzas folklóricas preparadas con entusiasmo por nuestros alumnos de Inicial, Primaria y Secundaria.',
    '/images/posts/fiestas_patrias.jpg',
    FALSE,
    TRUE
)
ON DUPLICATE KEY UPDATE titulo = VALUES(titulo);

INSERT INTO testimonials (id, nombre, profesion, detalle, texto, foto_url, activo) VALUES
(
    1,
    'Milagros Arteaga Rojas',
    'Licenciada en Educación',
    'Exalumna, Exdocente y Madre Mayerina',
    'Fui parte de esta gran familia la IEP. “Dora Mayer de Zulen” y quiero compartir mi experiencia como exalumna, exdocente y exmadre de familia. Me sentí apoyada por mis profesores y directores: Paulino Lapa y Yolanda Salinas, quienes me formaron y entregaron todas las herramientas para ser una persona de bien y el cimiento para mi futuro laboral.',
    '/images/milagros_arteaga.jpeg',
    TRUE
),
(
    2,
    'Miguel Blasica Soto',
    'Docente y Director de Teatro',
    'Promoción Primaria 1971–1975',
    'Mi querido Colegio Dora Mayer de Zulen, un tesoro de nuestro amado distrito del Rímac y ejemplo de educación del Perú para el mundo. A través de los años miro la huella de su siembra en mi dedicación a las Artes Escénicas como artista profesional y docente. Un fuerte abrazo y bendiciones para la familia del profesor Paulino Lapa.',
    '/images/miguel_blasica.jpg',
    TRUE
),
(
    3,
    'Carlos Leonardo Cumpa Seminario',
    'Abogado',
    'Primer Diploma de Honor 1971',
    'Grandes anécdotas vienen a mi mente de mi querido colegio donde hice kindergarten y primaria, de la mano de mi profesor y Director Paulino Lapa. El 23 de Diciembre de 1971 recibí de sus manos el primer diploma de honor de mi vida, por mi aplicación en las clases de inglés, recuerdo que conservo con especial aprecio.',
    '/images/carlos_cumpa.jpeg',
    TRUE
),
(
    4,
    'Patricia Lapa Salinas',
    'Médico Cirujano',
    'Exalumna y Familia Fundadora',
    'Cómo no recordar a mi querido colegio Dora Mayer de Zulen... siempre con la misma calidez, valores y principios inculcados a sus alumnos. Sentaste las bases de mi educación, me llevaste de la mano en mis primeros años y gracias a ello logré ser una profesional médica y puse en tus manos la educación de mis hijos.',
    '/images/patricia_lapa.jpg',
    TRUE
),
(
    5,
    'Lizandro Morillo Viera',
    'Ingeniero de Sistemas',
    'Promoción 1980',
    'Tengo los más lindos recuerdos de mi paso por el Colegio Dora Mayer de Zulen en la sede de Monitor Huáscar. Época de felicidad total, amigos, clases, aprendizajes y fulbito en el recreo con nuestro querido "DIRE" Paulino Lapa. Hoy con emocionada nostalgia agradezco la formación académica y los valores recibidos.',
    '/images/lizandro_morillo.jpg',
    TRUE
),
(
    6,
    'Gabriela Estephany Rosanna Ravelo Lapa',
    'Odontóloga',
    'Egresada Inicial, Primaria y Secundaria',
    'Un agradecimiento especial a la institución educativa por haber sido mi primer lugar de enseñanza desde inicial, primaria y secundaria. Un recinto donde no solo se fomenta el estudio, el trabajo y los valores, sino también el compromiso continuo para lograr metas personales y convertirme en Odontóloga.',
    '/images/gabriela_ravelo.jpg',
    TRUE
)
ON DUPLICATE KEY UPDATE nombre = VALUES(nombre);

INSERT INTO levels (id, slug, nombre, rango_edades, resumen, descripcion, puntos, foto_url, orden) VALUES
(
    1,
    'inicial',
    'Nivel Inicial',
    '3 a 5 años',
    'Estimulamos la autonomía, la socialización y el desarrollo integral a través del juego dirigido y valores.',
    'Este nivel da inicio al proceso educativo de nuestros niños de 3, 4 y 5 años, impartiendo una educación integral que atiende su crecimiento social, afectivo y cognitivo, la expresión oral, artística, la psicomotricidad y el respeto de sus derechos. A través de proyectos de aprendizaje y dinámicas lúdicas, el niño explora el mundo con confianza y consolida su personalidad.',
    JSON_ARRAY(
        'Aprestamiento y desarrollo de la creatividad',
        'Inmersión temprana en inglés y estimulación lúdica',
        'Psicomotricidad vivencial y expresión artística',
        'Acompañamiento psicopedagógico y escuela para padres'
    ),
    '/images/foto_inicial.jpg',
    1
),
(
    2,
    'primaria',
    'Nivel Primaria',
    '6 a 11 años (1° a 6° Grado)',
    'Hábitos de estudio sólidos, pensamiento crítico y tareas 100% supervisadas en el aula.',
    'Nuestra finalidad es educar a los estudiantes con una visión crítica, autónoma e independiente, siendo protagonistas en la construcción de sus propios aprendizajes. Consolidamos las competencias de comunicación y matemáticas, aplicando metodologías activas y eliminando la sobrecarga nocturna en el hogar gracias al acompañamiento docente directo.',
    JSON_ARRAY(
        'Tareas realizadas y supervisadas en aula con el docente',
        'Laboratorio de cómputo, ciencias e inglés intensivo',
        'Talleres de danzas folklóricas y desarrollo de talentos',
        'Práctica constante de virtudes humanas y responsabilidad cívica'
    ),
    '/images/foto_primaria.jpeg',
    2
),
(
    3,
    'secundaria',
    'Nivel Secundaria',
    '12 a 16 años (1° a 5° Año)',
    'Formación integral, científica y humanística para responder con éxito a un mundo globalizado.',
    'Brindamos una sólida preparación académica, científica y valórica, orientada a la madurez intelectual y personal. Nuestros estudiantes consolidan su autonomía y liderazgo a través de seminarios audiovisuales, laboratorios experimentales de química y biología, y talleres de oratoria que forjan ciudadanos conscientes, solidarios y preparados para la educación superior.',
    JSON_ARRAY(
        'Aplicación rigurosa de la Currícula Nacional vigente',
        'Laboratorios especializados de Ciencias (Biología y Química)',
        'Centro de Cómputo moderno y talleres de oratoria y liderazgo',
        'Orientación vocacional continua y seminarios audiovisuales'
    ),
    '/images/foto_secundaria.jpeg',
    3
)
ON DUPLICATE KEY UPDATE slug = VALUES(slug);
