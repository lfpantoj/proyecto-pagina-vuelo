package com.vueloscolombia.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

import com.vueloscolombia.backend.dto.LoginRequest;
import com.vueloscolombia.backend.dto.LoginResponse;
import com.vueloscolombia.backend.dto.RegisterRequest;
import com.vueloscolombia.backend.service.AuthService;
import com.vueloscolombia.backend.security.JwtUtil;
import com.vueloscolombia.backend.security.CustomUserDetails;

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
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        try {
            var usuario = authService.register(
                    req.getCorreo(),
                    req.getContrasena(),
                    req.getTipoDocumento(),
                    req.getNumeroDocumento(),
                    req.getPrimerNombre(),
                    req.getSegundoNombre(),
                    req.getPrimerApellido(),
                    req.getSegundoApellido(),
                    req.getNumeroCelular(),
                    req.getFechaNacimiento(),
                    req.getRol()
            );
            return ResponseEntity.ok().body("Usuario registrado exitosamente");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    req.getUsername(),
                    req.getPassword()
                )
            );

            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            String token = jwtUtil.generateToken(userDetails);
            
            LoginResponse response = new LoginResponse(token);
            response.setUsuarioId(userDetails.getId());
            response.setUsername(userDetails.getUsername());
            response.setRol(userDetails.getAuthorities().iterator().next().getAuthority());
            
            return ResponseEntity.ok(response);

        } catch (AuthenticationException ex) {
            return ResponseEntity.badRequest().body("Credenciales inválidas");
        }
    }
}