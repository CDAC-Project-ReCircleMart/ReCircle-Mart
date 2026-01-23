package com.recirclemart.service.user;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.recirclemart.dtos.UserRegisterRequestDTO;
import com.recirclemart.entities.user.Role;
import com.recirclemart.entities.user.UserProfile;
import com.recirclemart.entities.user.UserStatus;
import com.recirclemart.entities.user.Users;
import com.recirclemart.repository.user.RoleRepository;
import com.recirclemart.repository.user.UserStatusRepository;
import com.recirclemart.repository.user.UsersRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsersServiceImpl implements UsersService, UserDetailsService {

        private final UsersRepository usersRepository;
        private final RoleRepository roleRepository;
        private final UserStatusRepository userStatusRepository;
        private final PasswordEncoder passwordEncoder;

        @Override
        public Users registerUser(UserRegisterRequestDTO request) {
                // TODO Auto-generated method stub
                if (usersRepository.existsByEmail(request.getEmail())) {
                        throw new RuntimeException("Email already registered");
                }

                Role userRole = roleRepository.findByRoleName("USER")
                                .orElseThrow(() -> new RuntimeException("Role not found"));

                UserStatus activeStatus = userStatusRepository.findByStatusName("ACTIVE")
                                .orElseThrow(() -> new RuntimeException("User status not found"));

                Users user = new Users();
                user.setFullName(request.getFullName());
                user.setEmail(request.getEmail());
                user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
                user.setRole(userRole);
                user.setPhoneNumber(request.getPhone());
                user.setStatus(activeStatus);

                // Create user profile
                UserProfile profile = new UserProfile();
                profile.setUser(user);

                user.setUserProfile(profile);

                return usersRepository.save(user);
        }

        @Override
        public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

                Users user = usersRepository.findByEmail(username)
                                .orElseThrow(() -> new UsernameNotFoundException("no user exits"));

                return user;

        }

}
