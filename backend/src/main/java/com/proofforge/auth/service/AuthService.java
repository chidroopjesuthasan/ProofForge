package com.proofforge.auth.service;

import com.proofforge.auth.dto.AuthResponse;
import com.proofforge.auth.dto.LoginRequest;
import com.proofforge.auth.dto.RegisterRequest;
import com.proofforge.auth.dto.UserProfileResponse;
import com.proofforge.auth.entity.AppUser;
import com.proofforge.auth.entity.AuthProvider;
import com.proofforge.auth.entity.UserRole;
import com.proofforge.auth.repository.AppUserRepository;
import com.proofforge.auth.security.JwtService;
import com.proofforge.common.exception.BadRequestException;
import java.util.Map;
import java.util.Optional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final AppUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
        AppUserRepository userRepository,
        PasswordEncoder passwordEncoder,
        JwtService jwtService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        String email = normalizeEmail(request.email());

        if (userRepository.existsByEmailIgnoreCase(email)) {
            throw new BadRequestException("An account already exists with this email.");
        }

        AppUser user = new AppUser();
        user.setFullName(request.fullName().trim());
        user.setEmail(email);
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setProvider(AuthProvider.LOCAL);
        user.setProviderUserId(null);
        user.setEmailVerified(false);
        user.setRole(UserRole.CANDIDATE);

        AppUser saved = userRepository.save(user);

        return buildAuthResponse(saved);
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        String email = normalizeEmail(request.email());

        AppUser user = userRepository.findByEmailIgnoreCase(email)
            .orElseThrow(() -> new BadRequestException("Invalid email or password."));

        if (user.getProvider() != AuthProvider.LOCAL) {
            throw new BadRequestException("This account uses " + user.getProvider().name() + " login.");
        }

        if (user.getPasswordHash() == null || !passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new BadRequestException("Invalid email or password.");
        }

        return buildAuthResponse(user);
    }

    @Transactional
    public AuthResponse oauthLogin(String providerName, Map<String, Object> attributes) {
        AuthProvider provider = AuthProvider.valueOf(providerName.toUpperCase());

        OAuthIdentity identity = extractIdentity(provider, attributes);

        Optional<AppUser> existingUser =
            userRepository.findByProviderAndProviderUserId(provider, identity.providerUserId());

        AppUser user = existingUser.orElseGet(() -> createOAuthUser(provider, identity));

        user.setFullName(identity.fullName());
        user.setAvatarUrl(identity.avatarUrl());

        if (identity.email() != null && !identity.email().isBlank()) {
            user.setEmail(normalizeEmail(identity.email()));
            user.setEmailVerified(identity.emailVerified());
        }

        AppUser saved = userRepository.save(user);

        return buildAuthResponse(saved);
    }

    @Transactional(readOnly = true)
    public UserProfileResponse currentUser(AppUser user) {
        return toProfile(user);
    }

    private AppUser createOAuthUser(AuthProvider provider, OAuthIdentity identity) {
        AppUser user = new AppUser();
        user.setFullName(identity.fullName());
        user.setEmail(identity.email() == null ? null : normalizeEmail(identity.email()));
        user.setProvider(provider);
        user.setProviderUserId(identity.providerUserId());
        user.setAvatarUrl(identity.avatarUrl());
        user.setPasswordHash(null);
        user.setEmailVerified(identity.emailVerified());
        user.setRole(UserRole.CANDIDATE);
        return user;
    }

    private OAuthIdentity extractIdentity(AuthProvider provider, Map<String, Object> attributes) {
        if (provider == AuthProvider.GOOGLE) {
            String providerUserId = stringValue(attributes.get("sub"));
            String email = stringValue(attributes.get("email"));
            String name = fallback(stringValue(attributes.get("name")), email);
            String avatarUrl = stringValue(attributes.get("picture"));
            boolean emailVerified = Boolean.TRUE.equals(attributes.get("email_verified"));

            return new OAuthIdentity(providerUserId, name, email, avatarUrl, emailVerified);
        }

        if (provider == AuthProvider.GITHUB) {
            String providerUserId = stringValue(attributes.get("id"));
            String login = stringValue(attributes.get("login"));
            String name = fallback(stringValue(attributes.get("name")), login);
            String email = stringValue(attributes.get("email"));
            String avatarUrl = stringValue(attributes.get("avatar_url"));

            return new OAuthIdentity(providerUserId, name, email, avatarUrl, false);
        }

        throw new BadRequestException("Unsupported OAuth provider.");
    }

    private AuthResponse buildAuthResponse(AppUser user) {
        String token = jwtService.generateToken(user);
        return new AuthResponse("Bearer", token, toProfile(user));
    }

    private UserProfileResponse toProfile(AppUser user) {
        return new UserProfileResponse(
            user.getId(),
            user.getFullName(),
            user.getEmail(),
            user.getAvatarUrl(),
            user.getProvider().name(),
            user.getRole().name()
        );
    }

    private String normalizeEmail(String email) {
        return email == null ? null : email.trim().toLowerCase();
    }

    private String stringValue(Object value) {
        return value == null ? null : String.valueOf(value);
    }

    private String fallback(String value, String fallback) {
        if (value == null || value.isBlank()) {
            return fallback == null ? "ProofForge User" : fallback;
        }

        return value;
    }

    private record OAuthIdentity(
        String providerUserId,
        String fullName,
        String email,
        String avatarUrl,
        boolean emailVerified
    ) {
    }
}