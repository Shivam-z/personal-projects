package com.shivam.springjwtsecurity.controller;

import com.shivam.springjwtsecurity.dto.request.LoginRequest;
import com.shivam.springjwtsecurity.dto.request.RegisterRequest;
import com.shivam.springjwtsecurity.dto.response.AuthResponse;
import com.shivam.springjwtsecurity.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest registerRequest) {
        log.info("Register request: {}", registerRequest);
        return ResponseEntity.ok(authService.register(registerRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {
        log.info("Login request: {}", loginRequest);
        return ResponseEntity.ok(authService.login(loginRequest));
    }

}
