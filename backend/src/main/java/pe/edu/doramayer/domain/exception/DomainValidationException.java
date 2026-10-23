package pe.edu.doramayer.domain.exception;

/**
 * Excepción lanzada cuando se violan invariantes o reglas de validación del dominio puro.
 */
public class DomainValidationException extends RuntimeException {
    public DomainValidationException(String message) {
        super(message);
    }
}
