package com.proofforge.scan.service;

import com.proofforge.project.service.AuthenticatedUserService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.lang.reflect.Method;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Objects;

@Service
public class UploadScanAccessService {

    private final EntityManager entityManager;
    private final AuthenticatedUserService authenticatedUserService;

    public UploadScanAccessService(
            EntityManager entityManager,
            AuthenticatedUserService authenticatedUserService
    ) {
        this.entityManager = entityManager;
        this.authenticatedUserService = authenticatedUserService;
    }

    @Transactional(readOnly = true)
    public ResolvedUpload resolveOwnedUpload(Long projectId, Long uploadId) {
        Object currentUser = authenticatedUserService.getCurrentUser();
        Long currentUserId = toLong(invokeFirstRequired(currentUser, "getId"));

        Object upload = findUploadEntity(uploadId);
        Object project = invokeFirstOptional(upload, "getProject");

        if (project == null) {
            throw notFound();
        }

        Long actualProjectId = toLong(invokeFirstRequired(project, "getId"));

        if (!Objects.equals(projectId, actualProjectId)) {
            throw notFound();
        }

        Long ownerId = extractOwnerId(project);

        if (ownerId == null) {
            ownerId = extractOwnerId(upload);
        }

        if (ownerId == null || !Objects.equals(ownerId, currentUserId)) {
            throw notFound();
        }

        String storagePath = toStringOrNull(invokeFirstOptional(
                upload,
                "getStoragePath",
                "getFilePath",
                "getPath",
                "getStoredFilePath",
                "getUploadPath"
        ));

        String storedFileName = toStringOrNull(invokeFirstOptional(
                upload,
                "getStoredFileName",
                "getStoredFilename",
                "getSavedFileName",
                "getSavedFilename"
        ));

        String originalFileName = toStringOrNull(invokeFirstOptional(
                upload,
                "getOriginalFileName",
                "getOriginalFilename",
                "getFileName",
                "getFilename",
                "getName"
        ));

        Path filePath = resolveZipPath(storagePath, storedFileName, originalFileName, projectId, uploadId);

        return new ResolvedUpload(projectId, uploadId, filePath, originalFileName);
    }

    private Object findUploadEntity(Long uploadId) {
        String entityName = findUploadEntityName();

        List<?> result = entityManager
                .createQuery("select u from " + entityName + " u where u.id = :id")
                .setParameter("id", uploadId)
                .setMaxResults(1)
                .getResultList();

        if (result.isEmpty()) {
            throw notFound();
        }

        return result.get(0);
    }

    private String findUploadEntityName() {
        EntityType<?> fallbackCandidate = null;

        for (EntityType<?> entityType : entityManager.getMetamodel().getEntities()) {
            Class<?> javaType = entityType.getJavaType();
            String simpleName = javaType.getSimpleName().toLowerCase(Locale.ROOT);
            String packageName = javaType.getPackageName().toLowerCase(Locale.ROOT);

            if (packageName.contains(".scan.") || simpleName.contains("scan")) {
                continue;
            }

            if (simpleName.equals("projectupload")) {
                return entityType.getName();
            }

            boolean looksLikeUpload = simpleName.equals("upload")
                    || simpleName.endsWith("upload")
                    || simpleName.contains("upload");

            if (!looksLikeUpload) {
                continue;
            }

            boolean hasProjectMethod = hasNoArgMethod(javaType, "getProject");
            boolean hasFilenameMethod = hasNoArgMethod(
                    javaType,
                    "getStoredFileName",
                    "getStoredFilename",
                    "getOriginalFileName",
                    "getOriginalFilename",
                    "getFileName",
                    "getFilename"
            );

            if (hasProjectMethod && hasFilenameMethod) {
                return entityType.getName();
            }

            if (hasProjectMethod && fallbackCandidate == null) {
                fallbackCandidate = entityType;
            }

            if (fallbackCandidate == null) {
                fallbackCandidate = entityType;
            }
        }

        if (fallbackCandidate != null) {
            return fallbackCandidate.getName();
        }

        throw new ResponseStatusException(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Could not locate upload entity for ZIP scanning"
        );
    }

    private boolean hasNoArgMethod(Class<?> type, String... methodNames) {
        for (String methodName : methodNames) {
            try {
                type.getMethod(methodName);
                return true;
            } catch (NoSuchMethodException ignored) {
                // Try the next method name.
            }
        }

        return false;
    }
    private Long extractOwnerId(Object target) {
        Object owner = invokeFirstOptional(
                target,
                "getOwner",
                "getUser",
                "getCreatedBy",
                "getCreatedByUser",
                "getCandidate",
                "getAccount"
        );

        if (owner == null) {
            return null;
        }

        Object id = invokeFirstOptional(owner, "getId");

        return toLong(id);
    }

    private Path resolveZipPath(
            String storagePath,
            String storedFileName,
            String originalFileName,
            Long projectId,
            Long uploadId
    ) {
        List<Path> candidates = new ArrayList<>();
        Path backendDir = Paths.get("").toAbsolutePath().normalize();
        Path projectRoot = backendDir.getParent();

        if (storagePath != null && !storagePath.isBlank()) {
            Path raw = Paths.get(storagePath);

            if (raw.isAbsolute()) {
                candidates.add(raw.normalize());
            } else {
                candidates.add(backendDir.resolve(storagePath).normalize());

                if (projectRoot != null) {
                    candidates.add(projectRoot.resolve(storagePath).normalize());
                }

                String withoutBackendPrefix = storagePath
                        .replace("\\", "/")
                        .replaceFirst("^backend/", "");

                candidates.add(backendDir.resolve(withoutBackendPrefix).normalize());
            }
        }

        for (Path candidate : candidates) {
            if (Files.isRegularFile(candidate)) {
                return candidate;
            }
        }

        Path runtimeUploads = backendDir
                .resolve("runtime")
                .resolve("uploads")
                .resolve("projects")
                .normalize();

        Path found = searchRuntimeUploads(runtimeUploads, storedFileName, originalFileName, projectId, uploadId);

        if (found != null) {
            return found;
        }

        throw new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Uploaded ZIP file was not found on disk"
        );
    }

    private Path searchRuntimeUploads(
            Path runtimeUploads,
            String storedFileName,
            String originalFileName,
            Long projectId,
            Long uploadId
    ) {
        if (!Files.exists(runtimeUploads)) {
            return null;
        }

        try (var paths = Files.walk(runtimeUploads, 8)) {
            return paths
                    .filter(Files::isRegularFile)
                    .filter(path -> path.toString().toLowerCase(Locale.ROOT).endsWith(".zip"))
                    .filter(path -> pathMatchesUpload(path, storedFileName, originalFileName, projectId, uploadId))
                    .findFirst()
                    .orElse(null);
        } catch (Exception exception) {
            return null;
        }
    }

    private boolean pathMatchesUpload(
            Path path,
            String storedFileName,
            String originalFileName,
            Long projectId,
            Long uploadId
    ) {
        String normalizedPath = path.toString().replace("\\", "/").toLowerCase(Locale.ROOT);
        String fileName = path.getFileName().toString();

        if (storedFileName != null && fileName.equalsIgnoreCase(storedFileName)) {
            return true;
        }

        if (originalFileName != null && fileName.equalsIgnoreCase(originalFileName)) {
            return true;
        }

        return normalizedPath.contains("/" + projectId + "/")
                || normalizedPath.contains("/" + uploadId + "/");
    }

    private Object invokeFirstRequired(Object target, String... methodNames) {
        Object value = invokeFirstOptional(target, methodNames);

        if (value == null) {
            throw notFound();
        }

        return value;
    }

    private Object invokeFirstOptional(Object target, String... methodNames) {
        if (target == null) {
            return null;
        }

        for (String methodName : methodNames) {
            try {
                Method method = target.getClass().getMethod(methodName);
                return method.invoke(target);
            } catch (Exception ignored) {
                // Try the next compatible method name.
            }
        }

        return null;
    }

    private Long toLong(Object value) {
        if (value == null) {
            return null;
        }

        if (value instanceof Number number) {
            return number.longValue();
        }

        try {
            return Long.parseLong(String.valueOf(value));
        } catch (NumberFormatException exception) {
            return null;
        }
    }

    private String toStringOrNull(Object value) {
        if (value == null) {
            return null;
        }

        String text = String.valueOf(value);

        if (text.isBlank()) {
            return null;
        }

        return text;
    }

    private ResponseStatusException notFound() {
        return new ResponseStatusException(HttpStatus.NOT_FOUND, "Upload not found");
    }

    public record ResolvedUpload(
            Long projectId,
            Long uploadId,
            Path filePath,
            String originalFileName
    ) {
    }
}