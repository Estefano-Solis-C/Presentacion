package pe.edu.doramayer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.doramayer.domain.MensajeContacto;

@Repository
public interface MensajeContactoRepository extends JpaRepository<MensajeContacto, Long> {
}
