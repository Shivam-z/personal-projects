package com.shivam.springjwtsecurity.dto.request;

import com.shivam.springjwtsecurity.enums.Role;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private Role role;
}
