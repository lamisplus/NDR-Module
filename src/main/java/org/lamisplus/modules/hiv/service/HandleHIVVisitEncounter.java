package org.lamisplus.modules.hiv.service;

import lombok.RequiredArgsConstructor;
import org.audit4j.core.util.Log;
import org.lamisplus.modules.patient.domain.dto.PersonResponseDto;
import org.lamisplus.modules.patient.domain.entity.Encounter;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.lamisplus.modules.patient.domain.entity.Visit;
import org.lamisplus.modules.patient.repository.EncounterRepository;
import org.lamisplus.modules.patient.repository.PersonRepository;
import org.lamisplus.modules.patient.repository.VisitRepository;
import org.lamisplus.modules.patient.service.PersonService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HandleHIVVisitEncounter {
	
	private final EncounterRepository encounterRepository;
	
	private final VisitRepository visitRepository;
	
	private final PersonService personService;
	
	private final PersonRepository personRepository;
	
	
	public Visit processAndCreateVisit(Long personId, LocalDate visitDate) {
		Log.info("person id in creating visit {}", personId);
		PersonResponseDto personDto = personService.getPersonById(personId);
		Log.info("person surname in creating visit {}", personDto.getSurname());
		Optional<Person> personOptional = personRepository.findById(personId);
		Log.info("person personOptional in creating visit {}", personOptional.isPresent());
		if (personDto.getVisitId() != null) {
			Optional<Visit> visitOptional = visitRepository.findById(personDto.getVisitId());
			if (visitOptional.isPresent()) {
				List<Encounter> visitEncounters = encounterRepository.getEncounterByVisit(visitOptional.get());
				List<String> serviceCodes = visitEncounters.stream()
						.map(Encounter::getServiceCode)
						.collect(Collectors.toList());
				if (!serviceCodes.contains("hiv-code")) {
					createHivVisitEncounter(personOptional, visitOptional.get());
				}
				return visitOptional.get();
			}
		} else {
			Log.info(" final creating visit {}", personOptional.isPresent());
			Visit visit = new Visit();
			personOptional.ifPresent(visit::setPerson);
			personOptional.ifPresent(person -> visit.setFacilityId(person.getFacilityId()));
			visit.setVisitStartDate(visitDate.atStartOfDay());
			visit.setArchived(0);
			visit.setUuid(UUID.randomUUID().toString());
			Log.info("about saving visit {}", personOptional.isPresent());
			try {
				Visit currentVisit = visitRepository.save(visit);
				Log.info("finished saving visit => id {}", currentVisit.getId() ) ;
				createHivVisitEncounter(personOptional, visit);
				Log.info("finished saving encounter", personOptional.isPresent());
				return currentVisit;
			}catch (Exception e) {
			    e.printStackTrace();
			}
		}
		return null;
	}
	
	private void createHivVisitEncounter(Optional<Person> personOptional, Visit visit) {
		Log.info("creating Encounter visit Id {}", visit.getId());
		Encounter encounter = new Encounter();
		encounter.setVisit(visit);
		encounter.setArchived(0);
		encounter.setPerson(visit.getPerson());
		encounter.setUuid(UUID.randomUUID().toString());
		encounter.setEncounterDate(visit.getVisitStartDate());
		encounter.setServiceCode("hiv-code");
		personOptional.ifPresent(encounter::setPerson);
		encounter.setStatus("PENDING");
		encounter.setFacilityId(visit.getFacilityId());
		encounterRepository.save(encounter);
	}
}
