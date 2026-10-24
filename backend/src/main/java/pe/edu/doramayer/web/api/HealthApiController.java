package pe.edu.doramayer.web.api;

import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Map;

@RestController
public class HealthApiController {

    private final JdbcTemplate jdbcTemplate;

    public HealthApiController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping({"/health", "/api/health"})
    public ResponseEntity<Map<String, Object>> healthCheck() {
        boolean dbOk = false;
        try {
            Integer result = jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            dbOk = (result != null && result == 1);
        } catch (Exception ignored) {}

        Map<String, Object> status = Map.of(
                "status", dbOk ? "UP" : "DEGRADED",
                "database", dbOk ? "CONNECTED" : "DISCONNECTED",
                "service", "dora-mayer-portal-backend",
                "institution", "I.E.P. Dora Mayer de Zulen",
                "timestamp", Instant.now().toString()
        );

        return dbOk ? ResponseEntity.ok(status) : ResponseEntity.status(503).body(status);
    }
}
