package com.recirclemart.service.user;

import com.recirclemart.dtos.UserRegisterRequestDTO;
import com.recirclemart.entities.user.Users;

public interface UsersService {

	Users registerUser(UserRegisterRequestDTO request);
}
