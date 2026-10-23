package pe.edu.doramayer.web;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.doramayer.dto.ApiResponse;
import pe.edu.doramayer.dto.EventoResponse;
import pe.edu.doramayer.service.EventoService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/eventos")
public class EventoController {

    private final EventoService eventoService;

    public EventoController(EventoService eventoService) {
        this.eventoService = eventoService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<EventoResponse>>> listarEventosPublicos(
            @RequestParam(required = false) String categoria) {

        List<EventoResponse> lista = (categoria != null && !categoria.isBlank())
                ? eventoService.getPublicEventsByCategory(categoria)
                : eventoService.getPublicEvents();

        return ResponseEntity.ok(ApiResponse.ok("Eventos obtenidos correctamente", lista));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<EventoResponse>> obtenerPorSlug(@PathVariable String slug) {
        return eventoService.getEventBySlug(slug)
                .map(e -> ResponseEntity.ok(ApiResponse.ok("Evento encontrado", e)))
                .orElse(ResponseEntity.notFound().build());
    }
}
