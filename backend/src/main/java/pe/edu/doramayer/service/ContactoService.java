package pe.edu.doramayer.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.doramayer.domain.MensajeContacto;
import pe.edu.doramayer.dto.ApiResponse;
import pe.edu.doramayer.dto.MensajeContactoRequest;
import pe.edu.doramayer.repository.MensajeContactoRepository;

@Service
public class ContactoService {

    private final MensajeContactoRepository repository;

    public ContactoService(MensajeContactoRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public ApiResponse<MensajeContacto> registrarMensaje(MensajeContactoRequest req, String clientIp) {
        if (req.isBot()) {
            return ApiResponse.error("Solicitud no procesada.");
        }

        MensajeContacto msg = new MensajeContacto();
        msg.setNombreCompleto(req.nombreCompleto().trim());
        msg.setCorreoElectronico(req.correoElectronico().trim().toLowerCase());
        msg.setTelefono(req.telefono().trim());
        msg.setAsunto(req.asunto().trim());
        msg.setMensaje(req.mensaje().trim());
        msg.setIpAddress(clientIp);

        MensajeContacto saved = repository.save(msg);
        return ApiResponse.ok("Gracias por comunicarse con I.E.P. Dora Mayer de Zulen. Responderemos a la brevedad.", saved);
    }
}
