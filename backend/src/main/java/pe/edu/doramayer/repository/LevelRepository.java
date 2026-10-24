package pe.edu.doramayer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.doramayer.domain.Level;

import java.util.List;
import java.util.Optional;

@Repository
public interface LevelRepository extends JpaRepository<Level, Long> {
    List<Level> findAllByOrderByOrdenAsc();
    Optional<Level> findBySlug(String slug);
}
