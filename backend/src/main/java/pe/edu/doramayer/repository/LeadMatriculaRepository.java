package pe.edu.doramayer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.doramayer.domain.LeadMatricula;

import java.util.List;

@Repository
public interface LeadMatriculaRepository extends JpaRepository<LeadMatricula, Long> {
    List<LeadMatricula> findByNumeroDocumentoOrderByCreatedAtDesc(String numeroDocumento);
    long countByTipoProceso(String tipoProceso);
}
