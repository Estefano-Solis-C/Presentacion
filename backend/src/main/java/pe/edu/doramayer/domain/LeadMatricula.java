package pe.edu.doramayer.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "leads_matricula")
public class LeadMatricula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tipo_proceso", nullable = false, length = 20)
    private String tipoProceso; // NUEVO, MAYERINO

    @Column(name = "apoderado_nombres", nullable = false, length = 120)
    private String apoderadoNombres;

    @Column(name = "apoderado_apellidos", nullable = false, length = 120)
    private String apoderadoApellidos;

    @Column(name = "tipo_documento", nullable = false, length = 10)
    private String tipoDocumento; // DNI, CE

    @Column(name = "numero_documento", nullable = false, length = 15)
    private String numeroDocumento;

    @Column(name = "telefono_contacto", nullable = false, length = 15)
    private String telefonoContacto;

    @Column(name = "correo_electronico", nullable = false, length = 150)
    private String correoElectronico;

    @Column(name = "alumno_nombres", nullable = false, length = 120)
    private String alumnoNombres;

    @Column(name = "alumno_apellidos", nullable = false, length = 120)
    private String alumnoApellidos;

    @Column(name = "nivel_academico", nullable = false, length = 20)
    private String nivelAcademico; // INICIAL, PRIMARIA, SECUNDARIA

    @Column(name = "grado_ingreso", nullable = false, length = 50)
    private String gradoIngreso;

    @Column(name = "colegio_procedencia", length = 180)
    private String colegioProcedencia;

    @Column(name = "comentarios", columnDefinition = "TEXT")
    private String comentarios;

    @Column(name = "canal_contacto_preferido", nullable = false, length = 20)
    private String canalContactoPreferido;

    // Cumplimiento Ley 29733
    @Column(name = "acepta_terminos", nullable = false)
    private Boolean aceptaTerminos;

    @Column(name = "acepta_politica_datos", nullable = false)
    private Boolean aceptaPoliticaDatos;

    @Column(name = "consent_timestamp", nullable = false)
    private LocalDateTime consentTimestamp;

    @Column(name = "ip_address", nullable = false, length = 45)
    private String ipAddress;

    @Column(name = "user_agent", length = 255)
    private String userAgent;

    @Column(name = "estado", nullable = false, length = 20)
    private String estado = "PENDIENTE";

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public LeadMatricula() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTipoProceso() { return tipoProceso; }
    public void setTipoProceso(String tipoProceso) { this.tipoProceso = tipoProceso; }

    public String getApoderadoNombres() { return apoderadoNombres; }
    public void setApoderadoNombres(String apoderadoNombres) { this.apoderadoNombres = apoderadoNombres; }

    public String getApoderadoApellidos() { return apoderadoApellidos; }
    public void setApoderadoApellidos(String apoderadoApellidos) { this.apoderadoApellidos = apoderadoApellidos; }

    public String getTipoDocumento() { return tipoDocumento; }
    public void setTipoDocumento(String tipoDocumento) { this.tipoDocumento = tipoDocumento; }

    public String getNumeroDocumento() { return numeroDocumento; }
    public void setNumeroDocumento(String numeroDocumento) { this.numeroDocumento = numeroDocumento; }

    public String getTelefonoContacto() { return telefonoContacto; }
    public void setTelefonoContacto(String telefonoContacto) { this.telefonoContacto = telefonoContacto; }

    public String getCorreoElectronico() { return correoElectronico; }
    public void setCorreoElectronico(String correoElectronico) { this.correoElectronico = correoElectronico; }

    public String getAlumnoNombres() { return alumnoNombres; }
    public void setAlumnoNombres(String alumnoNombres) { this.alumnoNombres = alumnoNombres; }

    public String getAlumnoApellidos() { return alumnoApellidos; }
    public void setAlumnoApellidos(String alumnoApellidos) { this.alumnoApellidos = alumnoApellidos; }

    public String getNivelAcademico() { return nivelAcademico; }
    public void setNivelAcademico(String nivelAcademico) { this.nivelAcademico = nivelAcademico; }

    public String getGradoIngreso() { return gradoIngreso; }
    public void setGradoIngreso(String gradoIngreso) { this.gradoIngreso = gradoIngreso; }

    public String getColegioProcedencia() { return colegioProcedencia; }
    public void setColegioProcedencia(String colegioProcedencia) { this.colegioProcedencia = colegioProcedencia; }

    public String getComentarios() { return comentarios; }
    public void setComentarios(String comentarios) { this.comentarios = comentarios; }

    public String getCanalContactoPreferido() { return canalContactoPreferido; }
    public void setCanalContactoPreferido(String canalContactoPreferido) { this.canalContactoPreferido = canalContactoPreferido; }

    public Boolean getAceptaTerminos() { return aceptaTerminos; }
    public void setAceptaTerminos(Boolean aceptaTerminos) { this.aceptaTerminos = aceptaTerminos; }

    public Boolean getAceptaPoliticaDatos() { return aceptaPoliticaDatos; }
    public void setAceptaPoliticaDatos(Boolean aceptaPoliticaDatos) { this.aceptaPoliticaDatos = aceptaPoliticaDatos; }

    public LocalDateTime getConsentTimestamp() { return consentTimestamp; }
    public void setConsentTimestamp(LocalDateTime consentTimestamp) { this.consentTimestamp = consentTimestamp; }

    public String getIpAddress() { return ipAddress; }
    public void setIpAddress(String ipAddress) { this.ipAddress = ipAddress; }

    public String getUserAgent() { return userAgent; }
    public void setUserAgent(String userAgent) { this.userAgent = userAgent; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
