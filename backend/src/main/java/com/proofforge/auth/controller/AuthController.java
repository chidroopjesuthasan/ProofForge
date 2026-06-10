package com.proofforge.auth.controller;

import com.proofforge.auth.dto.AuthResponse;
import com.proofforge.auth.dto.LoginRequest;
import com.proofforge.auth.dto.RegisterRequest;
import com.proofforge.auth.dto.UserProfileResponse;
import com.proofforge.auth.entity.AppUser;
import com.proofforge.auth.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/api/auth/register")
    public AuthResponse register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/api/auth/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @GetMapping("/api/auth/me")
    public UserProfileResponse me(@AuthenticationPrincipal AppUser user) {
        return authService.currentUser(user);
    }
}