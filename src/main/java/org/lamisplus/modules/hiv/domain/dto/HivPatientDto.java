package org.lamisplus.modules.hiv.domain.dto;

import lombok.Data;
import org.lamisplus.modules.patient.domain.dto.PersonResponseDto;

import java.io.Serializable;
import java.util.List;

@Data
public class HivPatientDto implements Serializable {
    private   PersonResponseDto bioData;
    private   boolean isEnrolled;
    private   boolean isCommenced;
    private   String currentStatus;
    private   HivEnrollmentDto enrollment;
    private   ARTClinicalCommenceDto artCommence;
    private   List<ARTClinicVisitDto> artClinicVisits;
}
