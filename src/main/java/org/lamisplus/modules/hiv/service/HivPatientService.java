package org.lamisplus.modules.hiv.service;

import lombok.RequiredArgsConstructor;
import org.lamisplus.modules.base.domain.entities.ApplicationCodeSet;
import org.lamisplus.modules.base.domain.repositories.ApplicationCodesetRepository;
import org.lamisplus.modules.hiv.domain.dto.HivEnrollmentDto;
import org.lamisplus.modules.hiv.domain.dto.HivPatientDto;
import org.lamisplus.modules.hiv.domain.entity.ARTClinical;
import org.lamisplus.modules.hiv.repositories.ARTClinicalRepository;
import org.lamisplus.modules.patient.domain.dto.PersonResponseDto;
import org.lamisplus.modules.patient.service.PersonService;
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


    private final PersonService personService;

    private final HivEnrollmentService hivEnrollmentService;

    private final ApplicationCodesetRepository applicationCodesetRepository;

    public List<HivPatientDto> getHivPatient() {
        return personService.getAllPerson ()
                .stream ()
                .map (p -> convertPersonHivPatientDto (p.getId ()))
                .collect (Collectors.toList ());
    }


    private HivPatientDto convertPersonHivPatientDto(Long personId) {
        PersonResponseDto bioData = personService.getPersonById (personId);
        Optional<HivEnrollmentDto> enrollment = hivEnrollmentService.getHivEnrollmentByPersonIdAndArchived (personId, 0);
        Optional<ARTClinical> artCommencement = artClinicalRepository.findByPersonIdAndIsCommencementIsTrue (personId);
        List<ARTClinical> artClinics = artClinicalRepository.findAllByPersonIdAndIsCommencementIsFalseAndArchived (personId, 0);
        HivPatientDto hivPatientDto = new HivPatientDto ();
        hivPatientDto.setBioData (bioData);

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

        if (artCommencement.isPresent ()) {
            hivPatientDto.setCommenced (true);
            hivPatientDto.setArtCommence (commenceService.convertArtToResponseDto (artCommencement.get ()));
            hivPatientDto.setCurrentStatus (statusTrackerService.getPersonCurrentHIVStatusByPersonId (personId));
        }


        hivPatientDto.setArtClinicVisits (
                artClinics
                        .stream ()
                        .map (artClinical -> artClinicVisitService.convertToClinicVisitDto (artClinical))
                        .collect (Collectors.toList ())
        );

        return hivPatientDto;
    }

}
