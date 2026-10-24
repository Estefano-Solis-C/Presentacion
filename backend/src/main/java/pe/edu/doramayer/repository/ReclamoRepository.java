package pe.edu.doramayer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.doramayer.domain.Reclamo;

import java.util.Optional;

@Repository
public interface ReclamoRepository extends JpaRepository<Reclamo, Long> {
    Optional<Reclamo> findByCodigoReclamacion(String codigoReclamacion);

    @Query("SELECT COUNT(r) FROM Reclamo r WHERE r.codigoReclamacion LIKE :prefix%")
    long countByPrefix(@Param("prefix") String prefix);
}
