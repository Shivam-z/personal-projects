package com.shivam.springbootcookieauth.dtos;

import com.shivam.springbootcookieauth.models.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserResponse {

    private Long id;
    private String username;
    private Set<UserRole> roles;


}