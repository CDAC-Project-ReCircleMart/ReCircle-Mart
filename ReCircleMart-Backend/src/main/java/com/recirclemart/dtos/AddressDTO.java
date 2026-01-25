package com.recirclemart.dtos;

import com.recirclemart.entities.user.Address;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressDTO {

    private Long addressId;
    private String street;
    private String city;
    private String state;
    private String pincode;
    private Double latitude;
    private Double longitude;

    public AddressDTO(Address address) {
        this.addressId = address.getAddressId();
        this.street = address.getStreet();
        this.city = address.getCity();
        this.state = address.getState();
        this.pincode = address.getPincode();
        this.latitude = address.getLatitude();
        this.longitude = address.getLongitude();
    }
}