package org.lamisplus.modules.ndr.domain.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NDRErrorDTO {
	private  String patientUuid ;
	private  String hospitalNumber ;
	private  String  errorMessage ;
}
