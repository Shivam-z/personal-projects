package com.shivam.springbootcookieauth.service;

import com.shivam.springbootcookieauth.dtos.UserRequest;
import com.shivam.springbootcookieauth.dtos.UserResponse;

import java.util.List;

public interface UserService {

    UserResponse saveUser(UserRequest userRequest);

    List<UserResponse> getAllUser();
}
