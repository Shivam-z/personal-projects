package com.shivam.springjwtsecurity.exception;

public class UnAuthorisedUser extends RuntimeException{
    public UnAuthorisedUser(String message) {
        super(message);
    }
}
