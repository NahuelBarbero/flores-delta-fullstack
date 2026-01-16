package DeltaFlores.web.repository;

import DeltaFlores.web.entities.Planta;
import DeltaFlores.web.entities.User; // Importar User
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlantaRepository extends JpaRepository<Planta, Long> {

    @Query("SELECT p FROM Planta p LEFT JOIN FETCH p.events WHERE p.id = :id")
    Optional<Planta> findByIdWithEvents(@Param("id") Long id);

    @Query("SELECT DISTINCT p FROM Planta p LEFT JOIN FETCH p.sala LEFT JOIN FETCH p.cepa WHERE p.user = :user ORDER BY p.fechaCreacion DESC")
    List<Planta> findByUserWithSalaAndCepa(@Param("user") User user);

    List<Planta> findByUserId(Long userId);

    List<Planta> findByNombre(String palabraClave);

    List<Planta> findBySalaId(Long salaId);
}
