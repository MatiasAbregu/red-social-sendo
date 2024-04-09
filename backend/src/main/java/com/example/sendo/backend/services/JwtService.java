package com.example.sendo.backend.services;

import com.example.sendo.backend.models.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

/**
 * @author matia
 */
@Service
public class JwtService {

    private static Key sKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public String getToken(User user) {
        return getToken(new HashMap<>(), user);
    }

    public String getToken(HashMap<String, Object> claims, User user) {
        claims.put("username", user.getUsername());
        claims.put("role", user.getAuthorities().stream().map(GrantedAuthority::getAuthority).findFirst().orElse("User"));
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + +86400000))
                .signWith(sKey, SignatureAlgorithm.HS256)
                .compact();
    }

    public String getEmailFromToken(String token) {
        return getClaim(token, Claims::getSubject);
    }

    public Date getExpiration(String token) {
        return getClaim(token, Claims::getExpiration);
    }

    public boolean isTokenValid(String token, User user) {
        String email = getEmailFromToken(token);
        return (email.equals(user.getEmail()) && !isTokenExpired(token));
    }

    public boolean isTokenExpired(String token) {
        return getExpiration(token).before(new Date());
    }

    public Claims getAllClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(sKey).build().parseClaimsJwt(token).getBody();
    }

    public <T> T getClaim(String token, Function<Claims, T> claimsResolver) {
        Claims c = getAllClaims(token);
        return claimsResolver.apply(c);
    }
}
