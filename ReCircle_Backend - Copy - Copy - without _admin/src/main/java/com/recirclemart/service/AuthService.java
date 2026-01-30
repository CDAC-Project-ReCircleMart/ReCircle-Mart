//package com.recirclemart.service;
//
//import com.recirclemart.entity.User;
//import com.recirclemart.repository.UserRepository;
//import com.recirclemart.util.PasswordUtil;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//@Service
//public class AuthService {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    // REGISTER
// // REGISTER (PLAIN PASSWORD)
//    public User register(User user) {
//
//        // DO NOT ENCODE PASSWORD
//        user.setPassword(user.getPassword());  
//
//        // DEFAULT ROLE
//        if (user.getRole() == null || user.getRole().isEmpty()) {
//            user.setRole("user");
//        }
//
//        return userRepository.save(user);
//    }
//
//
//    // LOGIN (PLAIN PASSWORD CHECK)
//    public User login(String email, String password) {
//
//        User user = userRepository.findByEmail(email)
//                .orElseThrow(() -> new RuntimeException("Invalid email or password"));
//
//        // DIRECT STRING COMPARISON
//        if (!user.getPassword().equals(password)) {
//            throw new RuntimeException("Invalid email or password");
//        }
//
//        return user;
//    }
//
//
//}



package com.recirclemart.service;

import com.recirclemart.entity.User;
import com.recirclemart.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class AuthService {

    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    
    
    private static final String UPLOAD_DIR = "uploads/avatars/";


    public void registerUser(String firstName,
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


    // ✅ Case 1: User uploaded image file
    if (avatarFile != null && !avatarFile.isEmpty()) {
    avatarPath = saveAvatarFile(avatarFile);
    }
    // ✅ Case 2: User selected predefined icon
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
    .password(passwordEncoder.encode(password))
    .avatar(avatarPath)
    .role("user")
    .publicKey(publicKey)
    .build();


    userRepository.save(user);
    }


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

    // REGISTER
    public User register(User user) {
        return userRepository.save(user);   // stores plain password
    }

    // LOGIN
    public User login(String email, String password) {
    	
    	System.out.println(email +"  "+ password);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // PLAIN TEXT CHECK
        

    	System.out.println(email +"  "+ passwordEncoder.encode(password));
        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }

        return user; // success
    }
}

