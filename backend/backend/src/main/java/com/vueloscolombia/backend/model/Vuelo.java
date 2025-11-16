package com.vueloscolombia.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "vuelos")
public class Vuelo {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String origen;
    private String destino;
    private String fecha; 
    private Double precio;
    private Integer disponibles;

    public Vuelo() {}

    // getters y setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getOrigen() { return origen; }
    public void setOrigen(String origen) { this.origen = origen; }
    public String getDestino() { return destino; }
    public void setDestino(String destino) { this.destino = destino; }
    public String getFecha() { return fecha; }
    public void setFecha(String fecha) { this.fecha = fecha; }
    public Double getPrecio() { return precio; }
    public void setPrecio(Double precio) { this.precio = precio; }
    public Integer getDisponibles() { return disponibles; }
    public void setDisponibles(Integer disponibles) { this.disponibles = disponibles; }
}
