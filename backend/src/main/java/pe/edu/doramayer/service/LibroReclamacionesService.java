package pe.edu.doramayer.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.doramayer.domain.LibroReclamaciones;
import pe.edu.doramayer.dto.ApiResponse;
import pe.edu.doramayer.dto.LibroReclamacionesRequest;
import pe.edu.doramayer.repository.LibroReclamacionesRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class LibroReclamacionesService {

    private final LibroReclamacionesRepository repository;

    public LibroReclamacionesService(LibroReclamacionesRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public ApiResponse<LibroReclamaciones> registrarReclamacion(LibroReclamacionesRequest req, String clientIp) {
        if (req.isBot()) {
            return ApiResponse.error("Solicitud no procesada.");
        }

        int currentYear = LocalDate.now().getYear();
        Integer lastCorrelative = repository.findMaxCorrelativoByAnio(currentYear);
        int nextCorrelative = (lastCorrelative != null ? lastCorrelative : 0) + 1;

        String formattedCode = String.format("DMS-LR-%d-%04d", currentYear, nextCorrelative);

        LibroReclamaciones lr = new LibroReclamaciones();
        lr.setCodigoReclamacion(formattedCode);
        lr.setAnio(currentYear);
        lr.setCorrelativo(nextCorrelative);

        lr.setReclamanteTipoDoc(req.reclamanteTipoDoc());
        lr.setReclamanteNumeroDoc(req.reclamanteNumeroDoc().trim());
        lr.setReclamanteNombres(req.reclamanteNombres().trim());
        lr.setReclamanteApellidos(req.reclamanteApellidos().trim());
        lr.setReclamanteDomicilio(req.reclamanteDomicilio().trim());
        lr.setReclamanteTelefono(req.reclamanteTelefono().trim());
        lr.setReclamanteCorreo(req.reclamanteCorreo().trim().toLowerCase());
        lr.setEsMenorEdad(req.esMenorEdad() != null ? req.esMenorEdad() : false);
        lr.setNombreAlumnoAfectado(req.nombreAlumnoAfectado());

        lr.setTipoBienServicio(req.tipoBienServicio());
        lr.setMontoReclamado(req.montoReclamado());
        lr.setDescripcionBienServicio(req.descripcionBienServicio().trim());

        lr.setTipoAccion(req.tipoAccion());
        lr.setDetalleReclamacion(req.detalleReclamacion().trim());
        lr.setPedidoConsumidor(req.pedidoConsumidor().trim());

        lr.setFechaRegistro(LocalDateTime.now());
        // Plazo perentorio de 15 días hábiles según directiva de Indecopi (aproximado a 21 días calendario)
        lr.setFechaLimiteRespuesta(LocalDate.now().plusDays(21));
        lr.setEstadoRespuesta("PENDIENTE");
        lr.setIpAddress(clientIp);

        LibroReclamaciones saved = repository.save(lr);

        return ApiResponse.ok(
                "Su " + req.tipoAccion() + " ha sido registrado formalmente bajo el código " + formattedCode +
                ". Conforme a ley (Indecopi), recibirá respuesta en un plazo no mayor a 15 días hábiles al correo indicado.",
                saved
        );
    }
}
