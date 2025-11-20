package com.vueloscolombia.backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.Collection;
import java.util.stream.Collectors;
import org.springframework.security.core.GrantedAuthority;
import com.vueloscolombia.backend.security.CustomUserDetails;


@Component
public class JwtUtil {

    private final Key key;

    @Value("${jwt.expiration}")
    private long jwtExpirationMs;

    public JwtUtil(@Value("${jwt.secret}") String secret) {
        
        
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(CustomUserDetails userDetails) {
        var roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .claim("roles", roles)
                .claim("id", userDetails.getId())
                .claim("tipoDocumento", userDetails.getTipoDocumento())
                .claim("numeroDocumento", userDetails.getNumeroDocumento())
                .claim("primerNombre", userDetails.getPrimerNombre())
                .claim("segundoNombre", userDetails.getSegundoNombre())
                .claim("primerApellido", userDetails.getPrimerApellido())
                .claim("segundoApellido", userDetails.getSegundoApellido())
                .claim("numeroCelular", userDetails.getNumeroCelular())
                .claim("fechaNacimiento", userDetails.getFechaNacimiento())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String getUsernameFromToken(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            return claims.getSubject();
        } catch (JwtException e) {
            return null;
        }
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}
