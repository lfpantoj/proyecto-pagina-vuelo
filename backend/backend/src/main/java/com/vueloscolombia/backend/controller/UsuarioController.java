package com.vueloscolombia.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.vueloscolombia.backend.service.UsuarioService;
import com.vueloscolombia.backend.model.Usuario;
import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "${app.cors.allowed-origins}")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public List<Usuario> listar() { return usuarioService.listar(); }
}
