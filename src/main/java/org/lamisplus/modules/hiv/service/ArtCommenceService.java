package org.lamisplus.modules.hiv.service;

import lombok.RequiredArgsConstructor;
import org.audit4j.core.util.Log;
import org.jetbrains.annotations.NotNull;
import org.lamisplus.modules.base.controller.apierror.EntityNotFoundException;
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
import org.lamisplus.modules.patient.domain.dto.PersonResponseDto;
import org.lamisplus.modules.patient.domain.entity.Encounter;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.lamisplus.modules.patient.domain.entity.Visit;
import org.lamisplus.modules.patient.repository.EncounterRepository;
import org.lamisplus.modules.patient.repository.VisitRepository;
import org.lamisplus.modules.patient.service.PersonService;
import org.lamisplus.modules.triage.domain.dto.VitalSignDto;
import org.lamisplus.modules.triage.service.VitalSignService;
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

    private final CurrentUserOrganizationService organizationUtil;

    private final VisitRepository visitRepository;
    private final EncounterRepository encounterRepository;

    public HivPatientDto createArtCommence(ARTClinicalCommenceDto artClinicalCommenceDto) {
        Long personId = artClinicalCommenceDto.getPersonId ();
        Person person = new Person ();
        person.setId (personId);
        Visit visit = createAVisit (artClinicalCommenceDto, person);
        createAnEncounter (artClinicalCommenceDto, person, visit);
        Long hivEnrollmentId = artClinicalCommenceDto.getHivEnrollmentId ();
        Optional<ApplicationCodeSet> hivStatus = applicationCodesetRepository.findByDisplayAndCodesetGroup ("ART Start", "HIV_STATUS");
        StringBuilder statusDisplay = new StringBuilder ();
        hivEnrollmentRepository.findById (hivEnrollmentId).orElseThrow (() -> new EntityNotFoundException (HivEnrollment.class, "id", "" + hivEnrollmentId));
        boolean artCommenceExist = artClinicalRepository
                .findByPersonIdAndIsCommencementIsTrue (personId).isPresent ();
        if (artCommenceExist)
            throw new RecordExistException (ARTClinical.class, "personId", "" + personId);
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
        ARTClinical saveArtClinical = artClinicalRepository.save (artClinical);
        processAndSaveHIVStatus (saveArtClinical.getVisitDate (), saveArtClinical.getPersonId (), statusDisplay.toString ());
        return convertArtCommenceToHivPatientDto (saveArtClinical);
    }

    public Visit createAVisit(ARTClinicalCommenceDto artClinicalCommenceDto,Person person) {
        Visit visit = new Visit ();
        visit.setVisitStartDate (artClinicalCommenceDto.getVisitDate ());
        visit.setUuid (UUID.randomUUID ().toString ());
        visit.setArchived (0);
        visit.setPerson (person);
        visit.setFacilityId (organizationUtil.getCurrentUserOrganization ());
        visitRepository.save (visit);
        return visit;
    }
    public void createAnEncounter(ARTClinicalCommenceDto artClinicalCommenceDto, Person person, Visit visit) {
        Encounter encounter = new Encounter ();
        encounter.setStatus ("PENDING");
        encounter.setServiceCode ("hiv-code");
        encounter.setPerson (person);
        encounter.setEncounterDate (artClinicalCommenceDto.getVisitDate ());
        encounter.setVisit (visit);
        encounter.setArchived (0);
        encounter.setUuid (UUID.randomUUID ().toString ());
        encounterRepository.save (encounter);
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
                .findDistinctFirstByPersonIdAndStatusDate (artClinical.getPersonId (), artClinical.getVisitDate ());
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
        artClinicalCommenceDto.setVitalSignId (vitalSignDto.getId ());
        return artClinicalCommenceDto;
    }


    @NotNull
    public ARTClinical convertDtoToART(ARTClinicalCommenceDto artClinicalCommenceDto, Long vitalSignId) {
        ARTClinical artClinical = new ARTClinical ();
        BeanUtils.copyProperties (artClinicalCommenceDto, artClinical);
        artClinical.setVitalSignId (vitalSignId);
        artClinical.setFacilityId (organizationUtil.getCurrentUserOrganization ());
        return artClinical;
    }

    private HivPatientDto convertArtCommenceToHivPatientDto(ARTClinical entity) {
        Long personId = entity.getPersonId ();
        PersonResponseDto bioData = personService.getPersonById (personId);
        ARTClinicalCommenceDto artClinicalCommenceDto = convertArtToResponseDto (entity);
        HivPatientDto hivEnrollmentBy = enrollmentService.getHivEnrollmentById (entity.getHivEnrollmentId ());
        HivPatientDto hivPatientDto = new HivPatientDto ();
        hivPatientDto.setArtCommence (artClinicalCommenceDto);
        BeanUtils.copyProperties (bioData, hivPatientDto);
        hivPatientDto.setEnrolled (true);
        hivPatientDto.setCommenced (true);
        hivPatientDto.setCurrentStatus (hivStatusTrackerService.getPersonCurrentHIVStatusByPersonId (entity.getPersonId ()));
        hivPatientDto.setEnrollment (hivEnrollmentBy.getEnrollment ());
        return hivPatientDto;
    }

}
