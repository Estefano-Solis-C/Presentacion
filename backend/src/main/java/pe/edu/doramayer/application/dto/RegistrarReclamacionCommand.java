package pe.edu.doramayer.application.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public record RegistrarReclamacionCommand(
        @NotBlank(message = "Tipo de documento obligatorio")
        String reclamanteTipoDoc,

        @NotBlank(message = "Número de documento obligatorio")
        String reclamanteNumeroDoc,

        @NotBlank(message = "Nombres obligatorios")
        String reclamanteNombres,

        String reclamanteApellidos,
        String reclamanteDomicilio,

        @NotBlank(message = "Teléfono de contacto obligatorio")
        String reclamanteTelefono,

        @NotBlank(message = "Correo obligatorio")
        @Email(message = "Correo no válido")
        String reclamanteCorreo,

        Boolean esMenorEdad,
        String nombreAlumnoAfectado,
        String tipoBienServicio,
        BigDecimal montoReclamado,
        String descripcionBienServicio,

        @NotBlank(message = "Tipo de acción obligatoria (RECLAMO o QUEJA)")
        @Pattern(regexp = "^(RECLAMO|QUEJA)$", message = "Debe ser RECLAMO o QUEJA")
        String tipoAccion,

        @NotBlank(message = "Detalle obligatorio")
        @Size(min = 10, max = 3000)
        String detalleReclamacion,

        @NotBlank(message = "Pedido concreto obligatorio")
        @Size(min = 5, max = 2000)
        String pedidoConsumidor,

        @AssertTrue(message = "Debe aceptar la política de protección de datos")
        Boolean aceptaPoliticaDatos,

        String website // Honeypot
) {
    public boolean isBot() {
        return website != null && !website.trim().isEmpty();
    }
}
