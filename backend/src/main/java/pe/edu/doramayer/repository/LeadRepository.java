package pe.edu.doramayer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.doramayer.domain.Lead;

@Repository
public interface LeadRepository extends JpaRepository<Lead, Long> {
}
