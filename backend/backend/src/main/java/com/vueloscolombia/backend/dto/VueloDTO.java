package com.vueloscolombia.backend.dto;

import java.time.LocalDateTime;

public class VueloDTO {
    private Long id;
    private String origen;
    private String destino;
    private LocalDateTime fecha;
    private Double precio;

    public VueloDTO() {}

    public VueloDTO(Long id, String origen, String destino, LocalDateTime fecha, Double precio) {
        this.id = id;
        this.origen = origen;
        this.destino = destino;
        this.fecha = fecha;
        this.precio = precio;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getOrigen() {
        return origen;
    }
    public void setOrigen(String origen) {
        this.origen = origen;
    }
    public String getDestino() {
        return destino;
    }
    public void setDestino(String destino) {
        this.destino = destino;
    }
    public LocalDateTime getFecha() {
        return fecha;
    }
    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }
    public Double getPrecio() {
        return precio;
    }
    public void setPrecio(Double precio) {
        this.precio = precio;
    }
}
