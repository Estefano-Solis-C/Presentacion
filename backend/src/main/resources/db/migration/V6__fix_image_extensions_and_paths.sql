-- =============================================================================
-- INSTITUCIÓN EDUCATIVA PRIVADA "DORA MAYER DE ZULEN"
-- V6__fix_image_extensions_and_paths.sql — Normalización de Extensiones de Imágenes
-- =============================================================================

UPDATE events SET
    imagenes = JSON_ARRAY(
        '/images/posts/inicio_clases.jpg',
        '/images/banners/foto_primaria_1.jpeg'
    )
WHERE id = 1;

UPDATE events SET
    imagenes = JSON_ARRAY(
        '/images/posts/fiestas_patrias.jpg',
        '/images/banners/foto_primaria_1.jpeg',
        '/images/banners/foto_secundaria_3.jpeg'
    )
WHERE id = 3;
