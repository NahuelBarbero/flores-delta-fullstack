package DeltaFlores.web.entities;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import org.hibernate.annotations.BatchSize;

@Entity
@Getter
@Setter
@DiscriminatorValue("NOTE")
public class NoteEvent extends PlantEvent {

    private String text;

    @ElementCollection
    @BatchSize(size = 20)
    private List<String> mediaUrls;
}
