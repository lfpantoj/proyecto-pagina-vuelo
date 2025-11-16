package com.vueloscolombia.backend.repository;

import com.vueloscolombia.backend.model.Vuelo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface VueloRepository extends JpaRepository<Vuelo, Long> {
    List<Vuelo> findByOrigenAndDestino(String origen, String destino);
}
