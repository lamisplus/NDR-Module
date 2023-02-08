package org.lamisplus.modules.ndr.domain.dto;

import lombok.Builder;
import lombok.Data;
import org.lamisplus.modules.ndr.schema.CodedSimpleType;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
@Builder
public class ClinicalEncounterDTO {
	@NotNull
	private String visitId;
	@NotNull
	private LocalDate visitDate;
	private Integer durationOnArt;
	private Integer weight;
	private Integer childHeight;
	private String bloodPressure;
	private String edDandPMTCTLink;
	private String patientFamilyPlanningCode;
	private String patientFamilyPlanningMethodCode;
	private String functionalStatus;
	private String whoClinicalStage;
	private String tbStatus;
	private String otherOIOtherProblems;
	private String notedSideEffects;
	private CodedSimpleType arvDrugRegimen;
	private String arvDrugAdherence;
	private String whyPoorFairARVDrugAdherence;
	private CodedSimpleType cotrimoxazoleDose;
	private String cotrimoxazoleAdherence;
	private String whyPoorFairCotrimoxazoleDrugAdherence;
	private CodedSimpleType inhDose;
	private String inhAdherence;
	private String whyPoorFairINHDrugAdherence;
	private Integer cd4;
	private LocalDate cd4TestDate;
	private String reasonForRegimenSwitchSubs;
	private Boolean prescribedRegimenInitialIndicator;
	private Boolean prescribedRegimenCurrentIndicator;
	private String typeOfPreviousExposureCode;
	private Boolean poorAdherenceIndicator;
	private String reasonForPoorAdherence;
	private String reasonRegimenEndedCode;
	private Boolean substitutionIndicator;
	private Boolean switchIndicator;
	private LocalDate nextAppointmentDate;
}
