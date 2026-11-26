package com.example.userservice.dto;

/** Body of POST /signup and POST /login. */
public record CredentialsRequest(String username, String password) {
}
