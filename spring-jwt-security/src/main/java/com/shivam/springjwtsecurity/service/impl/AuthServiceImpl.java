package com.shivam.springjwtsecurity.service.impl;

import com.shivam.springjwtsecurity.dto.request.LoginRequest;
import com.shivam.springjwtsecurity.dto.request.RegisterRequest;
import com.shivam.springjwtsecurity.dto.response.AuthResponse;
import com.shivam.springjwtsecurity.entity.User;
import com.shivam.springjwtsecurity.exception.EntityNotFound;
import com.shivam.springjwtsecurity.exception.UnAuthorisedUser;
import com.shivam.springjwtsecurity.exception.UserAlreadyExists;
import com.shivam.springjwtsecurity.repository.UserRepo;
import com.shivam.springjwtsecurity.service.AuthService;
import com.shivam.springjwtsecurity.service.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepo userRepo;
    private final JwtService jwtService;

    @Override
    public AuthResponse register(RegisterRequest registerRequest) {

        // Check if user already exists
        User existingUser = userRepo.findByEmail(registerRequest.getEmail()).orElse(null);

        // User already exists
        if(existingUser!=null){
            throw new UserAlreadyExists("User with this email already exists");
        }

        // Create user object
        User user = User.builder()
                .firstName(registerRequest.getFirstName())
                .lastName(registerRequest.getLastName())
                .email(registerRequest.getEmail())
                .password(jwtService.encodePassword(registerRequest.getPassword()))
                .role(registerRequest.getRole())
                .build();

        // Save user to database
        userRepo.save(user);

        // Log the user details
        log.info("User registered successfully: {}", user);

        return AuthResponse.builder().accessToken(jwtService.generateToken(user)).build();
    }

    @Override
    public AuthResponse login(LoginRequest loginRequest) {
        // Find user by email
        User user = userRepo.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new EntityNotFound("User not found"));

        // Validate password
        if (!jwtService.validatePassword(loginRequest.getPassword(), user.getPassword())) {
            throw new UnAuthorisedUser("Invalid email or password");
        }

        // Log the user details
        log.info("User logged in successfully: {}", user);
        return AuthResponse.builder().accessToken(jwtService.generateToken(user)).build();
    }
}
