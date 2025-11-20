package com.vueloscolombia.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import com.vueloscolombia.backend.repository.*;
import com.vueloscolombia.backend.model.*;
import java.util.List;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;
    @Autowired
    private VueloRepository vueloRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;

    public Reserva crearReserva(Long vueloId, String username, int cantidad) {
        Usuario usuario = usuarioRepository.findByUsername(username).orElseThrow();
        Vuelo vuelo = vueloRepository.findById(vueloId).orElseThrow();

        if (vuelo.getDisponibles() < cantidad) {
            throw new RuntimeException("No hay suficientes asientos");
        }
        vuelo.setDisponibles(vuelo.getDisponibles() - cantidad);
        vueloRepository.save(vuelo);

        Reserva r = new Reserva();
        r.setUsuario(usuario);
        r.setVuelo(vuelo);
        r.setCantidad(cantidad);
        r.setEstado("CONFIRMADA");
        return reservaRepository.save(r);
    }

    public List<Reserva> reservasPorUsuario(Long usuarioId) {
        return reservaRepository.findByUsuarioId(usuarioId);
    }

    public List<Reserva> reservasPorUsername(String username) {
        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado: " + username));
        return reservaRepository.findByUsuarioId(usuario.getId());
    }

    public List<Reserva> reservasPorVuelo(Long vueloId) {
        return reservaRepository.findByVueloId(vueloId);
    }

    public void eliminarTodasLasReservas() {
        reservaRepository.deleteAll();
    }

    @Transactional
    public void eliminarReserva(Long reservaId, String username) {
        Reserva reserva = reservaRepository.findById(reservaId)
                .orElseThrow(() -> new RuntimeException("Reserva no encontrada"));
        if (!reserva.getUsuario().getUsername().equals(username)) {
            throw new RuntimeException("No autorizado para eliminar esta reserva");
        }

        Vuelo vuelo = reserva.getVuelo();
        vuelo.setDisponibles(vuelo.getDisponibles() + reserva.getCantidad());
        vueloRepository.save(vuelo);

        reservaRepository.deleteById(reservaId);
    }
}
