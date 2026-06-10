package com.proofforge.common.exception;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

@Order(Ordered.HIGHEST_PRECEDENCE)
@RestControllerAdvice
public class ResponseStatusExceptionHandler {

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<Map<String, Object>> handleResponseStatusException(ResponseStatusException exception) {
        HttpStatusCode statusCode = exception.getStatusCode();

        Map<String, Object> data = new LinkedHashMap<>();
        data.put("errorType", resolveErrorType(statusCode));

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("success", false);
        body.put("message", resolveMessage(exception));
        body.put("data", data);
        body.put("timestamp", LocalDateTime.now().toString());

        return ResponseEntity
                .status(statusCode)
                .body(body);
    }

    private String resolveMessage(ResponseStatusException exception) {
        if (exception.getReason() == null || exception.getReason().isBlank()) {
            return "Request failed";
        }

        return exception.getReason();
    }

    private String resolveErrorType(HttpStatusCode statusCode) {
        if (statusCode instanceof HttpStatus httpStatus) {
            return httpStatus.name();
        }

        return "HTTP_" + statusCode.value();
    }
}