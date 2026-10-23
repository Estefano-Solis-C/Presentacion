package pe.edu.doramayer.dto;

import jakarta.validation.constraints.*;

/**
 * DTO Inmutable (Java 21 Record) para captura de Lead de Matrícula
 * (Alumno Nuevo y Alumno Mayerino) con validación estricta y cumplimiento Ley 29733.
 */
public record LeadMatriculaRequest(
        @NotBlank(message = "El tipo de proceso es obligatorio (NUEVO o MAYERINO)")
        @Pattern(regexp = "^(NUEVO|MAYERINO)$", message = "El tipo de proceso debe ser NUEVO o MAYERINO")
        String tipoProceso,

        @NotBlank(message = "Los nombres del apoderado son obligatorios")
        @Size(min = 2, max = 120, message = "Los nombres deben tener entre 2 y 120 caracteres")
        String apoderadoNombres,

        @NotBlank(message = "Los apellidos del apoderado son obligatorios")
        @Size(min = 2, max = 120, message = "Los apellidos deben tener entre 2 y 120 caracteres")
        String apoderadoApellidos,

        @NotBlank(message = "El tipo de documento es obligatorio")
        @Pattern(regexp = "^(DNI|CE)$", message = "Tipo de documento no válido (DNI o CE)")
        String tipoDocumento,

        @NotBlank(message = "El número de documento es obligatorio")
        @Pattern(regexp = "^[0-9]{8,12}$", message = "El documento debe tener entre 8 y 12 dígitos numéricos")
        String numeroDocumento,

        @NotBlank(message = "El teléfono celular es obligatorio")
        @Pattern(regexp = "^9[0-9]{8}$", message = "El celular debe ser peruano (9 dígitos y comenzar con 9)")
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

        @Pattern(regexp = "^(WHATSAPP|LLAMADA|CORREO)$", message = "Canal no válido")
        String canalContactoPreferido,

        @AssertTrue(message = "Debe aceptar los términos de postulación")
        Boolean aceptaTerminos,

        @AssertTrue(message = "Debe aceptar la Política de Protección de Datos Personales (Ley N° 29733)")
        Boolean aceptaPoliticaDatos,

        // Campo trampa (Honeypot) para bloquear bots automatizados
        String website
) {
    public boolean isBot() {
        return website != null && !website.trim().isEmpty();
    }
}
