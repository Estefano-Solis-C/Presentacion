package pe.edu.doramayer.web.api;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.doramayer.domain.Lead;
import pe.edu.doramayer.dto.ApiResponse;
import pe.edu.doramayer.repository.LeadRepository;
import pe.edu.doramayer.web.api.dto.LeadRequest;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@RestController
@RequestMapping("/api/leads")
public class LeadApiController {

    private final LeadRepository leadRepository;

    public LeadApiController(LeadRepository leadRepository) {
        this.leadRepository = leadRepository;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> registerLead(@Valid @RequestBody LeadRequest request) {
        // Validación de honeypot: Si 'website' no está vacío, es bot spam
        if (request.website() != null && !request.website().isBlank()) {
            // Descartar silenciosamente simulando éxito
            return ResponseEntity.ok(ApiResponse.ok("Solicitud procesada", Map.of()));
        }

        Lead lead = new Lead();
        lead.setApoderadoNombres(request.apoderadoNombres().trim());
        lead.setApoderadoApellidos(request.apoderadoApellidos().trim());
        lead.setDocumento(request.documento() != null ? request.documento().trim() : null);
        lead.setCelular(request.celular().trim());
        lead.setCorreo(request.correo().trim().toLowerCase());
        lead.setAlumnoNombre(request.alumnoNombre().trim());
        lead.setNivel(request.nivel().trim().toUpperCase());
        lead.setGrado(request.grado().trim());
        lead.setAceptaDatos(true);
        lead.setAceptaTerminos(true);

        Lead saved = leadRepository.save(lead);

        // Construir URL de redirección a WhatsApp Oficial
        String cleanPhone = "51966057981";
        String docInfo = (saved.getDocumento() != null && !saved.getDocumento().isBlank())
                ? "\n*Documento:* " + saved.getDocumento()
                : "";

        String msg = String.format(
                "*I.E.P. Dora Mayer de Zulen — Solicitud de Admisión*\n\n" +
                "Acabo de registrar una solicitud de vacante en el portal web:\n" +
                "*Apoderado:* %s %s%s\n" +
                "*Celular:* %s\n" +
                "*Correo:* %s\n" +
                "*Alumno(a):* %s\n" +
                "*Nivel/Grado:* %s - %s\n\n" +
                "Solicito información detallada sobre vacantes, costos y requisitos. ¡Muchas gracias!",
                saved.getApoderadoNombres(),
                saved.getApoderadoApellidos(),
                docInfo,
                saved.getCelular(),
                saved.getCorreo(),
                saved.getAlumnoNombre(),
                saved.getNivel(),
                saved.getGrado()
        );

        String whatsappUrl = "https://wa.me/" + cleanPhone + "?text=" + URLEncoder.encode(msg, StandardCharsets.UTF_8);

        Map<String, Object> result = Map.of(
                "id", saved.getId(),
                "whatsappRedirectUrl", whatsappUrl,
                "mensaje", "¡Solicitud registrada correctamente! Puede continuar su atención personalizada por WhatsApp."
        );

        return ResponseEntity.ok(ApiResponse.ok("Lead registrado exitosamente", result));
    }
}
