package DeltaFlores.web.service;

import DeltaFlores.web.dto.PlantEventDto;
import DeltaFlores.web.entities.*;
import DeltaFlores.web.repository.*;
import DeltaFlores.web.security.SecurityUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@Transactional // Para asegurar que los tests sean transaccionales y se haga rollback
class LogServiceIntegrationTest {

    @Autowired
    private LogService logService;

    @MockBean
    private UserRepository userRepository;
    @MockBean
    private PlantaRepository plantaRepository;
    @MockBean
    private PlantEventRepository plantEventRepository;
    @MockBean
    private SalaRepository salaRepository; // Mockear si es necesario
    @MockBean
    private CepaRepository cepaRepository; // Mockear si es necesario

    private User testUser;
    private Planta testPlant1, testPlant2;
    private Sala testSala;
    private Cepa testCepa;
    private WateringEvent wateringEvent;
    private PruningEvent pruningEvent;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(1L);
        testUser.setUsername("test@example.com");
        testUser.setRol(AppRole.ROLE_GROWER);

        testSala = new Sala();
        testSala.setId(10L);
        testSala.setNombre("Sala Test");

        testCepa = new Cepa();
        testCepa.setId(20L);
        testCepa.setGeneticaParental("Cepa Test");

        testPlant1 = new Planta();
        testPlant1.setId(100L);
        testPlant1.setNombre("Planta Test 1");
        testPlant1.setSala(testSala);
        testPlant1.setCepa(testCepa);
        testPlant1.setUser(testUser);
        testPlant1.setEtapa(NuevaEtapa.VEGETACION);

        testPlant2 = new Planta();
        testPlant2.setId(101L);
        testPlant2.setNombre("Planta Test 2");
        testPlant2.setSala(testSala);
        testPlant2.setCepa(testCepa);
        testPlant2.setUser(testUser);
        testPlant2.setEtapa(NuevaEtapa.FLORACION);

        wateringEvent = new WateringEvent();
        wateringEvent.setId(1L);
        wateringEvent.setFecha(LocalDate.now());
        wateringEvent.setPhAgua(6.0);
        wateringEvent.setEcAgua(1.2);
        wateringEvent.setTempAgua(22.0);
        wateringEvent.setPlantas(Collections.singletonList(testPlant1));

        pruningEvent = new PruningEvent();
        pruningEvent.setId(2L);
        pruningEvent.setFecha(LocalDate.now().minusDays(1));
        pruningEvent.setTipoPoda(TipoPoda.APICAL);
        pruningEvent.setPlantas(Collections.singletonList(testPlant2));
    }

    @Test
    @WithMockUser(username = "test@example.com", roles = { "GROWER" })
    void getAllEventsForCurrentUser_shouldReturnEventsWithDetails() {
        // Mock SecurityContext to return current user ID
        try (MockedStatic<SecurityUtils> utilities = Mockito.mockStatic(SecurityUtils.class)) {
            utilities.when(SecurityUtils::getCurrentUserId).thenReturn(testUser.getId());

            // Mock repository calls
            when(userRepository.findById(testUser.getId())).thenReturn(Optional.of(testUser));
            when(plantaRepository.findByUserWithSalaAndCepa(testUser))
                    .thenReturn(Arrays.asList(testPlant1, testPlant2));

            // Mock findEventsWithFilters with nulls for filter params to match service call
            // with no filters
            when(plantEventRepository.findEventsWithFilters(anyList(), Mockito.eq(null), Mockito.eq(null),
                    Mockito.eq(null), Mockito.eq(null), Mockito.eq(null)))
                    .thenReturn(Arrays.asList(wateringEvent, pruningEvent));

            // Call the service method
            List<PlantEventDto> events = logService.getAllEventsForCurrentUser(null, null, null, null, null);

            // Assertions
            assertNotNull(events);
            assertEquals(2, events.size());

            // Verify Watering Event
            PlantEventDto wateringDto = events.get(0);
            assertEquals(1L, wateringDto.getId());
            assertTrue(wateringDto instanceof DeltaFlores.web.dto.WateringEventDto);
            assertEquals(testPlant1.getId(), wateringDto.getPlantaIds().get(0));

            // Verify Pruning Event
            PlantEventDto pruningDto = events.get(1);
            assertEquals(2L, pruningDto.getId());
            assertTrue(pruningDto instanceof DeltaFlores.web.dto.PruningEventDto);
            assertEquals(testPlant2.getId(), pruningDto.getPlantaIds().get(0));
        }
    }

    @Test
    @WithMockUser(username = "test@example.com", roles = { "GROWER" })
    void getAllEventsForCurrentUser_noEvents() {
        try (MockedStatic<SecurityUtils> utilities = Mockito.mockStatic(SecurityUtils.class)) {
            utilities.when(SecurityUtils::getCurrentUserId).thenReturn(testUser.getId());

            when(userRepository.findById(testUser.getId())).thenReturn(Optional.of(testUser));
            when(plantaRepository.findByUserWithSalaAndCepa(testUser)).thenReturn(Arrays.asList(testPlant1));
            // Mock findEventsWithFilters returning empty
            when(plantEventRepository.findEventsWithFilters(anyList(), Mockito.eq(null), Mockito.eq(null),
                    Mockito.eq(null), Mockito.eq(null), Mockito.eq(null))).thenReturn(Collections.emptyList());

            List<PlantEventDto> events = logService.getAllEventsForCurrentUser(null, null, null, null, null);

            assertNotNull(events);
            assertTrue(events.isEmpty());
        }
    }

    @Test
    @WithMockUser(username = "test@example.com", roles = { "GROWER" })
    void getAllEventsForCurrentUser_filterByType() {
        try (MockedStatic<SecurityUtils> utilities = Mockito.mockStatic(SecurityUtils.class)) {
            utilities.when(SecurityUtils::getCurrentUserId).thenReturn(testUser.getId());

            when(userRepository.findById(testUser.getId())).thenReturn(Optional.of(testUser));
            when(plantaRepository.findByUserWithSalaAndCepa(testUser))
                    .thenReturn(Arrays.asList(testPlant1, testPlant2));

            // Mock findEventsWithFilters explicitly matching the "WATERING" filter
            when(plantEventRepository.findEventsWithFilters(anyList(), Mockito.eq("WATERING"), Mockito.eq(null),
                    Mockito.eq(null), Mockito.eq(null), Mockito.eq(null)))
                    .thenReturn(Arrays.asList(wateringEvent)); // Service doesn't filter in memory anymore, repo does
                                                               // return filtering

            List<PlantEventDto> events = logService.getAllEventsForCurrentUser("WATERING", null, null, null, null);

            assertNotNull(events);
            assertEquals(1, events.size());
            assertTrue(events.get(0) instanceof DeltaFlores.web.dto.WateringEventDto);
        }
    }

    // TODO: Add more specific tests for filtering by sala, plant, date range
}
