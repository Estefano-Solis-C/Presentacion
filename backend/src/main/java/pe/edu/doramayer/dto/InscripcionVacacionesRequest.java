package pe.edu.doramayer.dto;

import jakarta.validation.constraints.*;

public record InscripcionVacacionesRequest(
        @NotBlank(message = "Nombres del apoderado obligatorios")
        String apoderadoNombres,

        @NotBlank(message = "Apellidos del apoderado obligatorios")
        String apoderadoApellidos,

        @NotBlank(message = "Número de documento obligatorio")
        @Pattern(regexp = "^[0-9]{8,12}$", message = "Documento no válido")
        String numeroDocumento,

        @NotBlank(message = "Teléfono de contacto obligatorio")
        @Pattern(regexp = "^9[0-9]{8}$", message = "Celular debe tener 9 dígitos y empezar con 9")
        String telefonoContacto,

        @NotBlank(message = "Correo electrónico obligatorio")
        @Email(message = "Correo no válido")
        String correoElectronico,

        @NotBlank(message = "Nombres del alumno obligatorios")
        String alumnoNombres,

        @NotNull(message = "Edad del alumno obligatoria")
        @Min(value = 3, message = "Edad mínima 3 años")
        @Max(value = 17, message = "Edad máxima 17 años")
        Integer alumnoEdad,

        @NotBlank(message = "Debe seleccionar un taller")
        String tallerSeleccionado,

        @NotBlank(message = "Debe seleccionar un turno")
        String turnoPreferido,

        @AssertTrue(message = "Debe aceptar los términos")
        Boolean aceptaTerminos,

        @AssertTrue(message = "Debe aceptar la política de protección de datos (Ley N° 29733)")
        Boolean aceptaPoliticaDatos,

        String website // Honeypot
) {
    public boolean isBot() {
        return website != null && !website.trim().isEmpty();
    }
}
