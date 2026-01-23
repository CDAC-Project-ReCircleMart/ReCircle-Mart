package com.olx.service.user;

import com.olx.dtos.UserRegisterRequestDTO;
import com.olx.entities.user.Users;

public interface UsersService {

    Users registerUser(UserRegisterRequestDTO request);
}