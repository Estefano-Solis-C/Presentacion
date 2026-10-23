package pe.edu.doramayer.infrastructure.persistence.adapter;

import org.springframework.stereotype.Component;
import pe.edu.doramayer.domain.model.matricula.*;
import pe.edu.doramayer.repository.LeadMatriculaRepository;

import java.util.List;
import java.util.Optional;

/**
 * Adaptador de Infraestructura: Implementa el puerto de dominio LeadMatriculaRepositoryPort
 * conectando el Modelo de Dominio Puro con Spring Data JPA y TiDB Serverless.
 */
@Component
public class LeadMatriculaRepositoryAdapter implements LeadMatriculaRepositoryPort {

    private final LeadMatriculaRepository jpaRepository;

    public LeadMatriculaRepositoryAdapter(LeadMatriculaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public LeadMatricula save(LeadMatricula domain) {
        pe.edu.doramayer.domain.LeadMatricula entity = toJpaEntity(domain);
        pe.edu.doramayer.domain.LeadMatricula savedEntity = jpaRepository.save(entity);
        return toDomain(savedEntity);
    }

    @Override
    public Optional<LeadMatricula> findById(Long id) {
        return jpaRepository.findById(id).map(this::toDomain);
    }

    @Override
    public List<LeadMatricula> findByDocumento(DocumentoIdentidad documento) {
        return jpaRepository.findByNumeroDocumentoOrderByCreatedAtDesc(documento.getNumero())
                .stream()
                .map(this::toDomain)
                .toList();
    }

    @Override
    public long countByTipoProceso(TipoProceso tipoProceso) {
        return jpaRepository.countByTipoProceso(tipoProceso.name());
    }

    private pe.edu.doramayer.domain.LeadMatricula toJpaEntity(LeadMatricula domain) {
        pe.edu.doramayer.domain.LeadMatricula entity = new pe.edu.doramayer.domain.LeadMatricula();
        if (domain.getId() != null) entity.setId(domain.getId());
        entity.setTipoProceso(domain.getTipoProceso().name());
        entity.setApoderadoNombres(domain.getApoderadoNombres());
        entity.setApoderadoApellidos(domain.getApoderadoApellidos());
        entity.setTipoDocumento(domain.getDocumento().getTipo());
        entity.setNumeroDocumento(domain.getDocumento().getNumero());
        entity.setTelefonoContacto(domain.getTelefono().getNumero());
        entity.setCorreoElectronico(domain.getCorreoElectronico());
        entity.setAlumnoNombres(domain.getAlumnoNombres());
        entity.setAlumnoApellidos(domain.getAlumnoApellidos());
        entity.setNivelAcademico(domain.getNivelAcademico().name());
        entity.setGradoIngreso(domain.getGradoIngreso());
        entity.setColegioProcedencia(domain.getColegioProcedencia());
        entity.setComentarios(domain.getComentarios());
        entity.setCanalContactoPreferido(domain.getCanalContactoPreferido());
        entity.setAceptaTerminos(domain.isAceptaTerminos());
        entity.setAceptaPoliticaDatos(domain.isAceptaPoliticaDatos());
        entity.setConsentTimestamp(domain.getConsentTimestamp());
        entity.setIpAddress(domain.getIpAddress());
        entity.setUserAgent(domain.getUserAgent());
        entity.setEstado(domain.getEstado());
        entity.setCreatedAt(domain.getCreatedAt());
        return entity;
    }

    private LeadMatricula toDomain(pe.edu.doramayer.domain.LeadMatricula entity) {
        DocumentoIdentidad doc = new DocumentoIdentidad(entity.getTipoDocumento(), entity.getNumeroDocumento());
        TelefonoCelular cel = new TelefonoCelular(entity.getTelefonoContacto());
        TipoProceso tipo = TipoProceso.valueOf(entity.getTipoProceso());
        NivelAcademico nivel = NivelAcademico.valueOf(entity.getNivelAcademico());

        return new LeadMatricula(
                entity.getId(),
                tipo,
                entity.getApoderadoNombres(),
                entity.getApoderadoApellidos(),
                doc,
                cel,
                entity.getCorreoElectronico(),
                entity.getAlumnoNombres(),
                entity.getAlumnoApellidos(),
                nivel,
                entity.getGradoIngreso(),
                entity.getColegioProcedencia(),
                entity.getComentarios(),
                entity.getCanalContactoPreferido(),
                entity.getAceptaTerminos(),
                entity.getAceptaPoliticaDatos(),
                entity.getConsentTimestamp(),
                entity.getIpAddress(),
                entity.getUserAgent(),
                entity.getEstado(),
                entity.getCreatedAt()
        );
    }
}
