package pe.edu.doramayer.domain;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import pe.edu.doramayer.domain.exception.DomainValidationException;
import pe.edu.doramayer.domain.model.matricula.TelefonoCelular;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Unit Tests — Value Object: TelefonoCelular Peruano")
class TelefonoCelularTest {

    @Test
    @DisplayName("Debe aceptar celulares peruanos válidos de 9 dígitos que inicien con 9")
    void shouldCreateValidCelular() {
        TelefonoCelular cel = new TelefonoCelular("966057981");
        assertNotNull(cel);
        assertEquals("966057981", cel.getNumero());
        assertEquals("966 057 981", cel.getFormatted());
    }

    @ParameterizedTest
    @ValueSource(strings = {"866057981", "123456789", "96605798", "9660579810", "96605798a", "", " "})
    @DisplayName("Debe rechazar celulares que no inicien con 9 o no tengan exactamente 9 dígitos")
    void shouldRejectInvalidNumbers(String invalid) {
        assertThrows(DomainValidationException.class, () -> new TelefonoCelular(invalid));
    }

    @Test
    @DisplayName("Inmutabilidad e igualdad por valor en el Value Object")
    void shouldSatisfyValueObjectContract() {
        TelefonoCelular cel1 = new TelefonoCelular("999888777");
        TelefonoCelular cel2 = new TelefonoCelular("999888777");
        assertEquals(cel1, cel2);
        assertEquals(cel1.hashCode(), cel2.hashCode());
    }
}
