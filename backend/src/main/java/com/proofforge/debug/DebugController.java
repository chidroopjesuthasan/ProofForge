package com.proofforge.debug;

import com.proofforge.common.exception.BadRequestException;
import com.proofforge.common.exception.ResourceNotFoundException;
import com.proofforge.common.response.ApiResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
public class DebugController {

    private final JdbcTemplate jdbcTemplate;

    public DebugController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping("/api/debug/db")
    public ApiResponse<Map<String, Object>> databaseCheck() {
        Integer result = jdbcTemplate.queryForObject("SELECT 1", Integer.class);

        Map<String, Object> data = new LinkedHashMap<>();
        data.put("database", "H2 in-memory");
        data.put("connection", "OK");
        data.put("testQuery", result);

        return ApiResponse.success("Database connection is working", data);
    }

    @GetMapping("/api/debug/not-found")
    public ApiResponse<Void> notFound() {
        throw new ResourceNotFoundException("Debug resource was not found");
    }

    @GetMapping("/api/debug/bad-request")
    public ApiResponse<Void> badRequest() {
        throw new BadRequestException("Debug bad request triggered successfully");
    }

    @PostMapping("/api/debug/validate")
    public ApiResponse<Map<String, Object>> validateRequest(@Valid @RequestBody DebugValidationRequest request) {
        Map<String, Object> data = new LinkedHashMap<>();
        data.put("title", request.title());

        return ApiResponse.success("Validation passed", data);
    }

    public record DebugValidationRequest(
            @NotBlank(message = "Title is required")
            String title
    ) {
    }
}