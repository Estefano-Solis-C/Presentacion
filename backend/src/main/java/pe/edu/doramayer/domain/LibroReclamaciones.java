package pe.edu.doramayer.domain;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "libro_reclamaciones")
public class LibroReclamaciones {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "codigo_reclamacion", nullable = false, unique = true, length = 30)
    private String codigoReclamacion; // DMS-LR-YYYY-NNNN

    @Column(name = "anio", nullable = false)
    private Integer anio;

    @Column(name = "correlativo", nullable = false)
    private Integer correlativo;

    // Consumidor
    @Column(name = "reclamante_tipo_doc", nullable = false, length = 10)
    private String reclamanteTipoDoc;

    @Column(name = "reclamante_numero_doc", nullable = false, length = 15)
    private String reclamanteNumeroDoc;

    @Column(name = "reclamante_nombres", nullable = false, length = 120)
    private String reclamanteNombres;

    @Column(name = "reclamante_apellidos", nullable = false, length = 120)
    private String reclamanteApellidos;

    @Column(name = "reclamante_domicilio", nullable = false, length = 250)
    private String reclamanteDomicilio;

    @Column(name = "reclamante_telefono", nullable = false, length = 15)
    private String reclamanteTelefono;

    @Column(name = "reclamante_correo", nullable = false, length = 150)
    private String reclamanteCorreo;

    @Column(name = "es_menor_edad", nullable = false)
    private Boolean esMenorEdad = false;

    @Column(name = "nombre_alumno_afectado", length = 180)
    private String nombreAlumnoAfectado;

    // Bien / Servicio
    @Column(name = "tipo_bien_servicio", nullable = false, length = 20)
    private String tipoBienServicio; // SERVICIO, PRODUCTO

    @Column(name = "monto_reclamado", precision = 10, scale = 2)
    private BigDecimal montoReclamado = BigDecimal.ZERO;

    @Column(name = "descripcion_bien_servicio", nullable = false, length = 300)
    private String descripcionBienServicio;

    // Reclamación
    @Column(name = "tipo_accion", nullable = false, length = 15)
    private String tipoAccion; // RECLAMO, QUEJA

    @Column(name = "detalle_reclamacion", nullable = false, columnDefinition = "TEXT")
    private String detalleReclamacion;

    @Column(name = "pedido_consumidor", nullable = false, columnDefinition = "TEXT")
    private String pedidoConsumidor;

    // Fechas Indecopi
    @Column(name = "fecha_registro", nullable = false)
    private LocalDateTime fechaRegistro = LocalDateTime.now();

    @Column(name = "fecha_limite_respuesta", nullable = false)
    private LocalDate fechaLimiteRespuesta;

    @Column(name = "estado_respuesta", nullable = false, length = 20)
    private String estadoRespuesta = "PENDIENTE";

    @Column(name = "ip_address", nullable = false, length = 45)
    private String ipAddress;

    public LibroReclamaciones() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCodigoReclamacion() { return codigoReclamacion; }
    public void setCodigoReclamacion(String codigoReclamacion) { this.codigoReclamacion = codigoReclamacion; }

    public Integer getAnio() { return anio; }
    public void setAnio(Integer anio) { this.anio = anio; }

    public Integer getCorrelativo() { return correlativo; }
    public void setCorrelativo(Integer correlativo) { this.correlativo = correlativo; }

    public String getReclamanteTipoDoc() { return reclamanteTipoDoc; }
    public void setReclamanteTipoDoc(String reclamanteTipoDoc) { this.reclamanteTipoDoc = reclamanteTipoDoc; }

    public String getReclamanteNumeroDoc() { return reclamanteNumeroDoc; }
    public void setReclamanteNumeroDoc(String reclamanteNumeroDoc) { this.reclamanteNumeroDoc = reclamanteNumeroDoc; }

    public String getReclamanteNombres() { return reclamanteNombres; }
    public void setReclamanteNombres(String reclamanteNombres) { this.reclamanteNombres = reclamanteNombres; }

    public String getReclamanteApellidos() { return reclamanteApellidos; }
    public void setReclamanteApellidos(String reclamanteApellidos) { this.reclamanteApellidos = reclamanteApellidos; }

    public String getReclamanteDomicilio() { return reclamanteDomicilio; }
    public void setReclamanteDomicilio(String reclamanteDomicilio) { this.reclamanteDomicilio = reclamanteDomicilio; }

    public String getReclamanteTelefono() { return reclamanteTelefono; }
    public void setReclamanteTelefono(String reclamanteTelefono) { this.reclamanteTelefono = reclamanteTelefono; }

    public String getReclamanteCorreo() { return reclamanteCorreo; }
    public void setReclamanteCorreo(String reclamanteCorreo) { this.reclamanteCorreo = reclamanteCorreo; }

    public Boolean getEsMenorEdad() { return esMenorEdad; }
    public void setEsMenorEdad(Boolean esMenorEdad) { this.esMenorEdad = esMenorEdad; }

    public String getNombreAlumnoAfectado() { return nombreAlumnoAfectado; }
    public void setNombreAlumnoAfectado(String nombreAlumnoAfectado) { this.nombreAlumnoAfectado = nombreAlumnoAfectado; }

    public String getTipoBienServicio() { return tipoBienServicio; }
    public void setTipoBienServicio(String tipoBienServicio) { this.tipoBienServicio = tipoBienServicio; }

    public BigDecimal getMontoReclamado() { return montoReclamado; }
    public void setMontoReclamado(BigDecimal montoReclamado) { this.montoReclamado = montoReclamado; }

    public String getDescripcionBienServicio() { return descripcionBienServicio; }
    public void setDescripcionBienServicio(String descripcionBienServicio) { this.descripcionBienServicio = descripcionBienServicio; }

    public String getTipoAccion() { return tipoAccion; }
    public void setTipoAccion(String tipoAccion) { this.tipoAccion = tipoAccion; }

    public String getDetalleReclamacion() { return detalleReclamacion; }
    public void setDetalleReclamacion(String detalleReclamacion) { this.detalleReclamacion = detalleReclamacion; }

    public String getPedidoConsumidor() { return pedidoConsumidor; }
    public void setPedidoConsumidor(String pedidoConsumidor) { this.pedidoConsumidor = pedidoConsumidor; }

    public LocalDateTime getFechaRegistro() { return fechaRegistro; }
    public void setFechaRegistro(LocalDateTime fechaRegistro) { this.fechaRegistro = fechaRegistro; }

    public LocalDate getFechaLimiteRespuesta() { return fechaLimiteRespuesta; }
    public void setFechaLimiteRespuesta(LocalDate fechaLimiteRespuesta) { this.fechaLimiteRespuesta = fechaLimiteRespuesta; }

    public String getEstadoRespuesta() { return estadoRespuesta; }
    public void setEstadoRespuesta(String estadoRespuesta) { this.estadoRespuesta = estadoRespuesta; }

    public String getIpAddress() { return ipAddress; }
    public void setIpAddress(String ipAddress) { this.ipAddress = ipAddress; }
}
