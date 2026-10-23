package pe.edu.doramayer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableAsync;

/**
 * Aplicación Principal del Portal Web y Sistema de Admisión
 * I.E.P. "Dora Mayer de Zulen" (Rímac, Lima, Perú)
 * 
 * Diseñado para 2,000 usuarios concurrentes simultáneos con:
 * - Java 21 Virtual Threads (Project Loom)
 * - In-Memory Caffeine Cache (<1ms respuesta en lectura)
 * - Pool HikariCP ultraligero optimizado para TiDB Serverless
 */
@SpringBootApplication
@EnableCaching
@EnableAsync
public class DoraMayerPortalApplication {

    public static void main(String[] args) {
        SpringApplication.run(DoraMayerPortalApplication.class, args);
    }
}
