// JwtVisitUtil.java
package com.recirclemart.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Map;

@Component
public class JwtVisitUtil {

    private final Key key;

    public JwtVisitUtil(@Value("${jwt.token.secret}") String secret) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public Integer extractUserIdIfValid(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            Object id = claims.get("id");
            if (id == null) id = claims.get("userId");

            if (id == null) {
                Object userObj = claims.get("user");
                if (userObj instanceof Map<?, ?> userMap) {
                    Object nestedId = userMap.get("id");
                    id = nestedId;
                }
            }

            if (id == null) return null;

         
            if (id instanceof Number n) return n.intValue();
            return Integer.parseInt(id.toString());

        } catch (Exception e) {
           
            return null;
        }
    }
}
