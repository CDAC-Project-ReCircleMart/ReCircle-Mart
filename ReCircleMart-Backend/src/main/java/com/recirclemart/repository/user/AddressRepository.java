package com.recirclemart.repository.user;


import org.springframework.data.jpa.repository.JpaRepository;
import com.recirclemart.entities.user.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {
}

