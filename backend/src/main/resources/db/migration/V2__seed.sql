-- =============================================================================
-- INSTITUCIÓN EDUCATIVA PRIVADA "DORA MAYER DE ZULEN"
-- V2__seed.sql — Datos Semilla Institucionales Auténticos
-- Rímac, Lima, Perú | Fundado en 1957 | doramayerdezulen.edu.pe
-- =============================================================================

SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

-- -----------------------------------------------------------------------------
-- 1. SEED: events (3 Eventos y Comunicados Reales)
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

-- -----------------------------------------------------------------------------
-- 2. SEED: testimonials (6 Testimonios Auténticos Verbatim)
-- -----------------------------------------------------------------------------
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

-- -----------------------------------------------------------------------------
-- 3. SEED: levels (3 Niveles Educativos: Inicial, Primaria, Secundaria)
-- -----------------------------------------------------------------------------
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
    '/images/banners/foto_inicial_1.jpeg',
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
