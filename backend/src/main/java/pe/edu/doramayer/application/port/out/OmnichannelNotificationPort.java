package pe.edu.doramayer.application.port.out;

import pe.edu.doramayer.domain.model.matricula.LeadMatricula;

/**
 * Puerto de Salida: Notificaciones Omnicanal (WhatsApp y Correo Electrónico).
 */
public interface OmnichannelNotificationPort {
    String generateWhatsAppEnrollmentUrl(LeadMatricula lead);
    void sendLeadConfirmationEmailAsync(LeadMatricula lead);
}
