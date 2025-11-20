package com.vueloscolombia.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.vueloscolombia.backend.service.VueloService;
import com.vueloscolombia.backend.model.Vuelo;
import java.util.List;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import java.io.IOException;

import com.vueloscolombia.backend.model.Reserva;
import com.vueloscolombia.backend.model.Usuario;
import com.vueloscolombia.backend.service.PdfService;
import com.vueloscolombia.backend.service.ReservaService;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/vuelos")
@CrossOrigin(origins = "${app.cors.allowed-origins}")
public class VueloController {

    @Autowired
    private VueloService vueloService;

    @Autowired
    private ReservaService reservaService;

    @Autowired
    private PdfService pdfService;

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

    @GetMapping(value = "/reporte/pdf", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<byte[]> generarReportePDF() {
        try {
            byte[] pdf = vueloService.generarReporteVuelosPDF();
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=reporte_vuelos.pdf");

            return ResponseEntity.ok()
                    .headers(headers)
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdf);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/{vueloId}/pasajeros/pdf", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<byte[]> generarPdfPasajeros(@PathVariable String vueloId) {
        try {
            List<Reserva> reservas = reservaService.reservasPorVuelo(Long.parseLong(vueloId));
            List<Usuario> pasajeros = reservas.stream().map(Reserva::getUsuario).collect(Collectors.toList());

            byte[] pdf = pdfService.generarPdfPasajeros(vueloId, pasajeros);

            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=pasajeros_vuelo_" + vueloId + ".pdf");

            return ResponseEntity.ok()
                    .headers(headers)
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdf);
        } catch (IOException e) {
            // Log the exception
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
