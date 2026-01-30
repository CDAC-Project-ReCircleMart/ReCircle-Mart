package com.recirclemart.service;

import com.recirclemart.entity.User;
import com.recirclemart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getById(Integer id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User updateProfile(User user, Map<String, String> body) {
        String firstName = body.get("firstName");
        String lastName = body.get("lastName");
        String email = body.get("email");
        String password = body.get("password");

        if (firstName != null)
            user.setFirstName(firstName);
        if (lastName != null)
            user.setLastName(lastName);
        if (email != null)
            user.setEmail(email);
        if (password != null && !password.isBlank()) {
            user.setPassword(PasswordUtil.hash(password));
        }

        return userRepository.save(user);
    }
}
