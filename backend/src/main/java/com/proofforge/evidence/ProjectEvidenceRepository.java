package com.proofforge.evidence;

import com.proofforge.project.CandidateProject;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProjectEvidenceRepository extends JpaRepository<ProjectEvidence, Long> {

    List<ProjectEvidence> findByProjectOrderByUpdatedAtDesc(CandidateProject project);

    Optional<ProjectEvidence> findByIdAndProject(Long id, CandidateProject project);
}