package com.proofforge.scan.service;

import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.regex.Pattern;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

@Service
public class ZipScanAnalyzer {

    private static final int MAX_TEXT_BYTES = 64 * 1024;

    private static final List<String> DEFAULT_IGNORE_RULES = List.of(
            "node_modules/",
            "dist/",
            "build/",
            "target/",
            ".git/",
            ".idea/",
            ".vscode/",
            "runtime/",
            "*.log",
            ".env"
    );

    private static final List<String> IMPORTANT_FILE_NAMES = List.of(
            "package.json",
            "pom.xml",
            "build.gradle",
            "settings.gradle",
            "README.md",
            "readme.md",
            "Dockerfile",
            "docker-compose.yml",
            ".env.example",
            "vite.config.js",
            "vite.config.ts",
            "tailwind.config.js",
            "tailwind.config.ts",
            "index.html"
    );

    public String defaultIgnoreContent() {
        return String.join(System.lineSeparator(), DEFAULT_IGNORE_RULES);
    }

    public Optional<String> readRootTextFile(Path zipPath, String targetFileName) {
        try (ZipFile zipFile = new ZipFile(zipPath.toFile(), StandardCharsets.UTF_8)) {
            List<? extends ZipEntry> entries = zipFile.stream().toList();
            String rootPrefix = detectRootPrefix(entries);

            for (ZipEntry entry : entries) {
                if (entry.isDirectory()) {
                    continue;
                }

                String normalized = stripRootPrefix(normalizeEntryName(entry.getName()), rootPrefix);

                if (normalized.equals(targetFileName)) {
                    return Optional.of(readEntryText(zipFile, entry));
                }
            }

            return Optional.empty();
        } catch (Exception exception) {
            return Optional.empty();
        }
    }

    public ZipScanReport scan(
            Path zipPath,
            String ignoreContent,
            String proofmarkContent,
            boolean proofmarkEnabled,
            boolean respectIgnoreRules,
            boolean detectTechStack,
            boolean detectImportantFiles,
            boolean detectProofmarkedFiles
    ) {
        List<String> warnings = new ArrayList<>();
        List<String> ignoreRules = parseIgnoreRules(ignoreContent);

        if (respectIgnoreRules && ignoreRules.isEmpty()) {
            warnings.add("No ignore rules were available. All ZIP files were considered for scanning.");
        }

        int totalFiles = 0;
                int scannedFiles = 0;
        int ignoredFiles = 0;

        Map<String, Integer> detectedLanguages = new LinkedHashMap<>();
        Set<String> importantFiles = new LinkedHashSet<>();
        Set<String> allFiles = new LinkedHashSet<>();
        Set<String> ignoredFilePaths = new LinkedHashSet<>();
        Set<String> folderPaths = new LinkedHashSet<>();

        try (ZipFile zipFile = new ZipFile(zipPath.toFile(), StandardCharsets.UTF_8)) {
            List<? extends ZipEntry> entries = zipFile.stream().toList();
            String rootPrefix = detectRootPrefix(entries);

            for (ZipEntry entry : entries) {
                String normalizedPath = stripRootPrefix(normalizeEntryName(entry.getName()), rootPrefix);

                if (normalizedPath.isBlank()) {
                    continue;
                }

                if (entry.isDirectory()) {
                    String folderPath = trimTrailingSlash(normalizedPath);

                    if (!folderPath.isBlank()) {
                        folderPaths.add(folderPath);
                    }

                    continue;
                }

                totalFiles++;
                allFiles.add(normalizedPath);
                addParentFolders(folderPaths, normalizedPath);

                boolean ignored = respectIgnoreRules && isIgnored(normalizedPath, ignoreRules);

                if (ignored) {
                    ignoredFiles++;
                    ignoredFilePaths.add(normalizedPath);
                    continue;
                }

                scannedFiles++;

                if (detectTechStack) {
                    detectLanguage(normalizedPath).ifPresent(language ->
                            detectedLanguages.merge(language, 1, Integer::sum)
                    );
                }

                if (detectImportantFiles) {
                    detectImportantFile(normalizedPath).ifPresent(importantFiles::add);
                }
            }
        } catch (Exception exception) {
            warnings.add("ZIP scan failed: " + exception.getMessage());
        }

        if (detectImportantFiles && importantFiles.stream().noneMatch(path -> path.toLowerCase(Locale.ROOT).endsWith("readme.md"))) {
            warnings.add("README.md was not detected in scanned files.");
        }

        ProofmarkReport proofmarkReport = buildProofmarkReport(
                proofmarkContent,
                proofmarkEnabled && detectProofmarkedFiles,
                allFiles,
                ignoredFilePaths
        );

        return new ZipScanReport(
                totalFiles,
                folderPaths.size(),
                scannedFiles,
                ignoredFiles,
                detectedLanguages,
                new ArrayList<>(importantFiles),
                proofmarkReport,
                warnings
        );
    }

    private ProofmarkReport buildProofmarkReport(
            String proofmarkContent,
            boolean enabled,
            Set<String> allFiles,
            Set<String> ignoredFilePaths
    ) {
        if (!enabled) {
            return new ProofmarkReport(false, 0, List.of(), List.of(), List.of());
        }

        List<String> marks = parseProofmarkLines(proofmarkContent);
        List<String> found = new ArrayList<>();
        List<String> missing = new ArrayList<>();
        List<String> ignored = new ArrayList<>();

        for (String mark : marks) {
            Optional<String> exactFile = findMatchingPath(allFiles, mark);

            if (exactFile.isEmpty()) {
                missing.add(mark);
                continue;
            }

            String matchedPath = exactFile.get();

            if (findMatchingPath(ignoredFilePaths, matchedPath).isPresent()) {
                ignored.add(mark);
            } else {
                found.add(mark);
            }
        }

        return new ProofmarkReport(true, marks.size(), found, missing, ignored);
    }

    private List<String> parseProofmarkLines(String content) {
        if (content == null || content.isBlank()) {
            return List.of();
        }

        return Arrays.stream(content.split("\\R"))
                .map(this::normalizeRule)
                .filter(line -> !line.isBlank())
                .filter(line -> !line.startsWith("#"))
                .distinct()
                .toList();
    }

    private Optional<String> findMatchingPath(Set<String> paths, String expectedPath) {
        String normalizedExpected = normalizeRule(expectedPath);

        for (String path : paths) {
            String normalizedActual = normalizeRule(path);

            if (normalizedActual.equals(normalizedExpected)
                    || normalizedActual.endsWith("/" + normalizedExpected)) {
                return Optional.of(path);
            }
        }

        return Optional.empty();
    }

    private List<String> parseIgnoreRules(String ignoreContent) {
        if (ignoreContent == null || ignoreContent.isBlank()) {
            return List.of();
        }

        return Arrays.stream(ignoreContent.split("\\R"))
                .map(this::normalizeRule)
                .filter(rule -> !rule.isBlank())
                .filter(rule -> !rule.startsWith("#"))
                .filter(rule -> !rule.startsWith("!"))
                .distinct()
                .toList();
    }

    private boolean isIgnored(String path, List<String> ignoreRules) {
        String normalizedPath = normalizeRule(path);
        String lowerPath = normalizedPath.toLowerCase(Locale.ROOT);
        String fileName = lowerPath.contains("/")
                ? lowerPath.substring(lowerPath.lastIndexOf("/") + 1)
                : lowerPath;

        for (String rawRule : ignoreRules) {
            String rule = rawRule.toLowerCase(Locale.ROOT);

            if (rule.endsWith("/")) {
                String folderRule = rule.substring(0, rule.length() - 1);

                if (lowerPath.equals(folderRule)
                        || lowerPath.startsWith(folderRule + "/")
                        || lowerPath.contains("/" + folderRule + "/")) {
                    return true;
                }
            }

            if (rule.startsWith("*.")) {
                String suffix = rule.substring(1);

                if (lowerPath.endsWith(suffix)) {
                    return true;
                }
            }

            if (rule.contains("*")) {
                if (wildcardMatches(lowerPath, rule) || wildcardMatches(fileName, rule)) {
                    return true;
                }
            }

            if (lowerPath.equals(rule)
                    || fileName.equals(rule)
                    || lowerPath.endsWith("/" + rule)) {
                return true;
            }
        }

        return false;
    }

    private boolean wildcardMatches(String text, String wildcardPattern) {
        StringBuilder regex = new StringBuilder("^");

        for (char ch : wildcardPattern.toCharArray()) {
            if (ch == '*') {
                regex.append(".*");
            } else {
                regex.append(Pattern.quote(String.valueOf(ch)));
            }
        }

        regex.append("$");

        return Pattern.compile(regex.toString()).matcher(text).matches();
    }

    private void addParentFolders(Set<String> folderPaths, String filePath) {
        String normalizedPath = normalizeRule(filePath);
        int slashIndex = normalizedPath.indexOf("/");

        while (slashIndex > 0) {
            String folderPath = normalizedPath.substring(0, slashIndex);

            if (!folderPath.isBlank()) {
                folderPaths.add(folderPath);
            }

            slashIndex = normalizedPath.indexOf("/", slashIndex + 1);
        }
    }

    private String trimTrailingSlash(String path) {
        if (path == null) {
            return "";
        }

        String normalized = normalizeRule(path);

        while (normalized.endsWith("/")) {
            normalized = normalized.substring(0, normalized.length() - 1);
        }

        return normalized;
    }
    private Optional<String> detectLanguage(String path) {
        String lowerPath = path.toLowerCase(Locale.ROOT);

        if (lowerPath.endsWith(".java")) {
            return Optional.of("Java");
        }

        if (lowerPath.endsWith(".js")) {
            return Optional.of("JavaScript");
        }

        if (lowerPath.endsWith(".jsx")) {
            return Optional.of("React JSX");
        }

        if (lowerPath.endsWith(".ts")) {
            return Optional.of("TypeScript");
        }

        if (lowerPath.endsWith(".tsx")) {
            return Optional.of("React TSX");
        }

        if (lowerPath.endsWith(".py")) {
            return Optional.of("Python");
        }

        if (lowerPath.endsWith(".html")) {
            return Optional.of("HTML");
        }

        if (lowerPath.endsWith(".css")) {
            return Optional.of("CSS");
        }

        if (lowerPath.endsWith(".json")) {
            return Optional.of("JSON");
        }

        if (lowerPath.endsWith(".md")) {
            return Optional.of("Markdown");
        }

        return Optional.empty();
    }

    private Optional<String> detectImportantFile(String path) {
        String fileName = path.contains("/")
                ? path.substring(path.lastIndexOf("/") + 1)
                : path;

        for (String importantFile : IMPORTANT_FILE_NAMES) {
            if (fileName.equalsIgnoreCase(importantFile)) {
                return Optional.of(path);
            }
        }

        return Optional.empty();
    }

    private String readEntryText(ZipFile zipFile, ZipEntry entry) throws Exception {
        try (InputStream inputStream = zipFile.getInputStream(entry);
             ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {

            byte[] buffer = new byte[4096];
            int totalBytes = 0;
            int read;

            while ((read = inputStream.read(buffer)) != -1) {
                totalBytes += read;

                if (totalBytes > MAX_TEXT_BYTES) {
                    break;
                }

                outputStream.write(buffer, 0, read);
            }

            return outputStream.toString(StandardCharsets.UTF_8);
        }
    }

    private String detectRootPrefix(List<? extends ZipEntry> entries) {
        Set<String> rootSegments = new LinkedHashSet<>();
        boolean hasRootFile = false;

        for (ZipEntry entry : entries) {
            String normalized = normalizeEntryName(entry.getName());

            if (normalized.isBlank()) {
                continue;
            }

            int slashIndex = normalized.indexOf("/");

            if (slashIndex < 0) {
                hasRootFile = true;
                break;
            }

            rootSegments.add(normalized.substring(0, slashIndex));
        }

        if (!hasRootFile && rootSegments.size() == 1) {
            return rootSegments.iterator().next() + "/";
        }

        return "";
    }

    private String stripRootPrefix(String path, String rootPrefix) {
        if (rootPrefix == null || rootPrefix.isBlank()) {
            return path;
        }

        if (path.startsWith(rootPrefix)) {
            return path.substring(rootPrefix.length());
        }

        return path;
    }

    private String normalizeEntryName(String name) {
        if (name == null) {
            return "";
        }

        return name
                .replace("\\", "/")
                .replaceAll("^/+", "")
                .trim();
    }

    private String normalizeRule(String rule) {
        if (rule == null) {
            return "";
        }

        return rule
                .replace("\\", "/")
                .replaceAll("^/+", "")
                .trim();
    }

    public record ZipScanReport(
            int totalFiles,
            int totalFolders,
            int scannedFiles,
            int ignoredFiles,
            Map<String, Integer> detectedLanguages,
            List<String> importantFiles,
            ProofmarkReport proofmark,
            List<String> warnings
    ) {
    }

    public record ProofmarkReport(
            boolean enabled,
            int totalMarked,
            List<String> found,
            List<String> missing,
            List<String> ignored
    ) {
    }
}