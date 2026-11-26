package com.example.userservice.controller;

import com.example.userservice.dto.CredentialsRequest;
import com.example.userservice.dto.UserResponse;
import com.example.userservice.model.User;
import com.example.userservice.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<UserResponse> signup(@RequestBody CredentialsRequest request) {
        User user = userService.signup(request.username(), request.password());
        return ResponseEntity.status(HttpStatus.CREATED).body(toResponse(user));
    }

    @PostMapping("/login")
    public UserResponse login(@RequestBody CredentialsRequest request) {
        return toResponse(userService.login(request.username(), request.password()));
    }

    /** There is no server-side session (see DESIGN.md), so there is nothing to clear here. The client forgets the userId. */
    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        return ResponseEntity.ok().build();
    }

    private UserResponse toResponse(User user) {
        return new UserResponse(user.getId(), user.getUsername());
    }
}
