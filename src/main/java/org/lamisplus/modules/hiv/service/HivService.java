package org.lamisplus.modules.hiv.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.hiv.controller.exception.AlreadyExistException;
import org.lamisplus.modules.hiv.controller.exception.NoRecordFoundException;
import org.lamisplus.modules.hiv.domain.dto.HivEnrollmentDto;
import org.lamisplus.modules.hiv.domain.entity.HivEnrollment;
import org.lamisplus.modules.hiv.repositories.HivEnrollmentRepository;
import org.lamisplus.modules.patient.domain.dto.PersonResponseDto;
import org.lamisplus.modules.patient.service.PersonService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Slf4j
public class HivService {

    private final PersonService personService;
    private final HivEnrollmentRepository hivEnrollmentRepository;


    public HivEnrollmentDto createHivEnrollment(HivEnrollmentDto hivEnrollmentDto) {
        final Long personId = hivEnrollmentDto.getPersonId ();
        PersonResponseDto person = personService.getPersonById (personId);
        if (hivEnrollmentRepository.getHivEnrollmentByPersonIdAndArchived (person.getId (), 0).isPresent ())
            throw new AlreadyExistException ("Enrollment has already been done for person with this Id " + personId);
        HivEnrollment hivEnrollment = convertToEntity (hivEnrollmentDto);
        hivEnrollment.setUuid (UUID.randomUUID ().toString ());
        return convertToDto (hivEnrollmentRepository.save (hivEnrollment));
    }


    public HivEnrollmentDto updateHivEnrollment(Long id, HivEnrollmentDto hivEnrollmentDto) {
        HivEnrollment existHivEnrollment = getExistEnrollmentById (id);
        HivEnrollment hivEnrollment = convertToEntity (hivEnrollmentDto);
        hivEnrollment.setId (existHivEnrollment.getId ());
        return convertToDto (hivEnrollmentRepository.save (hivEnrollment));
    }


    public List<HivEnrollmentDto> getAll() {
        return hivEnrollmentRepository.getHivEnrollmentByArchived (0)
                .stream ()
                .map (this::convertToDto)
                .collect (Collectors.toList ());

    }

    public HivEnrollmentDto getHivEnrollmentById(Long id) {
        return convertToDto (getExistEnrollmentById (id));
    }


    public void deleteHivEnrollment(Long id) {
        HivEnrollment hivEnrollment = getExistEnrollmentById (id);
        hivEnrollment.setArchived (1);
        hivEnrollmentRepository.save (hivEnrollment);
    }


    private HivEnrollment getExistEnrollmentById(Long id) {
        return hivEnrollmentRepository
                .findById (id)
                .orElseThrow (() -> new NoRecordFoundException ("No enrollment found with give Id " + id));
    }

    private HivEnrollment convertToEntity(HivEnrollmentDto dto) {
        HivEnrollment hivEnrollment = new HivEnrollment ();
        BeanUtils.copyProperties (dto, hivEnrollment);
        log.info ("entity converted {} ", hivEnrollment);
        return hivEnrollment;
    }

    private HivEnrollmentDto convertToDto(HivEnrollment entity) {
        HivEnrollmentDto hivEnrollmentDto = new  HivEnrollmentDto();
        BeanUtils.copyProperties (entity, hivEnrollmentDto);
        log.info ("dto converted {} ", hivEnrollmentDto);
        return hivEnrollmentDto;
    }


}


