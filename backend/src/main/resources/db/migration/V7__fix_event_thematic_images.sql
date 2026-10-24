-- =============================================================================
-- INSTITUCIÓN EDUCATIVA PRIVADA "DORA MAYER DE ZULEN"
-- V7__fix_event_thematic_images.sql — Coherencia Temática de Fotos con Facebook
-- =============================================================================

-- 1. Clausura y Premiación 2025: Diploma de honor, medallas y formación escolar solemne
UPDATE events SET
    imagen_url = '/images/alumno_destacado.png',
    imagenes = JSON_ARRAY(
        '/images/alumno_destacado.png',
        '/images/banners/foto_secundaria_2.jpeg'
    )
WHERE id = 5;

-- 2. Feria de Ciencias y Demostración de Método Activo 2025: Laboratorio escolar y método científico
UPDATE events SET
    imagen_url = '/images/estudiante_lab.png',
    imagenes = JSON_ARRAY(
        '/images/estudiante_lab.png',
        '/images/banners/foto_secundaria_1.jpeg'
    )
WHERE id = 6;

-- 3. Festival de Danzas Folklóricas y Tradición Peruana 2024: Danzas peruanas y confraternidad estudiantil
UPDATE events SET
    imagen_url = '/images/posts/fiestas_patrias.jpg',
    imagenes = JSON_ARRAY(
        '/images/posts/fiestas_patrias.jpg',
        '/images/amistad.png'
    )
WHERE id = 8;

-- 4. Jornada Psicopedagógica y Escuela para Padres 2023: Gabinete de psicología y comunidad familiar
UPDATE events SET
    imagen_url = '/images/atencion_psicologica.jpeg',
    imagenes = JSON_ARRAY(
        '/images/atencion_psicologica.jpeg',
        '/images/banners/foto_inicial_1.jpeg'
    )
WHERE id = 9;

-- 5. Fiestas Patrias 2026: Desfile escolar y uniforme secundario cívico
UPDATE events SET
    imagen_url = '/images/posts/fiestas_patrias.jpg',
    imagenes = JSON_ARRAY(
        '/images/posts/fiestas_patrias.jpg',
        '/images/foto_secundaria.jpeg'
    )
WHERE id = 3;

-- 6. Inicio de Clases 2026: Afiche oficial y aula de primaria con docente
UPDATE events SET
    imagen_url = '/images/posts/inicio_clases.jpg',
    imagenes = JSON_ARRAY(
        '/images/posts/inicio_clases.jpg',
        '/images/banners/foto_primaria_3.jpg'
    )
WHERE id = 1;
