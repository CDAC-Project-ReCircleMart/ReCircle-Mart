package com.recirclemart.repository;

import com.recirclemart.entity.UserKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import jakarta.transaction.Transactional;

import java.util.Optional;

public interface UserKeyRepository extends JpaRepository<UserKey, Integer> {

    // ✅ USED by AuthController & UserKeyController
    Optional<UserKey> findByUser_Id(Integer userId);

    // ✅ USED by AdminService (delete user fix)
    @Modifying
    @Transactional
    @Query("DELETE FROM UserKey uk WHERE uk.user.id = :userId")
    void deleteByUserId(Integer userId);
}