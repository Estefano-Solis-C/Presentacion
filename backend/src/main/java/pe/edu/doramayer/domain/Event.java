package pe.edu.doramayer.domain;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 220)
    private String titulo;

    @Column(nullable = false, length = 20)
    private String tipo; // COMUNICADO, EVENTO

    @Column(nullable = false)
    private LocalDate fecha;

    @Column(nullable = false, length = 400)
    private String resumen;

    @Column(nullable = false, columnDefinition = "LONGTEXT")
    private String contenido;

    @Column(name = "imagen_url", length = 350)
    private String imagenUrl;

    @Column(nullable = false)
    private Boolean destacado = false;

    @Column(nullable = false)
    private Boolean publicado = true;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "facebook_post_id", length = 100)
    private String facebookPostId;

    @Column(name = "facebook_permalink", length = 350)
    private String facebookPermalink;

    @Column(name = "anio", nullable = false)
    private Integer anio = 2026;

    public Event() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public LocalDate getFecha() { return fecha; }
    public void setFecha(LocalDate fecha) { this.fecha = fecha; }

    public String getResumen() { return resumen; }
    public void setResumen(String resumen) { this.resumen = resumen; }

    public String getContenido() { return contenido; }
    public void setContenido(String contenido) { this.contenido = contenido; }

    public String getImagenUrl() { return imagenUrl; }
    public void setImagenUrl(String imagenUrl) { this.imagenUrl = imagenUrl; }

    public Boolean getDestacado() { return destacado; }
    public void setDestacado(Boolean destacado) { this.destacado = destacado; }

    public Boolean getPublicado() { return publicado; }
    public void setPublicado(Boolean publicado) { this.publicado = publicado; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public String getFacebookPostId() { return facebookPostId; }
    public void setFacebookPostId(String facebookPostId) { this.facebookPostId = facebookPostId; }

    public String getFacebookPermalink() { return facebookPermalink; }
    public void setFacebookPermalink(String facebookPermalink) { this.facebookPermalink = facebookPermalink; }

    public Integer getAnio() { return anio; }
    public void setAnio(Integer anio) { this.anio = anio; }
}
