package com.proofforge.project;

import com.proofforge.auth.entity.AppUser;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidateProjectRepository extends JpaRepository<CandidateProject, Long> {

    List<CandidateProject> findByOwnerOrderByUpdatedAtDesc(AppUser owner);

    Optional<CandidateProject> findByIdAndOwner(Long id, AppUser owner);
}