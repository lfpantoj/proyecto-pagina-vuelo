package com.vueloscolombia.backend.security;

import com.vueloscolombia.backend.model.Usuario;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

public class CustomUserDetails extends User {

    private final Long id;
    private final String tipoDocumento;
    private final String numeroDocumento;
    private final String primerNombre;
    private final String segundoNombre;
    private final String primerApellido;
    private final String segundoApellido;
    private final String numeroCelular;
    private final String fechaNacimiento;

    public CustomUserDetails(Usuario usuario, Collection<? extends GrantedAuthority> authorities) {
        super(usuario.getUsername(), usuario.getPassword(), authorities);
        this.id = usuario.getId();
        this.tipoDocumento = usuario.getTipoDocumento();
        this.numeroDocumento = usuario.getNumeroDocumento();
        this.primerNombre = usuario.getPrimerNombre();
        this.segundoNombre = usuario.getSegundoNombre();
        this.primerApellido = usuario.getPrimerApellido();
        this.segundoApellido = usuario.getSegundoApellido();
        this.numeroCelular = usuario.getNumeroCelular();
        this.fechaNacimiento = usuario.getFechaNacimiento();
    }

    // Getters for the custom fields
    public Long getId() { return id; }
    public String getTipoDocumento() { return tipoDocumento; }
    public String getNumeroDocumento() { return numeroDocumento; }
    public String getPrimerNombre() { return primerNombre; }
    public String getSegundoNombre() { return segundoNombre; }
    public String getPrimerApellido() { return primerApellido; }
    public String getSegundoApellido() { return segundoApellido; }
    public String getNumeroCelular() { return numeroCelular; }
    public String getFechaNacimiento() { return fechaNacimiento; }
}
