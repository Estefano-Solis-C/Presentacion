package pe.edu.doramayer.web.api;

import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import pe.edu.doramayer.domain.Lead;
import pe.edu.doramayer.dto.ApiResponse;
import pe.edu.doramayer.repository.LeadRepository;
import pe.edu.doramayer.service.ExcelLeadExportService;
import pe.edu.doramayer.web.api.dto.LeadRequest;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/leads")
public class LeadApiController {

    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");

    private final LeadRepository leadRepository;
    private final ExcelLeadExportService excelLeadExportService;

    public LeadApiController(LeadRepository leadRepository, ExcelLeadExportService excelLeadExportService) {
        this.leadRepository = leadRepository;
        this.excelLeadExportService = excelLeadExportService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> registerLead(@Valid @RequestBody LeadRequest request) {
        // Validación de honeypot: Si 'website' no está vacío, es bot spam
        if (request.website() != null && !request.website().isBlank()) {
            return ResponseEntity.ok(ApiResponse.ok("Solicitud procesada", Map.of()));
        }

        // Flexibilidad: Al menos un medio de contacto (celular o correo) debe estar presente
        boolean hasCelular = request.celular() != null && !request.celular().trim().isBlank();
        boolean hasCorreo = request.correo() != null && !request.correo().trim().isBlank();

        if (!hasCelular && !hasCorreo) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Debe proporcionar al menos un medio de contacto (número celular o correo electrónico).");
        }

        Lead lead = new Lead();
        lead.setApoderadoNombres(request.apoderadoNombres().trim());
        lead.setApoderadoApellidos(request.apoderadoApellidos().trim());
        lead.setDocumento(request.documento() != null && !request.documento().isBlank() ? request.documento().trim() : null);
        lead.setCelular(hasCelular ? request.celular().trim() : null);
        lead.setCorreo(hasCorreo ? request.correo().trim().toLowerCase() : null);
        lead.setAlumnoNombre(request.alumnoNombre().trim());
        lead.setNivel(request.nivel().trim().toUpperCase());
        lead.setGrado(request.grado().trim());
        lead.setAceptaDatos(true);
        lead.setAceptaTerminos(true);

        Lead saved = leadRepository.save(lead);

        // Registro auditable en libro Excel persistente
        excelLeadExportService.appendLead(saved);

        // Formato auditable vertical para WhatsApp
        String auditableId = String.format("ADM-%d-%04d", saved.getCreatedAt().getYear(), saved.getId());
        String fechaHora = saved.getCreatedAt().format(DATE_TIME_FORMATTER);

        String docLine = (saved.getDocumento() != null && !saved.getDocumento().isBlank())
                ? "• *Documento:* " + saved.getDocumento() + "\n"
                : "";

        String celLine = (saved.getCelular() != null && !saved.getCelular().isBlank())
                ? saved.getCelular()
                : "No especificado";

        String correoLine = (saved.getCorreo() != null && !saved.getCorreo().isBlank())
                ? saved.getCorreo()
                : "No especificado";

        String msg = String.format(
                "*I.E.P. DORA MAYER DE ZULEN — SOLICITUD DE ADMISIÓN*\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
                "📋 *CÓDIGO AUDITABLE:* %s\n" +
                "📅 *FECHA Y HORA:* %s\n\n" +
                "👤 *DATOS DEL APODERADO*\n" +
                "• *Nombres:* %s\n" +
                "• *Apellidos:* %s\n" +
                "%s" +
                "• *Celular:* %s\n" +
                "• *Correo:* %s\n\n" +
                "🎓 *DATOS DEL ESTUDIANTE A INSCRIBIR*\n" +
                "• *Estudiante:* %s\n" +
                "• *Nivel:* %s\n" +
                "• *Grado:* %s\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
                "_Deseo recibir información detallada sobre vacantes y el proceso de admisión. ¡Muchas gracias!_",
                auditableId,
                fechaHora,
                saved.getApoderadoNombres(),
                saved.getApoderadoApellidos(),
                docLine,
                celLine,
                correoLine,
                saved.getAlumnoNombre(),
                saved.getNivel(),
                saved.getGrado()
        );

        String cleanPhone = "51966057981";
        String whatsappUrl = "https://wa.me/" + cleanPhone + "?text=" + URLEncoder.encode(msg, StandardCharsets.UTF_8);

        Map<String, Object> result = Map.of(
                "id", saved.getId(),
                "codigoAuditable", auditableId,
                "fechaHora", fechaHora,
                "whatsappRedirectUrl", whatsappUrl,
                "excelExportUrl", "/api/leads/export/excel",
                "mensaje", "¡Solicitud registrada correctamente! Continuando atención por WhatsApp..."
        );

        return ResponseEntity.ok(ApiResponse.ok("Lead registrado exitosamente", result));
    }

    @GetMapping("/export/excel")
    public ResponseEntity<byte[]> exportLeadsExcel() throws IOException {
        List<Lead> leads = leadRepository.findAllByOrderByCreatedAtDesc();
        byte[] excelBytes = excelLeadExportService.exportLeadsToExcel(leads);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
        headers.setContentDispositionFormData("attachment", "solicitudes_admision_dora_mayer.xlsx");
        headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");

        return new ResponseEntity<>(excelBytes, headers, HttpStatus.OK);
    }
}
