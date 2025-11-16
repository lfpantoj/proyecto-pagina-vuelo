package com.vueloscolombia.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.vueloscolombia.backend.repository.UsuarioRepository;
import com.vueloscolombia.backend.model.Usuario;
import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> listar() { return usuarioRepository.findAll(); }

    public Usuario findByUsername(String username) { return usuarioRepository.findByUsername(username).orElse(null); }
}
