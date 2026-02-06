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

            
            if (auth != null && auth.isAuthenticated() && auth.getPrincipal() != null) {

                String name = auth.getName(); 
                
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
