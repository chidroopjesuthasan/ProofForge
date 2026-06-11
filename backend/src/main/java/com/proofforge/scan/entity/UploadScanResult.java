package com.proofforge.scan.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

import java.time.Instant;

@Entity
@Table(name = "upload_scan_results")
public class UploadScanResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "project_id", nullable = false)
    private Long projectId;

    @Column(name = "upload_id", nullable = false)
    private Long uploadId;

    @Column(name = "config_id", nullable = false)
    private Long configId;

    @Column(name = "total_files", nullable = false)
    private int totalFiles;

    @Column(name = "total_folders", nullable = false)
    private int totalFolders;

    @Column(name = "scanned_files", nullable = false)
    private int scannedFiles;

    @Column(name = "ignored_files", nullable = false)
    private int ignoredFiles;

    @Lob
    @Column(name = "detected_languages_json")
    private String detectedLanguagesJson = "{}";

    @Lob
    @Column(name = "important_files_json")
    private String importantFilesJson = "[]";

    @Lob
    @Column(name = "proofmark_result_json")
    private String proofmarkResultJson = "{}";

    @Lob
    @Column(name = "warnings_json")
    private String warningsJson = "[]";

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @PrePersist
    void onCreate() {
        this.createdAt = Instant.now();
    }

    public Long getId() {
        return id;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public Long getUploadId() {
        return uploadId;
    }

    public void setUploadId(Long uploadId) {
        this.uploadId = uploadId;
    }

    public Long getConfigId() {
        return configId;
    }

    public void setConfigId(Long configId) {
        this.configId = configId;
    }

    public int getTotalFiles() {
        return totalFiles;
    }

    public void setTotalFiles(int totalFiles) {
        this.totalFiles = totalFiles;
    }

    public int getTotalFolders() {
        return totalFolders;
    }

    public void setTotalFolders(int totalFolders) {
        this.totalFolders = totalFolders;
    }

    public int getScannedFiles() {
        return scannedFiles;
    }

    public void setScannedFiles(int scannedFiles) {
        this.scannedFiles = scannedFiles;
    }

    public int getIgnoredFiles() {
        return ignoredFiles;
    }

    public void setIgnoredFiles(int ignoredFiles) {
        this.ignoredFiles = ignoredFiles;
    }

    public String getDetectedLanguagesJson() {
        return detectedLanguagesJson;
    }

    public void setDetectedLanguagesJson(String detectedLanguagesJson) {
        this.detectedLanguagesJson = detectedLanguagesJson;
    }

    public String getImportantFilesJson() {
        return importantFilesJson;
    }

    public void setImportantFilesJson(String importantFilesJson) {
        this.importantFilesJson = importantFilesJson;
    }

    public String getProofmarkResultJson() {
        return proofmarkResultJson;
    }

    public void setProofmarkResultJson(String proofmarkResultJson) {
        this.proofmarkResultJson = proofmarkResultJson;
    }

    public String getWarningsJson() {
        return warningsJson;
    }

    public void setWarningsJson(String warningsJson) {
        this.warningsJson = warningsJson;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}