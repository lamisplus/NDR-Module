package org.lamisplus.modules.hiv.domain.dto;
import java.time.LocalDate;

public interface BiometricReport {
	Integer getAge();
	Long  getId();
	Long  getFinger();
	LocalDate getDob();
	LocalDate getEnrollment();
	String getName();
	String getSex();
	String getHospitalNumber();
	String getAddress();
	
}
