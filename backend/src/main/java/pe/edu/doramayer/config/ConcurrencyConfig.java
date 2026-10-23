package pe.edu.doramayer.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.task.support.TaskExecutorAdapter;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

/**
 * Configuración de Concurrencia con Java 21 Virtual Threads (Project Loom).
 * Asigna un Virtual Thread ligero por cada tarea asíncrona (@Async),
 * optimizando el envío de notificaciones y emails sin bloquear hilos del sistema operativo.
 */
@Configuration
public class ConcurrencyConfig {

    @Bean(name = "virtualThreadTaskExecutor")
    public Executor virtualThreadTaskExecutor() {
        return new TaskExecutorAdapter(Executors.newVirtualThreadPerTaskExecutor());
    }
}
