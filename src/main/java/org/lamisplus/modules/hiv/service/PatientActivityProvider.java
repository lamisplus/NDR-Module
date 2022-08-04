package org.lamisplus.modules.hiv.service;

import org.lamisplus.modules.hiv.domain.dto.PatientActivity;
import org.lamisplus.modules.patient.domain.entity.Person;

import java.util.List;


public interface PatientActivityProvider {
    List<PatientActivity> getActivitiesFor(Person person);
}
