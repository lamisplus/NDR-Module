package org.lamisplus.modules.hiv.service.activity;

import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.lamisplus.modules.hiv.domain.dto.PatientActivity;
import org.lamisplus.modules.hiv.domain.entity.PatientTracker;
import org.lamisplus.modules.hiv.repositories.PatientTrackerRepository;
import org.lamisplus.modules.hiv.service.PatientActivityProvider;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class PatientTrackerActivityProvider implements PatientActivityProvider {
	
	private final PatientTrackerRepository patientTrackerRepository;
	
	
	@Override
	public List<PatientActivity> getActivitiesFor(Person person) {
		return patientTrackerRepository.getPatientTrackerByPersonAndArchived(person, 0)
				.stream().map(this::buildPatientActivity).collect(Collectors.toList());
	}
	
	@NotNull
	private PatientActivity buildPatientActivity(PatientTracker patientTracker) {
		String name = "Client Tracker";
		assert patientTracker.getId() != null;
		return new PatientActivity(patientTracker.getId(), name, patientTracker.getDateLastAppointment(), "", "client-tracker");
	}
}
