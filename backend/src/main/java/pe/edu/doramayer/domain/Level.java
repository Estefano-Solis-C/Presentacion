package pe.edu.doramayer.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "levels")
public class Level {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 30)
    private String slug; // inicial, primaria, secundaria

    @Column(nullable = false, length = 80)
    private String nombre;

    @Column(name = "rango_edades", nullable = false, length = 50)
    private String rangoEdades;

    @Column(nullable = false, length = 300)
    private String resumen;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String descripcion;

    @Column(nullable = false, columnDefinition = "JSON")
    private String puntos; // JSON array of strings

    @Column(name = "foto_url", nullable = false, length = 350)
    private String fotoUrl;

    @Column(nullable = false)
    private Integer orden = 1;

    public Level() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getRangoEdades() { return rangoEdades; }
    public void setRangoEdades(String rangoEdades) { this.rangoEdades = rangoEdades; }

    public String getResumen() { return resumen; }
    public void setResumen(String resumen) { this.resumen = resumen; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public String getPuntos() { return puntos; }
    public void setPuntos(String puntos) { this.puntos = puntos; }

    public String getFotoUrl() { return fotoUrl; }
    public void setFotoUrl(String fotoUrl) { this.fotoUrl = fotoUrl; }

    public Integer getOrden() { return orden; }
    public void setOrden(Integer orden) { this.orden = orden; }
}
