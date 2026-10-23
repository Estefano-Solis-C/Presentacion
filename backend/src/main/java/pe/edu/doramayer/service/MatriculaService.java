package pe.edu.doramayer.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.doramayer.domain.InscripcionVacaciones;
import pe.edu.doramayer.domain.LeadMatricula;
import pe.edu.doramayer.dto.ApiResponse;
import pe.edu.doramayer.dto.InscripcionVacacionesRequest;
import pe.edu.doramayer.dto.LeadMatriculaRequest;
import pe.edu.doramayer.repository.InscripcionVacacionesRepository;
import pe.edu.doramayer.repository.LeadMatriculaRepository;

import java.time.LocalDateTime;

@Service
public class MatriculaService {

    private final LeadMatriculaRepository leadRepository;
    private final InscripcionVacacionesRepository vacacionesRepository;
    private final OmnichannelNotificationService notificationService;

    public MatriculaService(LeadMatriculaRepository leadRepository,
                            InscripcionVacacionesRepository vacacionesRepository,
                            OmnichannelNotificationService notificationService) {
        this.leadRepository = leadRepository;
        this.vacacionesRepository = vacacionesRepository;
        this.notificationService = notificationService;
    }

    @Transactional
    public ApiResponse<LeadMatricula> registrarLead(LeadMatriculaRequest req, String clientIp, String userAgent) {
        if (req.isBot()) {
            return ApiResponse.error("Solicitud no procesada.");
        }

        LeadMatricula lead = new LeadMatricula();
        lead.setTipoProceso(req.tipoProceso());
        lead.setApoderadoNombres(req.apoderadoNombres().trim());
        lead.setApoderadoApellidos(req.apoderadoApellidos().trim());
        lead.setTipoDocumento(req.tipoDocumento());
        lead.setNumeroDocumento(req.numeroDocumento().trim());
        lead.setTelefonoContacto(req.telefonoContacto().trim());
        lead.setCorreoElectronico(req.correoElectronico().trim().toLowerCase());
        lead.setAlumnoNombres(req.alumnoNombres().trim());
        lead.setAlumnoApellidos(req.alumnoApellidos().trim());
        lead.setNivelAcademico(req.nivelAcademico());
        lead.setGradoIngreso(req.gradoIngreso());
        lead.setColegioProcedencia(req.colegioProcedencia() != null ? req.colegioProcedencia().trim() : null);
        lead.setComentarios(req.comentarios() != null ? req.comentarios().trim() : null);
        lead.setCanalContactoPreferido(req.canalContactoPreferido() != null ? req.canalContactoPreferido() : "WHATSAPP");

        lead.setAceptaTerminos(req.aceptaTerminos());
        lead.setAceptaPoliticaDatos(req.aceptaPoliticaDatos());
        lead.setConsentTimestamp(LocalDateTime.now());
        lead.setIpAddress(clientIp);
        lead.setUserAgent(userAgent);
        lead.setEstado("PENDIENTE");

        LeadMatricula saved = leadRepository.save(lead);

        // Despachar notificaciones asíncronas
        notificationService.notifyNewLeadAsync(saved);

        // Generar enlace estructurado de WhatsApp
        String whatsappUrl = notificationService.buildWhatsAppEnrollmentUrl(saved);

        return ApiResponse.okWithWhatsApp(
                "¡Solicitud de matrícula registrada con éxito! En breve secretaría se comunicará con usted.",
                saved,
                whatsappUrl
        );
    }

    @Transactional
    public ApiResponse<InscripcionVacaciones> registrarVacaciones(InscripcionVacacionesRequest req, String clientIp) {
        if (req.isBot()) {
            return ApiResponse.error("Solicitud no procesada.");
        }

        InscripcionVacaciones insc = new InscripcionVacaciones();
        insc.setApoderadoNombres(req.apoderadoNombres().trim());
        insc.setApoderadoApellidos(req.apoderadoApellidos().trim());
        insc.setNumeroDocumento(req.numeroDocumento().trim());
        insc.setTelefonoContacto(req.telefonoContacto().trim());
        insc.setCorreoElectronico(req.correoElectronico().trim().toLowerCase());
        insc.setAlumnoNombres(req.alumnoNombres().trim());
        insc.setAlumnoEdad(req.alumnoEdad());
        insc.setTallerSeleccionado(req.tallerSeleccionado());
        insc.setTurnoPreferido(req.turnoPreferido());
        insc.setAceptaTerminos(req.aceptaTerminos());
        insc.setAceptaPoliticaDatos(req.aceptaPoliticaDatos());
        insc.setConsentTimestamp(LocalDateTime.now());
        insc.setIpAddress(clientIp);

        InscripcionVacaciones saved = vacacionesRepository.save(insc);
        String whatsappUrl = notificationService.buildWhatsAppVacacionesUrl(saved);

        return ApiResponse.okWithWhatsApp(
                "¡Inscripción a Vacaciones Útiles registrada correctamente!",
                saved,
                whatsappUrl
        );
    }
}
