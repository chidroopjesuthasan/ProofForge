package com.proofforge.project.service;

import com.proofforge.auth.entity.AppUser;
import com.proofforge.auth.repository.AppUserRepository;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class AuthenticatedUserService {

    private final AppUserRepository appUserRepository;

    public AuthenticatedUserService(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    public AppUser getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new AccessDeniedException("Authentication is required");
        }

        Object principal = authentication.getPrincipal();

        if ("anonymousUser".equals(principal)) {
            throw new AccessDeniedException("Authentication is required");
        }

        if (principal instanceof AppUser appUser) {
            return appUser;
        }

        String email = extractEmail(authentication, principal);

        return appUserRepository.findByEmail(email)
                .orElseThrow(() -> new AccessDeniedException("Authenticated user was not found"));
    }

    private String extractEmail(Authentication authentication, Object principal) {
        if (principal instanceof UserDetails userDetails) {
            return userDetails.getUsername();
        }

        if (principal instanceof String value && !value.isBlank()) {
            return value;
        }

        if (authentication.getName() != null && !authentication.getName().isBlank()) {
            return authentication.getName();
        }

        throw new AccessDeniedException("Authenticated user identity was not found");
    }
}