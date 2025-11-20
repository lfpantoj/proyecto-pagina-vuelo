package com.vueloscolombia.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.vueloscolombia.backend.repository.UsuarioRepository;
import com.vueloscolombia.backend.model.Usuario;
import com.vueloscolombia.backend.model.Rol;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.Set;

@Service
public class AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Usuario register(
            String correo,
            String contrasena,
            String tipoDocumento,
            String numeroDocumento,
            String primerNombre,
            String segundoNombre,
            String primerApellido,
            String segundoApellido,
            String numeroCelular,
            String fechaNacimiento,
            String rol
    ) {
        logger.info("Intentando registrar nuevo usuario con correo: {}", correo);

        if (usuarioRepository.existsByUsername(correo)) {
            logger.warn("El usuario con correo {} ya existe.", correo);
            throw new RuntimeException("Usuario ya existe");
        }

        Usuario u = new Usuario();
        u.setUsername(correo);
        u.setPassword(passwordEncoder.encode(contrasena));
        u.setTipoDocumento(tipoDocumento);
        u.setNumeroDocumento(numeroDocumento);
        u.setPrimerNombre(primerNombre);
        u.setSegundoNombre(segundoNombre);
        u.setPrimerApellido(primerApellido);
        u.setSegundoApellido(segundoApellido);
        u.setNumeroCelular(numeroCelular);
        u.setFechaNacimiento(fechaNacimiento);


        if ("admin".equalsIgnoreCase(rol)) {
            u.setRoles(Set.of(Rol.ROLE_ADMIN));
        } else {
            u.setRoles(Set.of(Rol.ROLE_USER));
        }

        logger.info("Guardando nuevo usuario: {}", u);
        Usuario usuarioGuardado = usuarioRepository.save(u);
        logger.info("Usuario guardado con exito: {}", usuarioGuardado);

        return usuarioGuardado;
    }
}
