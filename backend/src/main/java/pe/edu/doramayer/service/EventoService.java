package pe.edu.doramayer.service;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.doramayer.config.CacheConfig;
import pe.edu.doramayer.domain.EventoComunicado;
import pe.edu.doramayer.dto.EventoResponse;
import pe.edu.doramayer.repository.EventoComunicadoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class EventoService {

    private final EventoComunicadoRepository repository;

    public EventoService(EventoComunicadoRepository repository) {
        this.repository = repository;
    }

    /**
     * Devuelve los comunicados públicos desde memoria RAM (Caffeine Cache).
     * Respuesta promedio < 1ms para soportar 2,000 usuarios concurrentes sin tocar TiDB.
     */
    @Cacheable(value = CacheConfig.CACHE_EVENTOS)
    @Transactional(readOnly = true)
    public List<EventoResponse> getPublicEvents() {
        return repository.findByIsPublicTrueOrderByIsPinnedDescCreatedAtDesc()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Cacheable(value = CacheConfig.CACHE_EVENTOS, key = "#categoria")
    @Transactional(readOnly = true)
    public List<EventoResponse> getPublicEventsByCategory(String categoria) {
        return repository.findByIsPublicTrueAndCategoriaOrderByCreatedAtDesc(categoria.toUpperCase())
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public Optional<EventoResponse> getEventBySlug(String slug) {
        return repository.findBySlugAndIsPublicTrue(slug).map(this::mapToResponse);
    }

    @CacheEvict(value = CacheConfig.CACHE_EVENTOS, allEntries = true)
    @Transactional
    public EventoComunicado createEvent(EventoComunicado evento) {
        return repository.save(evento);
    }

    private EventoResponse mapToResponse(EventoComunicado e) {
        return new EventoResponse(
                e.getId(),
                e.getTitulo(),
                e.getSlug(),
                e.getCategoria(),
                e.getResumen(),
                e.getContenido(),
                e.getImagenUrl(),
                e.getFechaEvento(),
                e.getIsPinned()
        );
    }
}
