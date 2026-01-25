package com.recirclemart.dtos;

import com.recirclemart.entities.user.UserAddress;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserAddressDTO {

    private Long userAddressId;
    private String addressType;
    private AddressDTO address;

    public UserAddressDTO(UserAddress userAddress) {
        this.userAddressId = userAddress.getUserAddressId();
        this.addressType = userAddress.getAddressType();
        this.address = new AddressDTO(userAddress.getAddress());
    }
}