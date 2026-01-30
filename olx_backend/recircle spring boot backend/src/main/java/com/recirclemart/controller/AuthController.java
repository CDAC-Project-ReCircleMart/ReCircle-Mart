//package com.recirclemart.controller;
//
//import com.recirclemart.entity.User;
//import com.recirclemart.service.AuthService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/auth")
//@CrossOrigin(origins = "http://localhost:5173")
//public class AuthController {
//
//    @Autowired
//    private AuthService authService;
//
//    // REGISTER (accepts form-data)
//    @PostMapping(value = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public ResponseEntity<?> register(@ModelAttribute User user) {
//
//        // force default role so validation does not fail
//        if (user.getRole() == null || user.getRole().isBlank()) {
//            user.setRole("user");
//        }
//
//        User saved = authService.register(user);
//        return ResponseEntity.ok(saved);
//    }
//
//    // LOGIN (accepts form-data)
//    @PostMapping(value = "/login", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public ResponseEntity<?> login(@ModelAttribute User user) {
//
//        User logged = authService.login(user.getEmail(), user.getPassword());
//        return ResponseEntity.ok(logged);
//    }
//}

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping(value = "/register", consumes = "application/json")
    public ResponseEntity<?> register(@RequestBody User user) {
        User saved = authService.register(user);
        return ResponseEntity.ok(saved);
    }

    @PostMapping(value = "/login", consumes = "application/json")
    public ResponseEntity<?> login(@RequestBody User user) {
        User logged = authService.login(user.getEmail(), user.getPassword());
        return ResponseEntity.ok(logged);
    }
}
