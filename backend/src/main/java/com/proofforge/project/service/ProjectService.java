package com.proofforge.project.service;

import com.proofforge.auth.entity.AppUser;
import com.proofforge.project.CandidateProject;
import com.proofforge.project.CandidateProjectRepository;
import com.proofforge.project.ProjectStatus;
import com.proofforge.project.dto.ProjectRequest;
import com.proofforge.project.dto.ProjectResponse;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ProjectService {

    private final CandidateProjectRepository candidateProjectRepository;
    private final AuthenticatedUserService authenticatedUserService;

    public ProjectService(
            CandidateProjectRepository candidateProjectRepository,
            AuthenticatedUserService authenticatedUserService
    ) {
        this.candidateProjectRepository = candidateProjectRepository;
        this.authenticatedUserService = authenticatedUserService;
    }

    @Transactional
    public ProjectResponse create(ProjectRequest request) {
        AppUser owner = authenticatedUserService.getCurrentUser();

        CandidateProject project = new CandidateProject();
        project.setOwner(owner);
        applyRequest(project, request, true);

        CandidateProject savedProject = candidateProjectRepository.save(project);
        return ProjectResponse.from(savedProject);
    }

    @Transactional(readOnly = true)
    public List<ProjectResponse> findAllForCurrentUser() {
        AppUser owner = authenticatedUserService.getCurrentUser();

        return candidateProjectRepository.findByOwnerOrderByUpdatedAtDesc(owner)
                .stream()
                .map(ProjectResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public ProjectResponse findOneForCurrentUser(Long projectId) {
        CandidateProject project = getOwnedProject(projectId);
        return ProjectResponse.from(project);
    }

    @Transactional
    public ProjectResponse update(Long projectId, ProjectRequest request) {
        CandidateProject project = getOwnedProject(projectId);
        applyRequest(project, request, false);

        CandidateProject savedProject = candidateProjectRepository.save(project);
        return ProjectResponse.from(savedProject);
    }

    @Transactional
    public void delete(Long projectId) {
        CandidateProject project = getOwnedProject(projectId);
        candidateProjectRepository.delete(project);
    }

    private CandidateProject getOwnedProject(Long projectId) {
        AppUser owner = authenticatedUserService.getCurrentUser();

        return candidateProjectRepository.findByIdAndOwner(projectId, owner)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found"));
    }

    private void applyRequest(CandidateProject project, ProjectRequest request, boolean creating) {
        project.setTitle(cleanRequired(request.getTitle()));
        project.setDescription(cleanOptional(request.getDescription()));
        project.setGithubUrl(cleanOptional(request.getGithubUrl()));
        project.setDeploymentUrl(cleanOptional(request.getDeploymentUrl()));

        if (request.getStatus() != null) {
            project.setStatus(request.getStatus());
        } else if (creating) {
            project.setStatus(ProjectStatus.DRAFT);
        }
    }

    private String cleanRequired(String value) {
        if (value == null || value.trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Project title is required");
        }

        return value.trim();
    }

    private String cleanOptional(String value) {
        if (value == null) {
            return null;
        }

        String cleaned = value.trim();
        return cleaned.isEmpty() ? null : cleaned;
    }
}