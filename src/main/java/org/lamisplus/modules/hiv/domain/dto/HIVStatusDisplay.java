package org.lamisplus.modules.hiv.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class HIVStatusDisplay {
	private LocalDate date;
	private String description;
	private LocalDate quarterEndDate;
}
