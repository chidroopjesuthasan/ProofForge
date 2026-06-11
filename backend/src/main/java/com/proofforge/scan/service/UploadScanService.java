package com.proofforge.scan.service;

import com.proofforge.scan.dto.ScanConfigResponse;
import com.proofforge.scan.dto.ScanConfigUpdateRequest;
import com.proofforge.scan.dto.ScanResultResponse;
import com.proofforge.scan.entity.UploadScanConfig;
import com.proofforge.scan.entity.UploadScanResult;
import com.proofforge.scan.model.IgnoreMode;
import com.proofforge.scan.repository.UploadScanConfigRepository;
import com.proofforge.scan.repository.UploadScanResultRepository;
import com.proofforge.scan.service.UploadScanAccessService.ResolvedUpload;
import com.proofforge.scan.service.ZipScanAnalyzer.ProofmarkReport;
import com.proofforge.scan.service.ZipScanAnalyzer.ZipScanReport;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@Service
public class UploadScanService {

    private final UploadScanAccessService accessService;
    private final ZipScanAnalyzer zipScanAnalyzer;
    private final UploadScanConfigRepository configRepository;
    private final UploadScanResultRepository resultRepository;

    public UploadScanService(
            UploadScanAccessService accessService,
            ZipScanAnalyzer zipScanAnalyzer,
            UploadScanConfigRepository configRepository,
            UploadScanResultRepository resultRepository
    ) {
        this.accessService = accessService;
        this.zipScanAnalyzer = zipScanAnalyzer;
        this.configRepository = configRepository;
        this.resultRepository = resultRepository;
    }

    @Transactional
    public ScanConfigResponse getOrCreateConfig(Long projectId, Long uploadId) {
        ResolvedUpload upload = accessService.resolveOwnedUpload(projectId, uploadId);

        UploadScanConfig config = configRepository
                .findByProjectIdAndUploadId(projectId, uploadId)
                .orElseGet(() -> createDefaultConfig(upload));

        return ScanConfigResponse.from(config);
    }

    @Transactional
    public ScanConfigResponse updateConfig(
            Long projectId,
            Long uploadId,
            ScanConfigUpdateRequest request
    ) {
        ResolvedUpload upload = accessService.resolveOwnedUpload(projectId, uploadId);

        UploadScanConfig config = configRepository
                .findByProjectIdAndUploadId(projectId, uploadId)
                .orElseGet(() -> createDefaultConfig(upload));

        if (request.getIgnoreMode() != null) {
            config.setIgnoreMode(request.getIgnoreMode());
        }

        if (request.getPfIgnoreContent() != null) {
            config.setPfIgnoreContent(request.getPfIgnoreContent());
        }

        if (request.getProofmarkEnabled() != null) {
            config.setProofmarkEnabled(request.getProofmarkEnabled());
        }

        if (request.getProofmarkContent() != null) {
            config.setProofmarkContent(request.getProofmarkContent());
        }

        if (request.getRespectIgnoreRules() != null) {
            config.setRespectIgnoreRules(request.getRespectIgnoreRules());
        }

        if (request.getDetectTechStack() != null) {
            config.setDetectTechStack(request.getDetectTechStack());
        }

        if (request.getDetectImportantFiles() != null) {
            config.setDetectImportantFiles(request.getDetectImportantFiles());
        }

        if (request.getDetectProofmarkedFiles() != null) {
            config.setDetectProofmarkedFiles(request.getDetectProofmarkedFiles());
        }

        refreshIgnoreContentIfNeeded(config, upload);

        UploadScanConfig saved = configRepository.save(config);

        return ScanConfigResponse.from(saved);
    }

    @Transactional
    public ScanResultResponse runScan(Long projectId, Long uploadId) {
        ResolvedUpload upload = accessService.resolveOwnedUpload(projectId, uploadId);

        UploadScanConfig config = configRepository
                .findByProjectIdAndUploadId(projectId, uploadId)
                .orElseGet(() -> createDefaultConfig(upload));

        refreshIgnoreContentIfNeeded(config, upload);

        String effectiveIgnoreContent = resolveEffectiveIgnoreContent(config, upload);

        ZipScanReport report = zipScanAnalyzer.scan(
                upload.filePath(),
                effectiveIgnoreContent,
                config.getProofmarkContent(),
                config.isProofmarkEnabled(),
                config.isRespectIgnoreRules(),
                config.isDetectTechStack(),
                config.isDetectImportantFiles(),
                config.isDetectProofmarkedFiles()
        );

        UploadScanResult result = new UploadScanResult();
        result.setProjectId(projectId);
        result.setUploadId(uploadId);
        result.setConfigId(config.getId());
        result.setTotalFiles(report.totalFiles());
        result.setTotalFolders(report.totalFolders());
        result.setScannedFiles(report.scannedFiles());
        result.setIgnoredFiles(report.ignoredFiles());
        result.setDetectedLanguagesJson(toJson(report.detectedLanguages()));
        result.setImportantFilesJson(toJson(report.importantFiles()));
        result.setProofmarkResultJson(toJson(report.proofmark()));
        result.setWarningsJson(toJson(report.warnings()));

        UploadScanResult saved = resultRepository.save(result);

        return ScanResultResponse.from(saved);
    }

    @Transactional(readOnly = true)
    public ScanResultResponse getLatestScan(Long projectId, Long uploadId) {
        accessService.resolveOwnedUpload(projectId, uploadId);

        return resultRepository
                .findTopByProjectIdAndUploadIdOrderByCreatedAtDesc(projectId, uploadId)
                .map(ScanResultResponse::from)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "No scan result found for this upload"
                ));
    }

    private UploadScanConfig createDefaultConfig(ResolvedUpload upload) {
        UploadScanConfig config = new UploadScanConfig();
        config.setProjectId(upload.projectId());
        config.setUploadId(upload.uploadId());
        config.setProofmarkEnabled(false);
        config.setProofmarkContent("");
        config.setRespectIgnoreRules(true);
        config.setDetectTechStack(true);
        config.setDetectImportantFiles(true);
        config.setDetectProofmarkedFiles(true);

        String gitignoreContent = zipScanAnalyzer
                .readRootTextFile(upload.filePath(), ".gitignore")
                .orElse("");

        if (hasText(gitignoreContent)) {
            config.setIgnoreMode(IgnoreMode.GITIGNORE_AUTO);
            config.setPfIgnoreContent(gitignoreContent);
        } else {
            config.setIgnoreMode(IgnoreMode.PROOFFORGE_DEFAULT);
            config.setPfIgnoreContent(zipScanAnalyzer.defaultIgnoreContent());
        }

        return configRepository.save(config);
    }

    private void refreshIgnoreContentIfNeeded(UploadScanConfig config, ResolvedUpload upload) {
        if (config.getIgnoreMode() == IgnoreMode.PROOFFORGE_DEFAULT) {
            config.setPfIgnoreContent(zipScanAnalyzer.defaultIgnoreContent());
            return;
        }

        if (config.getIgnoreMode() == IgnoreMode.GITIGNORE_AUTO && !hasText(config.getPfIgnoreContent())) {
            String gitignoreContent = zipScanAnalyzer
                    .readRootTextFile(upload.filePath(), ".gitignore")
                    .orElse("");

            if (hasText(gitignoreContent)) {
                config.setPfIgnoreContent(gitignoreContent);
            } else {
                config.setPfIgnoreContent(zipScanAnalyzer.defaultIgnoreContent());
            }
        }
    }

    private String resolveEffectiveIgnoreContent(UploadScanConfig config, ResolvedUpload upload) {
        if (!config.isRespectIgnoreRules()) {
            return "";
        }

        if (config.getIgnoreMode() == IgnoreMode.PROOFFORGE_DEFAULT) {
            return zipScanAnalyzer.defaultIgnoreContent();
        }

        if (config.getIgnoreMode() == IgnoreMode.GITIGNORE_AUTO && !hasText(config.getPfIgnoreContent())) {
            return zipScanAnalyzer
                    .readRootTextFile(upload.filePath(), ".gitignore")
                    .orElse(zipScanAnalyzer.defaultIgnoreContent());
        }

        return config.getPfIgnoreContent();
    }

    private String toJson(Object value) {
        if (value == null) {
            return "{}";
        }

        if (value instanceof Map<?, ?> map) {
            return toJsonMap(map);
        }

        if (value instanceof List<?> list) {
            return toJsonList(list);
        }

        if (value instanceof ProofmarkReport proofmark) {
            return toProofmarkJson(proofmark);
        }

        return "\"" + escapeJson(String.valueOf(value)) + "\"";
    }

    private String toJsonMap(Map<?, ?> values) {
        if (values == null || values.isEmpty()) {
            return "{}";
        }

        StringBuilder json = new StringBuilder("{");
        boolean first = true;

        for (Map.Entry<?, ?> entry : values.entrySet()) {
            if (!first) {
                json.append(",");
            }

            json.append("\"")
                    .append(escapeJson(String.valueOf(entry.getKey())))
                    .append("\":");

            Object mapValue = entry.getValue();

            if (mapValue instanceof Number || mapValue instanceof Boolean) {
                json.append(mapValue);
            } else {
                json.append("\"")
                        .append(escapeJson(String.valueOf(mapValue)))
                        .append("\"");
            }

            first = false;
        }

        json.append("}");

        return json.toString();
    }

    private String toJsonList(List<?> values) {
        if (values == null || values.isEmpty()) {
            return "[]";
        }

        StringBuilder json = new StringBuilder("[");
        boolean first = true;

        for (Object value : values) {
            if (!first) {
                json.append(",");
            }

            json.append("\"")
                    .append(escapeJson(String.valueOf(value)))
                    .append("\"");

            first = false;
        }

        json.append("]");

        return json.toString();
    }

    private String toProofmarkJson(ProofmarkReport proofmark) {
        if (proofmark == null) {
            return "{}";
        }

        return "{"
                + "\"enabled\":" + proofmark.enabled()
                + ",\"totalMarked\":" + proofmark.totalMarked()
                + ",\"found\":" + toJsonList(proofmark.found())
                + ",\"missing\":" + toJsonList(proofmark.missing())
                + ",\"ignored\":" + toJsonList(proofmark.ignored())
                + "}";
    }

    private String escapeJson(String value) {
        if (value == null) {
            return "";
        }

        StringBuilder escaped = new StringBuilder();

        for (int index = 0; index < value.length(); index++) {
            char character = value.charAt(index);

            switch (character) {
                case '"' -> escaped.append("\\\"");
                case '\\' -> escaped.append("\\\\");
                case '\b' -> escaped.append("\\b");
                case '\f' -> escaped.append("\\f");
                case '\n' -> escaped.append("\\n");
                case '\r' -> escaped.append("\\r");
                case '\t' -> escaped.append("\\t");
                default -> {
                    if (character < 32) {
                        escaped.append(String.format("\\u%04x", (int) character));
                    } else {
                        escaped.append(character);
                    }
                }
            }
        }

        return escaped.toString();
    }
    private boolean hasText(String value) {
        return value != null && !value.isBlank();
    }
}