package org.lamisplus.modules.hiv.service;

import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.lamisplus.modules.hiv.domain.dto.ARTClinicalCommenceDto;
import org.lamisplus.modules.hiv.domain.entity.ARTClinical;
import org.lamisplus.modules.hiv.domain.entity.HIVStatusTracker;
import org.lamisplus.modules.hiv.repositories.ARTClinicalRepository;
import org.lamisplus.modules.hiv.repositories.HIVStatusTrackerRepository;
import org.lamisplus.modules.hiv.repositories.HivEnrollmentRepository;
import org.lamisplus.modules.patient.controller.exception.AlreadyExistException;
import org.lamisplus.modules.patient.controller.exception.NoRecordFoundException;
import org.lamisplus.modules.patient.domain.dto.VitalSignDto;
import org.lamisplus.modules.patient.service.VitalSignService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ArtCommenceService {

    private final ARTClinicalRepository artClinicalRepository;
    private final HivEnrollmentRepository hivEnrollmentRepository;

    private final HIVStatusTrackerRepository hivStatusTrackerRepository;


    private final VitalSignService vitalSignService;


    public ARTClinicalCommenceDto createArtCommence(ARTClinicalCommenceDto artClinicalCommenceDto) {
        Long hivEnrollmentId = artClinicalCommenceDto.getHivEnrollmentId ();
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
        artClinical.setArchived (0);
        ARTClinical saveArtClinical = artClinicalRepository.save (artClinical);
        processAndSaveHIVStatus (saveArtClinical.getVisitDate (), saveArtClinical.getPersonId ());
        return convertArtToResponseDto (saveArtClinical);
    }


    public ARTClinicalCommenceDto updateArtCommence(Long id, ARTClinicalCommenceDto artClinicalCommenceDto) {
        ARTClinical existArtClinical = getExistArt (id);
        Long vitalSignId = vitalSignService
                .updateVitalSign (artClinicalCommenceDto.getVitalSignDto ().getId (), artClinicalCommenceDto.getVitalSignDto ()).getId ();
        ARTClinical artClinical = convertDtoToART (artClinicalCommenceDto, vitalSignId);
        artClinical.setId (existArtClinical.getId ());
        artClinical.setUuid (existArtClinical.getUuid ());
        artClinical.setCreatedBy (existArtClinical.getCreatedBy ());
        artClinical.setCreatedDate (existArtClinical.getCreatedDate ());
        return convertArtToResponseDto (artClinicalRepository.save (artClinical));
    }


    public void archivedArtCommenceClinical(Long id) {
        ARTClinical artClinical = getExistArt (id);
        HIVStatusTracker hivStatusTracker = hivStatusTrackerRepository
                .findDistinctFirstByPersonIdAndStatusDate (artClinical.getPersonId (), artClinical.getVisitDate ());
        artClinical.setArchived (1);
        hivStatusTracker.setArchived (1);
        artClinicalRepository.save (artClinical);
        hivStatusTrackerRepository.save (hivStatusTracker);
    }

    public ARTClinicalCommenceDto getArtById(Long id) {
        return convertArtToResponseDto (getExistArt (id));
    }

    public List<ARTClinicalCommenceDto> getAll() {
        return artClinicalRepository
                .findByArchivedAndIsCommencementIsTrue (0)
                .stream ()
                .map (this::convertArtToResponseDto)
                .collect (Collectors.toList ());
    }


    private ARTClinical getExistArt(Long id) {
        return artClinicalRepository
                .findById (id)
                .orElseThrow (() -> new NoRecordFoundException ("No ART found for this Id " + id));
    }

    private void processAndSaveHIVStatus(LocalDate visitDate, Long personId) {
        HIVStatusTracker statusTracker = new HIVStatusTracker ();
        statusTracker.setHivStatus ("ART");
        statusTracker.setStatusDate (visitDate);
        statusTracker.setPersonId (personId);
        statusTracker.setUuid (UUID.randomUUID ().toString ());
        hivStatusTrackerRepository.save (statusTracker);
    }


    @NotNull
    private ARTClinicalCommenceDto convertArtToResponseDto(ARTClinical artClinical) {
        VitalSignDto vitalSignDto = vitalSignService.getVitalSignById (artClinical.getVitalSignId ());
        ARTClinicalCommenceDto artClinicalCommenceDto = new ARTClinicalCommenceDto ();
        BeanUtils.copyProperties (artClinical, artClinicalCommenceDto);
        artClinicalCommenceDto.setVitalSignDto (vitalSignDto);
        return artClinicalCommenceDto;
    }


    @NotNull
    private ARTClinical convertDtoToART(ARTClinicalCommenceDto artClinicalCommenceDto, Long vitalSignId) {
        ARTClinical artClinical = new ARTClinical ();
        BeanUtils.copyProperties (artClinicalCommenceDto, artClinical);
        artClinical.setVitalSignId (vitalSignId);
        return artClinical;
    }


}
