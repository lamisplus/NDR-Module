package org.lamisplus.modules.hiv.repositories;

import org.lamisplus.modules.hiv.domain.dto.*;
import org.lamisplus.modules.hiv.domain.entity.HIVEac;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


public interface HIVEacRepository extends JpaRepository<HIVEac, Long> {
	List<HIVEac> getAllByPersonAndArchived(Person person, Integer archived);
	Optional<HIVEac>  getHIVEacByPersonAndLabNumber(Person person, String labNumber);
	
	
	@Query(value = "select * from\n" +
			"(\n" +
			"    select a.patient_id as patientId\n" +
			"         , b.id as testResultId\n" +
			"         , d.group_name as testGroup\n" +
			"         , c.lab_test_name as testName\n" +
			"         , a.lab_number as labNumber\n" +
			"         , b.date_result_reported resultDate\n" +
			"         ,CAST(b.result_reported as int) as  result\n" +
			"    from laboratory_test a\n" +
			"             inner join laboratory_result b on a.id=b.test_id\n" +
			"             inner join laboratory_labtest c on a.lab_test_id=c.id\n" +
			"             inner join laboratory_labtestgroup d on a.lab_test_group_id=d.id\n" +
			"    where c.lab_test_name = 'Viral Load' and b.result_reported != '' and b.result_reported ~ '^[0-9]+$'\n" +
			") a where result > 1000 and a.patientId = ?1", nativeQuery = true)
	List<LabEacInfo> getPatientAllEacs(Long personId);
	
	@Query(value =
			"select * from                   \n" +
					"(\n" +
					"    select a.patient_id as patientId,\n" +
					"    a.viral_load_indication as indicationId,\n" +
					"    b.date_result_reported resultDate,\n" +
					"    e.date_sample_collected dateSampleCollected,\n" +
					"    CAST(b.result_reported as int) as  result\n" +
					"    from laboratory_test a\n" +
					"    inner join laboratory_result b on a.id=b.test_id\n" +
					"    inner join laboratory_labtest c on a.lab_test_id=c.id\n" +
					"    inner join laboratory_labtestgroup d on a.lab_test_group_id=d.id\n" +
					"    inner join laboratory_sample e on a.id = e.test_id\n" +
					"    where c.lab_test_name = 'Viral Load' and b.result_reported != '' and b.result_reported ~ '^[0-9]+$'\n" +
					") a where  a.patientId = ?1  and a.resultDate between ?2 and ?3  order by a.resultDate DESC limit 1"
			,
			nativeQuery = true)
	Optional<ViralLoadRadetDto> getPatientCurrentViralLoadDetails(Long personId, LocalDateTime startDate, LocalDateTime endDate);
	
	@Query(value = "SELECT \n" +
			"template_type as  type,\n" +
			"template, enrollment_date \n" +
			"as dateCaptured FROM public.biometric\n" +
			"where person_uuid = ?1 and  enrollment_date BETWEEN\n" +
			" ?2 and ?3 ", nativeQuery = true)
	List<BiometricRadetDto> getPatientBiometricInfo(String  personUuid, LocalDate startDate, LocalDate endDate);
	
	@Query(value = "SELECT result.id, result.surname,\n" +
			"result.hospital_number as hospitalNumber, result.date_of_birth as dob, result.age, result.name, result.sex,\n" +
			"result.facility_id, result.address, count(b.person_uuid) as finger, b.enrollment_date as enrollment\n" +
			"FROM (SELECT p.id, EXTRACT(YEAR from AGE(NOW(),  p.date_of_birth)) as age,\n" +
			"      concat(p.surname ,' ', p.first_name) as name, p.hospital_number, p.date_of_birth, p.sex,\n" +
			"      p.facility_id, p.surname, p.uuid, p.archived, " +
			"     CONCAT(REPLACE(REPLACE(REPLACE(address_object->>'line', '\"', ''), ']', ''), '[', ''), ' ', address_object->>'city') as address" +
			"      FROM patient_person p,\n" +
			"jsonb_array_elements(p.address-> 'address') with ordinality l(address_object)) as result\n" +
			"inner join biometric b on b.person_uuid = result.uuid  \n" +
			"where result.facility_id = ?1 and result.archived = 0 and  \n" +
			"b.enrollment_date between ?2 and ?3 GROUP by result.surname, b.enrollment_date,\n" +
			"result.hospital_number, result.id, result.date_of_birth, result.age, result.name, result.sex,\n" +
			"result.facility_id, result.address;", nativeQuery = true
	 )
	List<BiometricReport> getBiometricReports(Long  facilityId, LocalDate startDate, LocalDate endDate);
	
	@Query(value = "select a.facility_id as facilityId\n" +
			", (select x.name from base_organisation_unit x where x.id=a.facility_id limit 1) as facility\n" +
			", a.patient_uuid as patientId\n" +
			", (select x.hospital_number from patient_person x where x.uuid=a.patient_uuid limit 1) as hospitalNum\n" +
			", c.lab_test_name as test\n" +
			", d.date_sample_collected as sampleCollectionDate\n" +
			", oi.code as datimId\n" +
			", b.result_reported as result\n" +
			", b.date_result_reported as dateReported\n" +
			"from laboratory_test a\n" +
			"inner join laboratory_result b on a.id=b.test_id\n" +
			"inner join laboratory_labtest c on a.lab_test_id=c.id\n" +
			"INNER JOIN base_organisation_unit_identifier oi ON oi.organisation_unit_id=a.facility_id\n" +
			"inner join laboratory_sample d on a.id=d.test_id\n" +
			"where c.lab_test_name = 'Viral Load' and b.result_reported != '' and a.facility_id =?1",
			nativeQuery = true)
	List<LabReport> getLabReports(Long facilityId);
}
