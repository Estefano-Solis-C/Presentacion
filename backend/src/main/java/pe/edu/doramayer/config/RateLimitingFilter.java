package pe.edu.doramayer.config;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Filtro de Protección de Concurrencia y Anti-Spam por IP (Token Bucket).
 * Limita el envío de formularios de admisión y contacto a un máximo de 5 peticiones por minuto por IP.
 */
@Component
@Order(1)
public class RateLimitingFilter implements Filter {

    private final Map<String, Bucket> ipBuckets = new ConcurrentHashMap<>();

    @Value("${app.security.rate-limit.capacity:5}")
    private long capacity;

    @Value("${app.security.rate-limit.refill-tokens:5}")
    private long refillTokens;

    @Value("${app.security.rate-limit.refill-duration-seconds:60}")
    private long refillDurationSeconds;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        // Solo limitar peticiones POST (envío de formularios)
        if ("POST".equalsIgnoreCase(httpRequest.getMethod())) {
            String clientIp = extractClientIp(httpRequest);
            Bucket bucket = ipBuckets.computeIfAbsent(clientIp, this::createNewBucket);

            if (!bucket.tryConsume(1)) {
                httpResponse.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
                httpResponse.setContentType("application/json");
                httpResponse.setCharacterEncoding("UTF-8");
                httpResponse.getWriter().write("""
                    {
                      "type": "https://doramayerdezulen.edu.pe/errors/rate-limit-exceeded",
                      "title": "Demasiadas Solicitudes",
                      "status": 429,
                      "detail": "Ha superado el límite de envíos de formulario por minuto. Por favor espere unos momentos antes de reintentar.",
                      "timestamp": "%s"
                    }
                    """.formatted(java.time.Instant.now()));
                return;
            }
        }

        chain.doFilter(request, response);
    }

    private Bucket createNewBucket(String key) {
        Refill refill = Refill.intervally(refillTokens, Duration.ofSeconds(refillDurationSeconds));
        Bandwidth limit = Bandwidth.classic(capacity, refill);
        return Bucket.builder().addLimit(limit).build();
    }

    private String extractClientIp(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null || xfHeader.isEmpty() || "unknown".equalsIgnoreCase(xfHeader)) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0].trim();
    }
}
