package pe.edu.doramayer.application.dto;

import java.time.Instant;

public record ApiResponseDto<T>(
        boolean success,
        String message,
        T data,
        String whatsappRedirectUrl,
        Instant timestamp
) {
    public static <T> ApiResponseDto<T> ok(String message, T data) {
        return new ApiResponseDto<>(true, message, data, null, Instant.now());
    }

    public static <T> ApiResponseDto<T> okWithWhatsApp(String message, T data, String whatsappUrl) {
        return new ApiResponseDto<>(true, message, data, whatsappUrl, Instant.now());
    }

    public static <T> ApiResponseDto<T> error(String message) {
        return new ApiResponseDto<>(false, message, null, null, Instant.now());
    }
}
