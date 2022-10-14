package org.lamisplus.modules.hiv.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor

public class EACPharmacyDisplayDto {
	private Double viralLoad;
	private String eACSession;
	private LocalDate eACSessionDate;
}
