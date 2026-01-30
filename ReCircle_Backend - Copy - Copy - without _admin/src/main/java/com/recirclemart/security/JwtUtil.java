package com.recirclemart.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Component;
import org.springframework.security.core.Authentication;

import java.security.Key;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

    // ✅ MUST be at least 32 chars for HS256
    private static final String SECRET =
            "recircle-secret-key-32-chars-minimum!";

    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    // ================= CREATE TOKEN =================
    public String createToken(Authentication authentication) {

        Map<String, Object> claims = Map.of(
                "role", authentication.getAuthorities()
                        .iterator().next().getAuthority()
        );

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(authentication.getName()) // email
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // ================= EXTRACT USERNAME =================
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // ================= VALIDATE TOKEN =================
    public boolean validateToken(String token, String username) {
        return extractUsername(token).equals(username) && !isTokenExpired(token);
    }

    // ================= CLAIM HELPERS =================
    public <T> T extractClaim(String token, Function<Claims, T> resolver) {
        return resolver.apply(extractAllClaims(token));
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private boolean isTokenExpired(String token) {
        return extractClaim(token, Claims::getExpiration)
                .before(new Date());
    }
}