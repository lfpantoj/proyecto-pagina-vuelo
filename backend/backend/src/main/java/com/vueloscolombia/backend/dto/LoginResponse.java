package com.vueloscolombia.backend.dto;

public class LoginResponse {

    private String token;
    private Long usuarioId;
    private String nombre;
    private String rol;

    public LoginResponse(String token, Long usuarioId, String nombre, String rol) {
        this.token = token;
        this.usuarioId = usuarioId;
        this.nombre = nombre;
        this.rol = rol;
    }

    public String getToken() {
        return token;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public String getNombre() {
        return nombre;
    }

    public String getRol() {
        return rol;
    }
}