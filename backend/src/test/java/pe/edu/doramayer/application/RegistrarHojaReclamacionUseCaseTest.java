package pe.edu.doramayer.application;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import pe.edu.doramayer.application.dto.ApiResponseDto;
import pe.edu.doramayer.application.dto.RegistrarReclamacionCommand;
import pe.edu.doramayer.application.usecase.reclamaciones.RegistrarHojaReclamacionUseCase;
import pe.edu.doramayer.domain.model.reclamaciones.LibroReclamaciones;
import pe.edu.doramayer.domain.model.reclamaciones.LibroReclamacionesRepositoryPort;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Unit Tests — Use Case: RegistrarHojaReclamacionUseCase (Indecopi Compliance)")
class RegistrarHojaReclamacionUseCaseTest {

    @Mock
    private LibroReclamacionesRepositoryPort repositoryPort;

    @InjectMocks
    private RegistrarHojaReclamacionUseCase useCase;

    @Test
    @DisplayName("Debe generar el siguiente correlativo y asignar plazo de 15 días hábiles")
    void shouldGenerateCorrelativeAndDeadline() {
        int currentYear = LocalDate.now().getYear();
        when(repositoryPort.findMaxCorrelativoByAnio(currentYear)).thenReturn(5);

        RegistrarReclamacionCommand cmd = new RegistrarReclamacionCommand(
                "DNI",
                "12345678",
                "Juan",
                "Perez",
                "Jr. Trujillo 123, Rimac",
                "966057981",
                "juan.perez@gmail.com",
                false,
                null,
                "SERVICIO",
                BigDecimal.ZERO,
                "Servicio Educativo",
                "RECLAMO",
                "Detalle de disconformidad con el servicio educativo brindado.",
                "Solicito reunión de coordinación con secretaría académica.",
                true,
                null
        );

        when(repositoryPort.save(any(LibroReclamaciones.class))).thenAnswer(invocation -> invocation.getArgument(0));

        ApiResponseDto<LibroReclamaciones> response = useCase.execute(cmd, "127.0.0.1");

        assertNotNull(response);
        assertTrue(response.success());
        assertNotNull(response.data());

        // Correlativo debe ser 5 + 1 = 6 -> DMS-LR-YYYY-0006
        String expectedCode = String.format("DMS-LR-%d-0006", currentYear);
        assertEquals(expectedCode, response.data().getCodigo().getCodigo());
        assertTrue(response.message().contains(expectedCode));
        assertTrue(response.message().contains("15 días hábiles"));

        verify(repositoryPort, times(1)).save(any(LibroReclamaciones.class));
    }
}
