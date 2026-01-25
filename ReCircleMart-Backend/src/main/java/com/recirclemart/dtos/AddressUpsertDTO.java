package com.recirclemart.dtos;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class AddressUpsertDTO {
// null => create new user address
private Long userAddressId;


private String addressType;


private String street;
private String city;
private String state;
private String pincode;
private Double latitude;
private Double longitude;
}