package com.vueloscolombia.backend.config;

import com.vueloscolombia.backend.model.Rol;
import com.vueloscolombia.backend.model.Usuario;
import com.vueloscolombia.backend.model.Vuelo;
import com.vueloscolombia.backend.repository.ReservaRepository;
import com.vueloscolombia.backend.repository.UsuarioRepository;
import com.vueloscolombia.backend.repository.VueloRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private VueloRepository vueloRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Limpiar todas las reservas al iniciar
        reservaRepository.deleteAll();
        
        // Cargar usuarios y roles de forma idempotente
        // Usuario Administrador
        if (usuarioRepository.findByUsername("admin@vueloscolombia.com").isEmpty()) {
            Usuario admin = new Usuario();
            admin.setUsername("admin@vueloscolombia.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRoles(Set.of(Rol.ROLE_ADMIN));
            usuarioRepository.save(admin);
        }

        // Usuario Cliente (Pepito)
        // Usamos orElse(new Usuario()) para crear uno nuevo si no existe,
        // o para actualizar el existente si ya fue creado.
        Usuario cliente = usuarioRepository.findByUsername("pepito@gmail.com").orElse(new Usuario());
        cliente.setUsername("pepito@gmail.com");
        // Solo encriptamos la contraseña si el usuario es nuevo para no sobreescribirla
        if (cliente.getId() == null) {
            cliente.setPassword(passwordEncoder.encode("123456"));
        }
        cliente.setRoles(Set.of(Rol.ROLE_USER));
        cliente.setTipoDocumento("CC");
        cliente.setNumeroDocumento("123456789");
        cliente.setPrimerNombre("Pepito");
        cliente.setPrimerApellido("Perez");
        cliente.setNumeroCelular("3001234567");
        cliente.setFechaNacimiento("1990-01-01");
        usuarioRepository.save(cliente);

        // Cargar vuelos si no existen
        if (vueloRepository.count() == 0) {
            List<Vuelo> vuelos = List.of(
                new Vuelo("BOG", "MED", 350000, "07:00", "08:00", 12, "2025-11-25", "Avianca"),
                new Vuelo("BOG", "MED", 320000, "14:30", "15:30", 8, "2025-11-25", "LATAM"),
                new Vuelo("BOG", "MED", 280000, "18:45", "19:45", 5, "2025-11-25", "Wingo"),
                new Vuelo("MED", "CAR", 420000, "06:15", "07:45", 15, "2025-11-26", "Avianca"),
                new Vuelo("MED", "CAR", 380000, "12:00", "13:30", 3, "2025-11-26", "Wingo"),
                new Vuelo("CAL", "BOG", 290000, "09:20", "10:20", 20, "2025-11-27", "LATAM"),
                new Vuelo("CAR", "SMR", 180000, "08:30", "09:00", 10, "2025-11-28", "Wingo"),
                new Vuelo("BOG", "BAQ", 310000, "16:45", "18:15", 7, "2025-11-29", "Avianca"),
                new Vuelo("MED", "CAL", 270000, "11:10", "12:10", 4, "2025-11-30", "LATAM"),
                new Vuelo("SMR", "BOG", 390000, "13:25", "14:55", 18, "2025-12-01", "Wingo")
            );
            vueloRepository.saveAll(vuelos);
        }
    }
}
