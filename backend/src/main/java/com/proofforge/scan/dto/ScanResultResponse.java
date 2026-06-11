package com.proofforge.scan.dto;

import com.proofforge.scan.entity.UploadScanResult;

import java.time.Instant;

public record ScanResultResponse(
        Long id,
        Long projectId,
        Long uploadId,
        Long configId,
        int totalFiles,
        int totalFolders,
        int scannedFiles,
        int ignoredFiles,
        String detectedLanguagesJson,
        String importantFilesJson,
        String proofmarkResultJson,
        String warningsJson,
        Instant createdAt
) {
    public static ScanResultResponse from(UploadScanResult result) {
        return new ScanResultResponse(
                result.getId(),
                result.getProjectId(),
                result.getUploadId(),
                result.getConfigId(),
                result.getTotalFiles(),
                result.getTotalFolders(),
                result.getScannedFiles(),
                result.getIgnoredFiles(),
                result.getDetectedLanguagesJson(),
                result.getImportantFilesJson(),
                result.getProofmarkResultJson(),
                result.getWarningsJson(),
                result.getCreatedAt()
        );
    }
}