package org.lamisplus.modules.hiv.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.base.controller.apierror.EntityNotFoundException;
import org.lamisplus.modules.base.controller.apierror.RecordExistException;
import org.lamisplus.modules.base.domain.entities.ApplicationCodeSet;
import org.lamisplus.modules.base.domain.repositories.ApplicationCodesetRepository;
import org.lamisplus.modules.hiv.domain.dto.HivEnrollmentDto;
import org.lamisplus.modules.hiv.domain.dto.HivPatientDto;
import org.lamisplus.modules.hiv.domain.entity.HivEnrollment;
import org.lamisplus.modules.hiv.repositories.HivEnrollmentRepository;
import org.lamisplus.modules.patient.domain.dto.PersonResponseDto;
import org.lamisplus.modules.patient.service.PersonService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Slf4j
public class HivEnrollmentService {

    private final PersonService personService;
    private final HivEnrollmentRepository hivEnrollmentRepository;

    private final ApplicationCodesetRepository applicationCodesetRepository;

    private final CurrentUserOrganizationService organizationUtil;




    public HivPatientDto createHivEnrollment(HivEnrollmentDto hivEnrollmentDto) {
        final Long personId = hivEnrollmentDto.getPersonId ();
        PersonResponseDto person = personService.getPersonById (personId);
        if (hivEnrollmentRepository.getHivEnrollmentByPersonIdAndArchived (person.getId (), 0).isPresent ())
            throw new RecordExistException (HivEnrollment.class, "personId", ""+person.getId ());
        HivEnrollment hivEnrollment = convertToEntity (hivEnrollmentDto);
        hivEnrollment.setUuid (UUID.randomUUID ().toString ());
        return convertHivEnrollmentToHivPatientDto (hivEnrollmentRepository.save (hivEnrollment));
    }


    public HivPatientDto updateHivEnrollment(Long id, HivEnrollmentDto hivEnrollmentDto) {
        HivEnrollment existHivEnrollment = getExistEnrollmentById (id);
        HivEnrollment hivEnrollment = convertToEntity (hivEnrollmentDto);
        hivEnrollment.setId (existHivEnrollment.getId ());
        return convertHivEnrollmentToHivPatientDto (hivEnrollmentRepository.save (hivEnrollment));
    }


    public List<HivPatientDto> getAll() {
        return hivEnrollmentRepository.getHivEnrollmentByArchived (0)
                .stream ()
                .map (this::convertHivEnrollmentToHivPatientDto)
                .collect (Collectors.toList ());

    }

    public HivPatientDto getHivEnrollmentById(Long id) {
        return convertHivEnrollmentToHivPatientDto (getExistEnrollmentById (id));
    }


    public void deleteHivEnrollment(Long id) {
        HivEnrollment hivEnrollment = getExistEnrollmentById (id);
        hivEnrollment.setArchived (1);
        hivEnrollmentRepository.save (hivEnrollment);
    }


    private HivEnrollment getExistEnrollmentById(Long id) {
        return hivEnrollmentRepository
                .findById (id)
                .orElseThrow (() -> new EntityNotFoundException (HivEnrollment.class, "id", "" + id));
    }

    private HivEnrollment convertToEntity(HivEnrollmentDto dto) {
        HivEnrollment hivEnrollment = new HivEnrollment ();
        BeanUtils.copyProperties (dto, hivEnrollment);
        log.info ("entity converted {} ", hivEnrollment);
        hivEnrollment.setFacilityId (organizationUtil.getCurrentUserOrganization ());
        return hivEnrollment;
    }

    private HivEnrollmentDto convertToDto(HivEnrollment entity) {
        HivEnrollmentDto hivEnrollmentDto = new HivEnrollmentDto ();
        BeanUtils.copyProperties (entity, hivEnrollmentDto);
        log.info ("dto converted {} ", hivEnrollmentDto);
        return hivEnrollmentDto;
    }


    private HivPatientDto convertHivEnrollmentToHivPatientDto(HivEnrollment entity) {
        Long personId = entity.getPersonId ();
        PersonResponseDto bioData = personService.getPersonById (personId);
        HivEnrollmentDto hivEnrollmentDto = convertToDto (entity);
        HivPatientDto hivPatientDto = new HivPatientDto ();
        BeanUtils.copyProperties (bioData, hivPatientDto);
        hivPatientDto.setEnrolled (true);
        Long statusAtRegistrationId = entity.getStatusAtRegistrationId ();
        Optional<ApplicationCodeSet> status = applicationCodesetRepository.findById (statusAtRegistrationId);
        if (status.isPresent ()) {
            hivPatientDto.setCurrentStatus (status.get ().getDisplay ());
        }
        hivPatientDto.setEnrollment (hivEnrollmentDto);
        return hivPatientDto;
    }


    public Optional<HivEnrollmentDto> getHivEnrollmentByPersonIdAndArchived(Long personId) {
        Optional<HivEnrollment> hivEnrollment = hivEnrollmentRepository.getHivEnrollmentByPersonIdAndArchived (personId, 0);
        if(hivEnrollment.isPresent ()) {
            return Optional.of (convertToDto (hivEnrollment.get ()));
        }
        return Optional.empty ();
    }
}


