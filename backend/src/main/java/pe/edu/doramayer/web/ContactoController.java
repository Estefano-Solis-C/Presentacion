package pe.edu.doramayer.web;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.doramayer.domain.MensajeContacto;
import pe.edu.doramayer.dto.ApiResponse;
import pe.edu.doramayer.dto.MensajeContactoRequest;
import pe.edu.doramayer.service.ContactoService;

@RestController
@RequestMapping("/api/v1/contacto")
public class ContactoController {

    private final ContactoService contactoService;

    public ContactoController(ContactoService contactoService) {
        this.contactoService = contactoService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<MensajeContacto>> enviarMensaje(
            @Valid @RequestBody MensajeContactoRequest request,
            HttpServletRequest servletRequest) {

        String clientIp = extractClientIp(servletRequest);
        ApiResponse<MensajeContacto> response = contactoService.registrarMensaje(request, clientIp);
        return ResponseEntity.ok(response);
    }

    private String extractClientIp(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null || xfHeader.isEmpty() || "unknown".equalsIgnoreCase(xfHeader)) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0].trim();
    }
}
