package pe.edu.doramayer.domain.model.reclamaciones;

import pe.edu.doramayer.domain.exception.DomainValidationException;
import pe.edu.doramayer.domain.model.matricula.DocumentoIdentidad;
import pe.edu.doramayer.domain.model.matricula.TelefonoCelular;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Aggregate Root: Hoja de Reclamación Virtual (Indecopi D.S. N° 011-2011-PCM).
 */
public class LibroReclamaciones {

    private Long id;
    private CodigoReclamacion codigo;
    private DocumentoIdentidad reclamanteDoc;
    private String reclamanteNombres;
    private String reclamanteApellidos;
    private String reclamanteDomicilio;
    private TelefonoCelular reclamanteTelefono;
    private String reclamanteCorreo;
    private boolean esMenorEdad;
    private String nombreAlumnoAfectado;

    private String tipoBienServicio;
    private BigDecimal montoReclamado;
    private String descripcionBienServicio;

    private TipoAccion tipoAccion;
    private String detalleReclamacion;
    private String pedidoConsumidor;

    private LocalDateTime fechaRegistro;
    private LocalDate fechaLimiteRespuesta;
    private String estadoRespuesta;
    private String ipAddress;

    public LibroReclamaciones(Long id,
                              CodigoReclamacion codigo,
                              DocumentoIdentidad reclamanteDoc,
                              String reclamanteNombres,
                              String reclamanteApellidos,
                              String reclamanteDomicilio,
                              TelefonoCelular reclamanteTelefono,
                              String reclamanteCorreo,
                              boolean esMenorEdad,
                              String nombreAlumnoAfectado,
                              String tipoBienServicio,
                              BigDecimal montoReclamado,
                              String descripcionBienServicio,
                              TipoAccion tipoAccion,
                              String detalleReclamacion,
                              String pedidoConsumidor,
                              LocalDateTime fechaRegistro,
                              LocalDate fechaLimiteRespuesta,
                              String estadoRespuesta,
                              String ipAddress) {

        if (reclamanteNombres == null || reclamanteNombres.isBlank()) {
            throw new DomainValidationException("Los nombres del consumidor reclamante son obligatorios.");
        }
        if (detalleReclamacion == null || detalleReclamacion.trim().length() < 10) {
            throw new DomainValidationException("El detalle de la reclamación debe contener al menos 10 caracteres.");
        }
        if (pedidoConsumidor == null || pedidoConsumidor.trim().length() < 5) {
            throw new DomainValidationException("El pedido concreto del consumidor debe contener al menos 5 caracteres.");
        }

        this.id = id;
        this.codigo = codigo;
        this.reclamanteDoc = reclamanteDoc;
        this.reclamanteNombres = reclamanteNombres.trim();
        this.reclamanteApellidos = reclamanteApellidos != null ? reclamanteApellidos.trim() : "";
        this.reclamanteDomicilio = reclamanteDomicilio != null ? reclamanteDomicilio.trim() : "";
        this.reclamanteTelefono = reclamanteTelefono;
        this.reclamanteCorreo = reclamanteCorreo != null ? reclamanteCorreo.trim().toLowerCase() : "";
        this.esMenorEdad = esMenorEdad;
        this.nombreAlumnoAfectado = nombreAlumnoAfectado;
        this.tipoBienServicio = tipoBienServicio != null ? tipoBienServicio : "SERVICIO";
        this.montoReclamado = montoReclamado != null ? montoReclamado : BigDecimal.ZERO;
        this.descripcionBienServicio = descripcionBienServicio != null ? descripcionBienServicio.trim() : "Servicio Educativo Escolar";
        this.tipoAccion = tipoAccion != null ? tipoAccion : TipoAccion.RECLAMO;
        this.detalleReclamacion = detalleReclamacion.trim();
        this.pedidoConsumidor = pedidoConsumidor.trim();
        this.fechaRegistro = fechaRegistro != null ? fechaRegistro : LocalDateTime.now();
        // Plazo improrrogable de 15 días hábiles según Indecopi
        this.fechaLimiteRespuesta = fechaLimiteRespuesta != null ? fechaLimiteRespuesta : LocalDate.now().plusDays(21);
        this.estadoRespuesta = estadoRespuesta != null ? estadoRespuesta : "PENDIENTE";
        this.ipAddress = ipAddress != null ? ipAddress : "127.0.0.1";
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public CodigoReclamacion getCodigo() { return codigo; }
    public void setCodigo(CodigoReclamacion codigo) { this.codigo = codigo; }
    public DocumentoIdentidad getReclamanteDoc() { return reclamanteDoc; }
    public String getReclamanteNombres() { return reclamanteNombres; }
    public String getReclamanteApellidos() { return reclamanteApellidos; }
    public String getReclamanteDomicilio() { return reclamanteDomicilio; }
    public TelefonoCelular getReclamanteTelefono() { return reclamanteTelefono; }
    public String getReclamanteCorreo() { return reclamanteCorreo; }
    public boolean isEsMenorEdad() { return esMenorEdad; }
    public String getNombreAlumnoAfectado() { return nombreAlumnoAfectado; }
    public String getTipoBienServicio() { return tipoBienServicio; }
    public BigDecimal getMontoReclamado() { return montoReclamado; }
    public String getDescripcionBienServicio() { return descripcionBienServicio; }
    public TipoAccion getTipoAccion() { return tipoAccion; }
    public String getDetalleReclamacion() { return detalleReclamacion; }
    public String getPedidoConsumidor() { return pedidoConsumidor; }
    public LocalDateTime getFechaRegistro() { return fechaRegistro; }
    public LocalDate getFechaLimiteRespuesta() { return fechaLimiteRespuesta; }
    public String getEstadoRespuesta() { return estadoRespuesta; }
    public String getIpAddress() { return ipAddress; }
}
