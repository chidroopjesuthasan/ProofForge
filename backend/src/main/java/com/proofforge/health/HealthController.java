package com.proofforge.health;

import com.proofforge.common.response.ApiResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
public class HealthController {

    @Value("${proofforge.app.name}")
    private String appName;

    @Value("${proofforge.app.phase}")
    private String phase;

    @Value("${proofforge.app.version}")
    private String version;

    @GetMapping("/api/health")
    public ApiResponse<Map<String, Object>> health() {
        Map<String, Object> data = new LinkedHashMap<>();
        data.put("service", appName + " API");
        data.put("status", "UP");
        data.put("version", version);
        data.put("phase", phase);

        return ApiResponse.success("ProofForge backend is running", data);
    }
}