package pe.edu.doramayer.presentation;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import pe.edu.doramayer.application.dto.ApiResponseDto;
import pe.edu.doramayer.application.dto.RegistrarLeadCommand;
import pe.edu.doramayer.application.usecase.matricula.RegistrarLeadUseCase;
import pe.edu.doramayer.presentation.rest.MatriculaRestController;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(MatriculaRestController.class)
@DisplayName("Web Slice Tests — MatriculaRestController (Presentation Layer)")
class MatriculaRestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private RegistrarLeadUseCase registrarLeadUseCase;

    @Test
    @DisplayName("POST /api/v1/matricula/postulacion retorna 200 OK con payload válido")
    void shouldReturn200OnValidPayload() throws Exception {
        RegistrarLeadCommand cmd = new RegistrarLeadCommand(
                "NUEVO",
                "Ana",
                "Morales",
                "DNI",
                "45678912",
                "987654321",
                "ana.morales@gmail.com",
                "Lucas",
                "Morales",
                "INICIAL",
                "5 Años",
                "Nido",
                "Comentarios",
                "WHATSAPP",
                true,
                true,
                null
        );

        when(registrarLeadUseCase.execute(any(), any(), any()))
                .thenReturn(ApiResponseDto.okWithWhatsApp("Éxito", null, "https://wa.me/51966057981"));

        mockMvc.perform(post("/api/v1/matricula/postulacion")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(cmd)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.whatsappRedirectUrl").value("https://wa.me/51966057981"));
    }

    @Test
    @DisplayName("POST /api/v1/matricula/postulacion retorna 400 Bad Request cuando faltan campos obligatorios")
    void shouldReturn400OnInvalidPayload() throws Exception {
        RegistrarLeadCommand invalidCmd = new RegistrarLeadCommand(
                "", // Inválido
                "",
                "",
                "PASAPORTE", // Inválido
                "123", // DNI muy corto
                "12345", // Celular inválido
                "correo-invalido",
                "",
                "",
                "UNIVERSIDAD", // Nivel no existe
                "",
                null, null, null, false, false, null
        );

        mockMvc.perform(post("/api/v1/matricula/postulacion")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidCmd)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Validación Fallida"));
    }
}
