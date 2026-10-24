package pe.edu.doramayer.web.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContactRequest(
        @NotBlank(message = "El nombre es obligatorio")
        @Size(max = 150)
        String nombre,

        @NotBlank(message = "El celular es obligatorio")
        @Size(min = 9, max = 20)
        String celular,

        @NotBlank(message = "El correo electrónico es obligatorio")
        @Email(message = "Ingrese un correo electrónico válido")
        @Size(max = 150)
        String correo,

        @NotBlank(message = "El asunto es obligatorio")
        @Size(max = 180)
        String asunto,

        @NotBlank(message = "El mensaje no puede estar vacío")
        String mensaje,

        // Honeypot anti-spam
        String website
) {}
