package com.recirclemart.dtos;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserAddressResponseDTO {

    private Long userAddressId;
    private String addressType;

    private AddressDTO address;

    @Getter
    @Setter
    public static class AddressDTO {
        private String street;
        private String city;
        private String state;
        private String pincode;
        private Double latitude;
        private Double longitude;
    }
}
