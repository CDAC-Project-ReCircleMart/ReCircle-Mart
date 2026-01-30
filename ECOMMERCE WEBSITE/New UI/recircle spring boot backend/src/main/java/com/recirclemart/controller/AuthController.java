package com.recirclemart.controller;

import com.recirclemart.entity.User;
import com.recirclemart.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Value("${jwt.token.secret}")
    private String jwtSecret;

    @Value("${jwt.token.expiration.millis}")
    private long jwtExpirationMillis;

    @Autowired
    private com.recirclemart.util.FileUtil fileUtil;

    @PostMapping(value = "/register", consumes = org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> register(@ModelAttribute User user,
            @RequestParam(value = "avatar", required = false) org.springframework.web.multipart.MultipartFile avatar,
            @RequestParam(value = "icon", required = false) String icon) throws Exception {

        // if file provided, save and set avatar path, otherwise allow icon (external
        // URL)
        if (avatar != null && !avatar.isEmpty()) {
            String path = fileUtil.saveFile(avatar);
            user.setAvatar(path);
        } else if (icon != null && !icon.isBlank()) {
            user.setAvatar(icon);
        }

        // Hash password before saving
        if (user.getPassword() != null) {
            user.setPassword(com.recirclemart.util.PasswordUtil.hash(user.getPassword()));
        }

        // default role
        if (user.getRole() == null || user.getRole().isBlank()) {
            user.setRole("user");
        }

        User saved = authService.register(user);
        return ResponseEntity.ok(saved);
    }

    @PostMapping(value = "/login", consumes = "application/json")
    public ResponseEntity<?> login(@RequestBody User user) {
        User logged = authService.login(user.getEmail(), user.getPassword());

        // Generate JWT
        String token = io.jsonwebtoken.Jwts.builder()
                .setSubject(logged.getEmail())
                .claim("id", logged.getId())
                .claim("role", logged.getRole())
                .setExpiration(new java.util.Date(System.currentTimeMillis() + jwtExpirationMillis))
                .signWith(io.jsonwebtoken.security.Keys.hmacShaKeyFor(jwtSecret.getBytes()))
                .compact();

        Map<String, Object> userMap = new java.util.HashMap<>();
        userMap.put("id", logged.getId());
        userMap.put("first_name", logged.getFirstName());
        userMap.put("last_name", logged.getLastName());
        userMap.put("email", logged.getEmail());
        userMap.put("avatar", logged.getAvatar());
        userMap.put("created_at", logged.getCreatedAt() == null ? null : logged.getCreatedAt().toString());
        userMap.put("role", logged.getRole());

        return ResponseEntity.ok(Map.of("token", token, "user", userMap));
    }
}
