package org.lamisplus.modules.hiv.domain.dto;


import org.hibernate.annotations.TypeDef;

import java.time.LocalDate;
import java.util.List;

/**
 * A Projection for the {@link org.lamisplus.modules.hiv.domain.entity.ArtPharmacy} entity
 */
@TypeDef(
		name = "RegimenIds",
		typeClass = List.class
)
public interface PharmacyReport {
	Long getFacilityId();
	LocalDate getNextAppointment();
	LocalDate getVisitDate();
	Integer getRefillPeriod();
	String getDsdModel();
	String getMmdType();
	String getUuid();
	String getRegimenId();
}