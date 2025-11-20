package com.vueloscolombia.backend.model;

import jakarta.persistence.*;

@Entity
public class Vuelo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int disponibles;
    private String origen;
    private String destino;
    private double precio;
    private String horaSalida;
    private String horaLlegada;
    private String fecha;  
    private String aerolinea;


    public Vuelo() {
    }

    public Vuelo(String origen, String destino, double precio, String horaSalida, String horaLlegada, int disponibles, String fecha, String aerolinea) {
        this.disponibles=disponibles;
        this.fecha=fecha;
        this.origen = origen;
        this.destino = destino;
        this.precio = precio;
        this.horaSalida = horaSalida;
        this.horaLlegada = horaLlegada;
        this.aerolinea = aerolinea;
    }

    // GETTERS Y SETTERS
    public String getAerolinea() {
        return aerolinea;
    }

    public void setAerolinea(String aerolinea) {
        this.aerolinea = aerolinea;
    }
    public int getDisponibles() {
        return disponibles;
    }


    public void setDisponibles(int disponibles) {
        this.disponibles = disponibles;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }


    public Long getId() {
        return id;
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

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public String getHoraSalida() {
        return horaSalida;
    }

    public void setHoraSalida(String horaSalida) {
        this.horaSalida = horaSalida;
    }

    public String getHoraLlegada() {
        return horaLlegada;
    }

    public void setHoraLlegada(String horaLlegada) {
        this.horaLlegada = horaLlegada;
    }
}
