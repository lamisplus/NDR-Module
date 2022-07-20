package org.lamisplus.modules.hiv.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.lamisplus.modules.patient.utility.LocalDateConverter;

import javax.persistence.Convert;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class HivPatientDto implements Serializable {
    private Long id;
    private Long visitId;
    private Boolean active;
    private String surname;
    private String firstName;
    private String otherName;
    private Object gender;
    private Boolean deceased;
    private Object maritalStatus;
    private Object employmentStatus;
    private Object education;
    private Object organization;
    @Convert(converter = LocalDateConverter.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dateOfBirth;
    private LocalDateTime deceasedDateTime;
    private Object identifier;
    private Object contact;
    private Object contactPoint;
    private Object address;
    private LocalDate dateOfRegistration;
    private Boolean IsDateOfBirthEstimated;
    private boolean isEnrolled;
    private boolean isCommenced;
    private boolean isClinicalEvaluation;
    private boolean isMentalHealth;
    private String currentStatus;
    private HivEnrollmentDto enrollment;
    private ARTClinicalCommenceDto artCommence;
    private List<ARTClinicVisitDto> artClinicVisits;
    private List<ResponseArtPharmacyDto> artPharmacyRefills;
}
