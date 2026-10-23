package pe.edu.doramayer.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "inscripciones_vacaciones")
public class InscripcionVacaciones {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "apoderado_nombres", nullable = false, length = 120)
    private String apoderadoNombres;

    @Column(name = "apoderado_apellidos", nullable = false, length = 120)
    private String apoderadoApellidos;

    @Column(name = "numero_documento", nullable = false, length = 15)
    private String numeroDocumento;

    @Column(name = "telefono_contacto", nullable = false, length = 15)
    private String telefonoContacto;

    @Column(name = "correo_electronico", nullable = false, length = 150)
    private String correoElectronico;

    @Column(name = "alumno_nombres", nullable = false, length = 120)
    private String alumnoNombres;

    @Column(name = "alumno_edad", nullable = false)
    private Integer alumnoEdad;

    @Column(name = "taller_seleccionado", nullable = false, length = 80)
    private String tallerSeleccionado;

    @Column(name = "turno_preferido", nullable = false, length = 20)
    private String turnoPreferido;

    @Column(name = "acepta_terminos", nullable = false)
    private Boolean aceptaTerminos;

    @Column(name = "acepta_politica_datos", nullable = false)
    private Boolean aceptaPoliticaDatos;

    @Column(name = "consent_timestamp", nullable = false)
    private LocalDateTime consentTimestamp;

    @Column(name = "ip_address", nullable = false, length = 45)
    private String ipAddress;

    @Column(name = "estado", nullable = false, length = 20)
    private String estado = "REGISTRADO";

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public InscripcionVacaciones() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getApoderadoNombres() { return apoderadoNombres; }
    public void setApoderadoNombres(String apoderadoNombres) { this.apoderadoNombres = apoderadoNombres; }

    public String getApoderadoApellidos() { return apoderadoApellidos; }
    public void setApoderadoApellidos(String apoderadoApellidos) { this.apoderadoApellidos = apoderadoApellidos; }

    public String getNumeroDocumento() { return numeroDocumento; }
    public void setNumeroDocumento(String numeroDocumento) { this.numeroDocumento = numeroDocumento; }

    public String getTelefonoContacto() { return telefonoContacto; }
    public void setTelefonoContacto(String telefonoContacto) { this.telefonoContacto = telefonoContacto; }

    public String getCorreoElectronico() { return correoElectronico; }
    public void setCorreoElectronico(String correoElectronico) { this.correoElectronico = correoElectronico; }

    public String getAlumnoNombres() { return alumnoNombres; }
    public void setAlumnoNombres(String alumnoNombres) { this.alumnoNombres = alumnoNombres; }

    public Integer getAlumnoEdad() { return alumnoEdad; }
    public void setAlumnoEdad(Integer alumnoEdad) { this.alumnoEdad = alumnoEdad; }

    public String getTallerSeleccionado() { return tallerSeleccionado; }
    public void setTallerSeleccionado(String tallerSeleccionado) { this.tallerSeleccionado = tallerSeleccionado; }

    public String getTurnoPreferido() { return turnoPreferido; }
    public void setTurnoPreferido(String turnoPreferido) { this.turnoPreferido = turnoPreferido; }

    public Boolean getAceptaTerminos() { return aceptaTerminos; }
    public void setAceptaTerminos(Boolean aceptaTerminos) { this.aceptaTerminos = aceptaTerminos; }

    public Boolean getAceptaPoliticaDatos() { return aceptaPoliticaDatos; }
    public void setAceptaPoliticaDatos(Boolean aceptaPoliticaDatos) { this.aceptaPoliticaDatos = aceptaPoliticaDatos; }

    public LocalDateTime getConsentTimestamp() { return consentTimestamp; }
    public void setConsentTimestamp(LocalDateTime consentTimestamp) { this.consentTimestamp = consentTimestamp; }

    public String getIpAddress() { return ipAddress; }
    public void setIpAddress(String ipAddress) { this.ipAddress = ipAddress; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
