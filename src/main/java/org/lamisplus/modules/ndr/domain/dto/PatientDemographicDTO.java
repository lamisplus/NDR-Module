package org.lamisplus.modules.ndr.domain.dto;

import java.time.LocalDate;


public interface PatientDemographicDTO {
	String getPersonUuid();
	String getPatientIdentifer();
	LocalDate getDiagnosisDate();
	String getHospitalNumber();
	Integer getAge();
	String getPatientSexCode();
	LocalDate getPatientDateOfBirth();
	String getFacilityTypeCode();
	String getFacilityName();
	String getLga();
	String getState();
	String getFacilityId();
	LocalDate getArtStartDate();
	String getFirstARTRegimenCodeDescTxt();
	String getFirstARTRegimenCode();
	String getLgaCode();
	String getStateCode();
	String getCountryCode();
	String getPatientOccupationCode();
	String getPatientMaritalStatusCode();
	String getStateOfNigeriaOriginCode();
	String getPatientEducationLevelCode();
	String getFunctionalStatusStartART();
	LocalDate getEnrolledInHIVCareDate();
}    
