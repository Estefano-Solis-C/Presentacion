package pe.edu.doramayer.web.api;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.doramayer.domain.ContactMessage;
import pe.edu.doramayer.dto.ApiResponse;
import pe.edu.doramayer.repository.ContactMessageRepository;
import pe.edu.doramayer.web.api.dto.ContactRequest;

import java.util.Map;

@RestController
@RequestMapping("/api/contact")
public class ContactApiController {

    private final ContactMessageRepository contactMessageRepository;

    public ContactApiController(ContactMessageRepository contactMessageRepository) {
        this.contactMessageRepository = contactMessageRepository;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> submitContact(@Valid @RequestBody ContactRequest request) {
        // Honeypot check
        if (request.website() != null && !request.website().isBlank()) {
            return ResponseEntity.ok(ApiResponse.ok("Mensaje recibido", Map.of()));
        }

        ContactMessage msg = new ContactMessage();
        msg.setNombre(request.nombre().trim());
        msg.setCelular(request.celular().trim());
        msg.setCorreo(request.correo().trim().toLowerCase());
        msg.setAsunto(request.asunto().trim());
        msg.setMensaje(request.mensaje().trim());

        ContactMessage saved = contactMessageRepository.save(msg);

        return ResponseEntity.ok(ApiResponse.ok(
                "¡Mensaje enviado con éxito! Nos comunicaremos con usted a la brevedad.",
                Map.of("id", saved.getId())
        ));
    }
}
