package pe.edu.doramayer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.edu.doramayer.domain.Event;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findTop5ByPublicadoTrueOrderByFechaDesc();
    List<Event> findTop5ByPublicadoTrueAndTipoIgnoreCaseOrderByFechaDesc(String tipo);

    List<Event> findByPublicadoTrueOrderByFechaDesc();
    List<Event> findByPublicadoTrueAndTipoIgnoreCaseOrderByFechaDesc(String tipo);

    List<Event> findByAnioAndPublicadoTrueOrderByFechaDesc(Integer anio);
    List<Event> findByAnioAndTipoIgnoreCaseAndPublicadoTrueOrderByFechaDesc(Integer anio, String tipo);

    Optional<Event> findFirstByPublicadoTrueAndTipoIgnoreCaseOrderByFechaDesc(String tipo);
    Optional<Event> findFirstByPublicadoTrueOrderByFechaDesc();

    @Query("SELECT DISTINCT e.anio FROM Event e WHERE e.publicado = true ORDER BY e.anio DESC")
    List<Integer> findDistinctYears();
}
