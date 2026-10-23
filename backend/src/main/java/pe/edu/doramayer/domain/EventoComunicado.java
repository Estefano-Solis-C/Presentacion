package pe.edu.doramayer.domain;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "eventos_comunicados")
public class EventoComunicado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 220)
    private String titulo;

    @Column(nullable = false, unique = true, length = 250)
    private String slug;

    @Column(nullable = false, length = 30)
    private String categoria; // NOTICIA, EVENTO, COMUNICADO, VACACIONES

    @Column(nullable = false, length = 400)
    private String resumen;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String contenido;

    @Column(name = "imagen_url", length = 350)
    private String imagenUrl;

    @Column(name = "fecha_evento")
    private LocalDate fechaEvento;

    @Column(name = "is_pinned", nullable = false)
    private Boolean isPinned = false;

    @Column(name = "is_public", nullable = false)
    private Boolean isPublic = true;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public EventoComunicado() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }

    public String getResumen() { return resumen; }
    public void setResumen(String resumen) { this.resumen = resumen; }

    public String getContenido() { return contenido; }
    public void setContenido(String contenido) { this.contenido = contenido; }

    public String getImagenUrl() { return imagenUrl; }
    public void setImagenUrl(String imagenUrl) { this.imagenUrl = imagenUrl; }

    public LocalDate getFechaEvento() { return fechaEvento; }
    public void setFechaEvento(LocalDate fechaEvento) { this.fechaEvento = fechaEvento; }

    public Boolean getIsPinned() { return isPinned; }
    public void setIsPinned(Boolean pinned) { isPinned = pinned; }

    public Boolean getIsPublic() { return isPublic; }
    public void setIsPublic(Boolean aPublic) { isPublic = aPublic; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
