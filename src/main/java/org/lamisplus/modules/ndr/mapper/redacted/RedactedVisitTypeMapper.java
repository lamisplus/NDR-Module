package org.lamisplus.modules.ndr.mapper.redacted;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
        //System.out.println("visits" + " " + visits);

        if (visits != null) {
            visits.forEach(visit -> {
                //System.out.println("visit" + " " + visit.getVisitID());
                if(visit.getVisitID() != null)redactedVisitType.setVisitID(visit.getVisitID());
                if(visit.getVisitID() != null) {
                    redactedVisitType.setRedactedVisitReason("Encounters Deleted");
                }
            });
        }

        return redactedVisitType;
    }
}
