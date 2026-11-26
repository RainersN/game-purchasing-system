package com.example.userservice.dto;

/** Returned by POST /signup and POST /login. The client keeps userId and sends it with later requests. */
public record UserResponse(Long userId, String username) {
}
