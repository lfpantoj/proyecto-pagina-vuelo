package com.vueloscolombia.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.vueloscolombia.backend.repository.VueloRepository;
import com.vueloscolombia.backend.model.Vuelo;
import java.util.List;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;


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
        exist.setHoraSalida(v.getHoraSalida());
        exist.setHoraLlegada(v.getHoraLlegada());
        exist.setAerolinea(v.getAerolinea());
        exist.setPrecio(v.getPrecio());
        exist.setDisponibles(v.getDisponibles());
        return vueloRepository.save(exist);
    }

    public void eliminar(Long id) { vueloRepository.deleteById(id); }

    public List<Vuelo> buscar(String origen, String destino) {
        return vueloRepository.findByOrigenAndDestino(origen, destino);
    }

    public byte[] generarReporteVuelosPDF() throws IOException {
        List<Vuelo> vuelos = vueloRepository.findAll();
        
        try (PDDocument document = new PDDocument()) {
            PDPage page = new PDPage();
            document.addPage(page);

            try (PDPageContentStream contentStream = new PDPageContentStream(document, page)) {
                contentStream.setFont(PDType1Font.HELVETICA_BOLD, 16);
                contentStream.beginText();
                contentStream.newLineAtOffset(50, 750);
                contentStream.showText("Reporte de Vuelos");
                contentStream.endText();

                // Table headers
                String[] headers = {"ID", "Origen", "Destino", "Fecha", "Salida", "Llegada", "Precio", "Disponibles"};
                contentStream.setFont(PDType1Font.HELVETICA_BOLD, 10);
                float yPosition = 700;
                float margin = 50;
                float tableWidth = page.getMediaBox().getWidth() - 2 * margin;
                float[] columnWidths = {40, 80, 80, 80, 60, 60, 80, 80};

                // Draw headers
                float xPosition = margin;
                for (int i = 0; i < headers.length; i++) {
                    contentStream.beginText();
                    contentStream.newLineAtOffset(xPosition, yPosition);
                    contentStream.showText(headers[i]);
                    contentStream.endText();
                    xPosition += columnWidths[i];
                }
                yPosition -= 20;

                // Draw data
                contentStream.setFont(PDType1Font.HELVETICA, 10);
                for (Vuelo vuelo : vuelos) {
                    xPosition = margin;
                    String[] row = {
                        vuelo.getId().toString(),
                        vuelo.getOrigen(),
                        vuelo.getDestino(),
                        vuelo.getFecha(),
                        vuelo.getHoraSalida(),
                        vuelo.getHoraLlegada(),
                        String.valueOf(vuelo.getPrecio()),
                        String.valueOf(vuelo.getDisponibles())
                    };

                    for (int i = 0; i < row.length; i++) {
                        contentStream.beginText();
                        contentStream.newLineAtOffset(xPosition, yPosition);
                        contentStream.showText(row[i]);
                        contentStream.endText();
                        xPosition += columnWidths[i];
                    }
                    yPosition -= 20;
                }
            }

            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            document.save(byteArrayOutputStream);
            return byteArrayOutputStream.toByteArray();
        }
    }
}
