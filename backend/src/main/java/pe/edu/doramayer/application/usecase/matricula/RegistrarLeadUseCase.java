package pe.edu.doramayer.application.usecase.matricula;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.doramayer.application.dto.ApiResponseDto;
import pe.edu.doramayer.application.dto.RegistrarLeadCommand;
import pe.edu.doramayer.application.port.out.OmnichannelNotificationPort;
import pe.edu.doramayer.domain.model.matricula.*;

import java.time.LocalDateTime;

@Service
public class RegistrarLeadUseCase {

    private final LeadMatriculaRepositoryPort repositoryPort;
    private final OmnichannelNotificationPort notificationPort;

    public RegistrarLeadUseCase(LeadMatriculaRepositoryPort repositoryPort,
                                OmnichannelNotificationPort notificationPort) {
        this.repositoryPort = repositoryPort;
        this.notificationPort = notificationPort;
    }

    @Transactional
    public ApiResponseDto<LeadMatricula> execute(RegistrarLeadCommand cmd, String clientIp, String userAgent) {
        if (cmd.isBot()) {
            return ApiResponseDto.error("Petición rechazada por filtros de seguridad.");
        }

        // Creación y validación de Value Objects
        DocumentoIdentidad doc = new DocumentoIdentidad(cmd.tipoDocumento(), cmd.numeroDocumento());
        TelefonoCelular cel = new TelefonoCelular(cmd.telefonoContacto());
        TipoProceso tipoProceso = TipoProceso.valueOf(cmd.tipoProceso());
        NivelAcademico nivel = NivelAcademico.valueOf(cmd.nivelAcademico());

        // Instanciación del Agregado de Dominio
        LeadMatricula lead = new LeadMatricula(
                null,
                tipoProceso,
                cmd.apoderadoNombres(),
                cmd.apoderadoApellidos(),
                doc,
                cel,
                cmd.correoElectronico(),
                cmd.alumnoNombres(),
                cmd.alumnoApellidos(),
                nivel,
                cmd.gradoIngreso(),
                cmd.colegioProcedencia(),
                cmd.comentarios(),
                cmd.canalContactoPreferido(),
                cmd.aceptaTerminos(),
                cmd.aceptaPoliticaDatos(),
                LocalDateTime.now(),
                clientIp,
                userAgent,
                "PENDIENTE",
                LocalDateTime.now()
        );

        LeadMatricula saved = repositoryPort.save(lead);

        // Despachar notificación asíncrona (correo de confirmación)
        notificationPort.sendLeadConfirmationEmailAsync(saved);

        // Generar enlace estructurado de WhatsApp
        String whatsappUrl = notificationPort.generateWhatsAppEnrollmentUrl(saved);

        return ApiResponseDto.okWithWhatsApp(
                "¡Solicitud de matrícula registrada con éxito! En breve secretaría se comunicará con usted.",
                saved,
                whatsappUrl
        );
    }
}
