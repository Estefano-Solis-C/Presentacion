package pe.edu.doramayer.domain.model.reclamaciones;

import pe.edu.doramayer.domain.exception.DomainValidationException;

import java.io.Serializable;
import java.util.Objects;
import java.util.regex.Pattern;

/**
 * Value Object: Código Correlativo de Hoja de Reclamación Virtual Indecopi.
 * Formato oficial: DMS-LR-YYYY-NNNN (ej: DMS-LR-2025-0001)
 */
public final class CodigoReclamacion implements Serializable {

    private static final Pattern CODE_PATTERN = Pattern.compile("^DMS-LR-[0-9]{4}-[0-9]{4}$");

    private final String codigo;
    private final int anio;
    private final int correlativo;

    public CodigoReclamacion(int anio, int correlativo) {
        if (anio < 2024 || anio > 2100) {
            throw new DomainValidationException("Año de reclamación inválido: " + anio);
        }
        if (correlativo <= 0) {
            throw new DomainValidationException("El correlativo debe ser un entero positivo mayor a cero.");
        }
        this.anio = anio;
        this.correlativo = correlativo;
        this.codigo = String.format("DMS-LR-%04d-%04d", anio, correlativo);
    }

    public CodigoReclamacion(String codigo) {
        if (codigo == null || !CODE_PATTERN.matcher(codigo.trim()).matches()) {
            throw new DomainValidationException("Formato de código de reclamación no conforme (esperado DMS-LR-YYYY-NNNN): " + codigo);
        }
        this.codigo = codigo.trim();
        String[] parts = this.codigo.split("-");
        this.anio = Integer.parseInt(parts[2]);
        this.correlativo = Integer.parseInt(parts[3]);
    }

    public String getCodigo() {
        return codigo;
    }

    public int getAnio() {
        return anio;
    }

    public int getCorrelativo() {
        return correlativo;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CodigoReclamacion that = (CodigoReclamacion) o;
        return Objects.equals(codigo, that.codigo);
    }

    @Override
    public int hashCode() {
        return Objects.hash(codigo);
    }

    @Override
    public String toString() {
        return codigo;
    }
}
