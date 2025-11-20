package com.vueloscolombia.backend.controller;

import com.vueloscolombia.backend.dto.UsuarioDTO;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.vueloscolombia.backend.service.UsuarioService;
import com.vueloscolombia.backend.model.Usuario;
import java.util.List;

import java.security.Principal;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "${app.cors.allowed-origins}")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public List<Usuario> listar() { return usuarioService.listar(); }

    @GetMapping("/me")
    public Usuario obtenerUsuarioActual(Principal principal) {
        return usuarioService.obtenerPorUsername(principal.getName());
    }

    @PutMapping("/me/update")
    public Usuario actualizarUsuario(@RequestBody UsuarioDTO usuarioDTO, Principal principal){
        return usuarioService.actualizarUsuario(principal.getName(), usuarioDTO);
    }
}
