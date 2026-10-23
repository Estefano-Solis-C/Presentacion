package pe.edu.doramayer.domain.model.matricula;

import pe.edu.doramayer.domain.exception.DomainValidationException;

import java.io.Serializable;
import java.util.Objects;
import java.util.regex.Pattern;

/**
 * Value Object: Teléfono Celular Peruano.
 * Debe contener exactamente 9 dígitos numéricos e iniciar con el número 9.
 */
public final class TelefonoCelular implements Serializable {

    private static final Pattern CELULAR_PATTERN = Pattern.compile("^9[0-9]{8}$");

    private final String numero;

    public TelefonoCelular(String numero) {
        if (numero == null || numero.isBlank()) {
            throw new DomainValidationException("El teléfono celular no puede estar vacío.");
        }
        String clean = numero.replaceAll("[^0-9]", "");
        if (!CELULAR_PATTERN.matcher(clean).matches()) {
            throw new DomainValidationException("El celular debe tener 9 dígitos y comenzar con 9: " + numero);
        }
        this.numero = clean;
    }

    public String getNumero() {
        return numero;
    }

    public String getFormatted() {
        return numero.substring(0, 3) + " " + numero.substring(3, 6) + " " + numero.substring(6);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TelefonoCelular that = (TelefonoCelular) o;
        return Objects.equals(numero, that.numero);
    }

    @Override
    public int hashCode() {
        return Objects.hash(numero);
    }

    @Override
    public String toString() {
        return numero;
    }
}
