package DeltaFlores.web.controller;

import DeltaFlores.web.dto.PhotoEventDto;
import DeltaFlores.web.exception.ResourceNotFoundException;
import DeltaFlores.web.service.events.PhotoEventService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/events/photo")
@RequiredArgsConstructor
@Log4j2
public class PhotoEventController {

    private final PhotoEventService photoEventService;

    @PostMapping
    @PreAuthorize("hasRole('GROWER') or hasRole('ADMIN')")
    public ResponseEntity<PhotoEventDto> createPhotoEvent(
            @ModelAttribute PhotoEventDto photoEventDto,
            @RequestParam(value = "files", required = false) List<MultipartFile> files) {
        log.info("\n\n[Capa Controller] 📸 Solicitud para crear evento de foto.");
        try {
            PhotoEventDto createdEvent = photoEventService.createPhotoEvent(photoEventDto, files);
            log.info("\n\n[Capa Controller] ✅ Evento de foto creado con éxito con ID: {}", createdEvent.getId());
            return new ResponseEntity<>(createdEvent, HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("\n\n[Capa Controller] ❌ Error inesperado al crear evento de foto: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('GROWER') or hasRole('ADMIN')")
    public ResponseEntity<PhotoEventDto> getPhotoEventById(@PathVariable Long id) {
        log.info("\n\n[Capa Controller] 🔎 Solicitud para obtener evento de foto con ID: {}", id);
        try {
            PhotoEventDto event = photoEventService.getPhotoEventById(id);
            log.info("\n\n[Capa Controller] ✅ Evento de foto con ID: {} obtenido con éxito.", id);
            return ResponseEntity.ok(event);
        } catch (ResourceNotFoundException e) {
            log.warn("\n\n[Capa Controller] ⚠️ Evento de foto con ID: {} no encontrado.", id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            log.error("\n\n[Capa Controller] ❌ Error al obtener evento de foto con ID {}: {}", id, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/planta/{plantaId}")
    @PreAuthorize("hasRole('GROWER') or hasRole('ADMIN')")
    public ResponseEntity<List<PhotoEventDto>> getPhotoEventsByPlantaId(@PathVariable Long plantaId) {
        log.info("\n\n[Capa Controller] 🔎 Solicitud para obtener eventos de foto por ID de planta: {}", plantaId);
        try {
            List<PhotoEventDto> events = photoEventService.getPhotoEventsByPlantaId(plantaId);
            log.info("\n\n[Capa Controller] ✅ {} eventos de foto obtenidos para planta ID: {}.", events.size(), plantaId);
            return ResponseEntity.ok(events);
        } catch (Exception e) {
            log.error("\n\n[Capa Controller] ❌ Error al obtener eventos de foto por planta ID {}: {}", plantaId, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping
    @PreAuthorize("hasRole('GROWER') or hasRole('ADMIN')")
    public ResponseEntity<List<PhotoEventDto>> getAllPhotoEvents() {
        log.info("\n\n[Capa Controller] 🔎 Solicitud para obtener todos los eventos de foto.");
        try {
            List<PhotoEventDto> events = photoEventService.getAllPhotoEvents();
            log.info("\n\n[Capa Controller] ✅ {} eventos de foto obtenidos con éxito.", events.size());
            return ResponseEntity.ok(events);
        } catch (Exception e) {
            log.error("\n\n[Capa Controller] ❌ Error al obtener todos los eventos de foto: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
