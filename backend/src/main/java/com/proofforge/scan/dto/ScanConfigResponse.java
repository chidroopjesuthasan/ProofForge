package com.proofforge.scan.dto;

import com.proofforge.scan.entity.UploadScanConfig;
import com.proofforge.scan.model.IgnoreMode;

import java.time.Instant;

public record ScanConfigResponse(
        Long id,
        Long projectId,
        Long uploadId,
        IgnoreMode ignoreMode,
        String pfIgnoreContent,
        boolean proofmarkEnabled,
        String proofmarkContent,
        boolean respectIgnoreRules,
        boolean detectTechStack,
        boolean detectImportantFiles,
        boolean detectProofmarkedFiles,
        Instant createdAt,
        Instant updatedAt
) {
    public static ScanConfigResponse from(UploadScanConfig config) {
        return new ScanConfigResponse(
                config.getId(),
                config.getProjectId(),
                config.getUploadId(),
                config.getIgnoreMode(),
                config.getPfIgnoreContent(),
                config.isProofmarkEnabled(),
                config.getProofmarkContent(),
                config.isRespectIgnoreRules(),
                config.isDetectTechStack(),
                config.isDetectImportantFiles(),
                config.isDetectProofmarkedFiles(),
                config.getCreatedAt(),
                config.getUpdatedAt()
        );
    }
}