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
			"\t\t\t\t  p.other_name as otherName, p.sex as gender, p.date_of_birth as dateOfBirth, \n" +
			"\t\t\t\t  p.date_of_registration as dateOfRegistration, p.marital_status->>'display' as maritalStatus, \n" +
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
			"\t\t\t\tWHERE h.archived=0 AND h.facility_id=?1),\n" +
			"\t\t\t\n" +
			"\t\t\tenrollment_details AS (\n" +
			"\t\t\tSELECT h.person_uuid,h.unique_id as uniqueId,  sar.display as statusAtRegistration, date_confirmed_hiv as dateOfConfirmedHiv,\n" +
			"\t\t\tep.display as entryPoint, date_of_registration as dateOfRegistration\n" +
			"\t\t\tFROM hiv_enrollment h\n" +
			"\t\t\tLEFT JOIN base_application_codeset sar ON sar.id=h.status_at_registration_id\n" +
			"\t\t\tLEFT JOIN base_application_codeset ep ON ep.id=h.entry_point_id\n" +
			"\t\t\tWHERE h.archived=0 AND h.facility_id=?1),\n" +
			"\t\t\n" +
			"\t\t\tlaboratory_details AS (SELECT DISTINCT ON(lo.patient_uuid) lo.patient_uuid as person_uuid, ll.lab_test_name as test,\n" +
			"\t\t\tbac_viral_load.display viralLoadType, ls.date_sample_collected as dateSampleCollected,\n" +
			"\t\t\tlr.result_reported as lastViralLoad, lr.date_result_reported as dateOfLastViralLoad\n" +
			"\t\t\tFROM laboratory_order lo\n" +
			"\t\t\tLEFT JOIN ( SELECT patient_uuid, MAX(order_date) AS MAXDATE FROM laboratory_order lo \n" +
			"\t\t\tGROUP BY patient_uuid ORDER BY MAXDATE ASC ) AS current_lo\n" +
			"\t\t\tON current_lo.patient_uuid=lo.patient_uuid AND current_lo.MAXDATE=lo.order_date\n" +
			"\t\t\tLEFT JOIN laboratory_test lt ON lt.lab_order_id=lo.id AND lt.patient_uuid = lo.patient_uuid\n" +
			"\t\t\tLEFT JOIN base_application_codeset bac_viral_load ON bac_viral_load.id=lt.viral_load_indication\n" +
			"\t\t\tLEFT JOIN laboratory_labtest ll ON ll.id=lt.lab_test_id\n" +
			"\t\t\tINNER JOIN hiv_enrollment h ON h.person_uuid=current_lo.patient_uuid\n" +
			"\t\t\tLEFT JOIN laboratory_sample ls ON ls.test_id=lt.id AND ls.patient_uuid = lo.patient_uuid\n" +
			"\t\t\tLEFT JOIN laboratory_result lr ON lr.test_id=lt.id AND lr.patient_uuid = lo.patient_uuid\n" +
			"\t\t\tWHERE ll.lab_test_name = 'Viral Load' AND h.archived=0 AND lo.archived=0 AND lo.facility_id=?1),\n" +
			"\t\t\tpharmacy_details AS (\n" +
			"\t\t\tSELECT DISTINCT ON (hartp.person_uuid)hartp.person_uuid as person_uuid, r.visit_date as dateOfLastRefill,\n" +
			"\t\t\thartp.next_appointment as dateOfNextRefill, hartp.refill_period as lastRefillDuration,\n" +
			"\t\t\thartp.dsd_model_type as DSDType, r.description as currentRegimenLine, r.regimen_name as currentRegimen,\n" +
			"\t\t\t(CASE \n" +
			"\t\t\tWHEN stat.hiv_status ILIKE '%STOP%' OR stat.hiv_status ILIKE '%DEATH%'\n" +
			"\t\t\tOR stat.hiv_status ILIKE '%OUT%' THEN stat.hiv_status\n" +
			"\t\t\tWHEN hartp.visit_date + hartp.refill_period + INTERVAL '28 day' < CURRENT_DATE \n" +
			"\t\t\tTHEN 'IIT' ELSE 'ACTIVE' \n" +
			"\t\t\tEND)AS currentStatus,\n" +
			"\t\t\t\n" +
			"\t\t\t (CASE \n" +
			"\t\t\tWHEN stat.hiv_status ILIKE '%STOP%' OR stat.hiv_status ILIKE '%DEATH%'\n" +
			"\t\t\tOR stat.hiv_status ILIKE '%OUT%' THEN stat.status_date\n" +
			"\t\t\tWHEN hartp.visit_date + hartp.refill_period + INTERVAL '28 day' < CURRENT_DATE \n" +
			"\t\t\tTHEN (hartp.visit_date + hartp.refill_period + INTERVAL '28 day')\\:\\:date ELSE hartp.visit_date \n" +
			"\t\t\tEND)AS dateOfCurrentStatus\n" +
			"\t\t\tFROM hiv_art_pharmacy hartp\n" +
			"\t\t\tINNER JOIN (SELECT distinct r.* FROM (SELECT h.person_uuid, h.visit_date, pharmacy_object ->> 'regimenName'\\:\\:VARCHAR AS regimen_name,\n" +
			"\t\t\thrt.description FROM hiv_art_pharmacy h,\n" +
			"\t\t\tjsonb_array_elements(h.extra->'regimens') with ordinality p(pharmacy_object)\n" +
			"\t\t\tINNER JOIN hiv_regimen hr ON hr.description=pharmacy_object ->> 'regimenName'\\:\\:VARCHAR\n" +
			"\t\t\t INNER JOIN hiv_regimen_type hrt ON hrt.id=hr.regimen_type_id\n" +
			"\t\t\t WHERE hrt.id IN (1,2,3,4,14))r\n" +
			"\t\t\t\n" +
			"\t\t\t INNER JOIN (SELECT hap.person_uuid, MAX(visit_date) AS MAXDATE FROM hiv_art_pharmacy hap\n" +
			"\t\t\tINNER JOIN hiv_enrollment h ON h.person_uuid=hap.person_uuid  WHERE h.archived=0\n" +
			"\t\t\tGROUP BY hap.person_uuid ORDER BY MAXDATE ASC ) max ON\n" +
			"\t\t\t max.MAXDATE=r.visit_date AND r.person_uuid=max.person_uuid) r\n" +
			"\t\t\tON r.visit_date=hartp.visit_date AND r.person_uuid=hartp.person_uuid\n" +
			"\t\t\tINNER JOIN hiv_enrollment he ON he.person_uuid=r.person_uuid\n" +
			"\t\t\tLEFT JOIN (SELECT sh1.person_id, sh1.hiv_status, sh1.status_date\n" +
			"\t\t\tFROM hiv_status_tracker sh1\n" +
			"\t\t\tINNER JOIN \n" +
			"\t\t\t(\n" +
			"\t\t\t   SELECT person_id as p_id, MAX(hst.id) AS MAXID\n" +
			"\t\t\t   FROM hiv_status_tracker hst INNER JOIN hiv_enrollment h ON h.person_uuid=person_id\n" +
			"\t\t\t   GROUP BY person_id\n" +
			"\t\t\tORDER BY person_id ASC\n" +
			"\t\t\t) sh2 ON sh1.person_id = sh2.p_id AND sh1.id = sh2.MAXID\n" +
			"\t\t\tORDER BY sh1.person_id ASC) stat ON stat.person_id=hartp.person_uuid\n" +
			"\t\t\tWHERE he.archived=0 AND hartp.archived=0 AND hartp.facility_id=?1 ORDER BY hartp.person_uuid ASC), \n" +
			"\t\t\n" +
			"\t\t\tart_commencement_vitals AS (SELECT DISTINCT ON (tvs.person_uuid) tvs.person_uuid , body_weight as baseLineWeight, height as baseLineHeight, \n" +
			"\t\t\tCONCAT(diastolic, '/', systolic) as baseLineBp, diastolic as diastolicBp, \n" +
			"\t\t\tsystolic as systolicBp, clinical_stage.display as baseLineClinicalStage,\n" +
			"\t\t\tfunc_status.display as baseLineFunctionalStatus,\n" +
			"\t\t\thv.description as firstRegimen, hrt.description as firstRegimenLine,\n" +
			"\t\t\tCASE WHEN cd_4=0 THEN null ELSE cd_4 END  AS baseLineCd4,\n" +
			"\t\t\tCASE WHEN cd_4_percentage=0 THEN null ELSE cd_4_percentage END AS cd4Percentage,\n" +
			"\t\t\thac.visit_date as artStartDate\n" +
			"\t\t\tFROM triage_vital_sign tvs\n" +
			"\t\t\t\n" +
			"\t\t\t  INNER JOIN hiv_art_clinical hac ON tvs.uuid=hac.vital_sign_uuid \n" +
			"\t\t\tAND hac.is_commencement=true AND hac.person_uuid = tvs.person_uuid\n" +
			"\t\t\t\n" +
			"\t\t\tINNER JOIN hiv_enrollment h ON hac.hiv_enrollment_uuid = h.uuid AND hac.person_uuid=tvs.person_uuid\n" +
			"\t\t\tINNER JOIN patient_person p ON p.uuid=h.person_uuid\n" +
			"\t\t\tRIGHT JOIN hiv_regimen hv ON hv.id=hac.regimen_id\n" +
			"\t\t\tRIGHT JOIN hiv_regimen_type hrt ON hrt.id=hac.regimen_type_id\n" +
			"\t\t\tRIGHT JOIN base_application_codeset clinical_stage ON clinical_stage.id=hac.clinical_stage_id\n" +
			"\t\t\tRIGHT JOIN base_application_codeset func_status ON func_status.id=hac.functional_status_id \n" +
			"\t\t\t  WHERE hac.archived=0  AND h.archived=0 AND h.facility_id=?1), \n" +
			"\t\t\t\n" +
			"\t\t\tcurrent_clinical AS (SELECT tvs.person_uuid, hac.adherence_level as adherenceLevel, hac.next_appointment as dateOfNextClinic, body_weight as currentWeight, height as currentHeight, \n" +
			"\t\t\t diastolic as currentDiastolic, systolic as currentSystolic, bac.display as currentClinicalStage,\n" +
			"\t\t\t CONCAT(diastolic, '/', systolic) as currentBp, current_clinical_date.MAXDATE as dateOfLastClinic\n" +
			"\t\t\tFROM triage_vital_sign tvs\n" +
			"\t\t\t  INNER JOIN ( SELECT person_uuid, MAX(capture_date) AS MAXDATE FROM triage_vital_sign \n" +
			"\t\t\t  GROUP BY person_uuid ORDER BY MAXDATE ASC ) AS current_triage\n" +
			"\t\t\t  ON current_triage.MAXDATE=tvs.capture_date AND current_triage.person_uuid=tvs.person_uuid\n" +
			"\t\t\n" +
			"\t\t    INNER JOIN hiv_art_clinical hac ON tvs.uuid=hac.vital_sign_uuid\n" +
			"\t\t\tINNER JOIN ( SELECT person_uuid, MAX(hac.visit_date) AS MAXDATE FROM hiv_art_clinical hac \n" +
			"\t\t\t  GROUP BY person_uuid ORDER BY MAXDATE ASC ) AS current_clinical_date\n" +
			"\t\t\t ON current_clinical_date.MAXDATE=hac.visit_date AND current_clinical_date.person_uuid=hac.person_uuid\n" +
			"\t\t\tINNER JOIN hiv_enrollment he ON he.person_uuid = hac.person_uuid\n" +
			"\t\t\tINNER JOIN base_application_codeset bac ON bac.id=hac.clinical_stage_id\n" +
			"\t\t\tWHERE hac.archived=0 AND he.archived=0 AND he.facility_id=?1)\n" +
			"\t\t\tSELECT\n" +
			"\t\t\tb.archived,\n" +
			"\t\t\tb.hospitalNumber,\n" +
			"\t\t\tb.surname,\n" +
			"\t\t\tb.firstName,\n" +
			"\t\t\tb.age,\n" +
			"\t\t\tb.otherName,\n" +
			"\t\t\tb.gender,\n" +
			"\t\t\tb.dateOfBirth,\n" +
			"\t\t\tb.maritalStatus,\n" +
			"\t\t\tb.education,\n" +
			"\t\t\tb.personUuid,\n" +
			"\t\t\tb.occupation,\n" +
			"\t\t\tb.facilityName,\n" +
			"\t\t\tb.lga,\n" +
			"\t\t\tb.state,\n" +
			"\t\t\tb.datimId,\n" +
			"\t\t\tb.residentialState,\n" +
			"\t\t\tb.residentialLga,\n" +
			"\t\t\tb.address,\n" +
			"\t\t\tb.phone,\n" +
			"\t\t\tc.currentWeight,\n" +
			"\t\t\tc.currentHeight,\n" +
			"\t\t\tc.currentDiastolic as currentDiastolicBp,\n" +
			"\t\t\tc.currentSystolic as currentSystolicBP,                 \n" +
			"\t\t\tc.currentBp,\n" +
			"\t\t\tc.dateOfLastClinic,\n" +
			"\t\t\tc.dateOfNextClinic,\n" +
			"\t\t\tc.adherenceLevel,\n" +
			"\t\t\tc.currentClinicalStage as lastClinicStage,\n" +
			"\t\t\te.statusAtRegistration,\n" +
			"\t\t\te.dateOfConfirmedHiv as dateOfConfirmedHIVTest,\n" +
			"\t\t\te.entryPoint as careEntryPoint,\n" +
			"\t\t\te.uniqueId,\n" +
			"\t\t\te.dateOfRegistration,\n" +
			"\t\t\tp.dateOfNextRefill,\n" +
			"\t\t\tp.lastRefillDuration,\n" +
			"\t\t\tp.dateOfLastRefill,\n" +
			"\t\t\tp.DSDType,\n" +
			"\t\t\tp.currentRegimen,\n" +
			"\t\t\tp.currentRegimenLine,\n" +
			"\t\t\tp.currentStatus,\n" +
			"\t\t\tp.dateOfCurrentStatus as dateOfCurrentStatus,\n" +
			"\t\t\tl.test,                   \n" +
			"\t\t\tl.viralLoadType,\n" +
			"\t\t\tl.dateSampleCollected as dateOfSampleCollected ,\n" +
			"\t\t\tl.lastViralLoad,\n" +
			"\t\t\tl.dateOfLastViralLoad,\n" +
			"\t\t\ta.baseLineWeight,\n" +
			"\t\t\ta.baseLineHeight,\n" +
			"\t\t\ta.baseLineBp,\n" +
			"\t\t\ta.diastolicBp,                        \n" +
			"\t\t\ta.systolicBp,\n" +
			"\t\t\ta.baseLineClinicalStage as baselineClinicStage,\n" +
			"\t\t\ta.baseLineFunctionalStatus,                       \n" +
			"\t\t\ta.firstRegimen, \n" +
			"\t\t\ta.firstRegimenLine,\n" +
			"\t\t\ta.baseLineCd4,                       \n" +
			"\t\t\ta.cd4Percentage,                           \n" +
			"\t\t\ta.artStartDate\n" +
			"\t\t\tFROM enrollment_details e\n" +
			"\t\t\tINNER JOIN bio_data b ON e.person_uuid=b.personUuid\n" +
			"\t\t\tLEFT JOIN art_commencement_vitals a ON a.person_uuid=e.person_uuid\n" +
			"\t\t\tLEFT JOIN pharmacy_details p ON p.person_uuid=e.person_uuid\n" +
			"\t\t\tLEFT JOIN laboratory_details l ON l.person_uuid=e.person_uuid\n" +
			"\t\t\tLEFT JOIN current_clinical c ON c.person_uuid=e.person_uuid",
			nativeQuery = true)
	List<PatientLineDto> getPatientLineByFacilityId(Long facilityId);
	
	
	@Query(value = "select distinct uuid from patient_person where facility_id = ?1",nativeQuery = true)
	Set<String> getPatientByUuids(Long facilityId);
	
	@Query(value = "WITH bio_data AS (\n" +
			"    SELECT\n" +
			"        DISTINCT ON (p.uuid) p.uuid as personUuid,\n" +
			"    p.hospital_number as hospitalNumber,\n" +
			"    EXTRACT(\n" +
			"    YEAR\n" +
			"    from\n" +
			"    AGE(NOW(), date_of_birth)\n" +
			"    ) as age,\n" +
			"    INITCAP(p.sex) as gender,\n" +
			"    p.date_of_birth as dateOfBirth,\n" +
			"    facility.name as facilityName,\n" +
			"    facility_lga.name as lga,\n" +
			"    facility_state.name as state,\n" +
			"    boui.code as datimId,\n" +
			"    tgroup.display as targetGroup,\n" +
			"    eSetting.display as enrollmentSetting,\n" +
			"    hac.visit_date as artStartDate,\n" +
			"    hr.description as regimenAtStart,\n" +
			"    h.ovc_number as ovcUniqueId,\n" +"   " +
			"    h.house_hold_number as householdUniqueNo,\n" +
			"    ecareEntry.display as careEntry,\n" +
			"    hrt.description as regimenLineAtStart\n" +
			"FROM\n" +
			"    patient_person p\n" +
			"    INNER JOIN base_organisation_unit facility ON facility.id = facility_id\n" +
			"    INNER JOIN base_organisation_unit facility_lga ON facility_lga.id = facility.parent_organisation_unit_id\n" +
			"    INNER JOIN base_organisation_unit facility_state ON facility_state.id = facility_lga.parent_organisation_unit_id\n" +
			"    INNER JOIN base_organisation_unit_identifier boui ON boui.organisation_unit_id = facility_id\n" +
			"    INNER JOIN hiv_enrollment h ON h.person_uuid = p.uuid\n" +
			"    LEFT JOIN base_application_codeset tgroup ON tgroup.id = h.target_group_id\n" +
			"    LEFT JOIN base_application_codeset eSetting ON eSetting.id = h.enrollment_setting_id\n" +
			"    LEFT JOIN base_application_codeset ecareEntry ON ecareEntry.id = h.entry_point_id\n" +
			"    INNER JOIN hiv_art_clinical hac ON hac.hiv_enrollment_uuid = h.uuid\n" +
			"    AND hac.archived = 0\n" +
			"    INNER JOIN hiv_regimen hr ON hr.id = hac.regimen_id\n" +
			"    INNER JOIN hiv_regimen_type hrt ON hrt.id = hac.regimen_type_id\n" +
			"WHERE\n" +
			"    h.archived = 0\n" +
			"  AND h.facility_id = ?1\n" +
			"  AND hac.is_commencement = true\n" +
			"  AND hac.visit_date >= ?2\n" +
			"  AND hac.visit_date <= ?3\n" +
			"    ),\n" +
			"current_clinical AS (\n" +
			"SELECT\n" +
			"    tvs.person_uuid as person_uuid10,\n" +
			"    body_weight as currentWeight,\n" +
			"    tbs.display as tbStatus,\n" +
			"    bac.display as currentClinicalStage,\n" +
			"    preg.display as pregnancyStatus,\n" +
			"    CASE WHEN hac.tb_screen is not null THEN hac.visit_date ELSE null END AS dateOfTbScreened\n" +
			"FROM\n" +
			"    triage_vital_sign tvs\n" +
			"    INNER JOIN (\n" +
			"    SELECT\n" +
			"    person_uuid,\n" +
			"    MAX(capture_date) AS MAXDATE\n" +
			"    FROM\n" +
			"    triage_vital_sign\n" +
			"    GROUP BY\n" +
			"    person_uuid\n" +
			"    ORDER BY\n" +
			"    MAXDATE ASC\n" +
			"    ) AS current_triage ON current_triage.MAXDATE = tvs.capture_date\n" +
			"    AND current_triage.person_uuid = tvs.person_uuid\n" +
			"    INNER JOIN hiv_art_clinical hac ON tvs.uuid = hac.vital_sign_uuid\n" +
			"    INNER JOIN (\n" +
			"    SELECT\n" +
			"    person_uuid,\n" +
			"    MAX(hac.visit_date) AS MAXDATE\n" +
			"    FROM\n" +
			"    hiv_art_clinical hac\n" +
			"    GROUP BY\n" +
			"    person_uuid\n" +
			"    ORDER BY\n" +
			"    MAXDATE ASC\n" +
			"    ) AS current_clinical_date ON current_clinical_date.MAXDATE = hac.visit_date\n" +
			"    AND current_clinical_date.person_uuid = hac.person_uuid\n" +
			"    INNER JOIN hiv_enrollment he ON he.person_uuid = hac.person_uuid\n" +
			"    LEFT JOIN base_application_codeset bac ON bac.id = hac.clinical_stage_id\n" +
			"    LEFT JOIN base_application_codeset preg ON preg.code = hac.pregnancy_status\n" +
			"    LEFT JOIN base_application_codeset tbs ON tbs.id = hac.tb_status \\:\\:Integer\n" +
			"WHERE\n" +
			"    hac.archived = 0\n" +
			"  AND he.archived = 0\n" +
			"  AND he.facility_id = ?1\n" +
			"    ),\n" +
			"    laboratory_details_viral_load AS (\n" +
			"SELECT\n" +
			"    DISTINCT ON(lo.patient_uuid) lo.patient_uuid as person_uuid20,\n" +
			"    bac_viral_load.display viralLoadIndication,\n" +
			"    ls.date_sample_collected as dateOfViralLoadSampleCollection,\n" +
			"    lr.result_reported as currentViralLoad,\n" +
			"    lr.date_result_reported as dateOfCurrentViralLoad\n" +
			"FROM\n" +
			"    laboratory_order lo\n" +
			"    LEFT JOIN (\n" +
			"    SELECT\n" +
			"    patient_uuid,\n" +
			"    MAX(order_date) AS MAXDATE\n" +
			"    FROM\n" +
			"    laboratory_order lo\n" +
			"    GROUP BY\n" +
			"    patient_uuid\n" +
			"    ORDER BY\n" +
			"    MAXDATE ASC\n" +
			"    ) AS current_lo ON current_lo.patient_uuid = lo.patient_uuid\n" +
			"    AND current_lo.MAXDATE = lo.order_date\n" +
			"    LEFT JOIN laboratory_test lt ON lt.lab_order_id = lo.id\n" +
			"    AND lt.patient_uuid = lo.patient_uuid\n" +
			"    LEFT JOIN base_application_codeset bac_viral_load ON bac_viral_load.id = lt.viral_load_indication\n" +
			"    LEFT JOIN laboratory_labtest ll ON ll.id = lt.lab_test_id\n" +
			"    INNER JOIN hiv_enrollment h ON h.person_uuid = current_lo.patient_uuid\n" +
			"    LEFT JOIN laboratory_sample ls ON ls.test_id = lt.id\n" +
			"    AND ls.patient_uuid = lo.patient_uuid\n" +
			"    LEFT JOIN laboratory_result lr ON lr.test_id = lt.id\n" +
			"    AND lr.patient_uuid = lo.patient_uuid\n" +
			"WHERE\n" +
			"    ll.lab_test_name = 'Viral Load'\n" +
			"  AND h.archived = 0\n" +
			"  AND lo.archived = 0\n" +
			"  AND lo.facility_id = ?1\n" +
			"    ),\n" +
			"--7242\\n\" +\n" +
			"    laboratory_details_cd4 AS (\n" +
			"SELECT\n" +
			"    lo.patient_uuid as person_uuid30,\n" +
			"    lr.result_reported as lastCD4Count,\n" +
			"    lr.date_result_reported as dateOfLastCD4Count\n" +
			"FROM\n" +
			"    laboratory_order lo\n" +
			"    INNER JOIN (\n" +
			"    SELECT\n" +
			"    lo.patient_uuid,\n" +
			"    MAX(lo.order_date) AS MAXDATE\n" +
			"    FROM\n" +
			"    laboratory_order lo\n" +
			"    INNER JOIN laboratory_test lt ON lt.lab_order_id = lo.id\n" +
			"    INNER JOIN laboratory_labtest ll ON ll.id = lt.lab_test_id\n" +
			"    AND ll.lab_test_name = 'CD4'\n" +
			"    GROUP BY\n" +
			"    lo.patient_uuid\n" +
			"    ORDER BY\n" +
			"    MAXDATE ASC\n" +
			"    ) current_lo ON current_lo.patient_uuid = lo.patient_uuid\n" +
			"    AND current_lo.MAXDATE = lo.order_date\n" +
			"    INNER JOIN laboratory_test lt ON lt.lab_order_id = lo.id\n" +
			"    INNER JOIN laboratory_result lr ON lr.test_id = lt.id\n" +
			"    INNER JOIN laboratory_labtest ll ON ll.id = lt.lab_test_id\n" +
			"    AND ll.lab_test_name = 'CD4'\n" +
			"WHERE\n" +
			"    lo.archived = 0\n" +
			"  AND lt.archived = 0\n" +
			"    ),\n" +
			"    pharmacy_details_regimen AS (\n" +
			"SELECT\n" +
			"    DISTINCT ON (hartp.person_uuid) hartp.person_uuid as person_uuid40,\n" +
			"    r.visit_date as lastPickupDate,\n" +
			"    hartp.next_appointment as nextPickupDate,\n" +
			"    hartp.refill_period / 30 \\:\\:INTEGER as monthsOfARVRefill,\n" +
			"    r.description as currentARTRegimen,\n" +
			"    r.regimen_name as currentRegimenLine,\n" +
			"    (\n" +
			"      CASE WHEN stat.hiv_status ILIKE '%STOP%'\n" +
			"      OR stat.hiv_status ILIKE '%DEATH%'\n" +
			"      OR stat.hiv_status ILIKE '%OUT%' THEN stat.hiv_status WHEN hartp.visit_date + hartp.refill_period + INTERVAL '28 day' < '01-12-2022' THEN 'IIT' ELSE 'ACTIVE' END\n" +
			"    ) AS currentStatus,\n" +
			"    (\n" +
			"      CASE WHEN stat.hiv_status ILIKE '%STOP%'\n" +
			"      OR stat.hiv_status ILIKE '%DEATH%'\n" +
			"      OR stat.hiv_status ILIKE '%OUT%' THEN stat.status_date WHEN hartp.visit_date + hartp.refill_period + INTERVAL '28 day' < '01-12-2022' THEN (\n" +
			"        hartp.visit_date + hartp.refill_period + INTERVAL '28 day'\n" +
			"      ) \\:\\:date ELSE hartp.visit_date END\n" +
			"    ) AS dateOfCurrentStatus\n" +
			"FROM\n" +
			"    hiv_art_pharmacy hartp\n" +
			"    INNER JOIN (\n" +
			"    SELECT\n" +
			"    distinct r.*\n" +
			"    FROM\n" +
			"    (\n" +
			"    SELECT\n" +
			"    h.person_uuid,\n" +
			"    h.visit_date,\n" +
			"    pharmacy_object ->> 'regimenName'\\:\\:VARCHAR AS regimen_name,\n" +
			"            hrt.description\n" +
			"          FROM\n" +
			"            hiv_art_pharmacy h,\n" +
			"            jsonb_array_elements(h.extra -> 'regimens') with ordinality p(pharmacy_object)\n" +
			"            INNER JOIN hiv_regimen hr ON hr.description = pharmacy_object ->> 'regimenName' \\:\\:VARCHAR\n" +
			"            INNER JOIN hiv_regimen_type hrt ON hrt.id = hr.regimen_type_id\n" +
			"          WHERE\n" +
			"            hrt.id IN (1, 2, 3, 4, 14)\n" +
			"        ) r\n" +
			"        INNER JOIN (\n" +
			"          SELECT\n" +
			"            hap.person_uuid,\n" +
			"            MAX(visit_date) AS MAXDATE\n" +
			"          FROM\n" +
			"            hiv_art_pharmacy hap\n" +
			"            INNER JOIN hiv_enrollment h ON h.person_uuid = hap.person_uuid\n" +
			"          WHERE\n" +
			"            h.archived = 0\n" +
			"          GROUP BY\n" +
			"            hap.person_uuid\n" +
			"          ORDER BY\n" +
			"            MAXDATE ASC\n" +
			"        ) max ON max.MAXDATE = r.visit_date\n" +
			"        AND r.person_uuid = max.person_uuid\n" +
			"    ) r ON r.visit_date = hartp.visit_date\n" +
			"    AND r.person_uuid = hartp.person_uuid\n" +
			"    INNER JOIN hiv_enrollment he ON he.person_uuid = r.person_uuid\n" +
			"    LEFT JOIN (\n" +
			"    SELECT\n" +
			"    sh1.person_id,\n" +
			"    sh1.hiv_status,\n" +
			"    sh1.status_date\n" +
			"    FROM\n" +
			"    hiv_status_tracker sh1\n" +
			"    INNER JOIN (\n" +
			"    SELECT\n" +
			"    person_id as p_id,\n" +
			"    MAX(hst.id) AS MAXID\n" +
			"    FROM\n" +
			"    hiv_status_tracker hst\n" +
			"    INNER JOIN hiv_enrollment h ON h.person_uuid = person_id\n" +
			"    GROUP BY\n" +
			"    person_id\n" +
			"    ORDER BY\n" +
			"    person_id ASC\n" +
			"    ) sh2 ON sh1.person_id = sh2.p_id\n" +
			"    AND sh1.id = sh2.MAXID\n" +
			"    ORDER BY\n" +
			"    sh1.person_id ASC\n" +
			"    ) stat ON stat.person_id = hartp.person_uuid\n" +
			"WHERE\n" +
			"    he.archived = 0\n" +
			"  AND hartp.archived = 0\n" +
			"  AND hartp.facility_id = ?1\n" +
			"ORDER BY\n" +
			"    hartp.person_uuid ASC\n" +
			"    ),\n" +
			"--7917\\n\" +\n" +
			"    eac AS (\n" +
			"SELECT\n" +
			"    he.person_uuid as person_uuid50,\n" +
			"    max_date_eac.FIRSTDATE AS dateOfCommencementOfEAC,\n" +
			"    count AS numberOfEACSessionCompleted,\n" +
			"    last_eac_complete.LASTEACCOMPLETEDDATE AS dateOfLastEACSessionCompleted,\n" +
			"    ext_date.EXTENDDATE AS dateOfExtendEACCompletion,\n" +
			"    r.date_result_reported AS DateOfRepeatViralLoadResult,\n" +
			"    r.result_reported AS repeatViralLoadResult\n" +
			"FROM\n" +
			"    hiv_eac he\n" +
			"    LEFT JOIN (\n" +
			"    SELECT\n" +
			"    hes.eac_id,\n" +
			"    MAX(hes.eac_session_date) AS FIRSTDATE\n" +
			"    FROM\n" +
			"    hiv_eac_session hes\n" +
			"    WHERE\n" +
			"    status = 'FIRST EAC'\n" +
			"    AND archived = 0\n" +
			"    GROUP BY\n" +
			"    hes.eac_id\n" +
			"    ORDER BY\n" +
			"    FIRSTDATE ASC\n" +
			"    ) AS max_date_eac ON max_date_eac.eac_id = he.uuid\n" +
			"    LEFT JOIN (\n" +
			"    SELECT\n" +
			"    COUNT(hes.eac_id) as count,\n" +
			"    eac_id\n" +
			"    FROM\n" +
			"    hiv_eac_session hes\n" +
			"    GROUP BY\n" +
			"    hes.eac_id\n" +
			"    ) AS completed_eac ON completed_eac.eac_id = he.uuid\n" +
			"    LEFT JOIN (\n" +
			"    SELECT\n" +
			"    hes.eac_id,\n" +
			"    MAX(hes.eac_session_date) AS LASTEACCOMPLETEDDATE\n" +
			"    FROM\n" +
			"    hiv_eac he\n" +
			"    INNER JOIN hiv_eac_session hes ON hes.eac_id = he.uuid\n" +
			"    WHERE\n" +
			"    he.status = 'COMPLETED'\n" +
			"    AND he.archived = 0\n" +
			"    GROUP BY\n" +
			"    hes.eac_id\n" +
			"    ORDER BY\n" +
			"    LASTEACCOMPLETEDDATE ASC\n" +
			"    ) AS last_eac_complete ON last_eac_complete.eac_id = he.uuid\n" +
			"    LEFT JOIN (\n" +
			"    SELECT\n" +
			"    hes.eac_id,\n" +
			"    MAX(hes.eac_session_date) AS EXTENDDATE\n" +
			"    FROM\n" +
			"    hiv_eac_session hes\n" +
			"    WHERE\n" +
			"    hes.status not ilike 'FIRST%'\n" +
			"    AND status not ilike 'SECOND%'\n" +
			"    AND status not ilike 'THIRD%'\n" +
			"    AND hes.archived = 0\n" +
			"    GROUP BY\n" +
			"    hes.eac_id\n" +
			"    ORDER BY\n" +
			"    EXTENDDATE ASC\n" +
			"    ) AS ext_date ON ext_date.eac_id = he.uuid\n" +
			"    LEFT JOIN (\n" +
			"    SELECT\n" +
			"    l.patient_uuid,\n" +
			"    l.date_result_reported,\n" +
			"    l.result_reported\n" +
			"    FROM\n" +
			"    laboratory_result l\n" +
			"    INNER JOIN(\n" +
			"    SELECT\n" +
			"    lr.patient_uuid,\n" +
			"    MIN(lr.date_result_reported) AS date_result_reported\n" +
			"    FROM\n" +
			"    laboratory_result lr\n" +
			"    INNER JOIN (\n" +
			"    SELECT\n" +
			"    hes.eac_id,\n" +
			"    hes.person_uuid,\n" +
			"    MAX(hes.eac_session_date) AS LASTEACCOMPLETEDDATE\n" +
			"    FROM\n" +
			"    hiv_eac he\n" +
			"    INNER JOIN hiv_eac_session hes ON hes.eac_id = he.uuid\n" +
			"    WHERE\n" +
			"    he.status = 'COMPLETED'\n" +
			"    AND he.archived = 0\n" +
			"    GROUP BY\n" +
			"    hes.eac_id,\n" +
			"    hes.person_uuid\n" +
			"    ORDER BY\n" +
			"    LASTEACCOMPLETEDDATE ASC\n" +
			"    ) AS last_eac_complete ON last_eac_complete.person_uuid = lr.patient_uuid\n" +
			"    AND lr.date_result_reported > LASTEACCOMPLETEDDATE\n" +
			"    GROUP BY\n" +
			"    lr.patient_uuid\n" +
			"    ) r ON l.date_result_reported = r.date_result_reported\n" +
			"    AND l.patient_uuid = r.patient_uuid\n" +
			"    ) r ON r.patient_uuid = he.person_uuid\n" +
			"WHERE\n" +
			"    he.archived = 0\n" +
			"    ),\n" +
			"    biometric AS (\n" +
			"SELECT\n" +
			"    he.person_uuid as person_uuid60,\n" +
			"    biometric_count.enrollment_date as dateBiometricsEnrolled,\n" +
			"    biometric_count.count as numberOfFingersCaptured\n" +
			"FROM\n" +
			"    hiv_enrollment he\n" +
			"    LEFT JOIN(\n" +
			"    SELECT\n" +
			"    b.person_uuid,\n" +
			"    count(b.person_uuid),\n" +
			"    max(enrollment_date) enrollment_date\n" +
			"    FROM\n" +
			"    biometric b\n" +
			"    WHERE\n" +
			"    archived = 0\n" +
			"    GROUP BY\n" +
			"    b.person_uuid\n" +
			"    ) biometric_count ON biometric_count.person_uuid = he.person_uuid\n" +
			"WHERE\n" +
			"    he.archived = 0\n" +
			"    ),\n" +
			"--  current ART start date qr start here\n" +
			"    current_ART_start as (\n" +
			"select\n" +
			"    start_or_regimen as dateOfCurrentRegimen,\n" +
			"    regiment_table.max_visit_date,\n" +
			"    regiment_table.regimen,\n" +
			"    regiment_table.person_uuid as person_uuid70\n" +
			"from\n" +
			"    (\n" +
			"    select\n" +
			"    min(visit_date) start_or_regimen,\n" +
			"    max(visit_date) max_visit_date,\n" +
			"    regimen,\n" +
			"    person_uuid\n" +
			"    from\n" +
			"    (\n" +
			"    select\n" +
			"    hap.id,\n" +
			"    hap.person_uuid,\n" +
			"    hap.visit_date,\n" +
			"    hivreg.description as regimen,\n" +
			"    row_number() over(\n" +
			"    order by\n" +
			"    person_uuid,\n" +
			"    visit_date\n" +
			"    ) rn1,\n" +
			"    row_number() over(\n" +
			"    partition by hivreg.description\n" +
			"    order by\n" +
			"    person_uuid,\n" +
			"    visit_date\n" +
			"    ) rn2\n" +
			"    FROM\n" +
			"    public.hiv_art_pharmacy as hap\n" +
			"    inner join (\n" +
			"    SELECT\n" +
			"    max(hapr.id) as id,\n" +
			"    art_pharmacy_id,\n" +
			"    regimens_id,\n" +
			"    hr.description\n" +
			"    FROM\n" +
			"    public.hiv_art_pharmacy_regimens as hapr\n" +
			"    inner join hiv_regimen as hr on hapr.regimens_id = hr.id\n" +
			"    where\n" +
			"    hr.regimen_type_id in (1, 2, 3, 4, 14)\n" +
			"    GROUP BY\n" +
			"    art_pharmacy_id,\n" +
			"    regimens_id,\n" +
			"    hr.description\n" +
			"    ) as hapr on hap.id = hapr.art_pharmacy_id\n" +
			"    inner join hiv_regimen as hivreg on hapr.regimens_id = hivreg.id\n" +
			"    inner join hiv_regimen_type as hivregtype on hivreg.regimen_type_id = hivregtype.id\n" +
			"    and hivreg.regimen_type_id in (1, 2, 3, 4, 14)\n" +
			"    order by\n" +
			"    person_uuid,\n" +
			"    visit_date\n" +
			"    ) t\n" +
			"    group by\n" +
			"    person_uuid,\n" +
			"    regimen,\n" +
			"    rn1 - rn2\n" +
			"    order by\n" +
			"    min(visit_date)\n" +
			"    ) as regiment_table\n" +
			"    inner join (\n" +
			"    select\n" +
			"    max(visit_date) as max_visit_date,\n" +
			"    person_uuid\n" +
			"    from\n" +
			"    public.hiv_art_pharmacy\n" +
			"    group by\n" +
			"    person_uuid\n" +
			"    ) as hap on regiment_table.person_uuid = hap.person_uuid\n" +
			"where\n" +
			"    regiment_table.max_visit_date = hap.max_visit_date\n" +
			"group by\n" +
			"    regiment_table.person_uuid,\n" +
			"    regiment_table.regimen,\n" +
			"    regiment_table.max_visit_date,\n" +
			"    start_or_regimen\n" +
			"    ),\n" +
			" ipt as (SELECT DISTINCT hap.person_uuid as personUuid80, ipt_type.regimen_name as iptType, \n" +
			"hap.visit_date as dateOfIptStart, \n" +
			"MAX(complete.date_completed) AS iptCompletionDate\n" +
			"FROM hiv_art_pharmacy hap \n" +
			"INNER JOIN (\n" +
			"    SELECT\n" +
			"    person_uuid,\n" +
			"    MAX(visit_date) AS MAXDATE\n" +
			"    FROM\n" +
			"    hiv_art_pharmacy\n" +
			"\tWHERE (ipt->>'type' ilike '%INITIATION%') \n" +
			"\tAND archived=0\n" +
			"    GROUP BY\n" +
			"    person_uuid\n" +
			"    ORDER BY\n" +
			"    MAXDATE ASC\n" +
			"    ) AS max_ipt ON max_ipt.MAXDATE = hap.visit_date AND max_ipt.person_uuid=hap.person_uuid\n" +
			"\tINNER JOIN (\n" +
			"\t\tSELECT\n" +
			"    h.person_uuid,\n" +
			"    h.visit_date,\n" +
			"    pharmacy_object ->> 'regimenName' \\:\\: VARCHAR AS regimen_name,\n" +
			"\tpharmacy_object ->> 'duration' \\:\\: VARCHAR AS duration,\n" +
			"    hrt.description\n" +
			"    FROM\n" +
			"    hiv_art_pharmacy h,\n" +
			"    jsonb_array_elements(h.extra -> 'regimens') with ordinality p(pharmacy_object)\n" +
			"    INNER JOIN hiv_regimen hr ON hr.description = pharmacy_object ->> 'regimenName' \\:\\: VARCHAR\n" +
			"    INNER JOIN hiv_regimen_type hrt ON hrt.id = hr.regimen_type_id\n" +
			"    WHERE\n" +
			"    hrt.id IN (15)\n" +
			"\t) AS ipt_type ON ipt_type.person_uuid=max_ipt.person_uuid AND ipt_type.visit_date=max_ipt.MAXDATE\n" +
			"\t\n" +
			"\tLEFT JOIN (SELECT hap.person_uuid, hap.visit_date, TO_DATE(hap.ipt->>'dateCompleted', 'YYYY-MM-DD') as date_completed FROM hiv_art_pharmacy hap\n" +
			"\t\t\t   INNER JOIN (\n" +
			"\t\t\t\t   SELECT\n" +
			"    person_uuid,\n" +
			"    MAX(visit_date) AS MAXDATE\n" +
			"    FROM\n" +
			"    hiv_art_pharmacy\n" +
			"\tWHERE ipt->>'dateCompleted' IS NOT NULL\n" +
			"    GROUP BY\n" +
			"    person_uuid\n" +
			"    ORDER BY\n" +
			"    MAXDATE ASC\n" +
			"    ) AS complete_ipt ON complete_ipt.MAXDATE\\:\\:DATE = hap.visit_date AND complete_ipt.person_uuid=hap.person_uuid\n" +
			")complete ON complete.person_uuid=hap.person_uuid\n" +
			"\n" +
			"\tWHERE hap.archived=0\n" +
			"\t\n" +
			"\tGROUP BY hap.person_uuid, ipt_type.regimen_name,\n" +
			"hap.visit_date ), "+
			"cervical_cancer as\n" +
			"(SELECT ho.person_uuid as person_uuid90, ho.date_of_observation as dateOfCervicalCancerScreening,\n" +
			"       cc_type.display as cervicalCancerScreeningType, cc_method.display as cervicalCancerScreeningMethod,\n" +
			"       cc_result.display as resultOfCervicalCancerScreening\n" +
			"FROM hiv_observation ho\n" +
			"         INNER JOIN (\n" +
			"    SELECT\n" +
			"        person_uuid,\n" +
			"        MAX(date_of_observation) AS MAXDATE\n" +
			"    FROM\n" +
			"        hiv_observation\n" +
			"    WHERE archived=0\n" +
			"    GROUP BY\n" +
			"        person_uuid\n" +
			"    ORDER BY\n" +
			"        MAXDATE ASC\n" +
			") AS max_cc ON max_cc.MAXDATE = ho.date_of_observation AND max_cc.person_uuid=ho.person_uuid\n" +
			"         INNER JOIN base_application_codeset cc_type ON cc_type.code = ho.data->>'screenType'\\:\\:VARCHAR\n" +
			"    INNER JOIN base_application_codeset cc_method ON cc_method.code = ho.data->>'screenMethod'\\:\\:VARCHAR\n" +
			"    INNER JOIN base_application_codeset cc_result ON cc_result.code = ho.data->>'screeningResult'\\:\\:VARCHAR\n" +
			"),\n" +
			"ovc as (SELECT ovc_number as ovcNumber, house_hold_number as householdNumber, person_uuid as personUuid100  FROM hiv_enrollment)"+
			"SELECT\n" +
			"    bd.*,\n" +
			"    ldvl.*,\n" +
			"    ldc.*,\n" +
			"    pdr.*,\n" +
			"    b.*,\n" +
			"    c.*,\n" +
			"    e.*,\n" +
			"    ca.dateOfCurrentRegimen,\n" +
			"    ca.person_uuid70,\n" +
			"    ipt.dateOfIptStart,\n" +
			"    ipt.iptCompletionDate,\n" +
			"    ipt.iptType,\n" +
			"     cc.*,\n" +
			"     ov.*\n" +
			"FROM\n" +
			"    bio_data bd\n" +
			"        LEFT JOIN current_clinical c ON c.person_uuid10 = bd.personUuid\n" +
			"        LEFT JOIN laboratory_details_viral_load ldvl ON ldvl.person_uuid20 = bd.personUuid\n" +
			"        LEFT JOIN laboratory_details_cd4 ldc ON ldc.person_uuid30 = bd.personUuid\n" +
			"        LEFT JOIN pharmacy_details_regimen pdr ON pdr.person_uuid40 = bd.personUuid\n" +
			"        LEFT JOIN eac e ON e.person_uuid50 = bd.personUuid\n" +
			"        LEFT JOIN biometric b ON b.person_uuid60 = bd.personUuid\n" +
			"        LEFT JOIN current_ART_start ca ON ca.person_uuid70 = bd.personUuid\n" +
			"        LEFT JOIN ipt ipt ON ipt.personUuid80 = bd.personUuid\n" +
			"        LEFT JOIN cervical_cancer cc on cc.person_uuid90 = bd.personUuid\n" +
			"        LEFT JOIN ovc ov on ov.personUuid100 = bd.personUuid",
	nativeQuery = true)
	List<RadetReportDto> getRadetReportsByFacilityIdAndDateRange(Long facilityId, LocalDate startDate, LocalDate endDate);
	
}
