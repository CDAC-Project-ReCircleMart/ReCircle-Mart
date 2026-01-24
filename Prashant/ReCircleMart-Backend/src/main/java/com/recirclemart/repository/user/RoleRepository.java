package com.recirclemart.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recirclemart.entities.user.Role;


import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {

    Optional<Role> findByRoleName(String roleName);

    boolean existsByRoleName(String roleName);
}

