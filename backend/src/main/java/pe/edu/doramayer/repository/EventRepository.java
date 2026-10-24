package pe.edu.doramayer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.doramayer.domain.Event;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findTop5ByPublicadoTrueOrderByFechaDesc();
    List<Event> findTop5ByPublicadoTrueAndTipoIgnoreCaseOrderByFechaDesc(String tipo);
}
