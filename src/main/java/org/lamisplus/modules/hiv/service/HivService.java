package org.lamisplus.modules.hiv.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.hiv.controller.exception.AlreadyExistException;
import org.lamisplus.modules.hiv.controller.exception.NoRecordFoundException;
import org.lamisplus.modules.hiv.domain.entity.HivEnrollment;
import org.lamisplus.modules.hiv.repository.HivEnrollmentTransactionalHandler;
import org.lamisplus.modules.patient.domain.dto.PersonResponseDto;
import org.lamisplus.modules.patient.service.PersonService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;


@Service
@RequiredArgsConstructor
@Slf4j
public class HivService {
    private final HivEnrollmentTransactionalHandler hivEnrollmentTransactionalHandler;
    private final PersonService personService;


    public HivEnrollment createHivEnrollment(HivEnrollment hivEnrollment) throws Exception {
        hivEnrollment.setUuid (UUID.randomUUID ().toString ());
        final Long personId = hivEnrollment.getPersonId ();
        PersonResponseDto personById = personService.getPersonById (personId);
        if (personById == null) throw new NoRecordFoundException ("No such Person found on the application");
        boolean present = hivEnrollmentTransactionalHandler
                .getHivEnrollmentByPersonIdAndArchived (personId, 0)
                .isPresent ();
        if (present)
            throw new AlreadyExistException ("Enrollment has already been done for person with this Id " + personId);
        hivEnrollment.setId (null);
        return hivEnrollmentTransactionalHandler.save (hivEnrollment);
    }


    public HivEnrollment updateHivEnrollment(Long id, HivEnrollment hivEnrollment) {
        hivEnrollmentTransactionalHandler.getHivEnrollmentById (id);
        return hivEnrollmentTransactionalHandler.save (hivEnrollment);
    }

    public List<HivEnrollment> getAll() {
        return hivEnrollmentTransactionalHandler.getActiveHivEnrollment ();

    }

    public HivEnrollment getHivEnrollmentById(Long id) {
        return hivEnrollmentTransactionalHandler.getHivEnrollmentById (id);
    }


    public void deleteHivEnrollment(Long id) {
        hivEnrollmentTransactionalHandler.deleteHivEnrollment (id);
    }

}


