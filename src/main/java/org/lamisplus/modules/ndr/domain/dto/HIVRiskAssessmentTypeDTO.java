package org.lamisplus.modules.ndr.domain.dto;

public interface HIVRiskAssessmentTypeDTO {
	 boolean getEverHadSexualIntercourse();
	 boolean getBloodTransfussionInLast3Months();
	 boolean getUnprotectedSexWithCasualPartnerinLast3Months();
	 boolean getUnprotectedSexWithRegularPartnerInLast3Months();
	 boolean getMoreThan1SexPartnerDuringLast3Months();
	 boolean getStiInLast3Months();
}
