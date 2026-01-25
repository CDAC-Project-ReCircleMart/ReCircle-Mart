package com.recirclemart.repository.user;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recirclemart.entities.user.UserAddress;

public interface UserAddressRepository extends JpaRepository<UserAddress, Long> {

    List<UserAddress> findByUser_UserId(Long userId);

    Optional<UserAddress> findByUserAddressIdAndUser_UserId(
            Long userAddressId,
            Long userId
    );
}

