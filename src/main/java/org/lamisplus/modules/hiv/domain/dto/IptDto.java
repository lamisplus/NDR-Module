package org.lamisplus.modules.hiv.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Setter;

@Data
@AllArgsConstructor
@Builder
@Setter
public class IptDto {
	private String type;
    private String dateCompleted;
	private String  drugName;
}
