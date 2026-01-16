package DeltaFlores.web.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class PhotoEventDto extends PlantEventDto {
    private String description; // Descripción opcional de la foto
    private List<MultipartFile> files; // Archivos de imagen para subir
    private List<String> mediaUrls; // URLs de las imágenes almacenadas
}
