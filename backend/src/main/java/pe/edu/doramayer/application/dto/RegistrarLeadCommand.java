package pe.edu.doramayer.application.dto;

import jakarta.validation.constraints.*;

/**
 * Command DTO para registrar una solicitud de matrícula.
 */
public record RegistrarLeadCommand(
        @NotBlank(message = "El tipo de proceso es obligatorio (NUEVO o MAYERINO)")
        @Pattern(regexp = "^(NUEVO|MAYERINO)$", message = "Tipo de proceso no válido")
        String tipoProceso,

        @NotBlank(message = "Los nombres del apoderado son obligatorios")
        @Size(min = 2, max = 120)
        String apoderadoNombres,

        @NotBlank(message = "Los apellidos del apoderado son obligatorios")
        @Size(min = 2, max = 120)
        String apoderadoApellidos,

        @NotBlank(message = "El tipo de documento es obligatorio")
        @Pattern(regexp = "^(DNI|CE)$", message = "Tipo de documento no válido (DNI o CE)")
        String tipoDocumento,

        @NotBlank(message = "El número de documento es obligatorio")
        String numeroDocumento,

        @NotBlank(message = "El teléfono celular es obligatorio")
        String telefonoContacto,

        @NotBlank(message = "El correo electrónico es obligatorio")
        @Email(message = "Formato de correo electrónico no válido")
        String correoElectronico,

        @NotBlank(message = "Los nombres del alumno son obligatorios")
        @Size(min = 2, max = 120)
        String alumnoNombres,

        @NotBlank(message = "Los apellidos del alumno son obligatorios")
        @Size(min = 2, max = 120)
        String alumnoApellidos,

        @NotBlank(message = "El nivel académico es obligatorio")
        @Pattern(regexp = "^(INICIAL|PRIMARIA|SECUNDARIA)$", message = "Nivel inválido")
        String nivelAcademico,

        @NotBlank(message = "El grado de ingreso es obligatorio")
        String gradoIngreso,

        String colegioProcedencia,
        String comentarios,
        String canalContactoPreferido,

        @AssertTrue(message = "Debe aceptar los términos")
        Boolean aceptaTerminos,

        @AssertTrue(message = "Debe aceptar la política de protección de datos (Ley N° 29733)")
        Boolean aceptaPoliticaDatos,

        String website // Honeypot anti-bot
) {
    public boolean isBot() {
        return website != null && !website.trim().isEmpty();
    }
}
