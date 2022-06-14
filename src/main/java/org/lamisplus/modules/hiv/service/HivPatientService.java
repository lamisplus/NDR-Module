package org.lamisplus.modules.hiv.service;

import lombok.RequiredArgsConstructor;
import org.lamisplus.modules.base.domain.entities.ApplicationCodeSet;
import org.lamisplus.modules.base.domain.repositories.ApplicationCodesetRepository;
import org.lamisplus.modules.hiv.domain.dto.HivEnrollmentDto;
import org.lamisplus.modules.hiv.domain.dto.HivPatientDto;
import org.lamisplus.modules.hiv.domain.dto.HivPatientEnrollmentDto;
import org.lamisplus.modules.hiv.domain.entity.ARTClinical;
import org.lamisplus.modules.hiv.repositories.ARTClinicalRepository;
import org.lamisplus.modules.patient.domain.dto.PersonResponseDto;
import org.lamisplus.modules.patient.service.PersonService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HivPatientService {
    private final ARTClinicalRepository artClinicalRepository;

    private final ArtCommenceService commenceService;

    private final ArtClinicVisitService artClinicVisitService;

    private final HIVStatusTrackerService statusTrackerService;

    //private  final ArtPharmacyService artPharmacyService;


    private final PersonService personService;

    private final HivEnrollmentService hivEnrollmentService;

    private final ApplicationCodesetRepository applicationCodesetRepository;

    private  final  CurrentUserOrganizationService currentUserOrganizationService;

    public  HivPatientDto registerAndEnrollHivPatient(HivPatientEnrollmentDto hivPatientEnrollmentDto){
        HivEnrollmentDto hivEnrollmentDto = hivPatientEnrollmentDto.getHivEnrollment ();
        Long personId = hivPatientEnrollmentDto.getPerson ().getId ();
        processAndSavePatient (hivPatientEnrollmentDto, hivEnrollmentDto, personId);
        hivEnrollmentDto.setFacilityId (currentUserOrganizationService.getCurrentUserOrganization ());
        return hivEnrollmentService.createHivEnrollment (hivEnrollmentDto);
    }



    private void processAndSavePatient(HivPatientEnrollmentDto hivPatientEnrollmentDto, HivEnrollmentDto hivEnrollmentDto, Long personId) {
        if(personId == null){
            PersonResponseDto person = personService.createPerson (hivPatientEnrollmentDto.getPerson ());
            hivEnrollmentDto.setPersonId (person.getId ());
        }else {
            hivEnrollmentDto.setPersonId (personId);
        }
    }

    public List<HivPatientDto> getHivCheckedInPatients() {
        return personService.getCheckedInPersonsByServiceCodeAndVisitId ("hiv-code")
                .stream ()
                .map (p -> convertPersonHivPatientDto (p.getId ()))
                .collect (Collectors.toList ());
    }


    public List<HivPatientDto> getHivPatients() {
        return personService.getAllPerson ()
                .stream ()
                .map (p -> convertPersonHivPatientDto (p.getId ()))
                .collect (Collectors.toList ());
    }

    public HivPatientDto getHivPatientById(Long personId) {
       return convertPersonHivPatientDto (personId);
    }


    private HivPatientDto convertPersonHivPatientDto(Long personId) {
        if(Boolean.TRUE.equals(personService.isPersonExist (personId))) {
            PersonResponseDto bioData = personService.getPersonById (personId);
            Optional<HivEnrollmentDto> enrollment = hivEnrollmentService.getHivEnrollmentByPersonIdAndArchived (personId, 0);
            Optional<ARTClinical> artCommencement = artClinicalRepository.findByPersonIdAndIsCommencementIsTrue (personId);
            List<ARTClinical> artClinics = artClinicalRepository.findAllByPersonIdAndIsCommencementIsFalseAndArchived (personId, 0);
            HivPatientDto hivPatientDto = new HivPatientDto ();
            BeanUtils.copyProperties (bioData, hivPatientDto);
            addEnrollmentInfo (enrollment, hivPatientDto);
            addArtCommencementInfo (personId, artCommencement, hivPatientDto);
            addArtClinicalInfo (artClinics, hivPatientDto);
            return hivPatientDto;
        }
        return null;
    }





//    private void addArtPharmacyRefillInfo(List<ArtPharmacy> artPharmacies, HivPatientDto hivPatientDto) {
//        hivPatientDto.setArtClinicVisits (
//                artPharmacies
//                        .stream ()
//                        .map (artPharmacy -> artPharmacyService. (artClinical))
//                        .collect (Collectors.toList ())
//        );
//    }
    private void addArtClinicalInfo(List<ARTClinical> artClinics, HivPatientDto hivPatientDto) {
        hivPatientDto.setArtClinicVisits (
                artClinics
                        .stream ()
                        .map (artClinical -> artClinicVisitService.convertToClinicVisitDto (artClinical))
                        .collect (Collectors.toList ())
        );
    }


    private void addArtCommencementInfo(Long personId, Optional<ARTClinical> artCommencement, HivPatientDto hivPatientDto) {
        if (artCommencement.isPresent ()) {
            hivPatientDto.setCommenced (true);
            hivPatientDto.setArtCommence (commenceService.convertArtToResponseDto (artCommencement.get ()));
            hivPatientDto.setCurrentStatus (statusTrackerService.getPersonCurrentHIVStatusByPersonId (personId));
        }
    }



    private void addEnrollmentInfo(Optional<HivEnrollmentDto> enrollment, HivPatientDto hivPatientDto) {
        if (enrollment.isPresent ()) {
            hivPatientDto.setEnrolled (true);
            hivPatientDto.setEnrollment (enrollment.get ());
            Optional<ApplicationCodeSet> status = applicationCodesetRepository.findById (enrollment.get ().getStatusAtRegistrationId ());
            if (status.isPresent ()) {
                hivPatientDto.setCurrentStatus (status.get ().getDisplay ());
            }
        } else {
            hivPatientDto.setCurrentStatus ("NOT ENROLLED");
        }
    }

}
