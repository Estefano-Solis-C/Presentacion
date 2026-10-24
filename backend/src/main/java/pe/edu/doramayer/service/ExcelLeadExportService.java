package pe.edu.doramayer.service;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import pe.edu.doramayer.domain.Lead;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class ExcelLeadExportService {

    private static final Logger log = LoggerFactory.getLogger(ExcelLeadExportService.class);
    private static final String EXCEL_FILE_PATH = "data/solicitudes_admision.xlsx";
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");

    private static final String[] HEADERS = {
            "CÓDIGO AUDITABLE",
            "FECHA Y HORA",
            "NOMBRES APODERADO",
            "APODERADO APELLIDOS",
            "DOCUMENTO",
            "CELULAR WHATSAPP",
            "CORREO ELECTRÓNICO",
            "ESTUDIANTE A INSCRIBIR",
            "NIVEL EDUCATIVO",
            "GRADO AL QUE POSTULA",
            "ESTADO"
    };

    /**
     * Registra un lead de admisión de forma persistente y sincronizada en el libro Excel.
     */
    public synchronized void appendLead(Lead lead) {
        try {
            File file = new File(EXCEL_FILE_PATH);
            File parentDir = file.getParentFile();
            if (parentDir != null && !parentDir.exists()) {
                parentDir.mkdirs();
            }

            XSSFWorkbook workbook;
            Sheet sheet;

            if (file.exists()) {
                try (FileInputStream fis = new FileInputStream(file)) {
                    workbook = new XSSFWorkbook(fis);
                    sheet = workbook.getSheet("Solicitudes de Admisión");
                    if (sheet == null) {
                        sheet = workbook.createSheet("Solicitudes de Admisión");
                        createHeaderRow(workbook, sheet);
                    }
                }
            } else {
                workbook = new XSSFWorkbook();
                sheet = workbook.createSheet("Solicitudes de Admisión");
                createHeaderRow(workbook, sheet);
            }

            int lastRow = sheet.getLastRowNum();
            Row row = sheet.createRow(lastRow + 1);

            CellStyle dataStyle = createDataStyle(workbook, (lastRow + 1) % 2 == 0);

            String auditableId = String.format("ADM-%d-%04d",
                    lead.getCreatedAt() != null ? lead.getCreatedAt().getYear() : 2026,
                    lead.getId() != null ? lead.getId() : 1);

            String fechaHora = lead.getCreatedAt() != null
                    ? lead.getCreatedAt().format(DATE_TIME_FORMATTER)
                    : "";

            String[] values = {
                    auditableId,
                    fechaHora,
                    lead.getApoderadoNombres() != null ? lead.getApoderadoNombres() : "",
                    lead.getApoderadoApellidos() != null ? lead.getApoderadoApellidos() : "",
                    lead.getDocumento() != null && !lead.getDocumento().isBlank() ? lead.getDocumento() : "No especificado",
                    lead.getCelular() != null && !lead.getCelular().isBlank() ? lead.getCelular() : "No especificado",
                    lead.getCorreo() != null && !lead.getCorreo().isBlank() ? lead.getCorreo() : "No especificado",
                    lead.getAlumnoNombre() != null ? lead.getAlumnoNombre() : "",
                    lead.getNivel() != null ? lead.getNivel() : "",
                    lead.getGrado() != null ? lead.getGrado() : "",
                    "PENDIENTE CONTACTO WHATSAPP"
            };

            for (int i = 0; i < values.length; i++) {
                Cell cell = row.createCell(i);
                cell.setCellValue(values[i]);
                cell.setCellStyle(dataStyle);
            }

            for (int i = 0; i < HEADERS.length; i++) {
                sheet.autoSizeColumn(i);
            }

            try (FileOutputStream fos = new FileOutputStream(file)) {
                workbook.write(fos);
            }
            workbook.close();

            log.info("Lead {} guardado exitosamente en {}", auditableId, EXCEL_FILE_PATH);
        } catch (Exception e) {
            log.error("Error al registrar lead en Excel persistente: {}", e.getMessage(), e);
        }
    }

    /**
     * Genera un libro Excel en memoria con todos los leads registrados para descarga vía API.
     */
    public byte[] exportLeadsToExcel(List<Lead> leads) throws IOException {
        try (XSSFWorkbook workbook = new XSSFWorkbook();
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            Sheet sheet = workbook.createSheet("Solicitudes de Admisión");
            createHeaderRow(workbook, sheet);

            int rowIdx = 1;
            for (Lead lead : leads) {
                Row row = sheet.createRow(rowIdx);
                CellStyle dataStyle = createDataStyle(workbook, rowIdx % 2 == 0);

                String auditableId = String.format("ADM-%d-%04d",
                        lead.getCreatedAt() != null ? lead.getCreatedAt().getYear() : 2026,
                        lead.getId() != null ? lead.getId() : 1);

                String fechaHora = lead.getCreatedAt() != null
                        ? lead.getCreatedAt().format(DATE_TIME_FORMATTER)
                        : "";

                String[] values = {
                        auditableId,
                        fechaHora,
                        lead.getApoderadoNombres() != null ? lead.getApoderadoNombres() : "",
                        lead.getApoderadoApellidos() != null ? lead.getApoderadoApellidos() : "",
                        lead.getDocumento() != null && !lead.getDocumento().isBlank() ? lead.getDocumento() : "No especificado",
                        lead.getCelular() != null && !lead.getCelular().isBlank() ? lead.getCelular() : "No especificado",
                        lead.getCorreo() != null && !lead.getCorreo().isBlank() ? lead.getCorreo() : "No especificado",
                        lead.getAlumnoNombre() != null ? lead.getAlumnoNombre() : "",
                        lead.getNivel() != null ? lead.getNivel() : "",
                        lead.getGrado() != null ? lead.getGrado() : "",
                        "PENDIENTE CONTACTO WHATSAPP"
                };

                for (int i = 0; i < values.length; i++) {
                    Cell cell = row.createCell(i);
                    cell.setCellValue(values[i]);
                    cell.setCellStyle(dataStyle);
                }
                rowIdx++;
            }

            for (int i = 0; i < HEADERS.length; i++) {
                sheet.autoSizeColumn(i);
            }

            workbook.write(out);
            return out.toByteArray();
        }
    }

    private void createHeaderRow(XSSFWorkbook workbook, Sheet sheet) {
        Row headerRow = sheet.createRow(0);
        headerRow.setHeightInPoints(28);

        XSSFCellStyle headerStyle = workbook.createCellStyle();
        // Azul Marino Institucional #0F296B (RGB 15, 41, 107)
        XSSFColor navy = new XSSFColor(new java.awt.Color(15, 41, 107), null);
        headerStyle.setFillForegroundColor(navy);
        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        XSSFFont headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerFont.setColor(IndexedColors.WHITE.getIndex());
        headerFont.setFontHeightInPoints((short) 11);
        headerStyle.setFont(headerFont);

        headerStyle.setAlignment(HorizontalAlignment.CENTER);
        headerStyle.setVerticalAlignment(VerticalAlignment.CENTER);

        // Borde inferior dorado #FBB600 (RGB 251, 182, 0)
        XSSFColor gold = new XSSFColor(new java.awt.Color(251, 182, 0), null);
        headerStyle.setBottomBorderColor(gold);
        headerStyle.setBorderBottom(BorderStyle.MEDIUM);
        headerStyle.setBorderTop(BorderStyle.THIN);
        headerStyle.setBorderLeft(BorderStyle.THIN);
        headerStyle.setBorderRight(BorderStyle.THIN);

        for (int i = 0; i < HEADERS.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(HEADERS[i]);
            cell.setCellStyle(headerStyle);
        }
    }

    private CellStyle createDataStyle(XSSFWorkbook workbook, boolean isEven) {
        XSSFCellStyle style = workbook.createCellStyle();

        if (isEven) {
            // Neutro suave #F4F6FB (RGB 244, 246, 251)
            XSSFColor softNeutral = new XSSFColor(new java.awt.Color(244, 246, 251), null);
            style.setFillForegroundColor(softNeutral);
            style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        }

        XSSFFont font = workbook.createFont();
        font.setFontHeightInPoints((short) 10);
        style.setFont(font);

        style.setVerticalAlignment(VerticalAlignment.CENTER);
        style.setBorderBottom(BorderStyle.THIN);
        style.setBottomBorderColor(IndexedColors.GREY_25_PERCENT.getIndex());
        style.setBorderTop(BorderStyle.THIN);
        style.setTopBorderColor(IndexedColors.GREY_25_PERCENT.getIndex());
        style.setBorderLeft(BorderStyle.THIN);
        style.setLeftBorderColor(IndexedColors.GREY_25_PERCENT.getIndex());
        style.setBorderRight(BorderStyle.THIN);
        style.setRightBorderColor(IndexedColors.GREY_25_PERCENT.getIndex());

        return style;
    }
}
