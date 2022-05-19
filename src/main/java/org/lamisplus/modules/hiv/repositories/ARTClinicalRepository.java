package org.lamisplus.modules.hiv.repositories;

import com.foreach.across.modules.hibernate.jpa.repositories.CommonJpaRepository;
import org.lamisplus.modules.hiv.domain.entity.ARTClinical;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ARTClinicalRepository extends CommonJpaRepository<ARTClinical, Long> {
    List<ARTClinical> findByArchivedAndIsCommencementIsTrue(int i);

    List<ARTClinical> findByArchivedAndIsCommencementIsFalse(int i);

    Optional<ARTClinical> findByPersonIdAndIsCommencementIsTrue(Long personId);

    List<ARTClinical> findAllByPersonIdAndIsCommencementIsFalseAndArchived(Long id, Integer archived);

}
