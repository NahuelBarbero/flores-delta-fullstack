package DeltaFlores.web.repository;

import DeltaFlores.web.entities.PhotoEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhotoEventRepository extends JpaRepository<PhotoEvent, Long> {
}
