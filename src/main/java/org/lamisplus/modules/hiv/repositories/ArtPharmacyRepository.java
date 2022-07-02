package org.lamisplus.modules.hiv.repositories;

import org.lamisplus.modules.hiv.domain.entity.ArtPharmacy;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArtPharmacyRepository extends JpaRepository<ArtPharmacy, Long> {
    List<ArtPharmacy> getArtPharmaciesByVisitIdAndPerson(Long visitId, Person person);
}

