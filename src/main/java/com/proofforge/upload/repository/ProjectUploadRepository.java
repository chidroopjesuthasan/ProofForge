package com.proofforge.upload.repository;

import com.proofforge.project.entity.CandidateProject;
import com.proofforge.upload.entity.ProjectUpload;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProjectUploadRepository extends JpaRepository<ProjectUpload, Long> {

    List<ProjectUpload> findByProjectOrderByCreatedAtDesc(CandidateProject project);

    Optional<ProjectUpload> findByIdAndProject(Long id, CandidateProject project);
}
