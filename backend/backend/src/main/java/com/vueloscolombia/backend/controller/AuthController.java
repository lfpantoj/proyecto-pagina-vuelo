package com.vueloscolombia.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.AuthenticationException;
import com.vueloscolombia.backend.dto.*;
import com.vueloscolombia.backend.service.AuthService;
import com.vueloscolombia.backend.security.JwtUtil;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "${app.cors.allowed-origins}")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public String register(@RequestBody AuthRequest req) {
        authService.register(req.getUsername(), req.getPassword());
        return "Registrado";
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest req) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword()));
            String token = jwtUtil.generateToken(req.getUsername());
            return new AuthResponse(token);
        } catch (AuthenticationException ex) {
            throw new RuntimeException("Credenciales inválidas");
        }
    }
}
