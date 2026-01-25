package com.recirclemart.controller.user;


import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.recirclemart.dtos.UserAddressRequestDTO;
import com.recirclemart.dtos.UserAddressResponseDTO;
import com.recirclemart.entities.user.UserAddress;
import com.recirclemart.service.user.UserAddressService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/user/{userId}/address")
@RequiredArgsConstructor
public class UserAddressController {

    private final UserAddressService userAddressService;

    // --------------------------------------------------
    // ADD ADDRESS
    // POST /api/user/{userId}/address
    // --------------------------------------------------
    @PostMapping
    public ResponseEntity<?> addAddress(
            @PathVariable Long userId,
            @RequestBody UserAddressRequestDTO request) {

        UserAddressResponseDTO savedAddress = userAddressService.addAddress(userId, request);
        
        return ResponseEntity.ok(Map.of(
        	    "status", "success",
        	    "data", savedAddress // This includes the full user object
        	));
        
    }

    // --------------------------------------------------
    // GET ALL ADDRESSES
    // GET /api/user/{userId}/address
    // --------------------------------------------------
    @GetMapping
    public ResponseEntity<List<UserAddressResponseDTO>> getAddresses(@PathVariable Long userId) {
        List<UserAddress> addresses = userAddressService.getUserAddresses(userId);

        List<UserAddressResponseDTO> dtoList = addresses.stream().map(ua -> {
            UserAddressResponseDTO dto = new UserAddressResponseDTO();
            dto.setUserAddressId(ua.getUserAddressId());
            dto.setAddressType(ua.getAddressType());

            UserAddressResponseDTO.AddressDTO addrDto = new UserAddressResponseDTO.AddressDTO();
            addrDto.setStreet(ua.getAddress().getStreet());
            addrDto.setCity(ua.getAddress().getCity());
            addrDto.setState(ua.getAddress().getState());
            addrDto.setPincode(ua.getAddress().getPincode());
            addrDto.setLatitude(ua.getAddress().getLatitude());
            addrDto.setLongitude(ua.getAddress().getLongitude());

            dto.setAddress(addrDto);
            return dto;
        }).toList();

        return ResponseEntity.ok(dtoList);
    }


    // --------------------------------------------------
    // UPDATE ADDRESS
    // PUT /api/user/{userId}/address/{addressId}
    // --------------------------------------------------
    @PutMapping("/{addressId}")
    public ResponseEntity<UserAddress> updateAddress(
            @PathVariable Long userId,
            @PathVariable Long addressId,
            @RequestBody UserAddressRequestDTO request) {

        UserAddress updated = userAddressService.updateAddress(userId, addressId, request);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    // --------------------------------------------------
    // DELETE ADDRESS
    // DELETE /api/user/{userId}/address/{addressId}
    // --------------------------------------------------
    @DeleteMapping("/{addressId}")
    public ResponseEntity<Void> deleteAddress(
            @PathVariable Long userId,
            @PathVariable Long addressId) {

        userAddressService.deleteAddress(userId, addressId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
