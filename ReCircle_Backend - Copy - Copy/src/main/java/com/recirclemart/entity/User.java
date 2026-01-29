package com.recirclemart.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements UserDetails{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @NotBlank
    @Email
    @Column(nullable = false, unique = true)
    private String email;

    @NotBlank
    @Column(nullable = false)
    private String password;

    @Column(columnDefinition = "TEXT")
    private String avatar;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;


    @Column(columnDefinition = "ENUM('user','admin') DEFAULT 'user'")
    private String role;
    
    
    @Column(nullable= false ,  length = 500)
    
    private String publicKey ; 
    
    
    
    
    
    
    
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return AuthorityUtils.createAuthorityList(role);
    }

    // ✅ Username for authentication (email)
    @Override
    public String getUsername() {
        return this.email;
    }

    // 🔥 REQUIRED: return BCrypt password
    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    // ✅ User enabled only if status = ACTIVE
//    @Override
//    public boolean isEnabled() {
//        return status != null && "ACTIVE".equalsIgnoreCase(status.getStatusName());
//    }
    
}
