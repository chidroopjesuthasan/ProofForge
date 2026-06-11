package com.proofforge.scan.entity;

import com.proofforge.scan.model.IgnoreMode;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

import java.time.Instant;

@Entity
@Table(
        name = "upload_scan_configs",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_upload_scan_config_project_upload",
                        columnNames = {"project_id", "upload_id"}
                )
        }
)
public class UploadScanConfig {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "project_id", nullable = false)
    private Long projectId;

    @Column(name = "upload_id", nullable = false)
    private Long uploadId;

    @Enumerated(EnumType.STRING)
    @Column(name = "ignore_mode", nullable = false, length = 40)
    private IgnoreMode ignoreMode = IgnoreMode.GITIGNORE_AUTO;

    @Lob
    @Column(name = "pf_ignore_content")
    private String pfIgnoreContent = "";

    @Column(name = "proofmark_enabled", nullable = false)
    private boolean proofmarkEnabled = false;

    @Lob
    @Column(name = "proofmark_content")
    private String proofmarkContent = "";

    @Column(name = "respect_ignore_rules", nullable = false)
    private boolean respectIgnoreRules = true;

    @Column(name = "detect_tech_stack", nullable = false)
    private boolean detectTechStack = true;

    @Column(name = "detect_important_files", nullable = false)
    private boolean detectImportantFiles = true;

    @Column(name = "detect_proofmarked_files", nullable = false)
    private boolean detectProofmarkedFiles = true;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    @PrePersist
    void onCreate() {
        Instant now = Instant.now();
        this.createdAt = now;
        this.updatedAt = now;
    }

    @PreUpdate
    void onUpdate() {
        this.updatedAt = Instant.now();
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

    public IgnoreMode getIgnoreMode() {
        return ignoreMode;
    }

    public void setIgnoreMode(IgnoreMode ignoreMode) {
        this.ignoreMode = ignoreMode;
    }

    public String getPfIgnoreContent() {
        return pfIgnoreContent;
    }

    public void setPfIgnoreContent(String pfIgnoreContent) {
        this.pfIgnoreContent = pfIgnoreContent;
    }

    public boolean isProofmarkEnabled() {
        return proofmarkEnabled;
    }

    public void setProofmarkEnabled(boolean proofmarkEnabled) {
        this.proofmarkEnabled = proofmarkEnabled;
    }

    public String getProofmarkContent() {
        return proofmarkContent;
    }

    public void setProofmarkContent(String proofmarkContent) {
        this.proofmarkContent = proofmarkContent;
    }

    public boolean isRespectIgnoreRules() {
        return respectIgnoreRules;
    }

    public void setRespectIgnoreRules(boolean respectIgnoreRules) {
        this.respectIgnoreRules = respectIgnoreRules;
    }

    public boolean isDetectTechStack() {
        return detectTechStack;
    }

    public void setDetectTechStack(boolean detectTechStack) {
        this.detectTechStack = detectTechStack;
    }

    public boolean isDetectImportantFiles() {
        return detectImportantFiles;
    }

    public void setDetectImportantFiles(boolean detectImportantFiles) {
        this.detectImportantFiles = detectImportantFiles;
    }

    public boolean isDetectProofmarkedFiles() {
        return detectProofmarkedFiles;
    }

    public void setDetectProofmarkedFiles(boolean detectProofmarkedFiles) {
        this.detectProofmarkedFiles = detectProofmarkedFiles;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }
}