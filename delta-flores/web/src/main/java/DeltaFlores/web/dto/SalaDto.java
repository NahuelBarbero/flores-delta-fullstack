package DeltaFlores.web.dto;

import DeltaFlores.web.entities.TipoAmbiente;
import lombok.Data;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Data
public class SalaDto implements Serializable {
    private Long id;
    private String nombre;
    private String descripcion;
    private Long userId; // ID of the user who owns the sala

    private String horasLuz;
    private Double humedad;
    private Double temperaturaAmbiente;

    // Nuevo: Tipo de ambiente (INTERIOR o EXTERIOR)
    private TipoAmbiente tipoAmbiente;

    // Nuevo: URL de imagen personalizada para la sala
    private String imagenUrl;

    private Set<Long> plantaIds = new HashSet<>();
}
