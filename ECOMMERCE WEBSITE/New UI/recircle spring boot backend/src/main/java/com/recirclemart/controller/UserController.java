package com.recirclemart.controller;

import com.recirclemart.entity.User;
import com.recirclemart.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{id}")
    public User getUser(@PathVariable Integer id) {
        return userService.getById(id);
    }

    @GetMapping
    public List<User> getAll() {
        return userService.getAllUsers();
    }

    // UPDATE PROFILE (PUT /api/users/me)
    @PutMapping("/me")
    public User updateMe(@RequestBody Map<String, String> body, Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        return userService.updateProfile(user, body);
    }
}
