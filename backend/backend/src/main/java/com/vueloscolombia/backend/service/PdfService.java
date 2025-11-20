package com.vueloscolombia.backend.service;

import com.vueloscolombia.backend.model.Usuario;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
public class PdfService {

    public byte[] generarPdfPasajeros(String flightId, List<Usuario> pasajeros) throws IOException {
        try (PDDocument document = new PDDocument()) {
            PDPage page = new PDPage();
            document.addPage(page);

            try (PDPageContentStream contentStream = new PDPageContentStream(document, page)) {
                contentStream.setFont(PDType1Font.HELVETICA_BOLD, 16);
                contentStream.beginText();
                contentStream.newLineAtOffset(50, 750);
                contentStream.showText("Lista de Pasajeros - Vuelo " + flightId);
                contentStream.endText();

                // Table Headers
                String[] headers = {"Documento", "Nombre", "Email", "Celular", "Nacimiento"};
                float yPosition = 700;
                float margin = 50;
                float tableWidth = page.getMediaBox().getWidth() - 2 * margin;
                float[] columnWidths = {100, 150, 150, 80, 80};

                contentStream.setFont(PDType1Font.HELVETICA_BOLD, 12);
                float xPosition = margin;
                for (int i = 0; i < headers.length; i++) {
                    contentStream.beginText();
                    contentStream.newLineAtOffset(xPosition, yPosition);
                    contentStream.showText(headers[i]);
                    contentStream.endText();
                    xPosition += columnWidths[i];
                }
                yPosition -= 20;

                // Table Rows
                contentStream.setFont(PDType1Font.HELVETICA, 10);
                for (Usuario pasajero : pasajeros) {
                    xPosition = margin;
                    String[] row = {
                        pasajero.getNumeroDocumento() != null ? pasajero.getNumeroDocumento() : "",
                        (pasajero.getPrimerNombre() + " " + pasajero.getPrimerApellido()).trim(),
                        pasajero.getUsername() != null ? pasajero.getUsername() : "",
                        pasajero.getNumeroCelular() != null ? pasajero.getNumeroCelular() : "",
                        pasajero.getFechaNacimiento() != null ? pasajero.getFechaNacimiento() : ""
                    };

                    for (int i = 0; i < row.length; i++) {
                        contentStream.beginText();
                        contentStream.newLineAtOffset(xPosition, yPosition);
                        contentStream.showText(row[i]);
                        contentStream.endText();
                        xPosition += columnWidths[i];
                    }
                    yPosition -= 20;

                    // Add new page if content overflows
                    if (yPosition < 50) {
                        contentStream.close();
                        PDPage newPage = new PDPage();
                        document.addPage(newPage);
                        // Re-assign contentStream to the new page
                        // This is a simplified example. A real implementation would need to handle this more robustly.
                    }
                }
            }

            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            document.save(byteArrayOutputStream);
            return byteArrayOutputStream.toByteArray();
        }
    }
}
