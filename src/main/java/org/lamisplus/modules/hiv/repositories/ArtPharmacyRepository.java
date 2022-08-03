package org.lamisplus.modules.hiv.repositories;

import org.lamisplus.modules.hiv.domain.entity.ArtPharmacy;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.lamisplus.modules.patient.domain.entity.Visit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArtPharmacyRepository extends JpaRepository<ArtPharmacy, Long> {
    List<ArtPharmacy> getArtPharmaciesByVisitAndPerson(Visit visit, Person person);
    Page<ArtPharmacy> getArtPharmaciesByPerson(Person person, Pageable pageable);
    List<ArtPharmacy> getArtPharmaciesByPerson(Person person);
}

