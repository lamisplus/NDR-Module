package org.lamisplus.modules.hiv.domain.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public interface ViralLoadRadetDto {
	Long getIndicationId();
	Long getPersonId();
	LocalDateTime getResultDate();
	LocalDateTime getDateSampleCollected();
	Long getResult();
	
}
