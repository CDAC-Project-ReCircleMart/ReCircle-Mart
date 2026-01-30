package com.recirclemart.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

public class SecurityUtil {

    private SecurityUtil() {}

    public static String getCurrentEmail() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("Unauthenticated");
        }

        Object principal = authentication.getPrincipal();

        // ✅ When using Spring Security + UserDetails
        if (principal instanceof UserDetails userDetails) {
            return userDetails.getUsername(); // EMAIL
        }

        // ✅ Fallback (JWT subject)
        if (principal instanceof String) {
            return principal.toString();
        }

        throw new RuntimeException("Invalid authentication principal");
    }
}