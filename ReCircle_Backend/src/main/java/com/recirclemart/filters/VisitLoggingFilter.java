package com.recirclemart.filters;

import com.recirclemart.analytics.entity.Visit;
import com.recirclemart.analytics.repository.VisitRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class VisitLoggingFilter extends OncePerRequestFilter {

    private final VisitRepository visitRepository;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        try {
            String ip = getClientIp(request);

            Integer userId = null;
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();

            // If JwtFilter has set auth, extract the user id
            if (auth != null && auth.isAuthenticated() && auth.getPrincipal() != null) {

                // OPTION A: If your principal is your UserDetails implementation
                // and it has getId(), cast and read it.

                // Example:
                // if (auth.getPrincipal() instanceof MyUserDetails u) userId = u.getId();

                // OPTION B (works immediately): if you stored userId in auth.getName()
                // or as a claim and set it as principal string.
                // (depends on your jwtUtil.validateToken implementation)
                String name = auth.getName(); // often email/username
                // If name is numeric in your project, parse it:
                // userId = Integer.parseInt(name);

                // If not numeric, keep userId null OR implement Option A properly.
            }

            visitRepository.save(
                    Visit.builder()
                            .userId(userId)
                            .ipAddress(ip)
                            .build());

            System.out.println("VISIT LOGGED: userId=" + userId + " ip=" + ip);

        } catch (Exception e) {
            System.out.println("VISIT LOGGER ERROR: " + e.getMessage());
        }

        filterChain.doFilter(request, response);
    }

    private String getClientIp(HttpServletRequest request) {
        String xf = request.getHeader("X-Forwarded-For");
        if (xf != null && !xf.isBlank())
            return xf.split(",")[0].trim();
        return request.getRemoteAddr();
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        return path.startsWith("/swagger")
                || path.startsWith("/v3/api-docs")
                || path.equals("/favicon.ico")
                || path.endsWith(".css")
                || path.endsWith(".js")
                || path.endsWith(".png")
                || path.endsWith(".jpg");
    }
}
