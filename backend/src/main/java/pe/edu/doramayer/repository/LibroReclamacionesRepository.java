package pe.edu.doramayer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.edu.doramayer.domain.LibroReclamaciones;

import java.util.Optional;

@Repository
public interface LibroReclamacionesRepository extends JpaRepository<LibroReclamaciones, Long> {
    Optional<LibroReclamaciones> findByCodigoReclamacion(String codigoReclamacion);

    @Query("SELECT COALESCE(MAX(l.correlativo), 0) FROM LibroReclamaciones l WHERE l.anio = :anio")
    Integer findMaxCorrelativoByAnio(int anio);
}
