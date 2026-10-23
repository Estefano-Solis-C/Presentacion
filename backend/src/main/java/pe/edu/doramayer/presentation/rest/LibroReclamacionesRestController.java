package pe.edu.doramayer.presentation.rest;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.doramayer.application.dto.ApiResponseDto;
import pe.edu.doramayer.application.dto.RegistrarReclamacionCommand;
import pe.edu.doramayer.application.usecase.reclamaciones.RegistrarHojaReclamacionUseCase;
import pe.edu.doramayer.domain.model.reclamaciones.LibroReclamaciones;

@RestController
@RequestMapping("/api/v1/libro-reclamaciones")
public class LibroReclamacionesRestController {

    private final RegistrarHojaReclamacionUseCase registrarReclamacionUseCase;

    public LibroReclamacionesRestController(RegistrarHojaReclamacionUseCase registrarReclamacionUseCase) {
        this.registrarReclamacionUseCase = registrarReclamacionUseCase;
    }

    @PostMapping
    public ResponseEntity<ApiResponseDto<LibroReclamaciones>> registrarReclamacion(
            @Valid @RequestBody RegistrarReclamacionCommand command,
            HttpServletRequest request) {

        String clientIp = extractClientIp(request);
        ApiResponseDto<LibroReclamaciones> response = registrarReclamacionUseCase.execute(command, clientIp);
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
