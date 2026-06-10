package com.proofforge.evidence.dto;

import com.proofforge.evidence.EvidenceType;
import com.proofforge.evidence.ProjectEvidence;

import java.time.Instant;

public class EvidenceResponse {

    private Long id;
    private Long projectId;
    private EvidenceType type;
    private String title;
    private String url;
    private String notes;
    private Instant createdAt;
    private Instant updatedAt;

    public EvidenceResponse() {
    }

    public static EvidenceResponse fromEntity(ProjectEvidence evidence) {
        EvidenceResponse response = new EvidenceResponse();
        response.setId(evidence.getId());
        response.setProjectId(evidence.getProject().getId());
        response.setType(evidence.getType());
        response.setTitle(evidence.getTitle());
        response.setUrl(evidence.getUrl());
        response.setNotes(evidence.getNotes());
        response.setCreatedAt(evidence.getCreatedAt());
        response.setUpdatedAt(evidence.getUpdatedAt());
        return response;
    }

    public Long getId() {
        return id;
    }

    public Long getProjectId() {
        return projectId;
    }

    public EvidenceType getType() {
        return type;
    }

    public String getTitle() {
        return title;
    }

    public String getUrl() {
        return url;
    }

    public String getNotes() {
        return notes;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public void setType(EvidenceType type) {
        this.type = type;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }
}