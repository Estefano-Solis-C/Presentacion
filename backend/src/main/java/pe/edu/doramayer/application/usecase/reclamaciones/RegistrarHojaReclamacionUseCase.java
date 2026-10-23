package pe.edu.doramayer.application.usecase.reclamaciones;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.doramayer.application.dto.ApiResponseDto;
import pe.edu.doramayer.application.dto.RegistrarReclamacionCommand;
import pe.edu.doramayer.domain.model.matricula.DocumentoIdentidad;
import pe.edu.doramayer.domain.model.matricula.TelefonoCelular;
import pe.edu.doramayer.domain.model.reclamaciones.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class RegistrarHojaReclamacionUseCase {

    private final LibroReclamacionesRepositoryPort repositoryPort;

    public RegistrarHojaReclamacionUseCase(LibroReclamacionesRepositoryPort repositoryPort) {
        this.repositoryPort = repositoryPort;
    }

    @Transactional
    public ApiResponseDto<LibroReclamaciones> execute(RegistrarReclamacionCommand cmd, String clientIp) {
        if (cmd.isBot()) {
            return ApiResponseDto.error("Petición rechazada.");
        }

        int currentYear = LocalDate.now().getYear();
        int lastCorrelative = repositoryPort.findMaxCorrelativoByAnio(currentYear);
        int nextCorrelative = lastCorrelative + 1;

        CodigoReclamacion codigo = new CodigoReclamacion(currentYear, nextCorrelative);
        DocumentoIdentidad doc = new DocumentoIdentidad(cmd.reclamanteTipoDoc(), cmd.reclamanteNumeroDoc());
        TelefonoCelular cel = new TelefonoCelular(cmd.reclamanteTelefono());
        TipoAccion tipoAccion = TipoAccion.valueOf(cmd.tipoAccion());

        LibroReclamaciones lr = new LibroReclamaciones(
                null,
                codigo,
                doc,
                cmd.reclamanteNombres(),
                cmd.reclamanteApellidos(),
                cmd.reclamanteDomicilio(),
                cel,
                cmd.reclamanteCorreo(),
                cmd.esMenorEdad() != null && cmd.esMenorEdad(),
                cmd.nombreAlumnoAfectado(),
                cmd.tipoBienServicio() != null ? cmd.tipoBienServicio() : "SERVICIO",
                cmd.montoReclamado(),
                cmd.descripcionBienServicio(),
                tipoAccion,
                cmd.detalleReclamacion(),
                cmd.pedidoConsumidor(),
                LocalDateTime.now(),
                LocalDate.now().plusDays(21), // 15 días hábiles perentorios Indecopi
                "PENDIENTE",
                clientIp
        );

        LibroReclamaciones saved = repositoryPort.save(lr);

        return ApiResponseDto.ok(
                "Su " + cmd.tipoAccion() + " ha sido registrado formalmente bajo el código " + codigo.getCodigo() +
                ". Conforme a ley (Indecopi), recibirá respuesta formal en un plazo no mayor a 15 días hábiles.",
                saved
        );
    }
}
