package org.lamisplus.modules.hiv.service;

import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.lamisplus.modules.base.domain.entities.ApplicationCodeSet;
import org.lamisplus.modules.base.domain.repositories.ApplicationCodesetRepository;
import org.lamisplus.modules.hiv.domain.dto.ARTClinicalCommenceDto;
import org.lamisplus.modules.hiv.domain.dto.HIVStatusTrackerDto;
import org.lamisplus.modules.hiv.domain.dto.HivPatientDto;
import org.lamisplus.modules.hiv.domain.entity.ARTClinical;
import org.lamisplus.modules.hiv.domain.entity.HIVStatusTracker;
import org.lamisplus.modules.hiv.repositories.ARTClinicalRepository;
import org.lamisplus.modules.hiv.repositories.HivEnrollmentRepository;
import org.lamisplus.modules.patient.controller.exception.AlreadyExistException;
import org.lamisplus.modules.patient.controller.exception.NoRecordFoundException;
import org.lamisplus.modules.patient.domain.dto.PersonResponseDto;
import org.lamisplus.modules.patient.domain.dto.VitalSignDto;
import org.lamisplus.modules.patient.service.PersonService;
import org.lamisplus.modules.patient.service.VitalSignService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ArtCommenceService {

    private final ARTClinicalRepository artClinicalRepository;
    private final HivEnrollmentRepository hivEnrollmentRepository;

    private final HIVStatusTrackerService hivStatusTrackerService;

    private final HivEnrollmentService enrollmentService;

    private final PersonService personService;


    private final VitalSignService vitalSignService;

    private final ApplicationCodesetRepository applicationCodesetRepository;


    public HivPatientDto createArtCommence(ARTClinicalCommenceDto artClinicalCommenceDto) {
        Long hivEnrollmentId = artClinicalCommenceDto.getHivEnrollmentId ();
        Optional<ApplicationCodeSet> hivStatus = applicationCodesetRepository.findByDisplayAndCodesetGroup ("ART Start", "HIV_STATUS");
        StringBuilder stringBuilder = new StringBuilder ();
        hivEnrollmentRepository
                .findById (hivEnrollmentId)
                .orElseThrow (() -> new NoRecordFoundException ("No hiv enrollment found for id " + hivEnrollmentId));
        Long personId = artClinicalCommenceDto.getPersonId ();
        boolean artCommenceExist = artClinicalRepository
                .findByPersonIdAndIsCommencementIsTrue (personId).isPresent ();
        if (artCommenceExist)
            throw new AlreadyExistException ("Art Commencement already exist for this person " + personId);
        Long vitalSignId = vitalSignService.registerVitalSign (artClinicalCommenceDto.getVitalSignDto ()).getId ();
        ARTClinical artClinical = convertDtoToART (artClinicalCommenceDto, vitalSignId);
        artClinical.setUuid (UUID.randomUUID ().toString ());
        artClinical.setIsCommencement (true);
        if (hivStatus.isPresent ()) {
            artClinical.setArtStatusId (hivStatus.get ().getId ());
            stringBuilder.append (hivStatus.get ().getDisplay ());
        }
        artClinical.setArchived (0);
        ARTClinical saveArtClinical = artClinicalRepository.save (artClinical);
        processAndSaveHIVStatus (saveArtClinical.getVisitDate (), saveArtClinical.getPersonId (), stringBuilder.toString ());
        return convertArtCommenceToHivPatientDto (saveArtClinical);
    }


    public HivPatientDto updateArtCommence(Long id, ARTClinicalCommenceDto artClinicalCommenceDto) {
        ARTClinical existArtClinical = getExistArt (id);
        Long vitalSignId = vitalSignService
                .updateVitalSign (artClinicalCommenceDto.getVitalSignDto ().getId (), artClinicalCommenceDto.getVitalSignDto ()).getId ();
        ARTClinical artClinical = convertDtoToART (artClinicalCommenceDto, vitalSignId);
        artClinical.setId (existArtClinical.getId ());
        artClinical.setUuid (existArtClinical.getUuid ());
        artClinical.setCreatedBy (existArtClinical.getCreatedBy ());
        artClinical.setCreatedDate (existArtClinical.getCreatedDate ());
        return convertArtCommenceToHivPatientDto (artClinicalRepository.save (artClinical));
    }


    public void archivedArtCommenceClinical(Long id) {
        ARTClinical artClinical = getExistArt (id);
        HIVStatusTracker hivStatusTracker = hivStatusTrackerService
                .findDistinctFirstByPersonIdAndStatusDate (artClinical.getPersonId (), artClinical.getVisitDate ());
        artClinical.setArchived (1);
        hivStatusTracker.setArchived (1);
        artClinicalRepository.save (artClinical);
        if (hivStatusTracker != null) {
            hivStatusTrackerService.archivedHIVStatusTracker (hivStatusTracker.getId ());
        }
    }

    public HivPatientDto getArtById(Long id) {
        return convertArtCommenceToHivPatientDto (getExistArt (id));
    }

    public List<HivPatientDto> getAll() {
        return artClinicalRepository
                .findByArchivedAndIsCommencementIsTrue (0)
                .stream ()
                .map (this::convertArtCommenceToHivPatientDto)
                .collect (Collectors.toList ());
    }


    private ARTClinical getExistArt(Long id) {
        return artClinicalRepository
                .findById (id)
                .orElseThrow (() -> new NoRecordFoundException ("No ART found for this Id " + id));
    }

    private void processAndSaveHIVStatus(LocalDate visitDate, Long personId, String hivStatus) {
        HIVStatusTracker statusTracker = new HIVStatusTracker ();
        statusTracker.setHivStatus (hivStatus);
        statusTracker.setStatusDate (visitDate);
        statusTracker.setPersonId (personId);
        statusTracker.setUuid (UUID.randomUUID ().toString ());
        HIVStatusTrackerDto hivStatusTrackerDto = hivStatusTrackerService.convertEntityToDto (statusTracker);
        hivStatusTrackerService.registerHIVStatusTracker (hivStatusTrackerDto);
    }


    @NotNull
    public ARTClinicalCommenceDto convertArtToResponseDto(ARTClinical artClinical) {
        VitalSignDto vitalSignDto = vitalSignService.getVitalSignById (artClinical.getVitalSignId ());
        ARTClinicalCommenceDto artClinicalCommenceDto = new ARTClinicalCommenceDto ();
        BeanUtils.copyProperties (artClinical, artClinicalCommenceDto);
        artClinicalCommenceDto.setVitalSignDto (vitalSignDto);
        return artClinicalCommenceDto;
    }


    @NotNull
    public ARTClinical convertDtoToART(ARTClinicalCommenceDto artClinicalCommenceDto, Long vitalSignId) {
        ARTClinical artClinical = new ARTClinical ();
        BeanUtils.copyProperties (artClinicalCommenceDto, artClinical);
        artClinical.setVitalSignId (vitalSignId);
        return artClinical;
    }

    private HivPatientDto convertArtCommenceToHivPatientDto(ARTClinical entity) {
        Long personId = entity.getPersonId ();
        PersonResponseDto bioData = personService.getPersonById (personId);
        ARTClinicalCommenceDto artClinicalCommenceDto = convertArtToResponseDto (entity);
        HivPatientDto hivEnrollmentBy = enrollmentService.getHivEnrollmentById (entity.getHivEnrollmentId ());
        HivPatientDto hivPatientDto = new HivPatientDto ();
        hivPatientDto.setArtCommence (artClinicalCommenceDto);
        hivPatientDto.setBioData (bioData);
        hivPatientDto.setEnrolled (true);
        hivPatientDto.setCommenced (true);
        hivPatientDto.setCurrentStatus (hivStatusTrackerService.getPersonCurrentHIVStatusByPersonId (entity.getPersonId ()));
        hivPatientDto.setEnrollment (hivEnrollmentBy.getEnrollment ());
        return hivPatientDto;
    }

}
