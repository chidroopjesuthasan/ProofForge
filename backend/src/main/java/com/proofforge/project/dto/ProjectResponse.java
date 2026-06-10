package com.proofforge.project.dto;

import com.proofforge.project.CandidateProject;
import com.proofforge.project.ProjectStatus;
import java.time.LocalDateTime;

public class ProjectResponse {

    private Long id;
    private String title;
    private String description;
    private String githubUrl;
    private String deploymentUrl;
    private ProjectStatus status;
    private String ownerEmail;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public ProjectResponse() {
    }

    public ProjectResponse(
            Long id,
            String title,
            String description,
            String githubUrl,
            String deploymentUrl,
            ProjectStatus status,
            String ownerEmail,
            LocalDateTime createdAt,
            LocalDateTime updatedAt
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.githubUrl = githubUrl;
        this.deploymentUrl = deploymentUrl;
        this.status = status;
        this.ownerEmail = ownerEmail;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static ProjectResponse from(CandidateProject project) {
        String email = project.getOwner() == null ? null : project.getOwner().getEmail();

        return new ProjectResponse(
                project.getId(),
                project.getTitle(),
                project.getDescription(),
                project.getGithubUrl(),
                project.getDeploymentUrl(),
                project.getStatus(),
                email,
                project.getCreatedAt(),
                project.getUpdatedAt()
        );
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getGithubUrl() {
        return githubUrl;
    }

    public String getDeploymentUrl() {
        return deploymentUrl;
    }

    public ProjectStatus getStatus() {
        return status;
    }

    public String getOwnerEmail() {
        return ownerEmail;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}