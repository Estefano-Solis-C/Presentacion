package pe.edu.doramayer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.doramayer.domain.InscripcionVacaciones;

@Repository
public interface InscripcionVacacionesRepository extends JpaRepository<InscripcionVacaciones, Long> {
}
