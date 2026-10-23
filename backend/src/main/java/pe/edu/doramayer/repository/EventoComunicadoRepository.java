package pe.edu.doramayer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.doramayer.domain.EventoComunicado;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventoComunicadoRepository extends JpaRepository<EventoComunicado, Long> {
    List<EventoComunicado> findByIsPublicTrueOrderByIsPinnedDescCreatedAtDesc();
    List<EventoComunicado> findByIsPublicTrueAndCategoriaOrderByCreatedAtDesc(String categoria);
    Optional<EventoComunicado> findBySlugAndIsPublicTrue(String slug);
}
