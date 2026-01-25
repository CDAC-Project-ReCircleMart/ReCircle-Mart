package com.recirclemart.service.user;


import java.util.List;

import com.recirclemart.dtos.UserAddressRequestDTO;
import com.recirclemart.dtos.UserAddressResponseDTO;
import com.recirclemart.entities.user.UserAddress;

public interface UserAddressService {

    UserAddressResponseDTO addAddress(Long userId, UserAddressRequestDTO request);

    List<UserAddress> getUserAddresses(Long userId);

    UserAddress updateAddress(Long userId, Long userAddressId, UserAddressRequestDTO request);

    void deleteAddress(Long userId, Long userAddressId);

	
}
