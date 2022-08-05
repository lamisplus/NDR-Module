package org.lamisplus.modules.hiv.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.audit4j.core.util.Log;
import org.lamisplus.modules.base.controller.apierror.EntityNotFoundException;
import org.lamisplus.modules.hiv.domain.dto.HIVStatusTrackerDto;
import org.lamisplus.modules.hiv.domain.entity.HIVStatusTracker;
import org.lamisplus.modules.hiv.repositories.HIVStatusTrackerRepository;
import org.lamisplus.modules.patient.controller.exception.NoRecordFoundException;
import org.lamisplus.modules.patient.domain.dto.PersonResponseDto;
import org.lamisplus.modules.patient.domain.entity.Encounter;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.lamisplus.modules.patient.domain.entity.Visit;
import org.lamisplus.modules.patient.repository.EncounterRepository;
import org.lamisplus.modules.patient.repository.PersonRepository;
import org.lamisplus.modules.patient.repository.VisitRepository;
import org.lamisplus.modules.patient.service.PersonService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class HIVStatusTrackerService {

    private final HIVStatusTrackerRepository hivStatusTrackerRepository;


    private final CurrentUserOrganizationService organizationUtil;

    private final PersonRepository personRepository;

    private final EncounterRepository encounterRepository;

    private final VisitRepository visitRepository;

    private final PersonService personService;

    public HIVStatusTrackerDto registerHIVStatusTracker(HIVStatusTrackerDto hivStatusTrackerDto) {
        Long personId = hivStatusTrackerDto.getPersonId ();
        Person existPerson = getPerson (personId);
        log.info ("person   from status status {}", existPerson.getSurname ());
        Visit visit = processAndCreateVisit (personId);
        HIVStatusTracker hivStatusTracker = convertDtoToEntity (hivStatusTrackerDto);
        hivStatusTracker.setArchived (0);
        hivStatusTracker.setUuid (UUID.randomUUID ().toString ());
        hivStatusTracker.setAuto (false);
        hivStatusTracker.setVisit (visit);
        hivStatusTracker.setPerson (existPerson);
        return convertEntityToDto (hivStatusTrackerRepository.save (hivStatusTracker));
    }



    public HIVStatusTrackerDto updateHIVStatusTracker(Long id, HIVStatusTrackerDto hivStatusTrackerDto) {
        HIVStatusTracker existingHivStatusTracker = getExistingHivStatusTracker (id);
        HIVStatusTracker hivStatusTracker = convertDtoToEntity (hivStatusTrackerDto);
        hivStatusTracker.setId (id);
        hivStatusTracker.setArchived (0);
        hivStatusTracker.setUuid (existingHivStatusTracker.getUuid ());
        hivStatusTracker.setCreatedBy (existingHivStatusTracker.getCreatedBy ());
        hivStatusTracker.setCreatedDate (existingHivStatusTracker.getCreatedDate ());
        hivStatusTracker.setAuto (false);
        return convertEntityToDto (hivStatusTrackerRepository.save (hivStatusTracker));
    }


    public HIVStatusTrackerDto getHIVStatusTrackerById(Long id) {
        return convertEntityToDto (getExistingHivStatusTracker (id));
    }

    public String getPersonCurrentHIVStatusByPersonId(Long personId) {
        Person person = getPerson (personId);
        Comparator<HIVStatusTracker> personStatusDateComparator = Comparator.comparing (HIVStatusTracker::getStatusDate);
        Optional<HIVStatusTracker> currentStatus = hivStatusTrackerRepository.findAllByPersonAndArchived (person, 0)
                .stream ()
                .max (personStatusDateComparator);
        if (currentStatus.isPresent ())
            return currentStatus.get ().getHivStatus ();
        return "HIV+ NON ART";
    }

    public List<HIVStatusTrackerDto> getPersonHIVStatusByPersonId(Long personId) {
        Person person = getPerson (personId);
        return hivStatusTrackerRepository.findAllByPersonAndArchived (person, 0)
                .stream ()
                .map (this::convertEntityToDto)
                .collect (Collectors.toList ());


    }

    public List<HIVStatusTrackerDto> getAllHIVStatusTracker() {
        return hivStatusTrackerRepository.findAll ()
                .stream ()
                .map (this::convertEntityToDto)
                .collect (Collectors.toList ());
    }

    public void archivedHIVStatusTracker(Long id) {
        HIVStatusTracker existingHivStatusTracker = getExistingHivStatusTracker (id);
        existingHivStatusTracker.setArchived (1);
        hivStatusTrackerRepository.save (existingHivStatusTracker);
    }


    private HIVStatusTracker getExistingHivStatusTracker(Long id) {
        return hivStatusTrackerRepository.findById (id)
                .orElseThrow (() -> new NoRecordFoundException ("Status find for this id " + id));
    }

    public HIVStatusTracker convertDtoToEntity(HIVStatusTrackerDto hivStatusTrackerDto) {
        HIVStatusTracker hivStatusTracker = new HIVStatusTracker ();
        BeanUtils.copyProperties (hivStatusTrackerDto, hivStatusTracker);
        hivStatusTracker.setFacilityId (organizationUtil.getCurrentUserOrganization ());
        return hivStatusTracker;
    }

    public HIVStatusTrackerDto convertEntityToDto(HIVStatusTracker hivStatusTracker) {
        HIVStatusTrackerDto hivStatusTrackerDto = new HIVStatusTrackerDto ();
        BeanUtils.copyProperties (hivStatusTracker, hivStatusTrackerDto);
        return hivStatusTrackerDto;

    }


    public HIVStatusTracker findDistinctFirstByPersonAndStatusDate(Person person, LocalDate visitDate) {
        return hivStatusTrackerRepository.findDistinctFirstByPersonAndStatusDate (person, visitDate);
    }

    private Person getPerson(Long personId) {
        return personRepository.findById (personId).orElseThrow (() -> new EntityNotFoundException (Person.class, "id", String.valueOf (personId)));

    }

    public Visit processAndCreateVisit(Long personId) {
        Log.info ("person id in creating visit {}", personId);
        PersonResponseDto personDto = personService.getPersonById (personId);
        Optional<Person> personOptional = personRepository.findById (personId);
        if (personDto.getVisitId () != null) {
            Optional<Visit> visitOptional = visitRepository.findById (personDto.getVisitId ());
            if (visitOptional.isPresent ()) {
                List<Encounter> visitEncounters = encounterRepository.getEncounterByVisit (visitOptional.get ());
                List<String> serviceCodes = visitEncounters.stream ()
                        .map (Encounter::getServiceCode)
                        .collect (Collectors.toList ());
                if (!serviceCodes.contains ("hiv-code")) {
                    createHivVisitEncounter (personOptional, visitOptional.get ());
                }
                return visitOptional.get ();
            }
        } else {
            Visit visit = new Visit ();
            personOptional.ifPresent (visit::setPerson);
            visit.setFacilityId (organizationUtil.getCurrentUserOrganization ());
            visit.setVisitStartDate (LocalDateTime.now ());
            visit.setArchived (0);
            visit.setUuid (UUID.randomUUID ().toString ());
            Visit currentVisit = visitRepository.save (visit);
            createHivVisitEncounter (personOptional, visit);
            return currentVisit;
        }
        return null;
    }

    private void createHivVisitEncounter(Optional<Person> personOptional, Visit visit) {
        Log.info ("creating Encounter visit Id {}", visit.getId ());
        Encounter encounter = new Encounter ();
        encounter.setVisit (visit);
        encounter.setArchived (0);
        encounter.setPerson (visit.getPerson ());
        encounter.setUuid (UUID.randomUUID ().toString ());
        encounter.setEncounterDate (visit.getVisitStartDate ());
        encounter.setServiceCode ("hiv-code");
        personOptional.ifPresent (encounter::setPerson);
        encounter.setStatus ("PENDING");
        encounter.setFacilityId (organizationUtil.getCurrentUserOrganization ());
        encounterRepository.save (encounter);
    }

}
