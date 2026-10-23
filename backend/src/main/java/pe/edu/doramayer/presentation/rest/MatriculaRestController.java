package pe.edu.doramayer.presentation.rest;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.doramayer.application.dto.ApiResponseDto;
import pe.edu.doramayer.application.dto.RegistrarLeadCommand;
import pe.edu.doramayer.application.usecase.matricula.RegistrarLeadUseCase;
import pe.edu.doramayer.domain.model.matricula.LeadMatricula;

@RestController
@RequestMapping("/api/v1/matricula")
public class MatriculaRestController {

    private final RegistrarLeadUseCase registrarLeadUseCase;

    public MatriculaRestController(RegistrarLeadUseCase registrarLeadUseCase) {
        this.registrarLeadUseCase = registrarLeadUseCase;
    }

    @PostMapping("/postulacion")
    public ResponseEntity<ApiResponseDto<LeadMatricula>> registrarPostulacion(
            @Valid @RequestBody RegistrarLeadCommand command,
            HttpServletRequest request) {

        String clientIp = extractClientIp(request);
        String userAgent = request.getHeader("User-Agent");

        ApiResponseDto<LeadMatricula> response = registrarLeadUseCase.execute(command, clientIp, userAgent);
        return ResponseEntity.ok(response);
    }

    private String extractClientIp(HttpServletRequest request) {
        String xf = request.getHeader("X-Forwarded-For");
        if (xf == null || xf.isEmpty() || "unknown".equalsIgnoreCase(xf)) {
            return request.getRemoteAddr();
        }
        return xf.split(",")[0].trim();
    }
}
