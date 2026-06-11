package com.proofforge.scan.repository;

import com.proofforge.scan.entity.UploadScanResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UploadScanResultRepository extends JpaRepository<UploadScanResult, Long> {

    Optional<UploadScanResult> findTopByProjectIdAndUploadIdOrderByCreatedAtDesc(Long projectId, Long uploadId);
}