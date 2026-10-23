package pe.edu.doramayer.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public record LibroReclamacionesRequest(
        @NotBlank(message = "Tipo de documento obligatorio")
        String reclamanteTipoDoc,

        @NotBlank(message = "Número de documento obligatorio")
        String reclamanteNumeroDoc,

        @NotBlank(message = "Nombres obligatorios")
        String reclamanteNombres,

        @NotBlank(message = "Apellidos obligatorios")
        String reclamanteApellidos,

        @NotBlank(message = "Domicilio obligatorio")
        String reclamanteDomicilio,

        @NotBlank(message = "Teléfono obligatorio")
        String reclamanteTelefono,

        @NotBlank(message = "Correo obligatorio")
        @Email(message = "Correo no válido")
        String reclamanteCorreo,

        Boolean esMenorEdad,
        String nombreAlumnoAfectado,

        @NotBlank(message = "Tipo bien/servicio obligatorio")
        String tipoBienServicio,

        BigDecimal montoReclamado,

        @NotBlank(message = "Descripción de servicio obligatoria")
        String descripcionBienServicio,

        @NotBlank(message = "Tipo de acción obligatoria (RECLAMO o QUEJA)")
        @Pattern(regexp = "^(RECLAMO|QUEJA)$", message = "Debe ser RECLAMO o QUEJA")
        String tipoAccion,

        @NotBlank(message = "Detalle obligatorio")
        @Size(min = 10, max = 3000, message = "El detalle debe tener entre 10 y 3000 caracteres")
        String detalleReclamacion,

        @NotBlank(message = "Pedido concreto obligatorio")
        @Size(min = 5, max = 2000, message = "El pedido debe tener entre 5 y 2000 caracteres")
        String pedidoConsumidor,

        @AssertTrue(message = "Debe aceptar la política de privacidad de datos")
        Boolean aceptaPoliticaDatos,

        String website // Honeypot
) {
    public boolean isBot() {
        return website != null && !website.trim().isEmpty();
    }
}
