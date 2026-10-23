package pe.edu.doramayer.application;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import pe.edu.doramayer.application.dto.ApiResponseDto;
import pe.edu.doramayer.application.dto.RegistrarLeadCommand;
import pe.edu.doramayer.application.port.out.OmnichannelNotificationPort;
import pe.edu.doramayer.application.usecase.matricula.RegistrarLeadUseCase;
import pe.edu.doramayer.domain.model.matricula.LeadMatricula;
import pe.edu.doramayer.domain.model.matricula.LeadMatriculaRepositoryPort;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Unit Tests — Use Case: RegistrarLeadUseCase (Application Layer)")
class RegistrarLeadUseCaseTest {

    @Mock
    private LeadMatriculaRepositoryPort repositoryPort;

    @Mock
    private OmnichannelNotificationPort notificationPort;

    @InjectMocks
    private RegistrarLeadUseCase useCase;

    @Test
    @DisplayName("Debe registrar un lead válido, disparar email asíncrono y retornar URL de WhatsApp")
    void shouldRegisterValidLeadSuccessfully() {
        RegistrarLeadCommand cmd = new RegistrarLeadCommand(
                "NUEVO",
                "Rosa Maria",
                "Lapa Salinas",
                "DNI",
                "12345678",
                "966057981",
                "apoderado@gmail.com",
                "Gabriel",
                "Lapa Salinas",
                "PRIMARIA",
                "1° de Primaria",
                "Nido Rayito de Sol",
                "Deseo información de vacante",
                "WHATSAPP",
                true,
                true,
                null // Honeypot vacío
        );

        when(repositoryPort.save(any(LeadMatricula.class))).thenAnswer(invocation -> {
            LeadMatricula l = invocation.getArgument(0);
            l.setId(101L);
            return l;
        });

        when(notificationPort.generateWhatsAppEnrollmentUrl(any(LeadMatricula.class)))
                .thenReturn("https://wa.me/51966057981?text=Test");

        ApiResponseDto<LeadMatricula> response = useCase.execute(cmd, "192.168.1.1", "Mozilla/5.0");

        assertNotNull(response);
        assertTrue(response.success());
        assertEquals("https://wa.me/51966057981?text=Test", response.whatsappRedirectUrl());
        assertNotNull(response.data());
        assertEquals(101L, response.data().getId());

        // Verificar interacción con puertos
        verify(repositoryPort, times(1)).save(any(LeadMatricula.class));
        verify(notificationPort, times(1)).sendLeadConfirmationEmailAsync(any(LeadMatricula.class));
        verify(notificationPort, times(1)).generateWhatsAppEnrollmentUrl(any(LeadMatricula.class));
    }

    @Test
    @DisplayName("Debe bloquear y rechazar el envío si el campo honeypot viene completado por bots")
    void shouldRejectWhenHoneypotIsFilled() {
        RegistrarLeadCommand cmd = new RegistrarLeadCommand(
                "NUEVO", "Bot", "Spam", "DNI", "12345678", "966057981",
                "bot@spam.com", "Alum", "Spam", "PRIMARIA", "1°",
                null, null, "WHATSAPP", true, true,
                "http://malicious-spam-url.com" // Bot completó el campo invisible
        );

        ApiResponseDto<LeadMatricula> response = useCase.execute(cmd, "10.0.0.1", "BotAgent");

        assertNotNull(response);
        assertFalse(response.success());
        verifyNoInteractions(repositoryPort);
        verifyNoInteractions(notificationPort);
    }
}
