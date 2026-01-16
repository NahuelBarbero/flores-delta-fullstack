package DeltaFlores.web.service;

import DeltaFlores.web.dto.PlantEventDto;
import DeltaFlores.web.entities.Planta; // Importado correctamente
import DeltaFlores.web.entities.PlantEvent;
import DeltaFlores.web.entities.User;
import DeltaFlores.web.exception.ResourceNotFoundException;
import DeltaFlores.web.repository.PlantEventRepository;
import DeltaFlores.web.repository.PlantaRepository;
import DeltaFlores.web.repository.UserRepository;
import DeltaFlores.web.security.SecurityUtils; // Importado
import DeltaFlores.web.utils.DtoMapper; // Correct import
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Log4j2
public class LogService {

    private final PlantEventRepository plantEventRepository;
    private final PlantaRepository plantaRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<PlantEventDto> getAllEventsForCurrentUser(
            String eventType,
            Long salaId,
            Long plantId,
            LocalDate startDate,
            LocalDate endDate) {
        Long userId = SecurityUtils.getCurrentUserId();
        log.info(
                "[Service] Obteniendo todos los eventos para el usuario ID: {} con filtros en DB: type={}, salaId={}, plantId={}, startDate={}, endDate={}",
                userId, eventType, salaId, plantId, startDate, endDate);

        User currentUser = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con ID: " + userId));

        List<Planta> plantas = plantaRepository.findByUserWithSalaAndCepa(currentUser);

        if (plantas.isEmpty()) {
            return List.of();
        }

        List<PlantEvent> events = plantEventRepository.findEventsWithFilters(
                plantas,
                eventType,
                plantId,
                salaId,
                startDate,
                endDate);

        return events.stream()
                .map(DtoMapper::plantEventToPlantEventDto)
                .collect(Collectors.toList());
    }
}