package org.lamisplus.modules.ndr.repositories;

import org.lamisplus.modules.ndr.domain.dto.PatientDemographicDTO;
import org.lamisplus.modules.ndr.domain.dto.PatientEncounterDTO;
import org.lamisplus.modules.ndr.domain.dto.PatientPharmacyEncounterDTO;
import org.lamisplus.modules.ndr.domain.entities.NdrMessageLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface NdrMessageLogRepository extends JpaRepository<NdrMessageLog, Integer> {
    List<NdrMessageLog> getNdrMessageLogByIdentifier(String identifier);
    Optional<NdrMessageLog> findFirstByIdentifierAndFileType(String identifier, String fileType);
    @Query(value="SELECT\n" +
            "                    DISTINCT (p.uuid) AS personUuid, p.date_of_registration AS diagnosisDate,\n" +
            "                             p.date_of_birth AS dateOfBirth,\n" +
            "                             p.id AS personId,\n" +
            "                             p.hospital_number AS hospitalNumber,\n" +
            "             concat( boui.code, '_', p.uuid) as patientIdentifer,\n" +
            "                            EXTRACT(YEAR FROM AGE(NOW(), date_of_birth)) AS age,\n" +
            "                             (CASE WHEN INITCAP(p.sex)='Female' THEN 'F' ELSE 'M' END) AS patientSexCode,\n" +
            "                             p.date_of_birth AS patientDateOfBirth, 'FAC' AS facilityTypeCode,\n" +
            "                             facility.name AS facilityName,\n" +
            "                            facility_lga.name AS lga,\n" +
            "                             facility_state.name AS state,\n" +
            "                             boui.code AS facilityId,\n" +
            "                             hac.visit_date AS artStartDate,\n" +
            "                            hrr.regimen AS firstARTRegimenCodeDescTxt,\n" +
            "            ncs.code AS firstARTRegimenCode,\n" +
            "            lgaCode.code AS lgaCode,\n" +
            "            enrollStatus.display AS statusAtRegistration,\n" +
            "            stateCode.code AS stateCode,\n" +
            "            'NGA' AS countryCode,\n" +
            "             emplCode.code AS patientOccupationCode,\n" +
            "             mariCode.code AS PatientMaritalStatusCode,\n" +
            "             stateCode.code AS stateOfNigeriaOriginCode,\n" +
            "            eduCode.code AS patientEducationLevelCode,\n" +
            "            COALESCE(ndrFuncStatCodestatus.code, ndrClinicStage.code) AS functionalStatusStartART,\n" +
            "            h.date_of_registration AS enrolledInHIVCareDate\n" +
            "               FROM\n" +
            "                    patient_person p\n" +
            "                       INNER JOIN base_organisation_unit facility ON facility.id = facility_id\n" +
            "                        INNER JOIN base_organisation_unit facility_lga ON facility_lga.id = facility.parent_organisation_unit_id\n" +
            "                       INNER JOIN base_organisation_unit facility_state ON facility_state.id = facility_lga.parent_organisation_unit_id\n" +
            "                       INNER JOIN base_organisation_unit_identifier boui ON boui.organisation_unit_id = facility_id\n" +
            "                        INNER JOIN hiv_enrollment h ON h.person_uuid = p.uuid\n" +
            "                        INNER JOIN hiv_art_clinical hac ON hac.hiv_enrollment_uuid = h.uuid AND hac.archived = 0\n" +
            "                      INNER JOIN hiv_regimen hr ON hr.id = hac.regimen_id\n" +
            "                        INNER JOIN hiv_regimen_type hrt ON hrt.id = hac.regimen_type_id\n" +
            "            INNER JOIN hiv_regimen_resolver hrr ON hrr.regimensys=hr.description\n" +
            "            INNER JOIN ndr_code_set ncs ON ncs.code_description=hrr.regimen\n" +
            "           LEFT JOIN ndr_code_set lgaCode ON lgaCode.code_description=facility_lga.name and lgaCode.code_set_nm = 'LGA'\n" +
            "            LEFT JOIN base_application_codeset enrollStatus ON enrollStatus.id= h.status_at_registration_id\n" +
            "            LEFT JOIN ndr_code_set stateCode ON stateCode.code_description=facility_state.name and  stateCode.code_set_nm = 'STATES'\n" +
            "            LEFT JOIN ndr_code_set emplCode ON emplCode.code_description=p.employment_status->>'display' and emplCode.code_set_nm = 'OCCUPATION_STATUS'\n" +
            "            LEFT JOIN ndr_code_set mariCode ON mariCode.code_description=p.marital_status->>'display' and mariCode.code_set_nm = 'MARITAL_STATUS'\n" +
            "            LEFT JOIN ndr_code_set eduCode ON eduCode.code_description=p.education->>'display' and eduCode.code_set_nm = 'EDUCATIONAL_LEVEL'\n" +
            "           LEFT JOIN base_application_codeset fsCodeset ON fsCodeset.id=hac.functional_status_id\n" +
            "            LEFT JOIN base_application_codeset csCodeset ON csCodeset.id=hac.clinical_stage_id\n" +
            "            LEFT JOIN ndr_code_set ndrFuncStatCodestatus ON ndrFuncStatCodestatus.code_description=fsCodeset.display\n" +
            "            LEFT JOIN ndr_code_set ndrClinicStage ON ndrClinicStage.code_description=csCodeset.display\n" +
            "               WHERE h.archived = 0\n" +
            "             AND p.uuid = ?1\n" +
            "               AND h.facility_id = ?2\n" +
            "               AND hac.is_commencement = TRUE\n" +
            "               AND hac.visit_date >= ?3 \n" +
            "               AND hac.visit_date < ?4",
            nativeQuery = true)
    Optional<PatientDemographicDTO> getPatientDemographics(String identifier, Long facilityId, LocalDate start, LocalDate end);
    
    @Query(value = "SELECT hac.person_uuid as patientUuid, cast( json_agg(distinct  jsonb_build_object('visitID', hac.uuid,\n" +
            "\t\t\t\t\t\t\t\t\t  'visitDate', CAST(hac.visit_date AS DATE),\n" +
            "\t\t\t\t\t\t\t\t\t  'weight',  CASE WHEN tvs.body_weight IS NULL THEN 0 ELSE tvs.body_weight END,\n" +
            "\t\t\t\t\t\t\t\t\t  'childHeight', CASE WHEN tvs.height IS NULL THEN 0 ELSE tvs.height END,\n" +
            "\t\t\t\t\t\t\t\t\t   'tbStatus', ncs.code,\n" +
            "\t\t\t\t\t\t\t\t\t\t'bloodPressure', \n" +
            "\t\t\t\t\t\t\t\t\t\t(CASE WHEN tvs.systolic IS NOT NULL AND tvs.diastolic IS NOT NULL \n" +
            "\t\t\t\t\t\t\t\t\t\tTHEN CONCAT(CAST(tvs.systolic AS INTEGER), '/', CAST(tvs.diastolic AS INTEGER))\n" +
            "\t\t\t\t\t\t\t\t\t\tELSE NULL END),\n" +
            "\t\t\t\t\t\t\t\t\t  'nextAppointmentDate', hac.next_appointment)) as varchar) AS encounters\n" +
            "\tFROM hiv_art_clinical hac \n" +
            "\tLEFT JOIN triage_vital_sign tvs ON hac.vital_sign_uuid=tvs.uuid AND hac.archived=0\n" +
            "\tLEFT JOIN base_application_codeset bac_tb ON bac_tb.id=CAST(hac.tb_status AS BIGINT) AND bac_tb.archived=0\n" +
            "\tLEFT JOIN ndr_code_set ncs ON ncs.code_description=bac_tb.display\n" +
            "\tWHERE hac.archived = 0\n" +
            "\t  And hac.person_uuid = ?1\n" +
            "      AND hac.facility_id = ?2\n" +
            "      AND hac.visit_date >= ?3\n" +
            "      AND hac.visit_date <= ?4\n" +
            "\tGROUP BY hac.person_uuid", nativeQuery = true)
    Optional<PatientEncounterDTO> getPatientEncounter(String identifier, Long facilityId, LocalDate start, LocalDate end);
    
   @Query(value = "SELECT person_uuid, cast(json_agg(DISTINCT  jsonb_build_object('visitID', phar.uuid,\n" +
           "\t\t\t\t\t\t\t\t\t  'visitDate', phar.visitDate,\n" +
           "\t\t\t\t\t\t\t\t\t  'prescribedRegimenCode',  phar.prescribedRegimenCode,\n" +
           "\t\t\t\t\t\t\t\t\t  'prescribedRegimenCodeDescTxt', phar.prescribedRegimenCodeDescTxt,\n" +
           "\t\t\t\t\t\t\t\t\t   'PrescribedRegimenTypeCode', (CASE WHEN regimen_type_id=8 THEN 'OI' ELSE 'ART' END),\n" +
           "\t\t\t\t\t\t\t \t\t\t'PrescribedRegimenDuration', phar.duration,\n" +
           "  'DateRegimenStarted', phar.visitDate))as varchar) AS regimens\n" +
           "FROM (SELECT DISTINCT pharmacy.person_uuid, pharmacy.uuid, pharmacy.visit_date AS visitDate,\n" +
           "pharmacy_object ->> 'name' as name, cast(pharmacy_object ->> 'duration' as VARCHAR) as duration,\n" +
           "hr.regimen_type_id, (CASE WHEN hrr.regimen IS NULL THEN hr.description ELSE hrr.regimen END) AS prescribedRegimenCodeDescTxt, \n" +
           "(CASE WHEN ncs_reg.code IS NULL THEN ncs_others.code ELSE ncs_reg.code END)AS prescribedRegimenCode\n" +
           "FROM hiv_art_pharmacy pharmacy,\n" +
           "jsonb_array_elements(extra->'regimens') with ordinality p(pharmacy_object)\n" +
           "INNER JOIN hiv_regimen hr ON hr.description=CAST(pharmacy_object ->> 'name' AS VARCHAR) \n" +
           "AND hr.regimen_type_id IN (1,2,3,4,14,8)\n" +
           "LEFT JOIN hiv_regimen_resolver hrr ON hrr.regimensys=hr.description\n" +
           "LEFT JOIN ndr_code_set ncs_reg ON ncs_reg.code_description=hrr.regimen\n" +
           "LEFT JOIN ndr_code_set ncs_others ON ncs_others.code_description=hr.description --12662\n" +
           "AND hr.regimen_type_id NOT IN (1,2,3,4,14)\n" +
           "\t  WHERE pharmacy.archived = 0\n" +
           "\t  AND  pharmacy.person_uuid = ?1\n" +
           "      AND pharmacy.facility_id = ?2\n" +
           "      AND pharmacy.visit_date >= ?3\n" +
           "      AND pharmacy.visit_date <= ?4\n" +
           "\t \n" +
           "\t ) phar\n" +
           "\tGROUP BY person_uuid", nativeQuery = true)
   Optional<PatientPharmacyEncounterDTO> getPatientPharmacyEncounter(String identifier, Long facilityId, LocalDate start, LocalDate end);
}
