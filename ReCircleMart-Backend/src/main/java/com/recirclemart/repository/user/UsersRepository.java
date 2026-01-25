package com.recirclemart.repository.user;


import org.springframework.data.jpa.repository.JpaRepository;

import com.recirclemart.entities.user.Users;

import java.util.Optional;

public interface UsersRepository extends JpaRepository<Users, Long> {

	Optional<Users> findByEmailAndPasswordHash(String email , String password);
	
    Optional<Users> findByEmail(String email);

    boolean existsByEmail(String email);
}