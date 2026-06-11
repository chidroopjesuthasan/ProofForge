package com.proofforge.scan.controller;

import com.proofforge.scan.dto.ScanConfigResponse;
import com.proofforge.scan.dto.ScanConfigUpdateRequest;
import com.proofforge.scan.dto.ScanResultResponse;
import com.proofforge.scan.service.UploadScanService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/projects/{projectId}/uploads/{uploadId}")
public class UploadScanController {

    private final UploadScanService uploadScanService;

    public UploadScanController(UploadScanService uploadScanService) {
        this.uploadScanService = uploadScanService;
    }

    @GetMapping("/scan-config")
    public ScanConfigResponse getScanConfig(
            @PathVariable Long projectId,
            @PathVariable Long uploadId
    ) {
        return uploadScanService.getOrCreateConfig(projectId, uploadId);
    }

    @PutMapping("/scan-config")
    public ScanConfigResponse updateScanConfig(
            @PathVariable Long projectId,
            @PathVariable Long uploadId,
            @RequestBody ScanConfigUpdateRequest request
    ) {
        return uploadScanService.updateConfig(projectId, uploadId, request);
    }

    @PostMapping("/scan")
    public ScanResultResponse runScan(
            @PathVariable Long projectId,
            @PathVariable Long uploadId
    ) {
        return uploadScanService.runScan(projectId, uploadId);
    }

    @GetMapping("/scan")
    public ScanResultResponse getLatestScan(
            @PathVariable Long projectId,
            @PathVariable Long uploadId
    ) {
        return uploadScanService.getLatestScan(projectId, uploadId);
    }
}