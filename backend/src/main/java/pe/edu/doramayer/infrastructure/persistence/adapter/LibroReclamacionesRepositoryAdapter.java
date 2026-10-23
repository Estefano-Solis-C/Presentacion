package pe.edu.doramayer.infrastructure.persistence.adapter;

import org.springframework.stereotype.Component;
import pe.edu.doramayer.domain.model.matricula.DocumentoIdentidad;
import pe.edu.doramayer.domain.model.matricula.TelefonoCelular;
import pe.edu.doramayer.domain.model.reclamaciones.*;
import pe.edu.doramayer.repository.LibroReclamacionesRepository;

import java.util.Optional;

@Component
public class LibroReclamacionesRepositoryAdapter implements LibroReclamacionesRepositoryPort {

    private final LibroReclamacionesRepository jpaRepository;

    public LibroReclamacionesRepositoryAdapter(LibroReclamacionesRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public LibroReclamaciones save(LibroReclamaciones domain) {
        pe.edu.doramayer.domain.LibroReclamaciones entity = new pe.edu.doramayer.domain.LibroReclamaciones();
        if (domain.getId() != null) entity.setId(domain.getId());
        entity.setCodigoReclamacion(domain.getCodigo().getCodigo());
        entity.setAnio(domain.getCodigo().getAnio());
        entity.setCorrelativo(domain.getCodigo().getCorrelativo());
        entity.setReclamanteTipoDoc(domain.getReclamanteDoc().getTipo());
        entity.setReclamanteNumeroDoc(domain.getReclamanteDoc().getNumero());
        entity.setReclamanteNombres(domain.getReclamanteNombres());
        entity.setReclamanteApellidos(domain.getReclamanteApellidos());
        entity.setReclamanteDomicilio(domain.getReclamanteDomicilio());
        entity.setReclamanteTelefono(domain.getReclamanteTelefono().getNumero());
        entity.setReclamanteCorreo(domain.getReclamanteCorreo());
        entity.setEsMenorEdad(domain.isEsMenorEdad());
        entity.setNombreAlumnoAfectado(domain.getNombreAlumnoAfectado());
        entity.setTipoBienServicio(domain.getTipoBienServicio());
        entity.setMontoReclamado(domain.getMontoReclamado());
        entity.setDescripcionBienServicio(domain.getDescripcionBienServicio());
        entity.setTipoAccion(domain.getTipoAccion().name());
        entity.setDetalleReclamacion(domain.getDetalleReclamacion());
        entity.setPedidoConsumidor(domain.getPedidoConsumidor());
        entity.setFechaRegistro(domain.getFechaRegistro());
        entity.setFechaLimiteRespuesta(domain.getFechaLimiteRespuesta());
        entity.setEstadoRespuesta(domain.getEstadoRespuesta());
        entity.setIpAddress(domain.getIpAddress());

        pe.edu.doramayer.domain.LibroReclamaciones saved = jpaRepository.save(entity);
        return toDomain(saved);
    }

    @Override
    public Optional<LibroReclamaciones> findByCodigo(CodigoReclamacion codigo) {
        return jpaRepository.findByCodigoReclamacion(codigo.getCodigo()).map(this::toDomain);
    }

    @Override
    public int findMaxCorrelativoByAnio(int anio) {
        Integer max = jpaRepository.findMaxCorrelativoByAnio(anio);
        return max != null ? max : 0;
    }

    private LibroReclamaciones toDomain(pe.edu.doramayer.domain.LibroReclamaciones entity) {
        CodigoReclamacion cod = new CodigoReclamacion(entity.getCodigoReclamacion());
        DocumentoIdentidad doc = new DocumentoIdentidad(entity.getReclamanteTipoDoc(), entity.getReclamanteNumeroDoc());
        TelefonoCelular cel = new TelefonoCelular(entity.getReclamanteTelefono());
        TipoAccion accion = TipoAccion.valueOf(entity.getTipoAccion());

        return new LibroReclamaciones(
                entity.getId(),
                cod,
                doc,
                entity.getReclamanteNombres(),
                entity.getReclamanteApellidos(),
                entity.getReclamanteDomicilio(),
                cel,
                entity.getReclamanteCorreo(),
                entity.getEsMenorEdad(),
                entity.getNombreAlumnoAfectado(),
                entity.getTipoBienServicio(),
                entity.getMontoReclamado(),
                entity.getDescripcionBienServicio(),
                accion,
                entity.getDetalleReclamacion(),
                entity.getPedidoConsumidor(),
                entity.getFechaRegistro(),
                entity.getFechaLimiteRespuesta(),
                entity.getEstadoRespuesta(),
                entity.getIpAddress()
        );
    }
}
