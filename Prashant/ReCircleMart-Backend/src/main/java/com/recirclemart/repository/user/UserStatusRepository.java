package com.recirclemart.repository.user;


import org.springframework.data.jpa.repository.JpaRepository;

import com.recirclemart.entities.user.UserStatus;

import java.util.Optional;

public interface UserStatusRepository extends JpaRepository<UserStatus, Integer> {

    Optional<UserStatus> findByStatusName(String name);

    boolean existsByStatusName(String name);
}