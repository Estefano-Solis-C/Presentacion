package pe.edu.doramayer.web.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.doramayer.domain.Level;
import pe.edu.doramayer.dto.ApiResponse;
import pe.edu.doramayer.repository.LevelRepository;

import java.util.List;

@RestController
@RequestMapping("/api/levels")
public class LevelApiController {

    private final LevelRepository levelRepository;

    public LevelApiController(LevelRepository levelRepository) {
        this.levelRepository = levelRepository;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Level>>> getAllLevels() {
        List<Level> levels = levelRepository.findAllByOrderByOrdenAsc();
        return ResponseEntity.ok(ApiResponse.ok("Niveles educativos obtenidos", levels));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<Level>> getLevelBySlug(@PathVariable String slug) {
        return levelRepository.findBySlug(slug.toLowerCase())
                .map(lvl -> ResponseEntity.ok(ApiResponse.ok("Nivel encontrado", lvl)))
                .orElse(ResponseEntity.notFound().build());
    }
}
