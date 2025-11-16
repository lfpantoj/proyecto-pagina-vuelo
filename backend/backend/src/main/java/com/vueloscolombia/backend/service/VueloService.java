package com.vueloscolombia.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.vueloscolombia.backend.repository.VueloRepository;
import com.vueloscolombia.backend.model.Vuelo;
import java.util.List;

@Service
public class VueloService {

    @Autowired
    private VueloRepository vueloRepository;

    public List<Vuelo> listar() { return vueloRepository.findAll(); }

    public Vuelo guardar(Vuelo v) { return vueloRepository.save(v); }

    public Vuelo actualizar(Long id, Vuelo v) {
        Vuelo exist = vueloRepository.findById(id).orElseThrow();
        exist.setOrigen(v.getOrigen());
        exist.setDestino(v.getDestino());
        exist.setFecha(v.getFecha());
        exist.setPrecio(v.getPrecio());
        exist.setDisponibles(v.getDisponibles());
        return vueloRepository.save(exist);
    }

    public void eliminar(Long id) { vueloRepository.deleteById(id); }

    public List<Vuelo> buscar(String origen, String destino) {
        return vueloRepository.findByOrigenAndDestino(origen, destino);
    }
}
