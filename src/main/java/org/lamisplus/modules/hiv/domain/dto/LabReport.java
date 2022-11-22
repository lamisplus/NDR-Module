package org.lamisplus.modules.hiv.domain.dto;

import java.time.LocalDateTime;

public interface LabReport {
	Long getFacilityId();
	String getFacility();
	String getDatimId();
	String getPatientId();
	String getHospitalNum();
	String getTest();
	String getResult();
	LocalDateTime getSampleCollectionDate();
	LocalDateTime getDateReported();
}
