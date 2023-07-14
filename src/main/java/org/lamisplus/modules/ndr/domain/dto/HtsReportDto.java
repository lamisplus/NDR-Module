package org.lamisplus.modules.ndr.domain.dto;

import java.time.LocalDate;

public interface HtsReportDto extends SyndromicSTIScreeningTypeDto, KnowledgeAssessmentTypeDto,
        HIVRiskAssessmentTypeDTO,ClinicalTBScreeningTypeDto, TestResultTypeDTO,PostTestCounsellingTypeDto{
    String getClientCode();
    String getVisitId();
    String getSetting();
    String getFirstTimeVisit();
    LocalDate getVisitDate();
}
