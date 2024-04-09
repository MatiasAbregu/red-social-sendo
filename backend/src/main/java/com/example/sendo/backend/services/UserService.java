package com.example.sendo.backend.services;

import com.example.sendo.backend.exceptions.UserException;
import com.example.sendo.backend.models.Token;
import com.example.sendo.backend.models.User;
import com.example.sendo.backend.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements IUserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authManager;

    @Override
    @Transactional
    public User createUser(User user) throws UserException {
        if (user.getFirstName() == null || user.getLastName() == null || user.getBirthdate() == null || user.getGenre() == null
                || user.getEmail() == null || user.getUsername() == null || user.getPassword() == null) {
            throw new UserException("Rellene los campos correctamente.");
        }

        User u = userRepository.findByEmail(user.getEmail()).orElse(null);
        if (u == null) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setRole("User");
            return userRepository.save(user);
        } else {
            throw new UserException("Usuario ya registrado con ese email.");
        }
    }

    @Override
    public Token loginPerSesion(User user) throws UserException {
        User u = userRepository.findByEmail(user.getEmail()).orElseThrow(() -> new UserException("Ese email no está registrado."));
        authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
        Token token = new Token(jwtService.getTokenPerSesion(u));
        return token;
    }

    @Override
    public Token loginPerWeek(User user) throws UserException {
        User u = userRepository.findByEmail(user.getEmail()).orElseThrow(() -> new UserException("Ese email no está registrado."));
        authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
        Token token = new Token(jwtService.getTokenPerWeek(u));
        return token;
    }
    
}
