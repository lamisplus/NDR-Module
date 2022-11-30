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
import java.util.Set;


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
	
	@Query(value = "WITH bio_data AS (SELECT p.id, p.uuid as personUuid, p.archived\\:\\:BOOLEAN as archived, p.uuid,p.hospital_number as hospitalNumber, \n" +
			"\t\t\t\t  p.surname, p.first_name as firstName,\n" +
			"\t\t\t\t  EXTRACT(YEAR from AGE(NOW(),  date_of_birth)) as age,\n" +
			"\t\t\t\t  p.other_name as otherName, p.sex as gender, p.date_of_birth as dateOfBirth,\n" +
			"\t\t\t\t  p.marital_status->>'display' as maritalStatus, \n" +
			"\t\t\t\t  education->>'display' as education, p.employment_status->>'display' as occupation, \n" +
			"\t\t\t\t  facility.name as facilityName, facility_lga.name as lga, facility_state.name as state, \n" +
			"\t\t\t\t  boui.code as datimId, res_state.name as residentialState, res_lga.name as residentialLga,\n" +
			"\t\t\t\t  r.address as address, p.contact_point->'contactPoint'->0->'value'->>0 AS phone\n" +
			"\t\t\t\t  FROM patient_person p\n" +
			"\t\t\t\t  INNER JOIN (\n" +
			"\t\t\t\t  SELECT * FROM (SELECT p.id, REPLACE(REPLACE(REPLACE(address_object->>'line'\\:\\:text, '\"', ''), ']', ''), '[', '') AS address, \n" +
			"\t\t\t\tCASE WHEN address_object->>'stateId'  ~ '^\\d+(\\.\\d+)?$' THEN address_object->>'stateId' ELSE null END  AS stateId,\n" +
			"\t\t\t\tCASE WHEN address_object->>'district'  ~ '^\\d+(\\.\\d+)?$' THEN address_object->>'district' ELSE null END  AS lgaId\n" +
			"      \t\t\tFROM patient_person p,\n" +
			"jsonb_array_elements(p.address-> 'address') with ordinality l(address_object)) as result\n" +
			"\t\t\t\t  ) r ON r.id=p.id\n" +
			"\t\t\t\t INNER JOIN base_organisation_unit facility ON facility.id=facility_id\n" +
			"\t\t\t\t  INNER JOIN base_organisation_unit facility_lga ON facility_lga.id=facility.parent_organisation_unit_id\n" +
			"\t\t\t\t  INNER JOIN base_organisation_unit facility_state ON facility_state.id=facility_lga.parent_organisation_unit_id\n" +
			"\t\t\t\t  LEFT JOIN base_organisation_unit res_state ON res_state.id=r.stateid\\:\\:BIGINT\n" +
			"\t\t\t\t  LEFT JOIN base_organisation_unit res_lga ON res_lga.id=r.lgaid\\:\\:BIGINT\n" +
			"\t\t\t\t INNER JOIN base_organisation_unit_identifier boui ON boui.organisation_unit_id=facility_id\n" +
			"\t\t\t\t INNER JOIN hiv_enrollment h ON h.person_uuid = p.uuid\n" +
			"\t\t\t\t WHERE h.archived=0 AND h.facility_id=?1),\n" +
			"\t\t\t\t\n" +
			"enrollment_details AS (\n" +
			"\t\t\t\t\tSELECT h.person_uuid, sar.display as statusAtRegistration, date_confirmed_hiv as dateOfConfirmedHiv,\n" +
			"\t\t\t\tep.display as entryPoint, date_of_registration as dateOfRegistration\n" +
			"\t\t\t\tFROM hiv_enrollment h\n" +
			"\t\t\t\tLEFT JOIN base_application_codeset sar ON sar.id=h.status_at_registration_id\n" +
			"\t\t\t\tLEFT JOIN base_application_codeset ep ON ep.id=h.entry_point_id\n" +
			"\t\t\t\tWHERE h.archived=0 AND h.facility_id=?1),\n" +
			"\t\t\t\t\t\t\t\t\n" +
			"laboratory_details AS (SELECT DISTINCT ON(lo.patient_uuid) lo.patient_uuid as person_uuid, ll.lab_test_name as test,\n" +
			"\t\t\t\t\t\tbac_viral_load.display viralLoadType, ls.date_sample_collected as dateSampleCollected,\n" +
			"\t\t\t\t\t\tlr.result_reported as lastViralLoad, lr.date_result_reported as dateOfLastViralLoad\n" +
			"\t\t\t\t\t\tFROM laboratory_order lo\n" +
			"\t\t\t\t\tLEFT JOIN ( SELECT patient_uuid, MAX(order_date) AS MAXDATE FROM laboratory_order lo \n" +
			"\t\t\tGROUP BY patient_uuid ORDER BY MAXDATE ASC ) AS current_lo\n" +
			"\t\t\tON current_lo.patient_uuid=lo.patient_uuid AND current_lo.MAXDATE=lo.order_date\n" +
			"\t\t\tLEFT JOIN laboratory_test lt ON lt.lab_order_id=lo.id AND lt.patient_uuid = lo.patient_uuid\n" +
			"\t\t\tLEFT JOIN base_application_codeset bac_viral_load ON bac_viral_load.id=lt.viral_load_indication\n" +
			"\t\t\tLEFT JOIN laboratory_labtest ll ON ll.id=lt.lab_test_id\n" +
			"\t\t\tINNER JOIN hiv_enrollment h ON h.person_uuid=current_lo.patient_uuid\n" +
			"\t\t\tLEFT JOIN laboratory_sample ls ON ls.test_id=lt.id AND ls.patient_uuid = lo.patient_uuid\n" +
			"\t\t\tLEFT JOIN laboratory_result lr ON lr.test_id=lt.id AND lr.patient_uuid = lo.patient_uuid\n" +
			"\t\t\tWHERE ll.lab_test_name = 'Viral Load' AND h.archived=0 AND lo.archived=0 AND lo.facility_id=?1),\n" +
			"\t\t\t\n" +
			"pharmacy_details AS (\n" +
			"\tSELECT DISTINCT ON (hartp.person_uuid)hartp.person_uuid as person_uuid, r.visit_date as dateOfLastRefill,\n" +
			"hartp.next_appointment as dateOfNextRefill, hartp.refill_period as lastRefillDuration,\n" +
			"hartp.dsd_model_type as DSDType, r.description as currentRegimenLine, r.regimen_name as currentRegimen,\n" +
			"\t(CASE \n" +
			"WHEN stat.hiv_status ILIKE '%STOP%' OR stat.hiv_status ILIKE '%DEATH%'\n" +
			"OR stat.hiv_status ILIKE '%OUT%' THEN stat.hiv_status\n" +
			"WHEN hartp.visit_date + hartp.refill_period + INTERVAL '28 day' < CURRENT_DATE \n" +
			"THEN 'IIT' ELSE 'ACTIVE ON TREATMENT' \n" +
			"END)AS status\n" +
			"FROM hiv_art_pharmacy hartp\n" +
			"INNER JOIN (SELECT distinct r.* FROM (SELECT h.person_uuid, h.visit_date, pharmacy_object ->> 'regimenName'\\:\\:VARCHAR AS regimen_name,\n" +
			"\t\t\t \t\thrt.description FROM hiv_art_pharmacy h,\n" +
			"\t\t\t\t\tjsonb_array_elements(h.extra->'regimens') with ordinality p(pharmacy_object)\n" +
			"\t\t\tINNER JOIN hiv_regimen hr ON hr.description=pharmacy_object ->> 'regimenName'\\:\\:VARCHAR\n" +
			"\t\t\t INNER JOIN hiv_regimen_type hrt ON hrt.id=hr.regimen_type_id\n" +
			"\t\t\t WHERE hrt.id IN (1,2,3,4,14))r\n" +
			"\t\t\t \n" +
			"\t\t\t INNER JOIN (SELECT hap.person_uuid, MAX(visit_date) AS MAXDATE FROM hiv_art_pharmacy hap\n" +
			"\t\t\tINNER JOIN hiv_enrollment h ON h.person_uuid=hap.person_uuid  WHERE h.archived=0\n" +
			"\t\t\t\t\t\tGROUP BY hap.person_uuid ORDER BY MAXDATE ASC ) max ON\n" +
			"\t\t\tmax.MAXDATE=r.visit_date AND r.person_uuid=max.person_uuid) r\n" +
			"\t\t\tON r.visit_date=hartp.visit_date AND r.person_uuid=hartp.person_uuid\n" +
			"\tINNER JOIN hiv_enrollment he ON he.person_uuid=r.person_uuid\n" +
			"\tLEFT JOIN (SELECT sh1.person_id, sh1.hiv_status, sh1.status_date\n" +
			"\t\t\t\tFROM hiv_status_tracker sh1\n" +
			"\t\t\t\tINNER JOIN \n" +
			"\t\t\t\t(\n" +
			"\t\t\t\t   SELECT person_id as p_id, MAX(hst.id) AS MAXID\n" +
			"\t\t\t\t   FROM hiv_status_tracker hst INNER JOIN hiv_enrollment h ON h.person_uuid=person_id\n" +
			"\t\t\t\t   GROUP BY person_id\n" +
			"\t\t\t\tORDER BY person_id ASC\n" +
			"\t\t\t\t) sh2 ON sh1.person_id = sh2.p_id AND sh1.id = sh2.MAXID\n" +
			"\t\t\t\tORDER BY sh1.person_id ASC) stat ON stat.person_id=hartp.person_uuid\n" +
			"\tWHERE he.archived=0 AND hartp.archived=0 AND hartp.facility_id=?1 ORDER BY hartp.person_uuid ASC), \n" +
			"\t\n" +
			"art_commencement_vitals AS (SELECT DISTINCT ON (tvs.person_uuid) tvs.person_uuid , body_weight as baseLineWeight, height as baseLineHeight, \n" +
			"\t\t\t\t\t\t\tCONCAT(diastolic, '/', systolic) as baseLineBp, diastolic as diastolicBp, \n" +
			"\t\t\t\t\t\t\tsystolic as systolicBp, clinical_stage.display as baseLineClinicalStage,\n" +
			"\t\t\t\t\t\t\tfunc_status.display as baseLineFunctionalStatus,\n" +
			"\t\t\t\t\t\t\thv.description as firstRegimen, hrt.description as firstRegimenLine,\n" +
			"\t\t\t\t\t\t\tCASE WHEN cd_4=0 THEN null ELSE cd_4 END  AS baseLineCd4,\n" +
			"\t\t\t\t\t\t\tCASE WHEN cd_4_percentage=0 THEN null ELSE cd_4_percentage END AS cd4Percentage,\n" +
			"\t\t\t\t\t\t\thac.visit_date as artStartDate\n" +
			"\t\t\t\t\t\t\tFROM triage_vital_sign tvs\n" +
			"\t\t\t\t\t\t\t\n" +
			"\t\t\t\t\t\t   INNER JOIN hiv_art_clinical hac ON tvs.uuid=hac.vital_sign_uuid \n" +
			"\t\t\t\t\t\t\tAND hac.is_commencement=true AND hac.person_uuid = tvs.person_uuid\n" +
			"\t\t\t\t\t\t\t\n" +
			"\t\t\t\t\t\t\tINNER JOIN hiv_enrollment h ON hac.hiv_enrollment_uuid = h.uuid AND hac.person_uuid=tvs.person_uuid\n" +
			"\t\t\t\t\t\t\tINNER JOIN patient_person p ON p.uuid=h.person_uuid\n" +
			"\t\t\t\t\t\t\tRIGHT JOIN hiv_regimen hv ON hv.id=hac.regimen_id\n" +
			"\t\t\t\t\t\t\tRIGHT JOIN hiv_regimen_type hrt ON hrt.id=hac.regimen_type_id\n" +
			"\t\t\t\t\t\t\tRIGHT JOIN base_application_codeset clinical_stage ON clinical_stage.id=hac.clinical_stage_id\n" +
			"\t\t\t\t\t\t\tRIGHT JOIN base_application_codeset func_status ON func_status.id=hac.functional_status_id \n" +
			"\t\t\t\t\t\t   WHERE hac.archived=0  AND h.archived=0 AND h.facility_id=?1), \n" +
			"\t\t\t\t\t\t   \n" +
			"current_clinical AS (SELECT tvs.person_uuid, hac.next_appointment as dateOfNextClinic, body_weight as currentWeight, height as currentHeight, \n" +
			"\t\t\t\t\t diastolic as currentDiastolic, systolic as currentSystolic, bac.display as currentClinicalStage,\n" +
			"\t\t\t\t\t CONCAT(diastolic, '/', systolic) as currentBp, current_clinical_date.MAXDATE as dateOfLastClinic\n" +
			"\t\t\t\t\t\t\tFROM triage_vital_sign tvs\n" +
			"\t\t\t\t   INNER JOIN ( SELECT person_uuid, MAX(capture_date) AS MAXDATE FROM triage_vital_sign \n" +
			"\t\t\t\t\t\t\t   GROUP BY person_uuid ORDER BY MAXDATE ASC ) AS current_triage\n" +
			"\t\t\t\t   ON current_triage.MAXDATE=tvs.capture_date AND current_triage.person_uuid=tvs.person_uuid\n" +
			"\t\t\t\t\t \n" +
			"\t\t\t\t    INNER JOIN hiv_art_clinical hac ON tvs.uuid=hac.vital_sign_uuid\n" +
			"\t\t\t\t\tINNER JOIN ( SELECT person_uuid, MAX(hac.visit_date) AS MAXDATE FROM hiv_art_clinical hac \n" +
			"\t\t\t\t\t\t\t   GROUP BY person_uuid ORDER BY MAXDATE ASC ) AS current_clinical_date\n" +
			"\t\t\t\t\t ON current_clinical_date.MAXDATE=hac.visit_date AND current_clinical_date.person_uuid=hac.person_uuid\n" +
			"\t\t\t\t\tINNER JOIN hiv_enrollment he ON he.person_uuid = hac.person_uuid\n" +
			"\t\t\t\t\tINNER JOIN base_application_codeset bac ON bac.id=hac.clinical_stage_id\n" +
			"\t\t\t\t\tWHERE hac.archived=0 AND he.archived=0 AND he.facility_id=?1)\n" +
			"SELECT\t\t\t  \n" +
			"b.archived,\n" +
			"b.hospitalNumber,\n" +
			"b.surname,\n" +
			"b.firstName,\n" +
			"b.age,\n" +
			"b.otherName,\n" +
			"b.gender,\n" +
			"b.dateOfBirth,\n" +
			"b.maritalStatus,\n" +
			"b.education,\n" +
			"b.personUuid,\n" +
			"b.occupation,\n" +
			"b.facilityName,\n" +
			"b.lga,\n" +
			"b.state,\n" +
			"b.datimId,\n" +
			"b.residentialState as stateOfResidence,\n" +
			"b.residentialLga as lgaOfResidence,\n" +
			"b.address,\n" +
			"b.phone,\n" +
			"c.currentWeight,\n" +
			"c.currentHeight,\n" +
			"c.currentDiastolic as currentDiastolicBp,\n" +
			"c.currentSystolic as currentSystolicBP,                 \n" +
			"c.currentBp,\n" +
			"c.dateOfLastClinic,\n" +
			"c.dateOfNextClinic,\n" +
			"c.currentClinicalStage as lastClinicStage,\n" +
			"e.statusAtRegistration,\n" +
			"e.dateOfConfirmedHiv as dateOfConfirmedHIVTest,\n" +
			"e.entryPoint as careEntryPoint,\n" +
			"e.dateOfRegistration,\n" +
			"p.dateOfNextRefill,\n" +
			"p.lastRefillDuration,\n" +
			"p.dateOfLastRefill,\n" +
			"p.DSDType,\n" +
			"p.currentRegimen,\n" +
			"p.currentRegimenLine,\n" +
			"p.status as currentStatus,\n" +
			"l.test,                   \n" +
			"l.viralLoadType,\n" +
			"l.dateSampleCollected as dateOfSampleCollected ,\n" +
			"l.lastViralLoad,\n" +
			"l.dateOfLastViralLoad,\n" +
			"a.baseLineWeight,\n" +
			"a.baseLineHeight,\n" +
			"a.baseLineBp,\n" +
			"a.diastolicBp,                        \n" +
			"a.systolicBp,\n" +
			"a.baseLineClinicalStage as baselineClinicStage,\n" +
			"a.baseLineFunctionalStatus,                       \n" +
			"a.firstRegimen, \n" +
			"a.firstRegimenLine,\n" +
			"a.baseLineCd4,                       \n" +
			"a.cd4Percentage,                           \n" +
			"a.artStartDate\n" +
			"\n" +
			"FROM enrollment_details e\n" +
			"\tINNER JOIN bio_data b ON e.person_uuid=b.personUuid\n" +
			"LEFT JOIN art_commencement_vitals a ON a.person_uuid=e.person_uuid\n" +
			"LEFT JOIN pharmacy_details p ON p.person_uuid=e.person_uuid\n" +
			"LEFT JOIN laboratory_details l ON l.person_uuid=e.person_uuid\n" +
			"LEFT JOIN current_clinical c ON c.person_uuid=e.person_uuid",
			nativeQuery = true)
	List<PatientLineDto> getPatientLineByFacilityId(Long facilityId);
	
	
	@Query(value = "select distinct uuid from patient_person where facility_id = ?1",nativeQuery = true)
	Set<String> getPatientByUuids(Long facilityId);
	
}
