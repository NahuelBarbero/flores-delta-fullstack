package DeltaFlores.web.service.events;

import DeltaFlores.web.dto.PhotoEventDto;
import DeltaFlores.web.entities.PhotoEvent;
import DeltaFlores.web.entities.Planta;
import DeltaFlores.web.exception.ResourceNotFoundException;
import DeltaFlores.web.repository.PhotoEventRepository;
import DeltaFlores.web.repository.PlantaRepository;
import DeltaFlores.web.utils.DtoMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Log4j2
public class PhotoEventService {

    private final PhotoEventRepository photoEventRepository;
    private final PlantaRepository plantaRepository;
    // TODO: Integrar un servicio de almacenamiento de archivos (ej. S3, local,
    // etc.)

    @Transactional
    public PhotoEventDto createPhotoEvent(PhotoEventDto photoEventDto, List<MultipartFile> files) throws IOException {
        log.info("[Service] Creando evento de foto para plantaIds: {}", photoEventDto.getPlantaIds());

        PhotoEvent photoEvent = new PhotoEvent();
        photoEvent.setFecha(photoEventDto.getFecha() != null ? photoEventDto.getFecha() : LocalDate.now());
        photoEvent.setDescription(photoEventDto.getDescription());
        // El eventType se maneja automáticamente por JPA con @DiscriminatorValue

        List<String> mediaUrls = new ArrayList<>();
        if (files != null && !files.isEmpty()) {
            for (MultipartFile file : files) {
                mediaUrls.add("/uploads/" + file.getOriginalFilename());
            }
        }
        photoEvent.setMediaUrls(mediaUrls);

        List<Planta> plantas = photoEventDto.getPlantaIds().stream()
                .map(plantId -> plantaRepository.findById(plantId)
                        .orElseThrow(() -> new ResourceNotFoundException("Planta no encontrada con ID: " + plantId)))
                .collect(Collectors.toList());

        photoEvent.setPlantas(plantas);
        PhotoEvent savedEvent = photoEventRepository.save(photoEvent);

        return DtoMapper.photoEventToPhotoEventDto(savedEvent);
    }

    @Transactional(readOnly = true)
    public PhotoEventDto getPhotoEventById(Long id) {
        PhotoEvent photoEvent = photoEventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Evento de foto no encontrado con ID: " + id));
        return DtoMapper.photoEventToPhotoEventDto(photoEvent);
    }

    @Transactional(readOnly = true)
    public List<PhotoEventDto> getAllPhotoEvents() {
        return photoEventRepository.findAll().stream()
                .map(DtoMapper::photoEventToPhotoEventDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<PhotoEventDto> getPhotoEventsByPlantaId(Long plantaId) {
        Planta planta = plantaRepository.findById(plantaId)
                .orElseThrow(() -> new ResourceNotFoundException("Planta no encontrada con ID: " + plantaId));
        return photoEventRepository.findAll().stream()
                .filter(pe -> pe.getPlantas() != null && pe.getPlantas().contains(planta))
                .map(DtoMapper::photoEventToPhotoEventDto)
                .collect(Collectors.toList());
    }
}
