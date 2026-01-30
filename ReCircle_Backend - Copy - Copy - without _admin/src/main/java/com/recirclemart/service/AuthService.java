package com.recirclemart.service;

import com.recirclemart.entity.User;
import com.recirclemart.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private static final String UPLOAD_DIR = "uploads/avatars/";

    // ================= REGISTER (USED BY CONTROLLER) =================
    public void registerUser(
            String firstName,
            String lastName,
            String email,
            String password,
            String icon,
            MultipartFile avatarFile,
            String publicKey
    ) {

        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already exists!");
        }

        String avatarPath;

        // Case 1: Uploaded image
        if (avatarFile != null && !avatarFile.isEmpty()) {
            avatarPath = saveAvatarFile(avatarFile);
        }
        // Case 2: Selected icon
        else {
            if (icon == null || icon.isBlank()) {
                throw new RuntimeException("Please select an avatar or icon!");
            }
            avatarPath = icon;
        }

        User user = User.builder()
                .firstName(firstName)
                .lastName(lastName)
                .email(email)
                .password(passwordEncoder.encode(password)) // ✅ ENCODED
                .avatar(avatarPath)
                .role("user")
                .publicKey(publicKey)
                .build();

        userRepository.save(user);
    }

    // ================= UPDATE PROFILE SUPPORT =================
    public String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }

    // ================= FILE UPLOAD =================
    private String saveAvatarFile(MultipartFile file) {
        try {
            Path uploadPath = Paths.get(UPLOAD_DIR);
            Files.createDirectories(uploadPath);

            String originalName = file.getOriginalFilename();
            String extension = "";

            if (originalName != null && originalName.contains(".")) {
                extension = originalName.substring(originalName.lastIndexOf("."));
            }

            String fileName = UUID.randomUUID() + extension;
            Path filePath = uploadPath.resolve(fileName);

            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            return "/uploads/avatars/" + fileName;

        } catch (Exception e) {
            throw new RuntimeException("Avatar upload failed!", e);
        }
    }

    // ================= LEGACY METHODS (OPTIONAL) =================
    // ❌ NOT USED because Spring Security + AuthenticationManager handles login
    // Keep only if some old code still calls it

    public User register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return user;
    }
}