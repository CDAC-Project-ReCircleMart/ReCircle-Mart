package com.recirclemart.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class UserResponse {

    private Integer id;
    private String first_name;
    private String last_name;
    private String email;
    private String avatar;
    private LocalDateTime created_at;
    private String role;
    
    private String e2eePublicKey; // ✅ add this
}