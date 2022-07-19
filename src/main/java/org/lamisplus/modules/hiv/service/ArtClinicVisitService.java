package org.lamisplus.modules.hiv.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.lamisplus.modules.base.controller.apierror.EntityNotFoundException;
import org.lamisplus.modules.hiv.domain.dto.ARTClinicVisitDto;
import org.lamisplus.modules.hiv.domain.entity.ARTClinical;
import org.lamisplus.modules.hiv.domain.entity.HivEnrollment;
import org.lamisplus.modules.hiv.repositories.ARTClinicalRepository;
import org.lamisplus.modules.hiv.repositories.HivEnrollmentRepository;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.lamisplus.modules.patient.domain.entity.Visit;
import org.lamisplus.modules.triage.domain.dto.VitalSignDto;
import org.lamisplus.modules.triage.domain.entity.VitalSign;
import org.lamisplus.modules.triage.repository.VitalSignRepository;
import org.lamisplus.modules.triage.service.VitalSignService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Slf4j
@Service
public class ArtClinicVisitService {

    private final HivEnrollmentRepository hivEnrollmentRepository;
    private final ARTClinicalRepository artClinicalRepository;

    private final VitalSignService vitalSignService;

    private final CurrentUserOrganizationService organizationUtil;

    private final ArtCommenceService artCommenceService;

    private  final VitalSignRepository vitalSignRepository;



    public ARTClinicVisitDto createArtClinicVisit(ARTClinicVisitDto artClinicVisitDto) {
        Long hivEnrollmentId = artClinicVisitDto.getHivEnrollmentId ();
        HivEnrollment hivEnrollment = hivEnrollmentRepository
                .findById (hivEnrollmentId)
                .orElseThrow (() -> new EntityNotFoundException (HivEnrollment.class, "id", ""+ hivEnrollmentId));
        Long personId = artClinicVisitDto.getPersonId ();
        if (! Objects.equals (hivEnrollment.getPerson ().getId (), personId))
            throw new EntityNotFoundException (Person.class, "personId", "" + personId);
        Visit visit = artCommenceService.processAndCreateVisit (personId);
        if(visit != null){
            artClinicVisitDto.setVisitId (visit.getId ());
            artClinicVisitDto.getVitalSignDto ().setVisitId (visit.getId ());
        }
        Long vitalSignId = vitalSignService.registerVitalSign (artClinicVisitDto.getVitalSignDto ()).getId ();
        ARTClinical artClinical = convertDtoToART (artClinicVisitDto, vitalSignId);
        artClinical.setUuid (UUID.randomUUID ().toString ());
        artClinical.setArchived (0);
        artClinical.setHivEnrollment (hivEnrollment);
        artClinical.setPerson (hivEnrollment.getPerson ());
        artClinical.setIsCommencement (false);
        return convertToClinicVisitDto (artClinicalRepository.save (artClinical));
    }




    public ARTClinicVisitDto updateClinicVisit(Long id, ARTClinicVisitDto artClinicVisitDto) {
        ARTClinical existArtClinical = getExistClinicVisit (id);
        VitalSignDto vitalSignDto = artClinicVisitDto.getVitalSignDto ();
        vitalSignService.updateVitalSign (existArtClinical.getVitalSign ().getId (), vitalSignDto);
        ARTClinical artClinical = convertDtoToART (artClinicVisitDto, existArtClinical.getVitalSign ().getId ());
       artClinical.setId (existArtClinical.getId ());
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
                .orElseThrow (() -> new EntityNotFoundException (ARTClinical.class, "id", "" + id));
    }


    @NotNull
    public ARTClinicVisitDto convertToClinicVisitDto(ARTClinical artClinical) {
        VitalSignDto vitalSignDto = vitalSignService.getVitalSignById (artClinical.getVitalSign ().getId ());
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
        VitalSign vitalSign = getVitalSign (vitalSignId);
        artClinical.setVitalSign (vitalSign);
        artClinical.setFacilityId (organizationUtil.getCurrentUserOrganization ());
        log.info ("converted entity 1 {}", artClinical);
        return artClinical;
    }




    private VitalSign getVitalSign(Long vitalSignId){
       return vitalSignRepository.findById (vitalSignId).orElseThrow (() -> new EntityNotFoundException (VitalSign.class, "id", String.valueOf (vitalSignId)));

    }

}
