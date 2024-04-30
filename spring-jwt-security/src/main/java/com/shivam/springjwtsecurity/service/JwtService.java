package com.shivam.springjwtsecurity.service;

import org.springframework.security.core.userdetails.UserDetails;

public interface JwtService {
    String generateToken(UserDetails userDetails);
    String encodePassword(String password);
    boolean validatePassword(String password, String encodedPassword);

    String extractUsername(String token);

}
