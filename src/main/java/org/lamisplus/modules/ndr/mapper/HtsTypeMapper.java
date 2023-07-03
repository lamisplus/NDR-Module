package org.lamisplus.modules.ndr.mapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.ndr.domain.dto.PatientDemographicDTO;
import org.lamisplus.modules.ndr.schema.HIVTestingReportType;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
@Slf4j
public class HtsTypeMapper {
	
	
	public HIVTestingReportType getHivTestingReportType(String  patientUuid) {
		HIVTestingReportType hivTestingReportType = NDRObjectFactory.createHIVTestingReportType();
		//demographicDTO.getPersonUuid();
		//demographicDTO.get
		
		return hivTestingReportType;
	}


}
