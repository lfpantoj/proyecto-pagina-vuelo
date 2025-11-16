package com.vueloscolombia.backend.dto;

public class ReservaDTO {
    private Long id;
    private Long usuarioId;
    private Long vueloId;
    private int cantidad;

    public ReservaDTO() {}

    public ReservaDTO(Long id, Long usuarioId, Long vueloId, int cantidad) {
        this.id = id;
        this.usuarioId = usuarioId;
        this.vueloId = vueloId;
        this.cantidad = cantidad;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Long getUsuarioId() {
        return usuarioId;
    }
    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }
    public Long getVueloId() {
        return vueloId;
    }
    public void setVueloId(Long vueloId) {
        this.vueloId = vueloId;
    }
    public int getCantidad() {
        return cantidad;
    }
    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }
}
