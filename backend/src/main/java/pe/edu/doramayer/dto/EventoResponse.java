package pe.edu.doramayer.dto;

import java.time.LocalDate;

public record EventoResponse(
        Long id,
        String titulo,
        String slug,
        String categoria,
        String resumen,
        String contenido,
        String imagenUrl,
        LocalDate fechaEvento,
        Boolean isPinned
) {}
