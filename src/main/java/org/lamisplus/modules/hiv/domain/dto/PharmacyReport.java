package org.lamisplus.modules.hiv.domain.dto;

import java.time.LocalDate;


/**
 * A Projection for the {@link org.lamisplus.modules.hiv.domain.entity.ArtPharmacy} entity
 */

public interface PharmacyReport {
	Long getFacilityId();
	String getDatimId();
	String getFacilityName();
	Long getPatientId();
	
	String getHospitalNum();
	String getRegimenLine();
	String getMmdType();
	LocalDate getDateVisit();
	LocalDate getNextAppointment();
	String getDsdModel();
	String getRefillPeriod();
	String getRegimens();
	
}