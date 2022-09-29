package org.lamisplus.modules.hiv.domain.dto;

import java.time.LocalDate;

public interface ViralLoadRadetDto {
	Long getIndicationId();
	LocalDate getResultDate();
	LocalDate getDateSampleCollected();
	Long getResult();
	
}
