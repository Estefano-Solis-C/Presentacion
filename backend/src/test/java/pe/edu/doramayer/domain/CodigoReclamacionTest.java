package pe.edu.doramayer.domain;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import pe.edu.doramayer.domain.exception.DomainValidationException;
import pe.edu.doramayer.domain.model.reclamaciones.CodigoReclamacion;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Unit Tests — Value Object: CodigoReclamacion Indecopi")
class CodigoReclamacionTest {

    @Test
    @DisplayName("Debe formatear correctamente el código DMS-LR-YYYY-NNNN")
    void shouldFormatCorrectly() {
        CodigoReclamacion cod = new CodigoReclamacion(2025, 1);
        assertEquals("DMS-LR-2025-0001", cod.getCodigo());
        assertEquals(2025, cod.getAnio());
        assertEquals(1, cod.getCorrelativo());
    }

    @Test
    @DisplayName("Debe parsear un código con formato válido")
    void shouldParseValidCode() {
        CodigoReclamacion cod = new CodigoReclamacion("DMS-LR-2025-0042");
        assertEquals(2025, cod.getAnio());
        assertEquals(42, cod.getCorrelativo());
    }

    @Test
    @DisplayName("Debe rechazar códigos con formato irregular")
    void shouldRejectMalformedCode() {
        assertThrows(DomainValidationException.class, () -> new CodigoReclamacion("LR-2025-1"));
        assertThrows(DomainValidationException.class, () -> new CodigoReclamacion("DMS-LR-202-0001"));
        assertThrows(DomainValidationException.class, () -> new CodigoReclamacion(2025, 0));
    }
}
