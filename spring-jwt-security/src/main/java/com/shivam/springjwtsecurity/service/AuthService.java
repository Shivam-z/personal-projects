package com.shivam.springjwtsecurity.service;

import com.shivam.springjwtsecurity.dto.request.LoginRequest;
import com.shivam.springjwtsecurity.dto.request.RegisterRequest;
import com.shivam.springjwtsecurity.dto.response.AuthResponse;

public interface AuthService {
    AuthResponse register(RegisterRequest registerRequest);

    AuthResponse login(LoginRequest loginRequest);
}
