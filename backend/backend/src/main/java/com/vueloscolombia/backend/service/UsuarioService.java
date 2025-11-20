package com.vueloscolombia.backend.service;

import com.vueloscolombia.backend.dto.UsuarioDTO;
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

    public Usuario obtenerPorUsername(String username) {
        return usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado: " + username));
    }

    public Usuario actualizarUsuario(String username, UsuarioDTO usuarioDTO) {
        Usuario existingUser = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado: " + username));

        existingUser.setTipoDocumento(usuarioDTO.getTipoDocumento());
        existingUser.setNumeroDocumento(usuarioDTO.getNumeroDocumento());
        existingUser.setPrimerNombre(usuarioDTO.getPrimerNombre());
        existingUser.setSegundoNombre(usuarioDTO.getSegundoNombre());
        existingUser.setPrimerApellido(usuarioDTO.getPrimerApellido());
        existingUser.setSegundoApellido(usuarioDTO.getSegundoApellido());
        existingUser.setNumeroCelular(usuarioDTO.getNumeroCelular());
        existingUser.setFechaNacimiento(usuarioDTO.getFechaNacimiento());
        existingUser.setUsername(usuarioDTO.getUsername());

        return usuarioRepository.save(existingUser);
    }
}
