package com.proofforge.upload.controller;

import com.proofforge.upload.dto.UploadResponse;
import com.proofforge.upload.service.UploadService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/projects/{projectId}/uploads")
public class UploadController {

    private final UploadService uploadService;

    public UploadController(UploadService uploadService) {
        this.uploadService = uploadService;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public UploadResponse uploadZip(
            @PathVariable Long projectId,
            @RequestParam("file") MultipartFile file
    ) {
        return uploadService.uploadZip(projectId, file);
    }

    @GetMapping
    public List<UploadResponse> getUploads(@PathVariable Long projectId) {
        return uploadService.getUploads(projectId);
    }

    @GetMapping("/{uploadId}")
    public UploadResponse getUpload(
            @PathVariable Long projectId,
            @PathVariable Long uploadId
    ) {
        return uploadService.getUpload(projectId, uploadId);
    }

    @DeleteMapping("/{uploadId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUpload(
            @PathVariable Long projectId,
            @PathVariable Long uploadId
    ) {
        uploadService.deleteUpload(projectId, uploadId);
    }
}