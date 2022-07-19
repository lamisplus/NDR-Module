package org.lamisplus.modules.hiv.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.base.controller.apierror.EntityNotFoundException;
import org.lamisplus.modules.hiv.domain.dto.ObservationDto;
import org.lamisplus.modules.hiv.domain.entity.Observation;
import org.lamisplus.modules.hiv.repositories.ObservationRepository;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.lamisplus.modules.patient.domain.entity.Visit;
import org.lamisplus.modules.patient.repository.PersonRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ObservationService {

    private final ObservationRepository observationRepository;
    private final PersonRepository personRepository;

    private final CurrentUserOrganizationService currentUserOrganizationService;

    private final ArtCommenceService artCommenceService;

    public ObservationDto createAnObservation(ObservationDto observationDto) {
        Long personId = observationDto.getPersonId ();
        Person person = getPerson (personId);
        Long orgId = currentUserOrganizationService.getCurrentUserOrganization ();
        observationDto.setFacilityId (orgId);
        Visit visit = artCommenceService.processAndCreateVisit (personId);
        if (visit != null) {
            observationDto.setVisitId (visit.getId ());
        }
        Observation observation = new Observation ();
        BeanUtils.copyProperties (observationDto, observation);
        observation.setPerson (person);
        observation.setUuid (UUID.randomUUID ().toString ());
        Observation saveObservation = observationRepository.save (observation);
        observationDto.setId (saveObservation.getId ());
        return observationDto;
    }


    public ObservationDto updateObservation(Long id, ObservationDto observationDto) {
        Observation existingObservation = observationRepository.findById (id)
                .orElseThrow (() -> new EntityNotFoundException (Observation.class, "id", String.valueOf (id)));
        existingObservation.setType (observationDto.getType ());
        existingObservation.setDateOfObservation (observationDto.getDateOfObservation ());
        existingObservation.setData (observationDto.getData ());
        Observation saveObservation = observationRepository.save (existingObservation);
        observationDto.setId (saveObservation.getId ());
        observationDto.setFacilityId (saveObservation.getFacilityId ());
        return observationDto;
    }

    public List<ObservationDto> getAllObservationByPerson(Long personId) {
        Person person = getPerson (personId);
        Long currentUserOrganization = currentUserOrganizationService.getCurrentUserOrganization ();
        List<Observation> observations = observationRepository.getAllByAndPersonAndFacilityId (person, currentUserOrganization);
        return observations.stream ().map (this::convertObservationToDto).collect (Collectors.toList ());


    }

    private ObservationDto convertObservationToDto(Observation observation) {
        return ObservationDto
                .builder ()
                .dateOfObservation (observation.getDateOfObservation ())
                .data (observation.getData ())
                .personId (observation.getPerson ().getId ())
                .facilityId (observation.getFacilityId ())
                .type (observation.getType ())
                .visitId (observation.getVisitId ())
                .id (observation.getId ())
                .build ();
    }

    private Person getPerson(Long personId) {
        return personRepository.findById (personId)
                .orElseThrow (() -> new EntityNotFoundException (Person.class, "id", String.valueOf (personId)));

    }
}
