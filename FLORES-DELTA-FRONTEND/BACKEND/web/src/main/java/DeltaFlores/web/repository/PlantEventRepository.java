package DeltaFlores.web.repository;

import DeltaFlores.web.entities.Planta;
import DeltaFlores.web.entities.Sala;
import DeltaFlores.web.entities.Cepa;
import DeltaFlores.web.entities.PlantEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PlantEventRepository extends JpaRepository<PlantEvent, Long> {
    List<PlantEvent> findByPlantasIsEmpty();

    List<PlantEvent> findByPlantasIdOrderByFechaAsc(@Param("plantaId") Long plantaId);

    @Query("SELECT DISTINCT pe FROM PlantEvent pe " +
            "JOIN FETCH pe.plantas p " +
            "LEFT JOIN FETCH p.sala " +
            "LEFT JOIN FETCH p.cepa " +
            "LEFT JOIN FETCH TREAT(pe AS NutrientEvent).nutriente " +
            "WHERE p IN :plants " +
            "AND (:eventType IS NULL OR :eventType = 'Todos' OR UPPER(pe.eventType) = UPPER(:eventType)) " +
            "AND (:plantId IS NULL OR p.id = :plantId) " +
            "AND (:salaId IS NULL OR p.sala.id = :salaId) " +
            "AND (:startDate IS NULL OR pe.fecha >= :startDate) " +
            "AND (:endDate IS NULL OR pe.fecha <= :endDate) " +
            "ORDER BY pe.fecha DESC")
    List<PlantEvent> findEventsWithFilters(@Param("plants") List<Planta> plants,
            @Param("eventType") String eventType,
            @Param("plantId") Long plantId,
            @Param("salaId") Long salaId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);
}