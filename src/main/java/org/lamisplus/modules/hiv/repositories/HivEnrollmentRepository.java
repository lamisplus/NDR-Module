package org.lamisplus.modules.hiv.repositories;

import org.lamisplus.modules.hiv.domain.dto.EnrollmentStatus;
import org.lamisplus.modules.hiv.domain.dto.PatientProjection;
import org.lamisplus.modules.hiv.domain.entity.HivEnrollment;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface HivEnrollmentRepository extends JpaRepository<HivEnrollment, Long> {
    Optional<HivEnrollment> getHivEnrollmentByPersonAndArchived(Person person, Integer archived);
    List<HivEnrollment> getHivEnrollmentByArchived(Integer archived);
    List<HivEnrollment> getHivEnrollmentByFacilityIdAndArchived(Long facilityId, Integer archived);
    
    @Query(value = "SELECT e.status_at_registration_id,e.date_of_registration " +
            "AS enrollmentDate, a.display AS hivEnrollmentStatus  " +
            "FROM hiv_enrollment  e INNER JOIN base_application_codeset a " +
            "ON a.id = e.status_at_registration_id " +
            "WHERE person_uuid = ?1 ",nativeQuery = true)
    Optional<EnrollmentStatus> getHivEnrollmentStatusByPersonUuid(String uuid);
    
    @Query(value = "SELECT p.id AS id, p.first_name as firstName, p.surname AS surname, p.other_name AS otherName, \n" +
            "p.hospital_number AS hospitalNumber, CAST (EXTRACT(YEAR from AGE(NOW(),  date_of_birth)) AS INTEGER) AS age, \n" +
            "INITCAP(p.sex) AS gender, p.date_of_birth AS dateOfBirth, p.is_date_of_birth_estimated AS isDobEstimated,\n" +
            "p.facility_id as facilityId , p.uuid as personUuid, \n" +
            "CAST(CASE when e.id = null then FALSE ELSE TRUE END AS Boolean) AS isEnrolled,\n" +
            "e.target_group_id AS targetGroupId,\n" +
            "e.id as enrollmentId,\n" +
            "e.unique_id as uniqueId,\n" +
            "pc.display as enrollmentStatus,\n" +
            "ca.is_commencement  AS isCommenced,\n" +
            "b.biometric_type as biometric\n" +
            "FROM patient_person p\n" +
            "LEFT Join biometric b ON b.person_uuid = p.uuid\n" +
            "LEFT JOIN  hiv_enrollment e ON p.uuid = e.person_uuid\n" +
            "LEFT JOIN  hiv_art_clinical ca ON  p.uuid = ca.person_uuid\n" +
            "LEFT JOIN  base_application_codeset  pc on pc.id = e.status_at_registration_id\n" +
            "WHERE p.archived=0 AND p.facility_id=?1\n" +
            "GROUP BY e.id, e.target_group_id,ca.is_commencement, p.id, p.first_name, \n" +
            "p.first_name, b.biometric_type, pc.display,p.surname, p.other_name, p.hospital_number, p.date_of_birth",
            nativeQuery = true)
    Page<PatientProjection> getPatientsByFacilityId(Long facilityId, Pageable page);
    
    @Query(value = "SELECT p.id AS id, p.first_name as firstName, p.surname AS surname, p.other_name AS otherName, \n" +
            "p.hospital_number AS hospitalNumber, CAST (EXTRACT(YEAR from AGE(NOW(),  date_of_birth)) AS INTEGER) AS age, \n" +
            "INITCAP(p.sex) AS gender, p.date_of_birth AS dateOfBirth, p.is_date_of_birth_estimated AS isDobEstimated,\n" +
            "p.facility_id as facilityId , p.uuid as personUuid, \n" +
            "CAST(CASE when e.id = null then FALSE ELSE TRUE END AS Boolean) AS isEnrolled,\n" +
            "e.target_group_id AS targetGroupId,\n" +
            "e.id as enrollmentId,\n" +
            "e.unique_id as uniqueId,\n" +
            "pc.display as enrollmentStatus,\n" +
            "ca.is_commencement  AS isCommenced,\n" +
            "b.biometric_type as biometric\n" +
            "FROM patient_person p\n" +
            "LEFT Join biometric b ON b.person_uuid = p.uuid\n" +
            "LEFT JOIN  hiv_enrollment e ON p.uuid = e.person_uuid\n" +
            "LEFT JOIN  hiv_art_clinical ca ON  p.uuid = ca.person_uuid\n" +
            "LEFT JOIN  base_application_codeset  pc on pc.id = e.status_at_registration_id\n" +
            "WHERE p.archived=0 AND p.facility_id=?1\n" +
            "AND (first_name ilike ?2 OR surname ilike ?2 OR other_name ilike ?2 OR full_name ilike ?2 OR hospital_number ilike ?2)\n" +
            "GROUP BY e.id, e.target_group_id,ca.is_commencement, p.id, p.first_name, \n" +
            "p.first_name, b.biometric_type, pc.display,p.surname, p.other_name, p.hospital_number, p.date_of_birth\n", nativeQuery = true)
    Page<PatientProjection> getPatientsByFacilityBySearchParam(Long facilityId, String searchParam,  Pageable page);
}
