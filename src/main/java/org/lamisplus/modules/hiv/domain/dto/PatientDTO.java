package org.lamisplus.modules.hiv.domain.dto;

import lombok.*;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PatientDTO {
	private String hospitalNumber;
	private String surname;
	private String otherName;
	private String firstName;
	private String uniqueId;
	private String gender;
	private String personUuid;
	private String currentStatus;
	private boolean isClinicalEvaluation;
	private boolean isMentalHealth;
	private Boolean isEnrolled;
	private Boolean isCommenced;
	private Boolean isDobEstimated;
	private Long id;
	private Integer age;
	private Long facilityId;
	private Long targetGroupId;
	private Long enrollmentId;
	private LocalDate dateOfBirth;
}
