package pe.edu.doramayer.domain.model.matricula;

import java.util.List;
import java.util.Optional;

/**
 * Puerto de Dominio: Repositorio para LeadMatricula (Inversión de Dependencias DDD).
 */
public interface LeadMatriculaRepositoryPort {
    LeadMatricula save(LeadMatricula lead);
    Optional<LeadMatricula> findById(Long id);
    List<LeadMatricula> findByDocumento(DocumentoIdentidad documento);
    long countByTipoProceso(TipoProceso tipoProceso);
}
