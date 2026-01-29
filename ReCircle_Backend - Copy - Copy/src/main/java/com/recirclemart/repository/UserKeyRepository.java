package com.recirclemart.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recirclemart.entity.UserKey;

public interface UserKeyRepository extends JpaRepository<UserKey, Integer> {
    Optional<UserKey> findByUser_Id(Integer userId);
}