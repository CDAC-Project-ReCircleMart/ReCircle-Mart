package com.recirclemart.user.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.recirclemart.exception.ResourceNotFoundException;
import com.recirclemart.security.SecurityUtil;
import com.recirclemart.user.entity.User;
import com.recirclemart.user.entity.UserKey;
import com.recirclemart.user.repository.UserKeyRepository;
import com.recirclemart.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/e2ee")
@RequiredArgsConstructor
public class UserKeyController {

    private final UserRepository userRepository;
    private final UserKeyRepository userKeyRepository;

    @PostMapping("/public-key")
    public ResponseEntity<?> uploadPublicKey(@RequestBody Map<String, String> body) {

        String email = SecurityUtil.getCurrentEmail();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String publicKey = body.get("publicKey");
        if (publicKey == null || publicKey.isBlank())
            throw new RuntimeException("Public key missing");

        UserKey key = userKeyRepository.findByUser_Id(user.getId())
                .orElse(UserKey.builder().user(user).build());

        key.setPublicKey(publicKey);
        userKeyRepository.save(key);

        return ResponseEntity.ok(Map.of("message", "Public key saved"));
    }

    @GetMapping("/public-key/{userId}")
    public ResponseEntity<?> getPublicKey(@PathVariable Integer userId) {
        UserKey key = userKeyRepository.findByUser_Id(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Public key not found"));

        return ResponseEntity.ok(Map.of("publicKey", key.getPublicKey()));
    }
}