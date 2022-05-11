package org.lamisplus.modules.hiv.service;

import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.lamisplus.modules.hiv.domain.dto.ARTDto;
import org.lamisplus.modules.hiv.domain.entity.ART;
import org.lamisplus.modules.hiv.repositories.ARTRepository;
import org.lamisplus.modules.hiv.repositories.HivEnrollmentRepository;
import org.lamisplus.modules.patient.controller.exception.NoRecordFoundException;
import org.lamisplus.modules.patient.domain.dto.VitalSignDto;
import org.lamisplus.modules.patient.service.VitalSignService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ArtService {

    private final ARTRepository artRepository;
    private final HivEnrollmentRepository hivEnrollmentRepository;

    private final VitalSignService vitalSignService;


    public ARTDto createArtCommence(ARTDto artDto) {
        Long hivEnrollmentId = artDto.getHivEnrollmentId ();
        hivEnrollmentRepository
                .findById (hivEnrollmentId)
                .orElseThrow (() -> new NoRecordFoundException ("no hiv enrollment found for id " + hivEnrollmentId));
        Long vitalSignId = vitalSignService.registerVitalSign (artDto.getVitalSignDto ()).getId ();
        ART art = convertDtoToART (artDto, vitalSignId);
        art.setUuid (UUID.randomUUID ().toString ());
        return convertArtToResponseDto (artRepository.save (art));
    }


    public ARTDto updateArtCommence(Long id, ARTDto artDto) {
        ART existArt = getExistArt (id);
        Long vitalSignId = vitalSignService
                .updateVitalSign (artDto.getVitalSignDto ().getId (), artDto.getVitalSignDto ()).getId ();
        ART art = convertDtoToART (artDto, vitalSignId);
        art.setId (existArt.getId ());
        return convertArtToResponseDto (artRepository.save (art));
    }


    public void archivedArt(Long id) {
        ART art = getExistArt (id);
        art.setArchived (1);
        artRepository.save (art);
    }

    public ARTDto getArtById(Long id) {
        return convertArtToResponseDto (getExistArt (id));
    }

    public List<ARTDto> getAll() {
        return artRepository
                .findByArchived (0)
                .stream ()
                .map (this::convertArtToResponseDto)
                .collect (Collectors.toList ());
    }


    private ART getExistArt(Long id) {
        return artRepository
                .findById (id)
                .orElseThrow (() -> new NoRecordFoundException ("No ART found for this Id " + id));
    }


    @NotNull
    private ARTDto convertArtToResponseDto(ART art) {
        VitalSignDto vitalSignDto = vitalSignService.getVitalSignById (art.getId ());
        return ARTDto
                .builder ()
                .id (art.getId ())
                .artDate (art.getArtDate ())
                .whoStagingId (art.getWhoStagingId ())
                .cd4 (art.getCd4 ())
                .cd4Percentage (art.getCd4Percentage ())
                .functionalStatusId (art.getFunctionalStatusId ())
                .clinicalNote (art.getClinicalNote ())
                .hivEnrollmentId (art.getHivEnrollmentId ())
                .vitalSignDto (vitalSignDto)
                .regimenId (art.getRegimenId ())
                .regimenTypeId (art.getRegimenId ())
                .isCommencement (art.getIsCommencement ())
                .clinicalStageId (art.getClinicalStageId ())
                .facilityId (art.getFacilityId ())
                .build ();
    }


    @NotNull
    private ART convertDtoToART(ARTDto artDto, Long vitalSignId) {
        ART art = new ART ();
        art.setArchived (0);
        art.setIsCommencement (true);
        art.setArtStatus (artDto.getArtStatusId ());
        art.setHivEnrollmentId (artDto.getHivEnrollmentId ());
        art.setArtDate (artDto.getArtDate ());
        art.setFunctionalStatusId (artDto.getFunctionalStatusId ());
        art.setRegimenId (artDto.getRegimenId ());
        art.setRegimenTypeId (artDto.getRegimenTypeId ());
        art.setClinicalNote (artDto.getClinicalNote ());
        art.setCd4 (artDto.getCd4 ());
        art.setCd4Percentage (artDto.getCd4Percentage ());
        art.setWhoStagingId (artDto.getWhoStagingId ());
        art.setClinicalStageId (artDto.getClinicalStageId ());
        art.setFacilityId (artDto.getFacilityId ());
        art.setVitalSignId (vitalSignId);
        return art;
    }


}
