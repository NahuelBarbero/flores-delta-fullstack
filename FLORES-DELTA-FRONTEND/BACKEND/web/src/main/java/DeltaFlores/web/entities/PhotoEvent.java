package DeltaFlores.web.entities;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.BatchSize;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class PhotoEvent extends PlantEvent {
    private String description;

    @ElementCollection // Para guardar una colección de URLs
    @BatchSize(size = 20)
    private List<String> mediaUrls;

    // Constructor, getters, setters generados por Lombok
}
