package pe.edu.doramayer.infrastructure.notifications;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import pe.edu.doramayer.application.port.out.OmnichannelNotificationPort;
import pe.edu.doramayer.domain.model.matricula.LeadMatricula;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
public class OmnichannelNotificationAdapter implements OmnichannelNotificationPort {

    private static final Logger log = LoggerFactory.getLogger(OmnichannelNotificationAdapter.class);

    @Value("${app.school.whatsapp:+51 966057981}")
    private String rawWhatsappNumber;

    @Value("${app.school.secretaria-email:secretaria@doramayerdezulen.edu.pe}")
    private String secretariaEmail;

    @Value("${app.school.backup-email:doramayer1957@gmail.com}")
    private String backupEmail;

    @Override
    public String generateWhatsAppEnrollmentUrl(LeadMatricula lead) {
        String cleanNumber = rawWhatsappNumber.replaceAll("[^0-9]", "");
        String text = """
            👋 ¡Hola Admisión I.E.P. Dora Mayer de Zulen!
            
            Acabo de registrar una solicitud de matrícula en la web:
            📋 Proceso: %s
            👨‍👩‍👧 Apoderado: %s %s
            🪪 DNI/CE: %s
            📞 Celular: %s
            🎓 Alumno: %s %s
            🏫 Nivel/Grado: %s - %s
            
            Deseo continuar con la evaluación de vacante e información de pensiones. ¡Muchas gracias!
            """.formatted(
                lead.getTipoProceso().name().equals("NUEVO") ? "Alumno Nuevo (Postulante)" : "Alumno Mayerino (Ratificación)",
                lead.getApoderadoNombres(),
                lead.getApoderadoApellidos(),
                lead.getDocumento().getNumero(),
                lead.getTelefono().getNumero(),
                lead.getAlumnoNombres(),
                lead.getAlumnoApellidos(),
                lead.getNivelAcademico().name(),
                lead.getGradoIngreso()
        );

        return "https://wa.me/" + cleanNumber + "?text=" + URLEncoder.encode(text, StandardCharsets.UTF_8);
    }

    @Async("virtualThreadTaskExecutor")
    @Override
    public void sendLeadConfirmationEmailAsync(LeadMatricula lead) {
        log.info("[DDD ADAPTER NOTIFIER - VIRTUAL THREAD] Enviando confirmación de lead #{} a {} y copias {} / {}",
                lead.getId(), lead.getCorreoElectronico(), secretariaEmail, backupEmail);
    }
}
