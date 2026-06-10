package com.proofforge.auth.repository;

import com.proofforge.auth.entity.AppUser;
import com.proofforge.auth.entity.AuthProvider;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {

    Optional<AppUser> findByEmailIgnoreCase(String email);

    boolean existsByEmailIgnoreCase(String email);

    Optional<AppUser> findByProviderAndProviderUserId(AuthProvider provider, String providerUserId);
    Optional<AppUser> findByEmail(String email);
}
