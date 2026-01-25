package com.recirclemart.dtos;

import com.recirclemart.entities.user.Role;
import com.recirclemart.entities.user.Users;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponseDTO {

    private Long id;
    private String fullName;
    private String email;
    private String phone;
    private Role role;
    private UserProfileDTO profile;  // ✅ DTO, not entity

    public UserResponseDTO(Users user) {
        this.id = user.getUserId();
        this.fullName = user.getFullName();
        this.email = user.getEmail();
        this.phone = user.getPhoneNumber();
        this.role = user.getRole();

        this.profile = user.getUserProfile() != null
                ? new UserProfileDTO(user.getUserProfile())
                : null;
    }
}