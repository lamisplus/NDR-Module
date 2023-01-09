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
import java.util.Optional;


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
	
	@Query(value = "SELECT DISTINCT result.id, result.facility_id as facilityId, oi.code as datimId, org.name as facilityName,\n" +
			"p.uuid as patientId,p.hospital_number as hospitalNum, hrt.description as regimenLine,\n" +
			"result.mmd_type as mmdType, result.next_appointment as nextAppointment , result.dsd_model as dsdModel,\n" +
			"result.visit_date as dateVisit,  result.duration as refillPeriod, result.regimen_name as regimens\n" +
			"FROM (SELECT h.*,pharmacy_object ->> 'duration' AS duration,\n" +
			"      pharmacy_object ->> 'regimenName'\\:\\:VARCHAR AS regimen_name\n" +
			"      \n" +
			"FROM hiv_art_pharmacy h,\n" +
			"jsonb_array_elements(h.extra->'regimens') with ordinality p(pharmacy_object)) as result\n" +
			"     INNER JOIN patient_person p ON p.uuid=result.person_uuid\n" +
			"     INNER JOIN base_organisation_unit org ON org.id=result.facility_id\n" +
			"     INNER JOIN base_organisation_unit_identifier oi ON oi.organisation_unit_id=result.facility_id\n" +
			"     \n" +
			"     INNER JOIN hiv_regimen hr ON hr.description=result.regimen_name\n" +
			"     INNER JOIN hiv_regimen_type hrt ON hrt.id = hr.regimen_type_id\n" +
			"     WHERE  result.facility_id = ?1 order by p.uuid, result.visit_date ASC;",
			nativeQuery = true)
	List<PharmacyReport> getArtPharmacyReport(Long facilityId);
	
	@Query(value = "SELECT * FROM hiv_art_pharmacy p inner join hiv_art_pharmacy_regimens pr On p.id = pr.art_pharmacy_id " +
			"INNER JOIN hiv_regimen r ON r.id = pr.regimens_id WHERE visit_date <=  ?2  " +
			"AND r.regimen_type_id IN (1,2,3,4,14) AND person_uuid = ?1 " +
			"AND archived = 0 ORDER BY visit_date DESC LIMIT 1" ,
			nativeQuery = true)
	Optional<ArtPharmacy> getCurrentPharmacyRefillWithDateRange(String personUuid, LocalDate endDate);
	@Query(value = "SELECT * FROM hiv_art_pharmacy WHERE person_uuid = ?1 " +
			" AND ipt ->>'type' ILIKE'%initia%'AND ipt ->>'dateCompleted' IS NULL " +
			" ORDER BY visit_date DESC LIMIT 1 ", nativeQuery = true)
    Optional<ArtPharmacy> getInitialIPTWithoutCompletionDate(String personUuid);
}

