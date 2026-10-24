-- =============================================================================
-- INSTITUCIÓN EDUCATIVA PRIVADA "DORA MAYER DE ZULEN"
-- V4__add_facebook_fields_and_announcements.sql — Campos de Facebook y Archivo Histórico
-- =============================================================================

ALTER TABLE events ADD COLUMN facebook_post_id VARCHAR(100) NULL;
ALTER TABLE events ADD COLUMN facebook_permalink VARCHAR(350) NULL;
ALTER TABLE events ADD COLUMN anio INT NOT NULL DEFAULT 2026;
CREATE INDEX idx_events_anio ON events (anio);

-- Actualizar año de eventos base
UPDATE events SET anio = YEAR(fecha) WHERE anio = 2026 AND fecha IS NOT NULL;

-- -----------------------------------------------------------------------------
-- SEED DE COMUNICADOS Y EVENTOS HISTÓRICOS DE FACEBOOK (2026, 2025, 2024, 2023)
-- -----------------------------------------------------------------------------
INSERT INTO events (id, titulo, tipo, fecha, anio, resumen, contenido, imagen_url, destacado, publicado, facebook_post_id, facebook_permalink)
VALUES
(
    4,
    'Proceso de Admisión y Matrícula 2026: Vacantes Disponibles',
    'COMUNICADO',
    '2026-01-15',
    2026,
    'La Dirección y Secretaría informa a la comunidad mayerina el cronograma de matrícula 2026 y recepción de postulaciones para Inicial, Primaria y Secundaria.',
    'Estimados padres de familia y comunidad mayerina:\n\nLes comunicamos que se encuentra abierto el proceso de admisión y ratificación de matrícula para el año lectivo 2026. Los invitamos a comunicarse a nuestra secretaría escolar o solicitar información mediante nuestro portal oficial.\n\nRecordamos que contamos con vacantes limitadas por aula para garantizar la atención pedagógica personalizada y el desarrollo de tareas dirigidas en aula.',
    '/images/banners/banner_001.jpg',
    TRUE,
    TRUE,
    'fb_post_2026_01',
    'https://www.facebook.com/doramayer.dezulen'
),
(
    5,
    'Ceremonia de Clausura y Premiación del Año Escolar 2025',
    'EVENTO',
    '2025-12-19',
    2025,
    'Rendimos merecido homenaje al esfuerzo, perseverancia y excelencia académica de nuestros alumnos mayerinos de los tres niveles.',
    'Con profunda satisfacción y orgullo mayerino, nuestra comunidad educativa celebró la Ceremonia de Clausura del Año Escolar 2025 en el patio de honor de nuestra sede institucional de Ricardo Bentín 749, Rímac.\n\nFelicitamos a los alumnos que alcanzaron los primeros puestos y a la Promoción de Secundaria por culminar con éxito su etapa escolar inspirados en el lema de Estudio, Trabajo y Amistad.',
    '/images/banners/foto_secundaria_1.jpeg',
    FALSE,
    TRUE,
    'fb_post_2025_12',
    'https://www.facebook.com/doramayer.dezulen'
),
(
    6,
    'Feria de Ciencias y Demostración de Método Activo 2025',
    'EVENTO',
    '2025-09-24',
    2025,
    'Nuestros estudiantes de Primaria y Secundaria demostraron sus proyectos de investigación, robótica lúdica y experimentos en aula.',
    'La ciencia y el aprendizaje práctico cobraron vida en nuestra Feria Escolar de Ciencias 2025. Los alumnos expusieron proyectos desarrollados junto a sus docentes en el laboratorio del colegio, promoviendo el pensamiento crítico, la oratoria y la resolución de problemas reales.',
    '/images/banners/foto_secundaria_3.jpeg',
    FALSE,
    TRUE,
    'fb_post_2025_09',
    'https://www.facebook.com/doramayer.dezulen'
),
(
    7,
    'Bienvenido Año Escolar Mayerino 2024: Feliz Inicio de Clases',
    'COMUNICADO',
    '2024-03-08',
    2024,
    '¡Feliz inicio de año escolar a toda la familia mayerina! Les abrimos las puertas con alegría y entusiasmo pedagógico.',
    'Damos la más afectuosa bienvenida a nuestros queridos estudiantes de Inicial, Primaria y Secundaria para dar inicio al Año Escolar 2024.\n\nNuestros maestros y directivos renuevan su compromiso de brindar una formación humana sólida, cálida y de alta calidad académica en el distrito del Rímac.',
    '/images/banners/foto_primaria_3.jpg',
    FALSE,
    TRUE,
    'fb_post_2024_03',
    'https://www.facebook.com/doramayer.dezulen'
),
(
    8,
    'Festival de Danzas Folklóricas y Tradición Peruana 2024',
    'EVENTO',
    '2024-07-20',
    2024,
    'Color, música y patriotismo: estampas costumbristas presentadas por nuestros estudiantes en homenaje al Perú.',
    'Nuestros alumnos de Inicial, Primaria y Secundaria deslumbraron con su talento y gracia artística en el Festival de Danzas 2024, revalorando nuestra identidad cultural y tradiciones peruanas en el marco de las Fiestas Patrias.',
    '/images/posts/fiestas_patrias.jpg',
    FALSE,
    TRUE,
    'fb_post_2024_07',
    'https://www.facebook.com/doramayer.dezulen'
),
(
    9,
    'Jornada Psicopedagógica y Escuela para Padres 2023',
    'COMUNICADO',
    '2023-05-18',
    2023,
    'Taller formativo para familias sobre normas de convivencia positiva, acompañamiento emocional y hábitos de estudio en casa.',
    'Con gran concurrencia se realizó la Escuela para Padres 2023 a cargo de nuestro departamento de Psicología. Agradecemos la activa participación de los padres de familia mayerinos en el fortalecimiento de la alianza hogar-escuela.',
    '/images/banners/foto_inicial_2.jpeg',
    FALSE,
    TRUE,
    'fb_post_2023_05',
    'https://www.facebook.com/doramayer.dezulen'
)
ON DUPLICATE KEY UPDATE titulo = VALUES(titulo);
