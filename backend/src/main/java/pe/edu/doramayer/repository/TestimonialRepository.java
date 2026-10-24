package pe.edu.doramayer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.doramayer.domain.Testimonial;

import java.util.List;

@Repository
public interface TestimonialRepository extends JpaRepository<Testimonial, Long> {

    @Query(value = "SELECT * FROM testimonials WHERE activo = true ORDER BY RAND() LIMIT :limit", nativeQuery = true)
    List<Testimonial> findRandomActive(@Param("limit") int limit);

    List<Testimonial> findByActivoTrue();
}
