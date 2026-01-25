package com.recirclemart.dtos;

import com.recirclemart.entities.user.UserProfile;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class UserProfileDTO {

    private Long profileId;
    private String profileImageUrl;
    private String bio;
    private List<UserAddressDTO> addresses;

    public UserProfileDTO(UserProfile profile) {
        this.profileId = profile.getProfileId();
        this.profileImageUrl = profile.getProfileImageUrl();
        this.bio = profile.getBio();

        if (profile.getUser().getUserAddresses() != null) {
            this.addresses = profile.getUser()
                    .getUserAddresses()
                    .stream()
                    .map(UserAddressDTO::new)
                    .collect(Collectors.toList());
        }
    }
}