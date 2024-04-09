package com.example.sendo.backend.controllers;

import com.example.sendo.backend.exceptions.UserException;
import com.example.sendo.backend.models.Token;
import com.example.sendo.backend.models.User;
import com.example.sendo.backend.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private IUserService userService;
    
    @PostMapping("/login")
    private ResponseEntity<Token> login(@RequestBody User user) throws UserException{
        return ResponseEntity.ok(userService.login(user));
    }
    
    @PostMapping("/register")
    private ResponseEntity<User> createUser(@RequestBody User user) throws UserException{
        return ResponseEntity.ok(userService.createUser(user));
    }
}