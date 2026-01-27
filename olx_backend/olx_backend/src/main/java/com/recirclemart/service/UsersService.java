package com.backend.service.user;

import com.backend.dtos.UserRegisterRequestDTO;
import com.backend.entities.user.Users;

public interface UsersService {

    Users registerUser(UserRegisterRequestDTO request);
}