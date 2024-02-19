package org.lamisplus.modules.ndr.mapper.redacted;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.lamisplus.modules.ndr.domain.dto.PatientRedactedDemographicDTO;
import org.lamisplus.modules.ndr.schema.redacted.PatientDemographicsType;
import org.lamisplus.modules.ndr.schema.redacted.RedactedVisitType;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Slf4j
@Service
public class PatientDemographicsRedactedMapper {
    private final RedactedVisitTypeMapper redactedVisitTypeMapper;
    public PatientDemographicsType getPatientDemographics(PatientRedactedDemographicDTO demographicDTO) {
        //@XmlElement(name = "PatientIdentifier", required = true)
        // @XmlElement(name = "RedactedPatient", required = true)
        // @XmlElement(name = "RedactedPatientReason", required = true)
        //  @XmlElement(name = "RedactedVisit", required = true)
        PatientDemographicsType patientDemographicsType = new PatientDemographicsType();
        //log.info("patientIdentifier {}", demographicDTO.getPatientIdentifier());
        try {
            if(StringUtils.isNotBlank(demographicDTO.getPatientIdentifier())) {
                patientDemographicsType.setPatientIdentifier(demographicDTO.getPatientIdentifier());
            }else {
                throw new IllegalArgumentException("Patient Identifier cannot be null");
            }

            if(StringUtils.isNotBlank(demographicDTO.getPatientIdentifier())) {
                patientDemographicsType.setRedactedPatient("YES");
            }else {
                throw new IllegalArgumentException("Redacted Patient cannot be null");
            }

            if(StringUtils.isNotBlank(demographicDTO.getReason())) {
                patientDemographicsType.setRedactedPatientReason(demographicDTO.getReason());
            }else {
                patientDemographicsType.setRedactedPatientReason("Enrolled Patient Deleted");
            }

            RedactedVisitType redactedVisitType = redactedVisitTypeMapper.getPatientRedactedVisits(demographicDTO);

            if (redactedVisitType != null) {
                patientDemographicsType.getRedactedVisit().add(redactedVisitType);
            }

            return patientDemographicsType;
        } catch (Exception e) {
            log.info("An error occurred while trying to get patient with uuid {} demographics type error: {}",
                    demographicDTO.getPersonUuid(), e.getMessage());
            throw new IllegalStateException(e.toString());
        }
    }


}
