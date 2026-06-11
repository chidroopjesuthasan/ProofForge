package com.proofforge.scan.repository;

import com.proofforge.scan.entity.UploadScanConfig;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UploadScanConfigRepository extends JpaRepository<UploadScanConfig, Long> {

    Optional<UploadScanConfig> findByProjectIdAndUploadId(Long projectId, Long uploadId);
}