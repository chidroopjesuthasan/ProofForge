package com.proofforge.upload.entity;

import com.proofforge.project.CandidateProject;
import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "project_uploads")
public class ProjectUpload {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "project_id", nullable = false)
    private CandidateProject project;

    @Column(nullable = false, length = 255)
    private String originalFilename;

    @Column(nullable = false, length = 255)
    private String storedFilename;

    @Column(nullable = false, length = 100)
    private String contentType;

    @Column(nullable = false)
    private Long fileSizeBytes;

    @Column(nullable = false, length = 1000)
    private String storagePath;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private UploadStatus status = UploadStatus.STORED;

    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    public ProjectUpload() {
    }

    @PrePersist
    public void onCreate() {
        if (createdAt == null) {
            createdAt = Instant.now();
        }

        if (status == null) {
            status = UploadStatus.STORED;
        }
    }

    public Long getId() {
        return id;
    }

    public CandidateProject getProject() {
        return project;
    }

    public void setProject(CandidateProject project) {
        this.project = project;
    }

    public String getOriginalFilename() {
        return originalFilename;
    }

    public void setOriginalFilename(String originalFilename) {
        this.originalFilename = originalFilename;
    }

    public String getStoredFilename() {
        return storedFilename;
    }

    public void setStoredFilename(String storedFilename) {
        this.storedFilename = storedFilename;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public Long getFileSizeBytes() {
        return fileSizeBytes;
    }

    public void setFileSizeBytes(Long fileSizeBytes) {
        this.fileSizeBytes = fileSizeBytes;
    }

    public String getStoragePath() {
        return storagePath;
    }

    public void setStoragePath(String storagePath) {
        this.storagePath = storagePath;
    }

    public UploadStatus getStatus() {
        return status;
    }

    public void setStatus(UploadStatus status) {
        this.status = status;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}