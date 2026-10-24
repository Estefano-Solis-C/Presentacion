package pe.edu.doramayer.web.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.doramayer.domain.Testimonial;
import pe.edu.doramayer.dto.ApiResponse;
import pe.edu.doramayer.repository.TestimonialRepository;

import java.util.List;

@RestController
@RequestMapping("/api/testimonials")
public class TestimonialApiController {

    private final TestimonialRepository testimonialRepository;

    public TestimonialApiController(TestimonialRepository testimonialRepository) {
        this.testimonialRepository = testimonialRepository;
    }

    @GetMapping("/random")
    public ResponseEntity<ApiResponse<List<Testimonial>>> getRandomTestimonials(
            @RequestParam(defaultValue = "3") int limit) {

        int safeLimit = Math.max(1, Math.min(limit, 20));
        List<Testimonial> testimonials = testimonialRepository.findRandomActive(safeLimit);
        return ResponseEntity.ok(ApiResponse.ok("Testimonios aleatorios obtenidos", testimonials));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Testimonial>>> getAllActiveTestimonials() {
        List<Testimonial> testimonials = testimonialRepository.findByActivoTrue();
        return ResponseEntity.ok(ApiResponse.ok("Todos los testimonios obtenidos", testimonials));
    }
}
