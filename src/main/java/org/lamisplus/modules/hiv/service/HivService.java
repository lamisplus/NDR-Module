package org.lamisplus.modules.hiv.service;


import lombok.RequiredArgsConstructor;
import org.lamisplus.modules.hiv.domain.dto.HivEnrollmentDTO;
import org.lamisplus.modules.hiv.domain.entity.HivEnrollment;
import org.lamisplus.modules.hiv.repository.HivEnrollmentRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class HivService {

    private final HivEnrollmentRepository hivEnrollmentRepository;

    @Transactional
    public HivEnrollmentDTO createHivEnrollment(HivEnrollment hivEnrollment) {
        hivEnrollment.setUuid (UUID.randomUUID ().toString ());
        hivEnrollment.setId (null);
        final Long personId = hivEnrollment.getPersonId ();
        Boolean isPersonValid = hivEnrollmentRepository.isPersonExist (personId);
        if (!isPersonValid) throw new RuntimeException ("No such Person found on the application");
        Boolean isPersonEnrolled = hivEnrollmentRepository.isPersonEnrolled (personId);
        if (isPersonEnrolled) throw new RuntimeException ("Enrollment has already been done for this person");
        return hivEnrollmentRepository.save (hivEnrollment);

    }

    @Transactional
    public HivEnrollmentDTO updateHivEnrollment(Long id, HivEnrollment hivEnrollment) {
        hivEnrollmentRepository
                .findById (id)
                .orElseThrow (() -> new RuntimeException ("Enrollment not found with id -> " + id));
        return hivEnrollmentRepository.save (hivEnrollment);
    }

    public List<HivEnrollment> getAll() {
        return hivEnrollmentRepository.findAll ();

    }

    public HivEnrollmentDTO getHivEnrollmentById(Long id) {
        return hivEnrollmentRepository
                .findById (id)
                .orElseThrow (() -> new RuntimeException ("Enrollment not found with id -> " + id));

    }

    @Transactional
    public Integer deleteHivEnrollment(Long id) {
        hivEnrollmentRepository
                .findById (id)
                .orElseThrow (() -> new RuntimeException ("Enrollment not found with id -> " + id));
        return hivEnrollmentRepository.deleteById (id);
    }
}


