package DeltaFlores.web.controller;

import DeltaFlores.web.dto.PlantEventDto;
import DeltaFlores.web.service.LogService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/log")
@RequiredArgsConstructor
@Log4j2
public class LogController {

    private final LogService logService;

    @GetMapping("/events")
    @PreAuthorize("hasRole('GROWER') or hasRole('ADMIN')")
    public ResponseEntity<List<PlantEventDto>> getAllEventsForCurrentUser(
            @RequestParam(required = false) String eventType,
            @RequestParam(required = false) Long salaId,
            @RequestParam(required = false) Long plantId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        log.info("\n\n[Capa Controller] 📚 Solicitud para obtener todos los eventos del usuario autenticado con filtros.");
        try {
            List<PlantEventDto> events = logService.getAllEventsForCurrentUser(
                    eventType, salaId, plantId, startDate, endDate);
            log.info("\n\n[Capa Controller] ✅ {} eventos obtenidos para el usuario autenticado con filtros.", events.size());
            return ResponseEntity.ok(events);
        } catch (Exception e) {
            log.error("\n\n[Capa Controller] ❌ Error al obtener todos los eventos para el usuario autenticado con filtros: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}