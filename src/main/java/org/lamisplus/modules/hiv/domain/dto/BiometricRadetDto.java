package org.lamisplus.modules.hiv.domain.dto;

import java.time.LocalDate;

public interface BiometricRadetDto {
String getType();
byte[] getTemplate();
LocalDate getDateCaptured();
}
