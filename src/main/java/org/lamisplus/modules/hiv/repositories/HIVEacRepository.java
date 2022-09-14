package org.lamisplus.modules.hiv.repositories;

import org.lamisplus.modules.hiv.domain.entity.HIVEac;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface HIVEacRepository extends JpaRepository<HIVEac, Long> {
    List<HIVEac> getAllByPersonAndArchived(Person person, Integer archived);
	


}
