package org.lamisplus.modules.hiv.service.activity;

import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.lamisplus.modules.hiv.domain.dto.PatientActivity;
import org.lamisplus.modules.hiv.domain.entity.HIVEac;
import org.lamisplus.modules.hiv.repositories.HIVEacRepository;
import org.lamisplus.modules.hiv.service.PatientActivityProvider;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class EACActivityProvider implements PatientActivityProvider {
	
	private final HIVEacRepository hivEacRepository;
	
	
	@Override
	public List<PatientActivity> getActivitiesFor(Person person) {
		
		List<HIVEac> hivEacList = hivEacRepository.getAllByPersonAndArchived(person, 0);
		return hivEacList.stream()
				.map(this::buildPatientActivity).collect(Collectors.toList());
		
	}
	
	@NotNull
	private PatientActivity buildPatientActivity(HIVEac e) {
		String name = "eac";
		assert e.getId() != null;
		return new PatientActivity(e.getId(), name, e.getDateOfLastViralLoad(), "", "eac");
	}
}
