package pe.edu.doramayer.web.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ReclamoRequest(
        @NotBlank(message = "Los nombres del reclamante son obligatorios")
        @Size(max = 120)
        String reclamanteNombres,

        @NotBlank(message = "Los apellidos del reclamante son obligatorios")
        @Size(max = 120)
        String reclamanteApellidos,

        @NotBlank(message = "El documento de identidad es obligatorio")
        @Size(max = 20)
        String reclamanteDocumento,

        @NotBlank(message = "El teléfono de contacto es obligatorio")
        @Size(max = 20)
        String reclamanteTelefono,

        @NotBlank(message = "El correo electrónico es obligatorio")
        @Email(message = "Ingrese un correo válido")
        @Size(max = 150)
        String reclamanteCorreo,

        @NotBlank(message = "El domicilio es obligatorio")
        @Size(max = 250)
        String reclamanteDomicilio,

        String alumnoAfectado,

        @NotBlank(message = "Debe indicar si es RECLAMO o QUEJA")
        String tipoAccion,

        @NotBlank(message = "La descripción del bien o servicio es obligatoria")
        @Size(max = 300)
        String descripcionBienServicio,

        @NotBlank(message = "El detalle de la reclamación es obligatorio")
        String detalle,

        @NotBlank(message = "El pedido o solicitud es obligatorio")
        String pedido,

        // Honeypot anti-spam
        String website
) {}
