package pe.edu.doramayer;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("dev")
class DoraMayerPortalApplicationTests {

    @Test
    void contextLoads() {
        // Valida que el contexto de Spring Boot levante correctamente con Virtual Threads y Caffeine Cache
    }
}
