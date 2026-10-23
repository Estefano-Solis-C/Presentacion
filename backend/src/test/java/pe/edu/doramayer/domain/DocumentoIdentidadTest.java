package pe.edu.doramayer.domain;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import pe.edu.doramayer.domain.exception.DomainValidationException;
import pe.edu.doramayer.domain.model.matricula.DocumentoIdentidad;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Unit Tests — Value Object: DocumentoIdentidad (DNI y CE)")
class DocumentoIdentidadTest {

    @Test
    @DisplayName("Debe crear un DNI válido cuando tiene exactamente 8 dígitos numéricos")
    void shouldCreateValidDni() {
        DocumentoIdentidad doc = DocumentoIdentidad.dni("12345678");
        assertNotNull(doc);
        assertEquals("DNI", doc.getTipo());
        assertEquals("12345678", doc.getNumero());
    }

    @Test
    @DisplayName("Debe crear un CE válido cuando tiene entre 9 y 12 caracteres alfanuméricos")
    void shouldCreateValidCe() {
        DocumentoIdentidad doc = DocumentoIdentidad.ce("001234567");
        assertNotNull(doc);
        assertEquals("CE", doc.getTipo());
        assertEquals("001234567", doc.getNumero());
    }

    @ParameterizedTest
    @ValueSource(strings = {"1234567", "123456789", "1234567a", "abcdefgh", " ", ""})
    @DisplayName("Debe lanzar DomainValidationException para DNIs inválidos")
    void shouldThrowExceptionForInvalidDni(String invalidDni) {
        assertThrows(DomainValidationException.class, () -> DocumentoIdentidad.dni(invalidDni));
    }

    @Test
    @DisplayName("Debe lanzar excepción para tipos de documentos no soportados")
    void shouldThrowExceptionForUnsupportedType() {
        assertThrows(DomainValidationException.class, () -> new DocumentoIdentidad("PASAPORTE", "12345678"));
    }

    @Test
    @DisplayName("Dos documentos con el mismo tipo y número deben ser equivalentes (Value Object equality)")
    void shouldBeEqualForSameValues() {
        DocumentoIdentidad doc1 = DocumentoIdentidad.dni("76543210");
        DocumentoIdentidad doc2 = DocumentoIdentidad.dni("76543210");
        assertEquals(doc1, doc2);
        assertEquals(doc1.hashCode(), doc2.hashCode());
    }
}
