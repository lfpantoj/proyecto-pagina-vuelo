package com.vueloscolombia.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.vueloscolombia.backend.service.VueloService;
import com.vueloscolombia.backend.model.Vuelo;
import java.util.List;

@RestController
@RequestMapping("/api/vuelos")
@CrossOrigin(origins = "${app.cors.allowed-origins}")
public class VueloController {

    @Autowired
    private VueloService vueloService;

    @GetMapping
    public List<Vuelo> listar() { return vueloService.listar(); }

    @GetMapping("/buscar")
    public List<Vuelo> buscar(@RequestParam String origen, @RequestParam String destino) {
        return vueloService.buscar(origen, destino);
    }

    @PostMapping
    public Vuelo crear(@RequestBody Vuelo vuelo) { return vueloService.guardar(vuelo); }

    @PutMapping("/{id}")
    public Vuelo actualizar(@PathVariable Long id, @RequestBody Vuelo vuelo) { return vueloService.actualizar(id, vuelo); }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) { vueloService.eliminar(id); }
}
