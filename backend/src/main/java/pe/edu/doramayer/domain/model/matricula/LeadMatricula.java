package pe.edu.doramayer.domain.model.matricula;

import pe.edu.doramayer.domain.exception.DomainValidationException;

import java.time.LocalDateTime;

/**
 * Aggregate Root: Lead de Matrícula (Alumno Nuevo / Alumno Mayerino).
 * Modelo de Dominio Puro, libre de dependencias de frameworks de persistencia.
 */
public class LeadMatricula {

    private Long id;
    private TipoProceso tipoProceso;
    private String apoderadoNombres;
    private String apoderadoApellidos;
    private DocumentoIdentidad documento;
    private TelefonoCelular telefono;
    private String correoElectronico;
    private String alumnoNombres;
    private String alumnoApellidos;
    private NivelAcademico nivelAcademico;
    private String gradoIngreso;
    private String colegioProcedencia;
    private String comentarios;
    private String canalContactoPreferido;

    // Cumplimiento Ley 29733 (Datos Personales)
    private boolean aceptaTerminos;
    private boolean aceptaPoliticaDatos;
    private LocalDateTime consentTimestamp;
    private String ipAddress;
    private String userAgent;

    private String estado;
    private LocalDateTime createdAt;

    public LeadMatricula(Long id,
                         TipoProceso tipoProceso,
                         String apoderadoNombres,
                         String apoderadoApellidos,
                         DocumentoIdentidad documento,
                         TelefonoCelular telefono,
                         String correoElectronico,
                         String alumnoNombres,
                         String alumnoApellidos,
                         NivelAcademico nivelAcademico,
                         String gradoIngreso,
                         String colegioProcedencia,
                         String comentarios,
                         String canalContactoPreferido,
                         boolean aceptaTerminos,
                         boolean aceptaPoliticaDatos,
                         LocalDateTime consentTimestamp,
                         String ipAddress,
                         String userAgent,
                         String estado,
                         LocalDateTime createdAt) {

        validateInvariants(apoderadoNombres, apoderadoApellidos, alumnoNombres, alumnoApellidos,
                gradoIngreso, aceptaTerminos, aceptaPoliticaDatos);

        this.id = id;
        this.tipoProceso = tipoProceso != null ? tipoProceso : TipoProceso.NUEVO;
        this.apoderadoNombres = apoderadoNombres.trim();
        this.apoderadoApellidos = apoderadoApellidos.trim();
        this.documento = documento;
        this.telefono = telefono;
        this.correoElectronico = correoElectronico != null ? correoElectronico.trim().toLowerCase() : "";
        this.alumnoNombres = alumnoNombres.trim();
        this.alumnoApellidos = alumnoApellidos.trim();
        this.nivelAcademico = nivelAcademico != null ? nivelAcademico : NivelAcademico.PRIMARIA;
        this.gradoIngreso = gradoIngreso.trim();
        this.colegioProcedencia = colegioProcedencia;
        this.comentarios = comentarios;
        this.canalContactoPreferido = canalContactoPreferido != null ? canalContactoPreferido : "WHATSAPP";
        this.aceptaTerminos = aceptaTerminos;
        this.aceptaPoliticaDatos = aceptaPoliticaDatos;
        this.consentTimestamp = consentTimestamp != null ? consentTimestamp : LocalDateTime.now();
        this.ipAddress = ipAddress != null ? ipAddress : "127.0.0.1";
        this.userAgent = userAgent;
        this.estado = estado != null ? estado : "PENDIENTE";
        this.createdAt = createdAt != null ? createdAt : LocalDateTime.now();
    }

    private void validateInvariants(String apoderadoNombres, String apoderadoApellidos,
                                   String alumnoNombres, String alumnoApellidos,
                                   String gradoIngreso, boolean aceptaTerminos, boolean aceptaPoliticaDatos) {
        if (apoderadoNombres == null || apoderadoNombres.trim().length() < 2) {
            throw new DomainValidationException("Los nombres del apoderado deben tener al menos 2 caracteres.");
        }
        if (apoderadoApellidos == null || apoderadoApellidos.trim().length() < 2) {
            throw new DomainValidationException("Los apellidos del apoderado deben tener al menos 2 caracteres.");
        }
        if (alumnoNombres == null || alumnoNombres.trim().length() < 2) {
            throw new DomainValidationException("Los nombres del alumno deben tener al menos 2 caracteres.");
        }
        if (gradoIngreso == null || gradoIngreso.isBlank()) {
            throw new DomainValidationException("El grado de ingreso es obligatorio.");
        }
        if (!aceptaPoliticaDatos) {
            throw new DomainValidationException("Es obligatorio aceptar el consentimiento informado de datos personales (Ley N° 29733).");
        }
        if (!aceptaTerminos) {
            throw new DomainValidationException("Es obligatorio aceptar los términos del proceso de admisión.");
        }
    }

    // Getters
    public Long getId() { return id; }
    public TipoProceso getTipoProceso() { return tipoProceso; }
    public String getApoderadoNombres() { return apoderadoNombres; }
    public String getApoderadoApellidos() { return apoderadoApellidos; }
    public DocumentoIdentidad getDocumento() { return documento; }
    public TelefonoCelular getTelefono() { return telefono; }
    public String getCorreoElectronico() { return correoElectronico; }
    public String getAlumnoNombres() { return alumnoNombres; }
    public String getAlumnoApellidos() { return alumnoApellidos; }
    public NivelAcademico getNivelAcademico() { return nivelAcademico; }
    public String getGradoIngreso() { return gradoIngreso; }
    public String getColegioProcedencia() { return colegioProcedencia; }
    public String getComentarios() { return comentarios; }
    public String getCanalContactoPreferido() { return canalContactoPreferido; }
    public boolean isAceptaTerminos() { return aceptaTerminos; }
    public boolean isAceptaPoliticaDatos() { return aceptaPoliticaDatos; }
    public LocalDateTime getConsentTimestamp() { return consentTimestamp; }
    public String getIpAddress() { return ipAddress; }
    public String getUserAgent() { return userAgent; }
    public String getEstado() { return estado; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    public void setId(Long id) { this.id = id; }
    public void cambiarEstado(String nuevoEstado) { this.estado = nuevoEstado; }
}
