package org.lamisplus.modules.hiv.repositories;

import org.lamisplus.modules.hiv.domain.entity.HIVEac;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface HIVEacRepository extends JpaRepository<HIVEac, Long> {

    List<HIVEac> getAllByPersonAndArchived(Person person, Integer archived);
    Optional<HIVEac> getByPersonAndDateOfEac2IsNullAndDateOfEac3IsNull(Person person);
    Optional<HIVEac> getByPersonAndDateOfEac3IsNull(Person person);
    Optional<HIVEac> getByPersonAndDateOfEac1IsNotNullAndDateOfEac2IsNotNullAndDateOfEac3IsNull(Person person);



}
