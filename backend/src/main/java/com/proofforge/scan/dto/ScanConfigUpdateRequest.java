package com.proofforge.scan.dto;

import com.proofforge.scan.model.IgnoreMode;

public class ScanConfigUpdateRequest {

    private IgnoreMode ignoreMode;
    private String pfIgnoreContent;
    private Boolean proofmarkEnabled;
    private String proofmarkContent;
    private Boolean respectIgnoreRules;
    private Boolean detectTechStack;
    private Boolean detectImportantFiles;
    private Boolean detectProofmarkedFiles;

    public IgnoreMode getIgnoreMode() {
        return ignoreMode;
    }

    public void setIgnoreMode(IgnoreMode ignoreMode) {
        this.ignoreMode = ignoreMode;
    }

    public String getPfIgnoreContent() {
        return pfIgnoreContent;
    }

    public void setPfIgnoreContent(String pfIgnoreContent) {
        this.pfIgnoreContent = pfIgnoreContent;
    }

    public Boolean getProofmarkEnabled() {
        return proofmarkEnabled;
    }

    public void setProofmarkEnabled(Boolean proofmarkEnabled) {
        this.proofmarkEnabled = proofmarkEnabled;
    }

    public String getProofmarkContent() {
        return proofmarkContent;
    }

    public void setProofmarkContent(String proofmarkContent) {
        this.proofmarkContent = proofmarkContent;
    }

    public Boolean getRespectIgnoreRules() {
        return respectIgnoreRules;
    }

    public void setRespectIgnoreRules(Boolean respectIgnoreRules) {
        this.respectIgnoreRules = respectIgnoreRules;
    }

    public Boolean getDetectTechStack() {
        return detectTechStack;
    }

    public void setDetectTechStack(Boolean detectTechStack) {
        this.detectTechStack = detectTechStack;
    }

    public Boolean getDetectImportantFiles() {
        return detectImportantFiles;
    }

    public void setDetectImportantFiles(Boolean detectImportantFiles) {
        this.detectImportantFiles = detectImportantFiles;
    }

    public Boolean getDetectProofmarkedFiles() {
        return detectProofmarkedFiles;
    }

    public void setDetectProofmarkedFiles(Boolean detectProofmarkedFiles) {
        this.detectProofmarkedFiles = detectProofmarkedFiles;
    }
}