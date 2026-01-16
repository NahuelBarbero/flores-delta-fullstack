package DeltaFlores.web.service.events;

import DeltaFlores.web.dto.WateringEventDto;
import DeltaFlores.web.entities.Planta;
import DeltaFlores.web.entities.WateringEvent;
import DeltaFlores.web.exception.ResourceNotFoundException;
import DeltaFlores.web.repository.PlantaRepository;
import DeltaFlores.web.repository.WateringEventRepository;
import DeltaFlores.web.utils.DtoMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class WateringEventServiceTest {

    @Mock
    private WateringEventRepository wateringEventRepository;

    @Mock
    private PlantaRepository plantaRepository;

    @InjectMocks
    private WateringEventService wateringEventService;

    private Planta testPlant;
    private WateringEvent testWateringEvent;
    private WateringEventDto testWateringEventDto;

    @BeforeEach
    void setUp() {
        testPlant = new Planta();
        testPlant.setId(1L);
        testPlant.setNombre("Test Plant");

        testWateringEvent = new WateringEvent();
        testWateringEvent.setId(10L);
        testWateringEvent.setFecha(LocalDate.now());
        testWateringEvent.setPhAgua(6.5);
        testWateringEvent.setEcAgua(1.2);
        testWateringEvent.setTempAgua(22.0);
        testWateringEvent.setPlantas(Collections.singletonList(testPlant));

        testWateringEventDto = new WateringEventDto();
        testWateringEventDto.setId(10L);
        testWateringEventDto.setFecha(LocalDate.now());
        testWateringEventDto.setPhAgua(6.5);
        testWateringEventDto.setEcAgua(1.2);
        testWateringEventDto.setTempAgua(22.0);
        testWateringEventDto.setPlantaIds(Collections.singletonList(testPlant.getId()));
    }

    @Test
    void createWateringEvent_shouldReturnCreatedEvent() {
        WateringEventDto inputDto = new WateringEventDto();
        inputDto.setFecha(LocalDate.now());
        inputDto.setPhAgua(6.0);
        inputDto.setEcAgua(1.0);
        inputDto.setTempAgua(20.0);
        inputDto.setPlantaIds(Collections.singletonList(1L));

        when(plantaRepository.findById(1L)).thenReturn(Optional.of(testPlant));
        when(wateringEventRepository.save(any(WateringEvent.class))).thenReturn(testWateringEvent);

        WateringEventDto result = wateringEventService.createWateringEvent(inputDto);

        assertNotNull(result);
        assertEquals(testWateringEvent.getId(), result.getId());
        verify(plantaRepository, times(1)).findById(1L);
        verify(wateringEventRepository, times(1)).save(any(WateringEvent.class));
    }

    @Test
    void createWateringEvent_plantNotFound_shouldThrowException() {
        WateringEventDto inputDto = new WateringEventDto();
        inputDto.setPlantaIds(Collections.singletonList(99L));

        when(plantaRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> wateringEventService.createWateringEvent(inputDto));
        verify(plantaRepository, times(1)).findById(99L);
        verify(wateringEventRepository, never()).save(any(WateringEvent.class));
    }

    @Test
    void updateWateringEvent_shouldReturnUpdatedEvent() {
        WateringEventDto updateDto = new WateringEventDto();
        updateDto.setPhAgua(7.0);
        updateDto.setEcAgua(1.5);
        updateDto.setTempAgua(25.0);
        updateDto.setPlantaIds(Collections.singletonList(1L));

        when(wateringEventRepository.findById(testWateringEvent.getId())).thenReturn(Optional.of(testWateringEvent));
        when(wateringEventRepository.save(any(WateringEvent.class))).thenReturn(testWateringEvent);

        WateringEventDto result = wateringEventService.updateWateringEvent(testWateringEvent.getId(), updateDto);

        assertNotNull(result);
        assertEquals(7.0, result.getPhAgua());
        verify(wateringEventRepository, times(1)).findById(testWateringEvent.getId());
        verify(wateringEventRepository, times(1)).save(any(WateringEvent.class));
    }

    @Test
    void updateWateringEvent_eventNotFound_shouldThrowException() {
        WateringEventDto updateDto = new WateringEventDto();
        when(wateringEventRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> wateringEventService.updateWateringEvent(99L, updateDto));
        verify(wateringEventRepository, times(1)).findById(99L);
        verify(wateringEventRepository, never()).save(any(WateringEvent.class));
    }
}
