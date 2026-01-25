package com.recirclemart.service.user;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.recirclemart.dtos.AddressUpsertDTO;
import com.recirclemart.dtos.UpdateUserRequestDTO;
import com.recirclemart.dtos.UserRegisterRequestDTO;
import com.recirclemart.entities.user.Address;
import com.recirclemart.entities.user.Role;
import com.recirclemart.entities.user.UserAddress;
import com.recirclemart.entities.user.UserProfile;
import com.recirclemart.entities.user.UserStatus;
import com.recirclemart.entities.user.Users;
import com.recirclemart.model.Credentials;
import com.recirclemart.repository.user.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsersServiceImpl implements UsersService, UserDetailsService {

    private final AddressRepository addressRepository;

	private final UserAddressRepository userAddressRepository;

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

		Role userRole = roleRepository.findByRoleName("USER").orElseThrow(() -> new RuntimeException("Role not found"));

		UserStatus activeStatus = userStatusRepository.findByStatusName("ACTIVE")
				.orElseThrow(() -> new RuntimeException("User status not found"));

		Users user = new Users();
		user.setFullName(request.getFullName());
		user.setEmail(request.getEmail());
		user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
		user.setRole(userRole);
		user.setPhoneNumber(request.getPhone());
		user.setStatus(activeStatus);

		// // Create user profile
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

	@Override
	public Users getUserLoggedIn(String email, String password) {
		Users user = usersRepository.findByEmailAndPasswordHash(email, password)
				.orElseThrow(() -> new UsernameNotFoundException("No User found"));
		return user;
	}

	@Transactional
	public Users updateUser(Long userId, UpdateUserRequestDTO req) {

		Users user = usersRepository.findWithProfileAndAddressesByUserId(userId)
				.orElseThrow(() -> new RuntimeException("User not found: " + userId));

		// 1) Patch Users fields
		if (req.getFullName() != null)
			user.setFullName(req.getFullName());
		if (req.getPhoneNumber() != null)
			user.setPhoneNumber(req.getPhoneNumber());

		// 2) Patch Profile fields
		if (user.getUserProfile() == null) {
			UserProfile profile = new UserProfile();
			profile.setUser(user);
			user.setUserProfile(profile);
		}
		if (req.getBio() != null)
			user.getUserProfile().setBio(req.getBio());
		if (req.getProfileImageUrl() != null)
			user.getUserProfile().setProfileImageUrl(req.getProfileImageUrl());

		// 3) Addresses sync (only if addresses provided)
		if (req.getAddresses() != null) {
			syncAddresses(user, req.getAddresses());
		}

		return usersRepository.save(user);
	}

	
	
	private void syncAddresses(Users user, List<AddressUpsertDTO> incoming) {


        	List<UserAddress> existing = user.getUserAddresses() == null
        	? new ArrayList<>()
        	: new ArrayList<>(user.getUserAddresses());


        	Map<Long, UserAddress> existingById = existing.stream()
        	.filter(ua -> ua.getUserAddressId() != null)
        	.collect(Collectors.toMap(UserAddress::getUserAddressId, Function.identity()));


        	Set<Long> incomingIds = incoming.stream()
        	.map(AddressUpsertDTO::getUserAddressId)
        	.filter(Objects::nonNull)
        	.collect(Collectors.toSet());


        	// A) delete removed user-address rows
        	for (UserAddress ua : existing) {
        	Long id = ua.getUserAddressId();
        	if (id != null && !incomingIds.contains(id)) {
        	// IMPORTANT: deleting ua will not delete user because JPA removes child row
        		userAddressRepository.delete(ua);


        	// Optional cleanup: delete address too (ONLY if you are sure it's not shared)
        	// addressRepository.delete(ua.getAddress());
        	}
        	}
        	for (AddressUpsertDTO dto : incoming) {


        		UserAddress ua;
        		if (dto.getUserAddressId() != null) {
        		ua = existingById.get(dto.getUserAddressId());
        		if (ua == null) {
        		throw new RuntimeException("Address not found: userAddressId=" + dto.getUserAddressId());
        		}
        		} else {
        		ua = new UserAddress();
        		ua.setUser(user);
        		ua.setAddress(new Address());
        		}


        		if (dto.getAddressType() != null) ua.setAddressType(dto.getAddressType());


        		Address addr = ua.getAddress();
        		if (dto.getStreet() != null) addr.setStreet(dto.getStreet());
        		if (dto.getCity() != null) addr.setCity(dto.getCity());
        		if (dto.getState() != null) addr.setState(dto.getState());
        		if (dto.getPincode() != null) addr.setPincode(dto.getPincode());
        		if (dto.getLatitude() != null) addr.setLatitude(dto.getLatitude());
        		if (dto.getLongitude() != null) addr.setLongitude(dto.getLongitude());


        	addressRepository.save(addr);
        		userAddressRepository.save(ua);
        		}


        		// refresh list (optional)
        		user.setUserAddresses(userAddressRepository.findByUser_UserId(user.getUserId()));
        		}
}
