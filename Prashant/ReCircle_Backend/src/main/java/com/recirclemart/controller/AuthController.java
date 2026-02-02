package com.recirclemart.controller;

import com.recirclemart.dtos.LoginResponse;
import com.recirclemart.dtos.UserResponse;
import com.recirclemart.entity.User;
import com.recirclemart.entity.UserKey;
import com.recirclemart.repository.UserKeyRepository;
import com.recirclemart.repository.UserRepository;
import com.recirclemart.security.JwtUtil;
import com.recirclemart.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private UserKeyRepository userKeyRepository;

    @PostMapping(value = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> register(
            @RequestParam String firstName,
            @RequestParam String lastName,
            @RequestParam String email,
            @RequestParam String password,
            @RequestParam(required = false) String icon,
            @RequestPart(required = false) MultipartFile avatar,
            @RequestParam(required = false) String publicKey
    ) {

        authService.registerUser(firstName, lastName, email, password, icon, avatar, publicKey);

        if (publicKey != null && !publicKey.isBlank()) {
            User created = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found after registration"));

            UserKey key = userKeyRepository.findByUser_Id(created.getId())
                    .orElse(UserKey.builder().user(created).build());

            key.setPublicKey(publicKey);
            userKeyRepository.save(key);
        }

        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Registration successful! Please login.");
    }

    @PostMapping(value = "/login", consumes = "application/json")
    public ResponseEntity<?> login(@RequestBody User request) {

        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        String token = jwtUtil.createToken(auth);
        User authenticatedUser = (User) auth.getPrincipal();

        String pubKey = userKeyRepository.findByUser_Id(authenticatedUser.getId())
                .map(UserKey::getPublicKey)
                .orElse(null);

        UserResponse userResponse = new UserResponse(
                authenticatedUser.getId(),
                authenticatedUser.getFirstName(),
                authenticatedUser.getLastName(),
                authenticatedUser.getEmail(),
                authenticatedUser.getAvatar(),
                authenticatedUser.getCreatedAt(),
                authenticatedUser.getRole(),
                pubKey
        );

        LoginResponse response = new LoginResponse(token, userResponse);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/hello")
    public ResponseEntity<?> hello() {
        return ResponseEntity.ok("Auth OK");
    }
}