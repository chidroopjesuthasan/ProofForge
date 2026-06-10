package com.proofforge.evidence.service;

import com.proofforge.auth.entity.AppUser;
import com.proofforge.evidence.ProjectEvidence;
import com.proofforge.evidence.ProjectEvidenceRepository;
import com.proofforge.evidence.dto.EvidenceRequest;
import com.proofforge.evidence.dto.EvidenceResponse;
import com.proofforge.project.CandidateProject;
import com.proofforge.project.CandidateProjectRepository;
import com.proofforge.project.service.AuthenticatedUserService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class EvidenceService {

    private final CandidateProjectRepository projectRepository;
    private final ProjectEvidenceRepository evidenceRepository;
    private final AuthenticatedUserService authenticatedUserService;

    public EvidenceService(
            CandidateProjectRepository projectRepository,
            ProjectEvidenceRepository evidenceRepository,
            AuthenticatedUserService authenticatedUserService
    ) {
        this.projectRepository = projectRepository;
        this.evidenceRepository = evidenceRepository;
        this.authenticatedUserService = authenticatedUserService;
    }

    @Transactional
    public EvidenceResponse createEvidence(Long projectId, EvidenceRequest request) {
        CandidateProject project = getOwnedProject(projectId);

        ProjectEvidence evidence = new ProjectEvidence();
        evidence.setProject(project);
        applyRequest(evidence, request);

        ProjectEvidence savedEvidence = evidenceRepository.save(evidence);
        return EvidenceResponse.fromEntity(savedEvidence);
    }

    @Transactional(readOnly = true)
    public List<EvidenceResponse> getEvidenceForProject(Long projectId) {
        CandidateProject project = getOwnedProject(projectId);

        return evidenceRepository.findByProjectOrderByUpdatedAtDesc(project)
                .stream()
                .map(EvidenceResponse::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public EvidenceResponse getEvidenceById(Long projectId, Long evidenceId) {
        CandidateProject project = getOwnedProject(projectId);
        ProjectEvidence evidence = getEvidenceInsideProject(project, evidenceId);

        return EvidenceResponse.fromEntity(evidence);
    }

    @Transactional
    public EvidenceResponse updateEvidence(Long projectId, Long evidenceId, EvidenceRequest request) {
        CandidateProject project = getOwnedProject(projectId);
        ProjectEvidence evidence = getEvidenceInsideProject(project, evidenceId);

        applyRequest(evidence, request);

        ProjectEvidence updatedEvidence = evidenceRepository.save(evidence);
        return EvidenceResponse.fromEntity(updatedEvidence);
    }

    @Transactional
    public void deleteEvidence(Long projectId, Long evidenceId) {
        CandidateProject project = getOwnedProject(projectId);
        ProjectEvidence evidence = getEvidenceInsideProject(project, evidenceId);

        evidenceRepository.delete(evidence);
    }

    private CandidateProject getOwnedProject(Long projectId) {
        AppUser owner = authenticatedUserService.getCurrentUser();

        return projectRepository.findByIdAndOwner(projectId, owner)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found"));
    }

    private ProjectEvidence getEvidenceInsideProject(CandidateProject project, Long evidenceId) {
        return evidenceRepository.findByIdAndProject(evidenceId, project)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Evidence not found"));
    }

    private void applyRequest(ProjectEvidence evidence, EvidenceRequest request) {
        evidence.setType(request.getType());
        evidence.setTitle(request.getTitle().trim());
        evidence.setUrl(request.getUrl().trim());

        if (request.getNotes() == null || request.getNotes().isBlank()) {
            evidence.setNotes(null);
        } else {
            evidence.setNotes(request.getNotes().trim());
        }
    }
}