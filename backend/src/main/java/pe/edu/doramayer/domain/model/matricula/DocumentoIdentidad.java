package pe.edu.doramayer.domain.model.matricula;

import pe.edu.doramayer.domain.exception.DomainValidationException;

import java.io.Serializable;
import java.util.Objects;
import java.util.regex.Pattern;

/**
 * Value Object: Documento de Identidad Peruano (DNI o Carné de Extranjería - CE).
 * Inmutable y auto-validable en el dominio puro.
 */
public final class DocumentoIdentidad implements Serializable {

    private static final Pattern DNI_PATTERN = Pattern.compile("^[0-9]{8}$");
    private static final Pattern CE_PATTERN = Pattern.compile("^[A-Za-z0-9]{9,12}$");

    private final String tipo;
    private final String numero;

    public DocumentoIdentidad(String tipo, String numero) {
        if (tipo == null || tipo.isBlank()) {
            throw new DomainValidationException("El tipo de documento es obligatorio (DNI o CE).");
        }
        if (numero == null || numero.isBlank()) {
            throw new DomainValidationException("El número de documento no puede estar vacío.");
        }

        String tipoUpper = tipo.trim().toUpperCase();
        String numTrim = numero.trim();

        if ("DNI".equals(tipoUpper)) {
            if (!DNI_PATTERN.matcher(numTrim).matches()) {
                throw new DomainValidationException("El DNI debe tener exactamente 8 dígitos numéricos: " + numTrim);
            }
        } else if ("CE".equals(tipoUpper)) {
            if (!CE_PATTERN.matcher(numTrim).matches()) {
                throw new DomainValidationException("El Carné de Extranjería debe tener entre 9 y 12 caracteres alfanuméricos: " + numTrim);
            }
        } else {
            throw new DomainValidationException("Tipo de documento no admitido: " + tipo + ". Solo se acepta DNI o CE.");
        }

        this.tipo = tipoUpper;
        this.numero = numTrim;
    }

    public static DocumentoIdentidad dni(String numero) {
        return new DocumentoIdentidad("DNI", numero);
    }

    public static DocumentoIdentidad ce(String numero) {
        return new DocumentoIdentidad("CE", numero);
    }

    public String getTipo() {
        return tipo;
    }

    public String getNumero() {
        return numero;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DocumentoIdentidad that = (DocumentoIdentidad) o;
        return Objects.equals(tipo, that.tipo) && Objects.equals(numero, that.numero);
    }

    @Override
    public int hashCode() {
        return Objects.hash(tipo, numero);
    }

    @Override
    public String toString() {
        return tipo + ": " + numero;
    }
}
