package com.backend.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entities.user.UserStatus;

import java.util.Optional;

public interface UserStatusRepository extends JpaRepository<UserStatus, Integer> {

    Optional<UserStatus> findByStatusName(String name);

    boolean existsByStatusName(String name);
}