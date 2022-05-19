package org.lamisplus.modules.hiv.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.lamisplus.modules.hiv.domain.dto.ARTClinicVisitDto;
import org.lamisplus.modules.hiv.domain.entity.ARTClinical;
import org.lamisplus.modules.hiv.domain.entity.HivEnrollment;
import org.lamisplus.modules.hiv.repositories.ARTClinicalRepository;
import org.lamisplus.modules.hiv.repositories.HivEnrollmentRepository;
import org.lamisplus.modules.patient.controller.exception.NoRecordFoundException;
import org.lamisplus.modules.patient.domain.dto.VitalSignDto;
import org.lamisplus.modules.patient.service.VitalSignService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Slf4j
@Service
public class ArtClinicVisitService {

    private final HivEnrollmentRepository hivEnrollmentRepository;
    private final ARTClinicalRepository artClinicalRepository;

    private final VitalSignService vitalSignService;


    public ARTClinicVisitDto createArtClinicVisit(ARTClinicVisitDto artClinicVisitDto) {
        Long hivEnrollmentId = artClinicVisitDto.getHivEnrollmentId ();
        HivEnrollment hivEnrollment = hivEnrollmentRepository
                .findById (hivEnrollmentId)
                .orElseThrow (() -> new NoRecordFoundException ("no hiv enrollment found for id " + hivEnrollmentId));
        if (hivEnrollment.getPersonId () != artClinicVisitDto.getPersonId ())
            throw new NoRecordFoundException ("no person is  found for id " + artClinicVisitDto.getPersonId ());
        Long vitalSignId = vitalSignService.registerVitalSign (artClinicVisitDto.getVitalSignDto ()).getId ();
        ARTClinical artClinical = convertDtoToART (artClinicVisitDto, vitalSignId);
        artClinical.setUuid (UUID.randomUUID ().toString ());
        artClinical.setArchived (0);
        artClinical.setIsCommencement (false);
        return convertToClinicVisitDto (artClinicalRepository.save (artClinical));
    }


    public ARTClinicVisitDto updateClinicVisit(Long id, ARTClinicVisitDto artClinicVisitDto) {
        ARTClinical existArtClinical = getExistClinicVisit (id);
        VitalSignDto vitalSignDto = artClinicVisitDto.getVitalSignDto ();
        vitalSignService.updateVitalSign (existArtClinical.getVitalSignId (), vitalSignDto);
        ARTClinical artClinical = convertDtoToART (artClinicVisitDto, existArtClinical.getVitalSignId ());
       artClinical.setId (existArtClinical.getId ());
       artClinical.setCreatedDate (existArtClinical.getCreatedDate ());
       artClinical.setCreatedBy (existArtClinical.getCreatedBy ());
       artClinical.setUuid (existArtClinical.getUuid ());
        return convertToClinicVisitDto (artClinicalRepository.save (artClinical));
    }


    public void archivedClinicVisit(Long id) {
        ARTClinical artClinical = getExistClinicVisit (id);
        artClinical.setArchived (1);
        artClinicalRepository.save (artClinical);
    }

    public ARTClinicVisitDto getArtClinicVisitById(Long id) {
        return convertToClinicVisitDto (getExistClinicVisit (id));
    }

    public List<ARTClinicVisitDto> getAllArtClinicVisit() {
        return artClinicalRepository
                .findByArchivedAndIsCommencementIsFalse (0)
                .stream ()
                .map (this::convertToClinicVisitDto)
                .collect (Collectors.toList ());
    }


    private ARTClinical getExistClinicVisit(Long id) {
        return artClinicalRepository
                .findById (id)
                .orElseThrow (() -> new NoRecordFoundException ("No clinic visit found for this Id " + id));
    }


    @NotNull
    public ARTClinicVisitDto convertToClinicVisitDto(ARTClinical artClinical) {
        VitalSignDto vitalSignDto = vitalSignService.getVitalSignById (artClinical.getVitalSignId ());
        ARTClinicVisitDto artClinicVisitDto = new ARTClinicVisitDto ();
        BeanUtils.copyProperties (artClinical, artClinicVisitDto);
        artClinicVisitDto.setVitalSignDto (vitalSignDto);
        log.info ("converted artClinicVisitDto {}", artClinicVisitDto);
        return artClinicVisitDto;

    }


    @NotNull
    public ARTClinical convertDtoToART(ARTClinicVisitDto artClinicVisitDto, Long vitalSignId) {
        ARTClinical artClinical = new ARTClinical ();
        log.info ("converted Dto 1 {}", artClinicVisitDto);
        BeanUtils.copyProperties (artClinicVisitDto, artClinical);
        artClinical.setVitalSignId (vitalSignId);
        log.info ("converted entity 1 {}", artClinical);
        return artClinical;
    }


}
