package com.recirclemart.service.user;

import com.recirclemart.dtos.UserRegisterRequestDTO;
import com.recirclemart.entities.user.Users;
import com.recirclemart.model.Credentials;

public interface UsersService {

	Users registerUser(UserRegisterRequestDTO request);
	
	Users getUserLoggedIn(String email , String password);
}
