package com.backend.controller.user;



import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.backend.dtos.UserRegisterRequestDTO;
import com.backend.entities.user.Users;
import com.backend.model.Credentials;
import com.backend.security.JwtUtil;
import com.backend.service.user.UsersService;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UsersController {

    private final UsersService usersService;
    
    @Autowired
    private AuthenticationManager authManager;
    
    
    @Autowired
    JwtUtil jwtUtil ;
    /**
     * Register a new user
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(
        @Valid @RequestBody UserRegisterRequestDTO requestDTO) {
    	System.out.println("in controlller");
        Users savedUser = usersService.registerUser(requestDTO);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(buildSuccessResponse(savedUser));
    }
    
    
    
    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate (@RequestBody Credentials cr){
    	Authentication auth = new UsernamePasswordAuthenticationToken(cr.getEmail(), cr.getPassword());
    	System.out.println("Before auth : "+ auth);
    	auth = authManager.authenticate(auth);
    	System.out.println("After auth : "+auth);
    	
    	String token = jwtUtil.createToken(auth);
    	
    	return ResponseEntity.ok(Map.of("status", "success", "token", token  ));

    	
    }

    // ------------------ private helpers ------------------

    private Object buildSuccessResponse(Users user) {
        return new Object() {
            public final Long userId = user.getUserId();
            public final String message = "User registered successfully";
            public final String status = "success";
        };
    }
}
