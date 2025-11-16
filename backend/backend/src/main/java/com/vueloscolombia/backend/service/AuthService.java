package com.vueloscolombia.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.vueloscolombia.backend.repository.UsuarioRepository;
import com.vueloscolombia.backend.model.Usuario;
import com.vueloscolombia.backend.model.Rol;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.Set;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Usuario register(String username, String rawPassword) {
        if (usuarioRepository.existsByUsername(username)) {
            throw new RuntimeException("Usuario ya existe");
        }
        Usuario u = new Usuario();
        u.setUsername(username);
        u.setPassword(passwordEncoder.encode(rawPassword));
        u.setRoles(Set.of(Rol.ROLE_USER));
        return usuarioRepository.save(u);
    }
}
