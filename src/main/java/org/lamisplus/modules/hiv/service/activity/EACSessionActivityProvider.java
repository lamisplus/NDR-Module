package org.lamisplus.modules.hiv.service.activity;

import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.lamisplus.modules.hiv.domain.dto.PatientActivity;
import org.lamisplus.modules.hiv.domain.entity.HIVEacSession;
import org.lamisplus.modules.hiv.repositories.HIVEacSessionRepository;
import org.lamisplus.modules.hiv.service.PatientActivityProvider;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Component
public class EACSessionActivityProvider implements PatientActivityProvider {
	
	private final HIVEacSessionRepository hiveacSessionRepository;
	
	@Override
	public List<PatientActivity> getActivitiesFor(Person person) {
		List<HIVEacSession> eacSessionList = hiveacSessionRepository.getHIVEacSessionByPersonAndArchived(person, 0);
		return eacSessionList.stream().map(this::buildPatientActivity).collect(Collectors.toList());
	}
	
	
	@NotNull
	private PatientActivity buildPatientActivity(HIVEacSession session) {
		String name = "eac session";
		assert session.getId() != null;
		return new PatientActivity(session.getId(), name, session.getFollowUpDate(), "", "eac-session");
	}
}
