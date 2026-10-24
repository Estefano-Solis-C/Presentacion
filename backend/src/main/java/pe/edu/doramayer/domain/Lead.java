package pe.edu.doramayer.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "leads")
public class Lead {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "apoderado_nombres", nullable = false, length = 120)
    private String apoderadoNombres;

    @Column(name = "apoderado_apellidos", nullable = false, length = 120)
    private String apoderadoApellidos;

    @Column(length = 20)
    private String documento;

    @Column(nullable = false, length = 20)
    private String celular;

    @Column(nullable = false, length = 150)
    private String correo;

    @Column(name = "alumno_nombre", nullable = false, length = 150)
    private String alumnoNombre;

    @Column(nullable = false, length = 20)
    private String nivel; // INICIAL, PRIMARIA, SECUNDARIA

    @Column(nullable = false, length = 50)
    private String grado;

    @Column(name = "acepta_datos", nullable = false)
    private Boolean aceptaDatos = true;

    @Column(name = "acepta_terminos", nullable = false)
    private Boolean aceptaTerminos = true;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Lead() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getApoderadoNombres() { return apoderadoNombres; }
    public void setApoderadoNombres(String apoderadoNombres) { this.apoderadoNombres = apoderadoNombres; }

    public String getApoderadoApellidos() { return apoderadoApellidos; }
    public void setApoderadoApellidos(String apoderadoApellidos) { this.apoderadoApellidos = apoderadoApellidos; }

    public String getDocumento() { return documento; }
    public void setDocumento(String documento) { this.documento = documento; }

    public String getCelular() { return celular; }
    public void setCelular(String celular) { this.celular = celular; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }

    public String getAlumnoNombre() { return alumnoNombre; }
    public void setAlumnoNombre(String alumnoNombre) { this.alumnoNombre = alumnoNombre; }

    public String getNivel() { return nivel; }
    public void setNivel(String nivel) { this.nivel = nivel; }

    public String getGrado() { return grado; }
    public void setGrado(String grado) { this.grado = grado; }

    public Boolean getAceptaDatos() { return aceptaDatos; }
    public void setAceptaDatos(Boolean aceptaDatos) { this.aceptaDatos = aceptaDatos; }

    public Boolean getAceptaTerminos() { return aceptaTerminos; }
    public void setAceptaTerminos(Boolean aceptaTerminos) { this.aceptaTerminos = aceptaTerminos; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
