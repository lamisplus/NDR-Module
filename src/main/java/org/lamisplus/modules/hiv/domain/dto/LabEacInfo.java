package org.lamisplus.modules.hiv.domain.dto;
import java.time.LocalDateTime;

public interface LabEacInfo {
  Long getPatientId();
  Long getTestResultId();
  String getTestGroup();
  String getTestName();
  String getLabNumber();
  LocalDateTime getResultDate();
  Long getResult();
  
}

