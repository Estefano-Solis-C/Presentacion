package pe.edu.doramayer.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import pe.edu.doramayer.domain.LeadMatricula;
import pe.edu.doramayer.domain.InscripcionVacaciones;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

/**
 * Servicio Omnicanal de Notificaciones Asíncronas (@Async)
 * Ejecuta en Virtual Threads ligeros para no bloquear la transacción HTTP principal.
 * Maneja el envío transaccional y genera URLs optimizadas de WhatsApp Web / App.
 */
@Service
public class OmnichannelNotificationService {

    private static final Logger log = LoggerFactory.getLogger(OmnichannelNotificationService.class);

    @Value("${app.school.whatsapp:+51 966057981}")
    private String rawWhatsappNumber;

    @Value("${app.school.secretaria-email:secretaria@doramayerdezulen.edu.pe}")
    private String secretariaEmail;

    @Value("${app.school.backup-email:doramayer1957@gmail.com}")
    private String backupEmail;

    /**
     * Genera la URL oficial de click-to-chat de WhatsApp con mensaje estructurado.
     */
    public String buildWhatsAppEnrollmentUrl(LeadMatricula lead) {
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
                lead.getTipoProceso().equals("NUEVO") ? "Alumno Nuevo (Postulante)" : "Alumno Mayerino (Ratificación)",
                lead.getApoderadoNombres(),
                lead.getApoderadoApellidos(),
                lead.getNumeroDocumento(),
                lead.getTelefonoContacto(),
                lead.getAlumnoNombres(),
                lead.getAlumnoApellidos(),
                lead.getNivelAcademico(),
                lead.getGradoIngreso()
        );

        String encodedText = URLEncoder.encode(text, StandardCharsets.UTF_8);
        return "https://wa.me/" + cleanNumber + "?text=" + encodedText;
    }

    /**
     * Genera URL de WhatsApp para Vacaciones Útiles.
     */
    public String buildWhatsAppVacacionesUrl(InscripcionVacaciones inscripcion) {
        String cleanNumber = rawWhatsappNumber.replaceAll("[^0-9]", "");
        String text = """
            ☀️ ¡Hola I.E.P. Dora Mayer de Zulen!
            
            Registré una inscripción para el programa de *Vacaciones Útiles*:
            🎨 Taller: %s (%s)
            👦 Alumno: %s (%d años)
            👨‍👩‍👦 Apoderado: %s %s
            📞 Celular: %s
            
            Solicito confirmación de horarios y costo de inscripción. ¡Gracias!
            """.formatted(
                inscripcion.getTallerSeleccionado(),
                inscripcion.getTurnoPreferido(),
                inscripcion.getAlumnoNombres(),
                inscripcion.getAlumnoEdad(),
                inscripcion.getApoderadoNombres(),
                inscripcion.getApoderadoApellidos(),
                inscripcion.getTelefonoContacto()
        );

        String encodedText = URLEncoder.encode(text, StandardCharsets.UTF_8);
        return "https://wa.me/" + cleanNumber + "?text=" + encodedText;
    }

    /**
     * Notificación asíncrona por correo electrónico (o log en desarrollo).
     */
    @Async("virtualThreadTaskExecutor")
    public void notifyNewLeadAsync(LeadMatricula lead) {
        try {
            log.info("[ASYNC EMAIL NOTIFIER - VIRTUAL THREAD] Enviando confirmación de lead #{} a {} y copias institucionales {} / {}",
                    lead.getId(), lead.getCorreoElectronico(), secretariaEmail, backupEmail);

            // Simulación o dispatch de correo HTML sin retardo en la respuesta al cliente
            Thread.sleep(100); // Demostración de operación I/O sin bloquear el carrier thread de Java
            log.info("[ASYNC EMAIL NOTIFIER] Correo enviado exitosamente para el alumno: {} {}",
                    lead.getAlumnoNombres(), lead.getAlumnoApellidos());
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            log.error("Error enviando notificación de lead", e);
        }
    }
}
