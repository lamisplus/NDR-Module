package org.lamisplus.modules.hiv.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.audit4j.core.util.Log;
import org.jetbrains.annotations.NotNull;
import org.lamisplus.modules.base.controller.apierror.EntityNotFoundException;
import org.lamisplus.modules.base.controller.apierror.IllegalTypeException;
import org.lamisplus.modules.base.controller.apierror.RecordExistException;
import org.lamisplus.modules.base.domain.entities.ApplicationCodeSet;
import org.lamisplus.modules.base.domain.repositories.ApplicationCodesetRepository;
import org.lamisplus.modules.hiv.domain.dto.ARTClinicalCommenceDto;
import org.lamisplus.modules.hiv.domain.dto.HIVStatusTrackerDto;
import org.lamisplus.modules.hiv.domain.dto.HivPatientDto;
import org.lamisplus.modules.hiv.domain.entity.ARTClinical;
import org.lamisplus.modules.hiv.domain.entity.HIVStatusTracker;
import org.lamisplus.modules.hiv.domain.entity.HivEnrollment;
import org.lamisplus.modules.hiv.repositories.ARTClinicalRepository;
import org.lamisplus.modules.hiv.repositories.HivEnrollmentRepository;
import org.lamisplus.modules.patient.domain.dto.EncounterRequestDto;
import org.lamisplus.modules.patient.domain.dto.EncounterResponseDto;
import org.lamisplus.modules.patient.domain.dto.PersonResponseDto;
import org.lamisplus.modules.patient.domain.dto.VisitDto;
import org.lamisplus.modules.patient.service.EncounterService;
import org.lamisplus.modules.patient.service.PersonService;
import org.lamisplus.modules.patient.service.VisitService;
import org.lamisplus.modules.triage.domain.dto.VitalSignDto;
import org.lamisplus.modules.triage.domain.entity.TriagePostService;
import org.lamisplus.modules.triage.domain.entity.VitalSign;
import org.lamisplus.modules.triage.repository.TriagePostServiceRepository;
import org.lamisplus.modules.triage.repository.VitalSignRepository;
import org.lamisplus.modules.triage.service.VitalSignService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ArtCommenceService {

    private final ARTClinicalRepository artClinicalRepository;
    private final HivEnrollmentRepository hivEnrollmentRepository;

    private final HIVStatusTrackerService hivStatusTrackerService;

    private final HivEnrollmentService enrollmentService;

    private final PersonService personService;


    private final VitalSignService vitalSignService;

    private final ApplicationCodesetRepository applicationCodesetRepository;
    private final CurrentUserOrganizationService organizationUtil;
    private final VisitService visitService;

    private final EncounterService encounterService;

    private final TriagePostServiceRepository postServiceRepository;

    private final VitalSignRepository vitalSignRepository;

    public HivPatientDto createArtCommence(ARTClinicalCommenceDto artClinicalCommenceDto) {
        Long personId = artClinicalCommenceDto.getPersonId ();
        Long hivEnrollmentId = artClinicalCommenceDto.getHivEnrollmentId ();
        Optional<ApplicationCodeSet> hivStatus = applicationCodesetRepository.findByDisplayAndCodesetGroup ("ART Start", "HIV_STATUS");
        StringBuilder statusDisplay = new StringBuilder ();
        HivEnrollment hivEnrollment = hivEnrollmentRepository.findById (hivEnrollmentId).orElseThrow (() -> new EntityNotFoundException (HivEnrollment.class, "id", "" + hivEnrollmentId));
        boolean isEnrollmentDateAfterArtCommence = hivEnrollment.getDateOfRegistration ().isAfter (artClinicalCommenceDto.getVisitDate ());
        if (isEnrollmentDateAfterArtCommence) {
            final String message = artClinicalCommenceDto.getVisitDate () + " is below enrollment date " + hivEnrollment.getDateOfRegistration ();
            throw new IllegalTypeException (ARTClinical.class, "Art commence date", message);
        }
        boolean artCommenceExist = artClinicalRepository.findByPersonAndIsCommencementIsTrue (hivEnrollment.getPerson ()).isPresent ();
        if (artCommenceExist) throw new RecordExistException (ARTClinical.class, "personId", "" + personId);
        Long vitalSignId = artClinicalCommenceDto.getVitalSignId ();
        if (vitalSignId == null) {
            vitalSignId = processAndSaveVitalSign (artClinicalCommenceDto);
        }
        ARTClinical artClinical = convertDtoToART (artClinicalCommenceDto, vitalSignId);
        artClinical.setUuid (UUID.randomUUID ().toString ());
        artClinical.setIsCommencement (true);
        if (hivStatus.isPresent ()) {
            artClinical.setArtStatusId (hivStatus.get ().getId ());
            statusDisplay.append (hivStatus.get ().getDisplay ());
        }
        artClinical.setArchived (0);
        artClinical.setHivEnrollment (hivEnrollment);
        artClinical.setPerson (hivEnrollment.getPerson ());
        ARTClinical saveArtClinical = artClinicalRepository.save (artClinical);
        processAndSaveHIVStatus (saveArtClinical, statusDisplay.toString ());
        return convertArtCommenceToHivPatientDto (saveArtClinical);
    }

    @NotNull
    private VisitDto processAndCreatePersonVisitAndEncounter(ARTClinicalCommenceDto artClinicalCommenceDto) {
        VisitDto visit = createAVisit (artClinicalCommenceDto);
        log.info (" visit art commence  {}", visit);
        createAnEncounter (artClinicalCommenceDto, visit.getId ());
        return visit;
    }

    public VisitDto createAVisit(ARTClinicalCommenceDto artClinicalCommenceDto) {
        VisitDto visitDto = new VisitDto ();
        visitDto.setPersonId (artClinicalCommenceDto.getPersonId ());
        visitDto.setFacilityId (organizationUtil.getCurrentUserOrganization ());
        visitDto.setVisitStartDate (artClinicalCommenceDto.getVisitDate ());
        return visitService.createVisit (visitDto);
    }

    public void createAnEncounter(ARTClinicalCommenceDto artClinicalCommenceDto, Long visitId) {
        EncounterRequestDto encounterRequestDto = new EncounterRequestDto ();
        encounterRequestDto.setPersonId (artClinicalCommenceDto.getPersonId ());
        encounterRequestDto.setVisitId (visitId);
        encounterRequestDto.setFacilityId (organizationUtil.getCurrentUserOrganization ());
        encounterRequestDto.setEncounterDate (artClinicalCommenceDto.getVisitDate ());
        Set<String> hivServiceCodes = getHivServiceCodes ();
        encounterRequestDto.setServiceCode (hivServiceCodes);
        encounterRequestDto.setStatus ("PENDING");
        List<EncounterResponseDto> encounterResponseDtos = encounterService.registerEncounter (encounterRequestDto);
        log.info (" encounter art commence  {}", encounterResponseDtos);

    }


    @NotNull
    public Set<String> getHivServiceCodes() {
        return postServiceRepository.findAll ()
                .stream ().filter (triagePostService -> triagePostService.getModuleServiceCode ().contains ("hiv"))
                .map (TriagePostService::getModuleServiceCode)
                .collect (Collectors.toSet ());
    }


    public Long processAndSaveVitalSign(ARTClinicalCommenceDto artClinicalCommenceDto) {
        VitalSignDto vitalSignDto = artClinicalCommenceDto.getVitalSignDto ();
        vitalSignDto.setVisitId (artClinicalCommenceDto.getVisitId ());
        vitalSignDto.setFacilityId (organizationUtil.getCurrentUserOrganization ());
        vitalSignDto.setEncounterDate (artClinicalCommenceDto.getVisitDate ());
        Log.info ("vitalSign dto {}", vitalSignDto);
        VitalSignDto saveVitalSignDto = vitalSignService.registerVitalSign (vitalSignDto);
        return saveVitalSignDto.getId ();

    }


    public HivPatientDto updateArtCommence(Long id, ARTClinicalCommenceDto artClinicalCommenceDto) {
        ARTClinical existArtClinical = getExistArt (id);
        ARTClinical artClinical = convertDtoToART (artClinicalCommenceDto, artClinicalCommenceDto.getVitalSignId ());
        artClinical.setId (existArtClinical.getId ());
        artClinical.setCreatedBy (existArtClinical.getCreatedBy ());
        artClinical.setCreatedDate (existArtClinical.getCreatedDate ());
        return convertArtCommenceToHivPatientDto (artClinicalRepository.save (artClinical));
    }


    public void archivedArtCommenceClinical(Long id) {
        ARTClinical artClinical = getExistArt (id);
        HIVStatusTracker hivStatusTracker = hivStatusTrackerService
                .findDistinctFirstByPersonIdAndStatusDate (artClinical.getPerson ().getUuid (), artClinical.getVisitDate ());
        if (hivStatusTracker != null) {
            hivStatusTrackerService.archivedHIVStatusTracker (hivStatusTracker.getId ());
        }
        artClinical.setArchived (1);
        artClinicalRepository.save (artClinical);
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
                .orElseThrow (() -> new EntityNotFoundException (ARTClinical.class, "id", "" + id));
    }

    private void processAndSaveHIVStatus(ARTClinical artClinical, String hivStatus) {
        HIVStatusTrackerDto statusTracker = new HIVStatusTrackerDto ();
        statusTracker.setHivStatus (hivStatus);
        statusTracker.setStatusDate (artClinical.getVisitDate ());
        statusTracker.setVisitId (artClinical.getVisitId ());
        statusTracker.setPersonId (artClinical.getPerson ().getId ());
        hivStatusTrackerService.registerHIVStatusTracker (statusTracker);
    }


    @NotNull
    public ARTClinicalCommenceDto convertArtToResponseDto(ARTClinical artClinical) {
        VitalSignDto vitalSignDto = vitalSignService.getVitalSignById (artClinical.getVitalSign ().getId ());
        ARTClinicalCommenceDto artClinicalCommenceDto = new ARTClinicalCommenceDto ();
        BeanUtils.copyProperties (artClinical, artClinicalCommenceDto);
        artClinicalCommenceDto.setVitalSignId (vitalSignDto.getId ());
        return artClinicalCommenceDto;
    }


    @NotNull
    public ARTClinical convertDtoToART(ARTClinicalCommenceDto artClinicalCommenceDto, Long vitalSignId) {
        ARTClinical artClinical = new ARTClinical ();
        BeanUtils.copyProperties (artClinicalCommenceDto, artClinical);
        VisitDto visit = processAndCreatePersonVisitAndEncounter (artClinicalCommenceDto);
        VitalSign vitalSign = getVitalSign (vitalSignId);
        artClinical.setVitalSign (vitalSign);
        artClinical.setVisitId (visit.getId ());
        artClinical.setFacilityId (organizationUtil.getCurrentUserOrganization ());
        return artClinical;
    }

    private HivPatientDto convertArtCommenceToHivPatientDto(ARTClinical entity) {
        Long personId = entity.getPerson ().getId ();
        PersonResponseDto bioData = personService.getPersonById (personId);
        ARTClinicalCommenceDto artClinicalCommenceDto = convertArtToResponseDto (entity);
        HivPatientDto hivEnrollmentBy = enrollmentService.getHivEnrollmentById (entity.getHivEnrollment ().getId ());
        HivPatientDto hivPatientDto = new HivPatientDto ();
        hivPatientDto.setArtCommence (artClinicalCommenceDto);
        BeanUtils.copyProperties (bioData, hivPatientDto);
        hivPatientDto.setEnrolled (true);
        hivPatientDto.setCommenced (true);
        hivPatientDto.setCurrentStatus (hivStatusTrackerService.getPersonCurrentHIVStatusByPersonId (entity.getPerson ().getId ()));
        hivPatientDto.setEnrollment (hivEnrollmentBy.getEnrollment ());
        return hivPatientDto;
    }

    private VitalSign getVitalSign(Long vitalSignId) {
        return vitalSignRepository.findById (vitalSignId).orElseThrow (() -> new EntityNotFoundException (VitalSign.class, "id", String.valueOf (vitalSignId)));

    }

}
