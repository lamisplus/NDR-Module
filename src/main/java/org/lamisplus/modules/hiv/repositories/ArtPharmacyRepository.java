package org.lamisplus.modules.hiv.repositories;

import org.lamisplus.modules.hiv.domain.dto.PharmacyReport;
import org.lamisplus.modules.hiv.domain.entity.ArtPharmacy;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.lamisplus.modules.patient.domain.entity.Visit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.time.LocalDate;
import java.util.List;

public interface ArtPharmacyRepository extends JpaRepository<ArtPharmacy, Long> {
	List<ArtPharmacy> getArtPharmaciesByVisitAndPerson(Visit visit, Person person);
	
	Page<ArtPharmacy> getArtPharmaciesByPersonAndArchived(Person person, Integer archived, Pageable pageable);
	
	List<ArtPharmacy> getArtPharmaciesByPersonAndArchived(Person person, Integer archived);
	
	@Query(value = "SELECT sum(refill_Period) " +
			"from hiv_art_pharmacy  " +
			"where person_uuid = ?1  " +
			"and archived = 0  " +
			"and visit_date BETWEEN ?2 and ?3 ", nativeQuery = true)
	Integer sumRefillPeriodsByPersonAndDateRange(String personUuid, LocalDate startDate, LocalDate endDate);
	
	@Query(value = "select \n" +
			"p.person_uuid as uuid,\n" +
			"p.visit_date as visitDate,\n" +
			"p.next_appointment as nextAppointment,\n" +
			"p.refill_period  as refillPeriod,\n" +
			"p.dsd_model as dsdModels,\n" +
			"p.mmd_type as mmdType,\n" +
			"p.id,\n" +
			"array_to_string(array_agg(DISTINCT r.regimens_id), ',', '*') AS regimenId\n" +
			"from \n" +
			"public.hiv_art_pharmacy p\n" +
			"JOIN hiv_art_pharmacy_regimens r ON p.id = r.art_pharmacy_id\n" +
			"where p.facility_id = ?1 and p.archived = 0\n" +
			"GROUP BY p.id,  p.person_uuid",
			nativeQuery = true)
	List<PharmacyReport> getArtPharmacyReport(Long facilityId);
	
	
	
}

