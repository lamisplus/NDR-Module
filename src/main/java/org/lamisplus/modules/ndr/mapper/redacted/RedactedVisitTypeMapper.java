package org.lamisplus.modules.ndr.mapper.redacted;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.lamisplus.modules.ndr.domain.dto.PatientRedactedDemographicDTO;
import org.lamisplus.modules.ndr.domain.dto.RedactedVisitTypeDTO;
import org.lamisplus.modules.ndr.repositories.NdrMessageLogRepository;
import org.lamisplus.modules.ndr.schema.redacted.RedactedVisitType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Slf4j
@Service
public class RedactedVisitTypeMapper {
    @Autowired
    private NdrMessageLogRepository ndrMessageLogRepository;
    public RedactedVisitType getPatientRedactedVisits(PatientRedactedDemographicDTO patientRedactedDemographicDTO) {

        RedactedVisitType redactedVisitType = new RedactedVisitType();

        List<RedactedVisitTypeDTO> visits = ndrMessageLogRepository.getRedactedPatientVisits(patientRedactedDemographicDTO.getPersonUuid());

        if (visits != null) {
            visits.forEach(visit -> {
                if(visit.getVisitID() != null) {
                    redactedVisitType.setVisitID(visit.getVisitID());
                }else {
                    throw new IllegalArgumentException("Redacted Patient Visit ID cannot be null");
                }

                if(StringUtils.isNotBlank(visit.getReason())) {
                    redactedVisitType.setRedactedVisitReason(visit.getReason());
                }else {
                    redactedVisitType.setRedactedVisitReason("Patient Clinical Visit Deleted");
                }
            });
        }

        return redactedVisitType;
    }
}
