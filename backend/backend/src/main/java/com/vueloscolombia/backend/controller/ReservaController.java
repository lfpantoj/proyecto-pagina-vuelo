package com.vueloscolombia.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.vueloscolombia.backend.service.ReservaService;
import com.vueloscolombia.backend.model.Reserva;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/reservas")
@CrossOrigin(origins = "${app.cors.allowed-origins}")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @PostMapping("/{vueloId}")
    public Reserva reservar(@PathVariable Long vueloId, @RequestParam int cantidad, Principal principal) {
        return reservaService.crearReserva(vueloId, principal.getName(), cantidad);
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<Reserva> reservasUsuario(@PathVariable Long usuarioId) {
        return reservaService.reservasPorUsuario(usuarioId);
    }
}
