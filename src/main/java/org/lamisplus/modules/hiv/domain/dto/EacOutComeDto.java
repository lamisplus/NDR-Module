package org.lamisplus.modules.hiv.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A DTO for the {@link org.lamisplus.modules.hiv.domain.entity.EacOutCome} entity
 */
@Data
@Builder
@AllArgsConstructor
public class EacOutComeDto implements Serializable {
	private final Long id;
	private final Long eacId;
	private final Long personId;
	private final Long visitId;
	private final Double repeatViralLoader;
	private final String outcome;
	private final String plan;
	private final String currentRegimen;
	private final String switchRegimen;
	private final String reasonSwitched;
	private final String reasonSubstituted;
	private final String substituteRegimen;
	private final LocalDate dateSubstituted;
	private final LocalDate dateSwitched;
	private final  LocalDate outComeDate;
}