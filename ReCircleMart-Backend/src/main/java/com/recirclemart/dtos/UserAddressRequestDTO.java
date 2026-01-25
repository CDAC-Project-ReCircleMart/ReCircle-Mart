package com.recirclemart.dtos;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserAddressRequestDTO {

    private String street;
    private String city;
    private String state;
    private String pincode;

    private Double latitude;
    private Double longitude;

    private String addressType; // HOME, OFFICE, LISTING
}
