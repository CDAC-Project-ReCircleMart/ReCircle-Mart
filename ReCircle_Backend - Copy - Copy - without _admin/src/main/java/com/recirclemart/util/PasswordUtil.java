package com.recirclemart.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordUtil{

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    // Hash password when registering
    public static String hash(String rawPassword) {
        return encoder.encode(rawPassword);
    }

    // Check password when logging in
    public static boolean matches(String rawPassword, String hashedPassword) {
        return encoder.matches(rawPassword, hashedPassword);
    }
}
