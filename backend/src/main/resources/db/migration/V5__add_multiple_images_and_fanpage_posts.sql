-- =============================================================================
-- INSTITUCIÓN EDUCATIVA PRIVADA "DORA MAYER DE ZULEN"
-- V5__add_multiple_images_and_fanpage_posts.sql — Soporte Multi-Imagen y Fanpage
-- =============================================================================

ALTER TABLE events ADD COLUMN imagenes JSON NULL;

-- -----------------------------------------------------------------------------
-- ACTUALIZACIÓN CON GALERÍAS FOTOGRÁFICAS MÚLTIPLES Y ENLACES DIRECTOS
-- -----------------------------------------------------------------------------

UPDATE events SET
    imagenes = JSON_ARRAY(
        '/images/banners/banner_001.jpg',
        '/images/banners/foto_primaria_3.jpg',
        '/images/banners/foto_inicial_1.jpeg'
    ),
    facebook_permalink = 'https://www.facebook.com/doramayer.dezulen'
WHERE id = 4;

UPDATE events SET
    imagenes = JSON_ARRAY(
        '/images/posts/inicio_clases.jpg',
        '/images/banners/foto_primaria_1.jpg'
    ),
    facebook_permalink = 'https://www.facebook.com/doramayer.dezulen'
WHERE id = 1;

UPDATE events SET
    imagenes = JSON_ARRAY(
        '/images/posts/dia_madre.jpg',
        '/images/banners/foto_inicial_2.jpeg'
    ),
    facebook_permalink = 'https://www.facebook.com/doramayer.dezulen'
WHERE id = 2;

UPDATE events SET
    imagenes = JSON_ARRAY(
        '/images/posts/fiestas_patrias.jpg',
        '/images/banners/foto_primaria_1.jpg',
        '/images/banners/foto_secundaria_3.jpeg'
    ),
    facebook_permalink = 'https://www.facebook.com/doramayer.dezulen'
WHERE id = 3;

UPDATE events SET
    imagenes = JSON_ARRAY(
        '/images/banners/foto_secundaria_1.jpeg',
        '/images/banners/foto_secundaria_2.jpeg'
    ),
    facebook_permalink = 'https://www.facebook.com/doramayer.dezulen'
WHERE id = 5;

UPDATE events SET
    imagenes = JSON_ARRAY(
        '/images/banners/foto_secundaria_3.jpeg',
        '/images/banners/foto_secundaria_1.jpeg'
    ),
    facebook_permalink = 'https://www.facebook.com/doramayer.dezulen'
WHERE id = 6;

UPDATE events SET
    imagenes = JSON_ARRAY(
        '/images/banners/foto_primaria_3.jpg',
        '/images/posts/inicio_clases.jpg',
        '/images/banners/foto_inicial_2.jpeg'
    ),
    facebook_permalink = 'https://www.facebook.com/iepdoramayerdezulen/posts/pfbid02cjuE3P5PK9barkAAokbjCbQWHeM5vwNJDeuMgrE7Yqtbmxmi4xVEBXB2WrZK6SCCl'
WHERE id = 7;

UPDATE events SET
    imagenes = JSON_ARRAY(
        '/images/posts/fiestas_patrias.jpg',
        '/images/banners/foto_secundaria_3.jpeg'
    ),
    facebook_permalink = 'https://www.facebook.com/doramayer.dezulen'
WHERE id = 8;

UPDATE events SET
    imagenes = JSON_ARRAY(
        '/images/banners/foto_inicial_2.jpeg',
        '/images/banners/foto_inicial_1.jpeg'
    ),
    facebook_permalink = 'https://www.facebook.com/doramayer.dezulen'
WHERE id = 9;
