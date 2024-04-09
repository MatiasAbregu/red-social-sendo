package com.example.sendo.backend.services;

import com.example.sendo.backend.exceptions.UserException;
import com.example.sendo.backend.models.Token;
import com.example.sendo.backend.models.User;

public interface IUserService {
    User createUser(User user) throws UserException;
    Token login(User user) throws UserException;
}