package pe.edu.doramayer.dto;

import java.time.Instant;

public record ApiResponse<T>(
        boolean success,
        String message,
        T data,
        String whatsappRedirectUrl,
        Instant timestamp
) {
    public static <T> ApiResponse<T> ok(String message, T data) {
        return new ApiResponse<>(true, message, data, null, Instant.now());
    }

    public static <T> ApiResponse<T> okWithWhatsApp(String message, T data, String whatsappUrl) {
        return new ApiResponse<>(true, message, data, whatsappUrl, Instant.now());
    }

    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>(false, message, null, null, Instant.now());
    }
}
