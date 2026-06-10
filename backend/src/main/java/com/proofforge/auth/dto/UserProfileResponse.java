package com.proofforge.auth.dto;

public record UserProfileResponse(
    Long id,
    String fullName,
    String email,
    String avatarUrl,
    String provider,
    String role
) {
}