package com.proofforge.evidence;

import com.proofforge.evidence.dto.EvidenceRequest;
import com.proofforge.evidence.dto.EvidenceResponse;
import com.proofforge.evidence.service.EvidenceService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects/{projectId}/evidence")
public class EvidenceController {

    private final EvidenceService evidenceService;

    public EvidenceController(EvidenceService evidenceService) {
        this.evidenceService = evidenceService;
    }

    @PostMapping
    public ResponseEntity<EvidenceResponse> createEvidence(
            @PathVariable Long projectId,
            @Valid @RequestBody EvidenceRequest request
    ) {
        EvidenceResponse response = evidenceService.createEvidence(projectId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<EvidenceResponse>> getEvidenceForProject(
            @PathVariable Long projectId
    ) {
        return ResponseEntity.ok(evidenceService.getEvidenceForProject(projectId));
    }

    @GetMapping("/{evidenceId}")
    public ResponseEntity<EvidenceResponse> getEvidenceById(
            @PathVariable Long projectId,
            @PathVariable Long evidenceId
    ) {
        return ResponseEntity.ok(evidenceService.getEvidenceById(projectId, evidenceId));
    }

    @PutMapping("/{evidenceId}")
    public ResponseEntity<EvidenceResponse> updateEvidence(
            @PathVariable Long projectId,
            @PathVariable Long evidenceId,
            @Valid @RequestBody EvidenceRequest request
    ) {
        return ResponseEntity.ok(evidenceService.updateEvidence(projectId, evidenceId, request));
    }

    @DeleteMapping("/{evidenceId}")
    public ResponseEntity<Void> deleteEvidence(
            @PathVariable Long projectId,
            @PathVariable Long evidenceId
    ) {
        evidenceService.deleteEvidence(projectId, evidenceId);
        return ResponseEntity.noContent().build();
    }
}