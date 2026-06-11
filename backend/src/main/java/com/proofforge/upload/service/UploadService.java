package com.proofforge.upload.service;

import com.proofforge.project.CandidateProject;
import com.proofforge.project.CandidateProjectRepository;
import com.proofforge.project.service.AuthenticatedUserService;
import com.proofforge.upload.dto.UploadResponse;
import com.proofforge.upload.entity.ProjectUpload;
import com.proofforge.upload.entity.UploadStatus;
import com.proofforge.upload.repository.ProjectUploadRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Locale;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;

@Service
@Transactional
public class UploadService {

    private static final long MAX_FILE_SIZE_BYTES = 20L * 1024L * 1024L;

    private static final Path STORAGE_ROOT = Path.of("runtime", "uploads", "projects");

    private static final Set<String> ALLOWED_CONTENT_TYPES = Set.of(
            "application/zip",
            "application/x-zip-compressed",
            "application/octet-stream",
            "multipart/x-zip"
    );

    private final ProjectUploadRepository projectUploadRepository;
    private final CandidateProjectRepository candidateProjectRepository;
    private final AuthenticatedUserService authenticatedUserService;

    public UploadService(
            ProjectUploadRepository projectUploadRepository,
            CandidateProjectRepository candidateProjectRepository,
            AuthenticatedUserService authenticatedUserService
    ) {
        this.projectUploadRepository = projectUploadRepository;
        this.candidateProjectRepository = candidateProjectRepository;
        this.authenticatedUserService = authenticatedUserService;
    }

    public UploadResponse uploadZip(Long projectId, MultipartFile file) {
        CandidateProject project = getOwnedProject(projectId);

        validateFile(file);

        String originalFilename = cleanOriginalFilename(file);
        String contentType = normalizeContentType(file.getContentType());

        if (!ALLOWED_CONTENT_TYPES.contains(contentType)) {
            contentType = "application/octet-stream";
        }

        String storedFilename = "project-" + projectId + "-upload-" + UUID.randomUUID() + ".zip";

        Path projectStorageDirectory = STORAGE_ROOT.resolve(String.valueOf(projectId)).normalize();
        Path targetPath = projectStorageDirectory.resolve(storedFilename).normalize();

        try {
            Files.createDirectories(projectStorageDirectory);
            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException exception) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Failed to store uploaded ZIP file"
            );
        }

        ProjectUpload upload = new ProjectUpload();
        upload.setProject(project);
        upload.setOriginalFilename(originalFilename);
        upload.setStoredFilename(storedFilename);
        upload.setContentType(contentType);
        upload.setFileSizeBytes(file.getSize());
        upload.setStoragePath(targetPath.toAbsolutePath().normalize().toString());
        upload.setStatus(UploadStatus.STORED);

        ProjectUpload savedUpload = projectUploadRepository.save(upload);

        return UploadResponse.from(savedUpload);
    }

    @Transactional(readOnly = true)
    public List<UploadResponse> getUploads(Long projectId) {
        CandidateProject project = getOwnedProject(projectId);

        return projectUploadRepository.findByProjectOrderByCreatedAtDesc(project)
                .stream()
                .map(UploadResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public UploadResponse getUpload(Long projectId, Long uploadId) {
        CandidateProject project = getOwnedProject(projectId);
        ProjectUpload upload = getOwnedUpload(project, uploadId);

        return UploadResponse.from(upload);
    }

    public void deleteUpload(Long projectId, Long uploadId) {
        CandidateProject project = getOwnedProject(projectId);
        ProjectUpload upload = getOwnedUpload(project, uploadId);

        try {
            Files.deleteIfExists(Path.of(upload.getStoragePath()));
        } catch (IOException exception) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Failed to delete uploaded ZIP file"
            );
        }

        projectUploadRepository.delete(upload);
    }

    private CandidateProject getOwnedProject(Long projectId) {
        var owner = authenticatedUserService.getCurrentUser();

        return candidateProjectRepository.findByIdAndOwner(projectId, owner)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Project not found"
                ));
    }

    private ProjectUpload getOwnedUpload(CandidateProject project, Long uploadId) {
        return projectUploadRepository.findByIdAndProject(uploadId, project)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Upload not found"
                ));
    }

    private void validateFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "ZIP file is required"
            );
        }

        if (file.getSize() > MAX_FILE_SIZE_BYTES) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "ZIP file size must be 20 MB or less"
            );
        }

        String originalFilename = cleanOriginalFilename(file);

        if (!originalFilename.toLowerCase(Locale.ROOT).endsWith(".zip")) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Only .zip files are allowed"
            );
        }
    }

    private String cleanOriginalFilename(MultipartFile file) {
        String originalFilename = StringUtils.cleanPath(
                Objects.requireNonNullElse(file.getOriginalFilename(), "")
        );

        if (originalFilename.isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Uploaded file must have a filename"
            );
        }

        if (originalFilename.contains("..")) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Filename is invalid"
            );
        }

        return originalFilename;
    }

    private String normalizeContentType(String contentType) {
        if (contentType == null || contentType.isBlank()) {
            return "application/octet-stream";
        }

        return contentType.toLowerCase(Locale.ROOT).trim();
    }
}