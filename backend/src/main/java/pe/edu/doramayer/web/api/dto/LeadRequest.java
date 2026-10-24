package pe.edu.doramayer.web.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LeadRequest(
        @NotBlank(message = "Los nombres del apoderado son obligatorios")
        @Size(max = 120)
        String apoderadoNombres,

        @NotBlank(message = "Los apellidos del apoderado son obligatorios")
        @Size(max = 120)
        String apoderadoApellidos,

        @Size(max = 20)
        String documento,

        @NotBlank(message = "El número celular es obligatorio")
        @Size(min = 9, max = 20)
        String celular,

        @NotBlank(message = "El correo electrónico es obligatorio")
        @Email(message = "Ingrese un correo electrónico válido")
        @Size(max = 150)
        String correo,

        @NotBlank(message = "El nombre del alumno es obligatorio")
        @Size(max = 150)
        String alumnoNombre,

        @NotBlank(message = "El nivel académico es obligatorio")
        String nivel,

        @NotBlank(message = "El grado de ingreso es obligatorio")
        String grado,

        // Campo Honeypot anti-spam (debe venir vacío en clientes legítimos)
        String website
) {}
