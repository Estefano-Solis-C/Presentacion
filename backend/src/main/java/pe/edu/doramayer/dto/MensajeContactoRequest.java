package pe.edu.doramayer.dto;

import jakarta.validation.constraints.*;

public record MensajeContactoRequest(
        @NotBlank(message = "Nombre completo obligatorio")
        String nombreCompleto,

        @NotBlank(message = "Correo obligatorio")
        @Email(message = "Correo no válido")
        String correoElectronico,

        @NotBlank(message = "Teléfono obligatorio")
        String telefono,

        @NotBlank(message = "Asunto obligatorio")
        String asunto,

        @NotBlank(message = "Mensaje obligatorio")
        @Size(min = 5, max = 1500)
        String mensaje,

        String website // Honeypot
) {
    public boolean isBot() {
        return website != null && !website.trim().isEmpty();
    }
}
