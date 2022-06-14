package org.lamisplus.modules.hiv.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.hiv.domain.dto.HIVStatusTrackerDto;
import org.lamisplus.modules.hiv.domain.entity.HIVStatusTracker;
import org.lamisplus.modules.hiv.repositories.HIVStatusTrackerRepository;
import org.lamisplus.modules.patient.controller.exception.NoRecordFoundException;
import org.lamisplus.modules.patient.domain.dto.PersonResponseDto;
import org.lamisplus.modules.patient.service.PersonService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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
    private final PersonService personService;

    private final CurrentUserOrganizationService organizationUtil;

    public HIVStatusTrackerDto registerHIVStatusTracker(HIVStatusTrackerDto hivStatusTrackerDto) {
        PersonResponseDto existPerson = personService.getPersonById (hivStatusTrackerDto.getPersonId ());
        log.info ("person   from status status {}", existPerson.getSurname ());
        HIVStatusTracker hivStatusTracker = convertDtoToEntity (hivStatusTrackerDto);
        hivStatusTracker.setArchived (0);
        hivStatusTracker.setUuid (UUID.randomUUID ().toString ());
        hivStatusTracker.setAuto (false);
        return convertEntityToDto (hivStatusTrackerRepository.save (hivStatusTracker));
    }

    public HIVStatusTrackerDto updateHIVStatusTracker(Long id, HIVStatusTrackerDto hivStatusTrackerDto) {
        HIVStatusTracker existingHivStatusTracker = getExistingHivStatusTracker (id);
        PersonResponseDto existPerson = personService.getPersonById (hivStatusTrackerDto.getPersonId ());
        log.info ("person  updating from status status {}", existPerson.getSurname ());
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
        Comparator<HIVStatusTracker> personStatusDateComparator = Comparator.comparing (HIVStatusTracker::getStatusDate);
        Optional<HIVStatusTracker> currentStatus = hivStatusTrackerRepository.findAllByPersonIdAndArchived (personId, 0)
                .stream ()
                .max (personStatusDateComparator);
        if (currentStatus.isPresent ())
            return currentStatus.get ().getHivStatus ();
        return "HIV+ NON ART";
    }

    public List<HIVStatusTrackerDto> getPersonHIVStatusByPersonId(Long personId) {
        return hivStatusTrackerRepository.findAllByPersonIdAndArchived (personId, 0)
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


    public HIVStatusTracker findDistinctFirstByPersonIdAndStatusDate(Long personId, LocalDate visitDate) {
        return hivStatusTrackerRepository.findDistinctFirstByPersonIdAndStatusDate (personId, visitDate);
    }
}
