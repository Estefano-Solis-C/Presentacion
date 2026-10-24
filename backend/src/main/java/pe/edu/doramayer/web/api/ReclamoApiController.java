package pe.edu.doramayer.web.api;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.doramayer.domain.Reclamo;
import pe.edu.doramayer.dto.ApiResponse;
import pe.edu.doramayer.repository.ReclamoRepository;
import pe.edu.doramayer.web.api.dto.ReclamoRequest;

import java.time.Year;
import java.util.Map;

@RestController
@RequestMapping("/api/reclamos")
public class ReclamoApiController {

    private final ReclamoRepository reclamoRepository;

    public ReclamoApiController(ReclamoRepository reclamoRepository) {
        this.reclamoRepository = reclamoRepository;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> submitReclamo(@Valid @RequestBody ReclamoRequest request) {
        // Honeypot check
        if (request.website() != null && !request.website().isBlank()) {
            return ResponseEntity.ok(ApiResponse.ok("Reclamación procesada", Map.of()));
        }

        int currentYear = Year.now().getValue();
        String prefix = String.format("DMS-LR-%d-", currentYear);
        long count = reclamoRepository.countByPrefix(prefix);
        String correlativo = String.format("%s%04d", prefix, count + 1);

        Reclamo reclamo = new Reclamo();
        reclamo.setCodigoReclamacion(correlativo);
        reclamo.setReclamanteNombres(request.reclamanteNombres().trim());
        reclamo.setReclamanteApellidos(request.reclamanteApellidos().trim());
        reclamo.setReclamanteDocumento(request.reclamanteDocumento().trim());
        reclamo.setReclamanteTelefono(request.reclamanteTelefono().trim());
        reclamo.setReclamanteCorreo(request.reclamanteCorreo().trim().toLowerCase());
        reclamo.setReclamanteDomicilio(request.reclamanteDomicilio().trim());
        reclamo.setAlumnoAfectado(request.alumnoAfectado() != null ? request.alumnoAfectado().trim() : null);
        reclamo.setTipoAccion(request.tipoAccion().trim().toUpperCase());
        reclamo.setDescripcionBienServicio(request.descripcionBienServicio().trim());
        reclamo.setDetalle(request.detalle().trim());
        reclamo.setPedido(request.pedido().trim());
        reclamo.setEstado("PENDIENTE");

        Reclamo saved = reclamoRepository.save(reclamo);

        String mensaje = String.format(
                "Su %s ha sido registrado formalmente bajo el código %s. Conforme a la normativa de Indecopi (D.S. 011-2011-PCM), recibirá respuesta en un plazo no mayor a 15 días hábiles al correo proporcionado.",
                saved.getTipoAccion(),
                saved.getCodigoReclamacion()
        );

        return ResponseEntity.ok(ApiResponse.ok(
                mensaje,
                Map.of(
                        "codigoReclamacion", saved.getCodigoReclamacion(),
                        "fechaRegistro", saved.getCreatedAt()
                )
        ));
    }
}
