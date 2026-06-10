package com.proofforge.auth.dto;

public record AuthResponse(
    String tokenType,
    String accessToken,
    UserProfileResponse user
) {
}