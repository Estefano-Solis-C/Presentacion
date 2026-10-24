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
    public ResponseEntity<ApiResponse<List<Event>>> getPublishedEvents(
            @RequestParam(required = false) String tipo,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false, defaultValue = "false") Boolean all) {

        boolean hasTipo = (tipo != null && !tipo.isBlank() && !"TODOS".equalsIgnoreCase(tipo));
        List<Event> events;

        if (year != null) {
            events = hasTipo
                    ? eventRepository.findByAnioAndTipoIgnoreCaseAndPublicadoTrueOrderByFechaDesc(year, tipo)
                    : eventRepository.findByAnioAndPublicadoTrueOrderByFechaDesc(year);
        } else if (Boolean.TRUE.equals(all)) {
            events = hasTipo
                    ? eventRepository.findByPublicadoTrueAndTipoIgnoreCaseOrderByFechaDesc(tipo)
                    : eventRepository.findByPublicadoTrueOrderByFechaDesc();
        } else {
            events = hasTipo
                    ? eventRepository.findTop5ByPublicadoTrueAndTipoIgnoreCaseOrderByFechaDesc(tipo)
                    : eventRepository.findTop5ByPublicadoTrueOrderByFechaDesc();
        }

        return ResponseEntity.ok(ApiResponse.ok("Eventos obtenidos exitosamente", events));
    }

    @GetMapping("/latest")
    public ResponseEntity<ApiResponse<Event>> getLatestAnnouncement(
            @RequestParam(required = false, defaultValue = "COMUNICADO") String tipo) {

        Event event = eventRepository.findFirstByPublicadoTrueAndTipoIgnoreCaseOrderByFechaDesc(tipo)
                .or(() -> eventRepository.findFirstByPublicadoTrueOrderByFechaDesc())
                .orElse(null);

        if (event == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(ApiResponse.ok("Último comunicado obtenido", event));
    }

    @GetMapping("/years")
    public ResponseEntity<ApiResponse<List<Integer>>> getAvailableYears() {
        List<Integer> years = eventRepository.findDistinctYears();
        return ResponseEntity.ok(ApiResponse.ok("Años disponibles obtenidos", years));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Event>> getEventById(@PathVariable Long id) {
        return eventRepository.findById(id)
                .map(e -> ResponseEntity.ok(ApiResponse.ok("Evento encontrado", e)))
                .orElse(ResponseEntity.notFound().build());
    }
}
