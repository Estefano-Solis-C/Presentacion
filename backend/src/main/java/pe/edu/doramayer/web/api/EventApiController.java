package pe.edu.doramayer.web.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.doramayer.domain.Event;
import pe.edu.doramayer.dto.ApiResponse;
import pe.edu.doramayer.repository.EventRepository;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventApiController {

    private final EventRepository eventRepository;

    public EventApiController(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Event>>> getLatestPublishedEvents(
            @RequestParam(required = false) String tipo) {

        List<Event> events = (tipo != null && !tipo.isBlank() && !"TODOS".equalsIgnoreCase(tipo))
                ? eventRepository.findTop5ByPublicadoTrueAndTipoIgnoreCaseOrderByFechaDesc(tipo)
                : eventRepository.findTop5ByPublicadoTrueOrderByFechaDesc();

        return ResponseEntity.ok(ApiResponse.ok("Eventos obtenidos exitosamente", events));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Event>> getEventById(@PathVariable Long id) {
        return eventRepository.findById(id)
                .map(e -> ResponseEntity.ok(ApiResponse.ok("Evento encontrado", e)))
                .orElse(ResponseEntity.notFound().build());
    }
}
