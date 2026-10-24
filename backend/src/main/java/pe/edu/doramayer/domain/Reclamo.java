package pe.edu.doramayer.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reclamos")
public class Reclamo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "codigo_reclamacion", nullable = false, unique = true, length = 30)
    private String codigoReclamacion;

    @Column(name = "reclamante_nombres", nullable = false, length = 120)
    private String reclamanteNombres;

    @Column(name = "reclamante_apellidos", nullable = false, length = 120)
    private String reclamanteApellidos;

    @Column(name = "reclamante_documento", nullable = false, length = 20)
    private String reclamanteDocumento;

    @Column(name = "reclamante_telefono", nullable = false, length = 20)
    private String reclamanteTelefono;

    @Column(name = "reclamante_correo", nullable = false, length = 150)
    private String reclamanteCorreo;

    @Column(name = "reclamante_domicilio", nullable = false, length = 250)
    private String reclamanteDomicilio;

    @Column(name = "alumno_afectado", length = 180)
    private String alumnoAfectado;

    @Column(name = "tipo_accion", nullable = false, length = 15)
    private String tipoAccion; // RECLAMO, QUEJA

    @Column(name = "descripcion_bien_servicio", nullable = false, length = 300)
    private String descripcionBienServicio;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String detalle;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String pedido;

    @Column(nullable = false, length = 20)
    private String estado = "PENDIENTE";

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Reclamo() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCodigoReclamacion() { return codigoReclamacion; }
    public void setCodigoReclamacion(String codigoReclamacion) { this.codigoReclamacion = codigoReclamacion; }

    public String getReclamanteNombres() { return reclamanteNombres; }
    public void setReclamanteNombres(String reclamanteNombres) { this.reclamanteNombres = reclamanteNombres; }

    public String getReclamanteApellidos() { return reclamanteApellidos; }
    public void setReclamanteApellidos(String reclamanteApellidos) { this.reclamanteApellidos = reclamanteApellidos; }

    public String getReclamanteDocumento() { return reclamanteDocumento; }
    public void setReclamanteDocumento(String reclamanteDocumento) { this.reclamanteDocumento = reclamanteDocumento; }

    public String getReclamanteTelefono() { return reclamanteTelefono; }
    public void setReclamanteTelefono(String reclamanteTelefono) { this.reclamanteTelefono = reclamanteTelefono; }

    public String getReclamanteCorreo() { return reclamanteCorreo; }
    public void setReclamanteCorreo(String reclamanteCorreo) { this.reclamanteCorreo = reclamanteCorreo; }

    public String getReclamanteDomicilio() { return reclamanteDomicilio; }
    public void setReclamanteDomicilio(String reclamanteDomicilio) { this.reclamanteDomicilio = reclamanteDomicilio; }

    public String getAlumnoAfectado() { return alumnoAfectado; }
    public void setAlumnoAfectado(String alumnoAfectado) { this.alumnoAfectado = alumnoAfectado; }

    public String getTipoAccion() { return tipoAccion; }
    public void setTipoAccion(String tipoAccion) { this.tipoAccion = tipoAccion; }

    public String getDescripcionBienServicio() { return descripcionBienServicio; }
    public void setDescripcionBienServicio(String descripcionBienServicio) { this.descripcionBienServicio = descripcionBienServicio; }

    public String getDetalle() { return detalle; }
    public void setDetalle(String detalle) { this.detalle = detalle; }

    public String getPedido() { return pedido; }
    public void setPedido(String pedido) { this.pedido = pedido; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
