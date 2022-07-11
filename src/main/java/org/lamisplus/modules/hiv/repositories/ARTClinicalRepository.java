package org.lamisplus.modules.hiv.repositories;

import com.foreach.across.modules.hibernate.jpa.repositories.CommonJpaRepository;
import org.lamisplus.modules.hiv.domain.entity.ARTClinical;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ARTClinicalRepository extends CommonJpaRepository<ARTClinical, Long> {
    List<ARTClinical> findByArchivedAndIsCommencementIsTrue(int i);

    List<ARTClinical> findByArchivedAndIsCommencementIsFalse(int i);

    Optional<ARTClinical> findByPersonAndIsCommencementIsTrue(Person person);

    List<ARTClinical> findAllByPersonAndIsCommencementIsFalseAndArchived(Person person, Integer archived);

}
