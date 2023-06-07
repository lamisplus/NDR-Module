package org.lamisplus.modules.ndr.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegimenDTO implements Serializable {
	String  visitID;
	String  visitDate;
	String  DateRegimenStarted;
	String   prescribedRegimenCode;
	String   PrescribedRegimenDuration;
	String  PrescribedRegimenTypeCode;
	String  prescribedRegimenCodeDescTxt;
}
