package com.recirclemart.service.user;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.recirclemart.dtos.UserAddressRequestDTO;
import com.recirclemart.dtos.UserAddressResponseDTO;
import com.recirclemart.entities.user.Address;
import com.recirclemart.entities.user.UserAddress;
import com.recirclemart.entities.user.Users;
import com.recirclemart.repository.user.AddressRepository;
import com.recirclemart.repository.user.UserAddressRepository;
import com.recirclemart.repository.user.UsersRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class UserAddressServiceImpl implements UserAddressService {

    private final UsersRepository usersRepository;
    private final AddressRepository addressRepository;
    private final UserAddressRepository userAddressRepository;

    // --------------------------------------------------
    // ADD ADDRESS
    // --------------------------------------------------
    @Override
    public UserAddressResponseDTO addAddress(Long userId, UserAddressRequestDTO request) {

        Users user = usersRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Save Address
        Address address = new Address();
        address.setStreet(request.getStreet());
        address.setCity(request.getCity());
        address.setState(request.getState());
        address.setPincode(request.getPincode());
        address.setLatitude(request.getLatitude());
        address.setLongitude(request.getLongitude());

        addressRepository.save(address);

        // Save UserAddress
        UserAddress userAddress = new UserAddress();
        userAddress.setUser(user);
        userAddress.setAddress(address);
        userAddress.setAddressType(request.getAddressType());

        UserAddress savedUserAddress = userAddressRepository.save(userAddress);

        // ✅ ENTITY → DTO mapping
        UserAddressResponseDTO response = new UserAddressResponseDTO();
        response.setUserAddressId(savedUserAddress.getUserAddressId());
        response.setAddressType(savedUserAddress.getAddressType());

        UserAddressResponseDTO.AddressDTO addressDTO =
                new UserAddressResponseDTO.AddressDTO();
        addressDTO.setStreet(address.getStreet());
        addressDTO.setCity(address.getCity());
        addressDTO.setState(address.getState());
        addressDTO.setPincode(address.getPincode());
        addressDTO.setLatitude(address.getLatitude());
        addressDTO.setLongitude(address.getLongitude());

        response.setAddress(addressDTO);

        return response;
    }

    // --------------------------------------------------
    // GET USER ADDRESSES
    // --------------------------------------------------
    @Override
    public List<UserAddress> getUserAddresses(Long userId) {

        if (!usersRepository.existsById(userId)) {
            throw new RuntimeException("User not found");
        }

        return userAddressRepository.findByUser_UserId(userId);
    }

    // --------------------------------------------------
    // UPDATE ADDRESS
    // --------------------------------------------------
    @Override
    public UserAddress updateAddress(
            Long userId,
            Long userAddressId,
            UserAddressRequestDTO request) {

        UserAddress userAddress = userAddressRepository
                .findByUserAddressIdAndUser_UserId(userAddressId, userId)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        Address address = userAddress.getAddress();

        address.setStreet(request.getStreet());
        address.setCity(request.getCity());
        address.setState(request.getState());
        address.setPincode(request.getPincode());
        address.setLatitude(request.getLatitude());
        address.setLongitude(request.getLongitude());

        userAddress.setAddressType(request.getAddressType());

        return userAddress;
    }

    // --------------------------------------------------
    // DELETE ADDRESS
    // --------------------------------------------------
    @Override
    public void deleteAddress(Long userId, Long userAddressId) {

        UserAddress userAddress = userAddressRepository
                .findByUserAddressIdAndUser_UserId(userAddressId, userId)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        userAddressRepository.delete(userAddress);
    }
}
