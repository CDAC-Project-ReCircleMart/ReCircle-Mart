//package com.recirclemart.service;
//
//import com.recirclemart.entity.User;
//import com.recirclemart.repository.UserRepository;
//import com.recirclemart.util.PasswordUtil;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//@Service
//public class AuthService {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    // REGISTER
// // REGISTER (PLAIN PASSWORD)
//    public User register(User user) {
//
//        // DO NOT ENCODE PASSWORD
//        user.setPassword(user.getPassword());  
//
//        // DEFAULT ROLE
//        if (user.getRole() == null || user.getRole().isEmpty()) {
//            user.setRole("user");
//        }
//
//        return userRepository.save(user);
//    }
//
//
//    // LOGIN (PLAIN PASSWORD CHECK)
//    public User login(String email, String password) {
//
//        User user = userRepository.findByEmail(email)
//                .orElseThrow(() -> new RuntimeException("Invalid email or password"));
//
//        // DIRECT STRING COMPARISON
//        if (!user.getPassword().equals(password)) {
//            throw new RuntimeException("Invalid email or password");
//        }
//
//        return user;
//    }
//
//
//}

package com.recirclemart.service;

import com.recirclemart.entity.User;
import com.recirclemart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    // REGISTER
    public User register(User user) {
        return userRepository.save(user); // stores plain password
    }

    // LOGIN
    public User login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // CHECK HASHED PASSWORD
        if (!com.recirclemart.util.PasswordUtil.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return user; // success
    }
}
