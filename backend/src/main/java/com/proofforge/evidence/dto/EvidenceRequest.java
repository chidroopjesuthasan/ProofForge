package com.proofforge.evidence.dto;

import com.proofforge.evidence.EvidenceType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class EvidenceRequest {

    @NotNull(message = "Evidence type is required")
    private EvidenceType type;

    @NotBlank(message = "Evidence title is required")
    @Size(max = 160, message = "Evidence title must be 160 characters or fewer")
    private String title;

    @NotBlank(message = "Evidence URL is required")
    @Size(max = 1000, message = "Evidence URL must be 1000 characters or fewer")
    private String url;

    @Size(max = 2000, message = "Evidence notes must be 2000 characters or fewer")
    private String notes;

    public EvidenceType getType() {
        return type;
    }

    public void setType(EvidenceType type) {
        this.type = type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}