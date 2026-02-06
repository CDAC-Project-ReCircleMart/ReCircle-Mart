package com.recirclemart.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.recirclemart.user.entity.UserKey;

import jakarta.transaction.Transactional;

import java.util.Optional;

public interface UserKeyRepository extends JpaRepository<UserKey, Integer> {

    
    Optional<UserKey> findByUser_Id(Integer userId);

   
    @Modifying
    @Transactional
    @Query("DELETE FROM UserKey uk WHERE uk.user.id = :userId")
    void deleteByUserId(Integer userId);
}