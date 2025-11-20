package com.vueloscolombia.backend.repository;

import com.vueloscolombia.backend.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    List<Reserva> findByUsuarioId(Long usuarioId);
    List<Reserva> findByVueloId(Long vueloId);
}