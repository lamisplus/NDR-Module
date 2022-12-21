package org.lamisplus.modules.hiv.domain.dto;

import java.time.LocalDate;

/**
 * A Projection for the {@link org.lamisplus.modules.hiv.domain.entity.HivEnrollment} entity
 */
public interface EnrollmentStatus {
	Long getStatusAtRegistrationId();
	String getHivEnrollmentStatus();
	LocalDate getEnrollmentDate();
}