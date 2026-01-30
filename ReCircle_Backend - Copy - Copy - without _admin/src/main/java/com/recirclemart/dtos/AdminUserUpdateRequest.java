package com.recirclemart.dtos;

public record AdminUserUpdateRequest(
        String firstName,
        String lastName,
        String email,
        String password,
        String role
) {}
