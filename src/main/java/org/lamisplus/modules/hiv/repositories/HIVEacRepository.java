package org.lamisplus.modules.hiv.repositories;

import org.lamisplus.modules.hiv.domain.dto.BiometricRadetDto;
import org.lamisplus.modules.hiv.domain.dto.LabEacInfo;
import org.lamisplus.modules.hiv.domain.dto.ViralLoadRadetDto;
import org.lamisplus.modules.hiv.domain.entity.HIVEac;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


public interface HIVEacRepository extends JpaRepository<HIVEac, Long> {
	List<HIVEac> getAllByPersonAndArchived(Person person, Integer archived);
	Optional<HIVEac>  getHIVEacByPersonAndLabNumber(Person person, String labNumber);
	
	
	@Query(value = "select * from\n" +
			"    (\n" +
			"        select a.patient_id as patientId\n" +
			"             , b.id as testResltId\n" +
			"             , d.group_name as testGroup\n" +
			"             , c.lab_test_name as testName\n" +
			"             , a.lab_number as labNumber\n" +
			"             , b.date_result_reported resultDate\n" +
			"             ,CAST(b.result_reported as int) as  result\n" +
			"        from laboratory_test a\n" +
			"                 inner join laboratory_result b on a.id=b.test_id\n" +
			"                 inner join laboratory_labtest c on a.lab_test_id=c.id\n" +
			"                 inner join laboratory_labtestgroup d on a.lab_test_group_id=d.id\n" +
			"        where c.lab_test_name = 'Viral Load'\n" +
			"    ) a where result > 1000 and a.patientId = ?1 ", nativeQuery = true)
	List<LabEacInfo> getPatientAllEacs(Long personId);
	
	@Query(value =
			" select * from\n" +
					"\t\t\t       \n" +
					"\t\t(select a.patient_id as patientId,\n" +
					"\t\t                 a.viral_load_indication as indicationId,\n" +
					"\t\t\t             b.date_result_reported resultDate,\n" +
					"\t\t\t             e.date_sample_collected dateSampleCollected,\n" +
					"\t\t\t            CAST(b.result_reported as int) as  result\n" +
					"\t\t\t        from laboratory_test a\n" +
					"\t\t\t                inner join laboratory_result b on a.id=b.test_id\n" +
					"\t\t\t                inner join laboratory_labtest c on a.lab_test_id=c.id\n" +
					"\t\t\t                inner join laboratory_labtestgroup d on a.lab_test_group_id=d.id\n" +
					"\t\t\t                inner join laboratory_sample e on a.id = e.test_id\n" +
					"\t\t\t      where c.lab_test_name = 'Viral Load'\n" +
					"\t\t    ) a where  a.patientId = ?1  and a.resultDate between ?2 and ?3  order by a.resultDate DESC limit 1"
			,
			nativeQuery = true)
	Optional<ViralLoadRadetDto> getPatientCurrentViralLoadDetails(Long personId, LocalDate startDate, LocalDate endDate);
	
	@Query(value = "SELECT \n" +
			"template_type as  type,\n" +
			"template, enrollment_date \n" +
			"as dateCaptured FROM public.biometric\n" +
			"where person_uuid = ?1 and  enrollment_date BETWEEN\n" +
			" ?2 and ?3 ", nativeQuery = true)
	List<BiometricRadetDto> getPatientBiometricInfo(String  personUuid, LocalDate startDate, LocalDate endDate);
}
