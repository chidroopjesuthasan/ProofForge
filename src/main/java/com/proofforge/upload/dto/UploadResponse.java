package com.proofforge.upload.dto;

import com.proofforge.upload.entity.ProjectUpload;

import java.time.Instant;

public record UploadResponse(
        Long id,
        Long projectId,
        String originalFilename,
        String storedFilename,
        String contentType,
        Long fileSizeBytes,
        String status,
        Instant createdAt
) {
    public static UploadResponse from(ProjectUpload upload) {
        return new UploadResponse(
                upload.getId(),
                upload.getProject().getId(),
                upload.getOriginalFilename(),
                upload.getStoredFilename(),
                upload.getContentType(),
                upload.getFileSizeBytes(),
                upload.getStatus().name(),
                upload.getCreatedAt()
        );
    }
}
