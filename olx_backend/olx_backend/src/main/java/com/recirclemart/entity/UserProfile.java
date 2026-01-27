package com.backend.entities.user;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(
    name = "user_profiles",
    uniqueConstraints = {
        @UniqueConstraint(name = "uk_user_profile_user", columnNames = "user_id")
    }
)
@Getter
@Setter

@AllArgsConstructor
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "profile_id")
    private Long profileId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @Column(name = "profile_image_url", length = 255)
    private String profileImageUrl;

    @Column(name = "bio")
    private String bio;

    // ---------- constructors ----------
    public UserProfile() {
        // JPA only
    }

    public UserProfile(Users user) {
        this.user = user;
    }

    // ---------- getters & setters ----------
    public Long getProfileId() {
        return profileId;
    }

    public Users getUser() {
        return user;
    }

    public String getProfileImageUrl() {
        return profileImageUrl;
    }

    public void setProfileImageUrl(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }
}
