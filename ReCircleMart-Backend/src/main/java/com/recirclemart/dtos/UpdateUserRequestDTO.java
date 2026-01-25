package com.recirclemart.dtos;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter
public class UpdateUserRequestDTO {
	private String fullName;
	private String phoneNumber;


	private String bio;
	private String profileImageUrl;


	// If provided => sync addresses to exactly this list
	private List<AddressUpsertDTO> addresses;
}
