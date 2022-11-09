package org.lamisplus.modules.hiv.service;

import lombok.RequiredArgsConstructor;
import org.audit4j.core.util.Log;
import org.lamisplus.modules.base.controller.apierror.EntityNotFoundException;
import org.lamisplus.modules.base.domain.dto.PageDTO;
import org.lamisplus.modules.base.domain.entities.ApplicationCodeSet;
import org.lamisplus.modules.base.domain.repositories.ApplicationCodesetRepository;
import org.lamisplus.modules.hiv.domain.dto.*;
import org.lamisplus.modules.hiv.domain.entity.ARTClinical;
import org.lamisplus.modules.hiv.domain.entity.Observation;
import org.lamisplus.modules.hiv.repositories.ARTClinicalRepository;
import org.lamisplus.modules.hiv.repositories.ObservationRepository;
import org.lamisplus.modules.patient.domain.dto.PersonResponseDto;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.lamisplus.modules.patient.repository.PersonRepository;
import org.lamisplus.modules.patient.service.PersonService;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HivPatientService {
    private final ARTClinicalRepository artClinicalRepository;

    private final ArtCommenceService commenceService;

    private final ArtClinicVisitService artClinicVisitService;

    private final HIVStatusTrackerService statusTrackerService;


    private final PersonService personService;

    private final PersonRepository personRepository;

    private final HivEnrollmentService hivEnrollmentService;

    private final ApplicationCodesetRepository applicationCodesetRepository;

    private final CurrentUserOrganizationService currentUserOrganizationService;

    private final ObservationRepository observationRepository;

    private final  PatientActivityService patientActivityService;

    public HivEnrollmentDto registerAndEnrollHivPatient(HivPatientEnrollmentDto hivPatientEnrollmentDto) {
        HivEnrollmentDto hivEnrollmentDto = hivPatientEnrollmentDto.getHivEnrollment ();
        Long personId = hivPatientEnrollmentDto.getPerson ().getId ();
        processAndSavePatient (hivPatientEnrollmentDto, hivEnrollmentDto, personId);
        hivEnrollmentDto.setFacilityId (currentUserOrganizationService.getCurrentUserOrganization ());
        return hivEnrollmentService.createHivEnrollment (hivEnrollmentDto);
    }


    private void processAndSavePatient(HivPatientEnrollmentDto hivPatientEnrollmentDto, HivEnrollmentDto hivEnrollmentDto, Long personId) {
        if (personId == null) {
            PersonResponseDto person = personService.createPerson (hivPatientEnrollmentDto.getPerson ());
            hivEnrollmentDto.setPersonId (person.getId ());
        } else {
            hivEnrollmentDto.setPersonId (personId);
        }
    }

    public List<HivPatientDto> getHivCheckedInPatients() {
        return personService.getCheckedInPersonsByServiceCodeAndVisitId ("hiv-code")
                .stream ()
                .map (p -> convertPersonHivPatientDto (p.getId ()))
                .collect (Collectors.toList ());
    }


//    public List<HivPatientDto> getHivPatients() {
//        return personService.getAllPerson ()
//                .stream ()
//                .sorted (Comparator.comparing (PersonResponseDto::getId).reversed ())
//                .collect (Collectors.toList ());
//    }
    
    public PageDTO getHivPatientsPage(String searchValue, Pageable pageable) {
        if(searchValue != null && !searchValue.isEmpty()) {
            Long facilityId = currentUserOrganizationService.getCurrentUserOrganization();
            Page<Person> persons = personRepository.findAllPersonBySearchParameters(searchValue, 0, facilityId, pageable);
            return getPageDto(persons, false);
        }
        Page<Person> persons  =  personRepository.getAllByArchivedOrderByIdDesc(0, pageable);
        return getPageDto(persons, false);
    }
    
    private  PageDTO getPageDto(Page<Person> persons,  boolean isIIT) {
        Log.info("patient size {}",persons.getContent().size());
        if(isIIT){
            List<HivPatientDto> content = persons.getContent()
                    .stream()
                    .filter(Objects::nonNull)
                    .map(p -> personService.getPersonById(p.getId()))
                    .filter(Objects::nonNull)
                    .map(person -> convertPersonHivPatientDto(person.getId()))
                    .filter(Objects::nonNull)
                    .filter(p -> p.getCurrentStatus().equalsIgnoreCase("IIT"))
                    .collect(Collectors.toList());
            return PageDTO.builder()
                    .pageNumber(persons.getNumber())
                    .pageSize(persons.getSize())
                    .totalPages(persons.getTotalPages())
                    .totalRecords(persons.getTotalPages())
                    .records(content)
                    .build();
        }
         List<HivPatientDto> content = persons.getContent()
                 .stream()
                 .filter(Objects::nonNull)
                 .map(p -> personService.getPersonById(p.getId()))
                 .filter(Objects::nonNull)
                 .map(person -> convertPersonHivPatientDto(person.getId()))
                 .collect(Collectors.toList());
       return PageDTO.builder()
                .pageNumber(persons.getNumber())
                .pageSize(persons.getSize())
                .totalPages(persons.getTotalPages())
                .totalRecords(persons.getTotalPages())
                .records(content)
                .build();
    }
    
    public  PageDTO  getIITHivPatients(String searchValue, Pageable pageable) {
        if(searchValue != null && !searchValue.isEmpty()) {
            Long facilityId = currentUserOrganizationService.getCurrentUserOrganization();
            Page<Person> persons = personRepository.findAllPersonBySearchParameters(searchValue, 0, facilityId, pageable);
            return getPageDto(persons, true);
        }
        Page<Person> persons  =  personRepository.getAllByArchivedOrderByIdDesc(0, pageable);
        return getPageDto(persons,true);
    }

    public HivPatientDto getHivPatientById(Long personId) {
        return convertPersonHivPatientDto (personId);
    }


    private HivPatientDto convertPersonHivPatientDto(Long personId) {
        if (Boolean.TRUE.equals (personService.isPersonExist (personId))) {
            Person person = getPerson (personId);
            PersonResponseDto bioData = personService.getPersonById (personId);
            Optional<HivEnrollmentDto> enrollment =
                    hivEnrollmentService.getHivEnrollmentByPersonIdAndArchived (bioData.getId ());
            Optional<ARTClinical> artCommencement =
                    artClinicalRepository.findByPersonAndIsCommencementIsTrueAndArchived (person, 0);
            HivPatientDto hivPatientDto = new HivPatientDto ();
            BeanUtils.copyProperties (bioData, hivPatientDto);
            addEnrollmentInfo (enrollment, hivPatientDto);
            addArtCommencementInfo (person.getId (), artCommencement, hivPatientDto);
            processAndSetObservationStatus(person, hivPatientDto);
            return hivPatientDto;
        }
        return null;
    }


    private void addArtClinicalInfo(List<ARTClinical> artClinics, HivPatientDto hivPatientDto) {
        hivPatientDto.setArtClinicVisits (artClinics.stream ()
                        .filter(Objects::nonNull)
                        .map (artClinicVisitService::convertToClinicVisitDto).collect (Collectors.toList ()));
    }


    private void addArtCommencementInfo(Long personId, Optional<ARTClinical> artCommencement, HivPatientDto hivPatientDto) {
        Log.info("art commencement : {}", artCommencement.isPresent());
        if (artCommencement.isPresent ()) {
            hivPatientDto.setCommenced (true);
            ARTClinicalCommenceDto artClinicalCommenceDto =
                    commenceService.convertArtToResponseDto(artCommencement.get());
            hivPatientDto.setArtCommence(artClinicalCommenceDto);
            hivPatientDto.setCurrentStatus (statusTrackerService.getPersonCurrentHIVStatusByPersonId (personId).getStatus());
        }
    }


    private void addEnrollmentInfo(Optional<HivEnrollmentDto> enrollment, HivPatientDto hivPatientDto) {
        if (enrollment.isPresent ()) {
            hivPatientDto.setEnrolled (true);
            Long enrollStatus = enrollment.get ().getStatusAtRegistrationId ();
            if(enrollStatus !=  null){
                Optional<ApplicationCodeSet> status = applicationCodesetRepository.findById (enrollStatus);
                status.ifPresent(applicationCodeSet -> hivPatientDto.setCurrentStatus(applicationCodeSet.getDisplay()));
            }else {
                hivPatientDto.setCurrentStatus("Enrolled but status not known");
            }
            hivPatientDto.setEnrollment(enrollment.get());
        } else {
            hivPatientDto.setCurrentStatus ("Not Enrolled");
        }
    }

    public Person getPerson(Long personId) {
        return personRepository.findById (personId)
                .orElseThrow (() -> new EntityNotFoundException (Person.class, "id", String.valueOf (personId)));
    }

    private void processAndSetObservationStatus(Person person, HivPatientDto hivPatientDto) {
        Long orgId = currentUserOrganizationService.getCurrentUserOrganization ();
        Log.info ("orgId {}", orgId);
        List<Observation> observationList = observationRepository.getAllByPersonAndFacilityId (person, orgId);
        Log.info ("observationList {}", observationList);
        if (!observationList.isEmpty ()) {
            observationList
                    .stream ()
                    .filter (observation -> observation.getArchived () != 1)
                    .forEach (observation -> {
                if (observation.getType ().contains ("Clinical")) {
                    hivPatientDto.setClinicalEvaluation (true);
                }
                if (observation.getType ().contains ("Mental")) {
                    hivPatientDto.setMentalHealth (true);
                }
            });
        }
    }

    public List<PatientActivity> getHivPatientActivitiesById(Long id) {
        return   patientActivityService.getActivities(id);


    }
}
