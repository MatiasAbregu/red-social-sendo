package com.example.sendo.backend.repositories;

import com.example.sendo.backend.models.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author matia
 */
public interface UserRepository extends JpaRepository<User, Integer>{
    Optional<User> findByEmail(String email);
}