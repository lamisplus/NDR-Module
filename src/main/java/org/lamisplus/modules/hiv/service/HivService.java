package org.lamisplus.modules.hiv.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.Session;
import org.lamisplus.modules.hiv.domain.entity.HivEnrollment;
import org.lamisplus.modules.hiv.repository.HivEnrollmentRepository1;
import org.lamisplus.modules.patient.domain.dto.PersonResponseDto;
import org.lamisplus.modules.patient.service.PersonService;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;


@Service
@RequiredArgsConstructor
@Slf4j
public class HivService {
    private final HivEnrollmentRepository1 hivEnrollmentRepository1;
    private final LocalSessionFactoryBean sessionFactoryBean;

    private final PersonService personService;


    @Transactional("hivTransactionManger")
    public HivEnrollment createHivEnrollment(HivEnrollment hivEnrollment) throws Exception {
        hivEnrollment.setUuid (UUID.randomUUID ().toString ());
        final Long personId = hivEnrollment.getPersonId ();
        PersonResponseDto personById = personService.getPersonById (personId);
        if (personById == null) throw new RuntimeException ("No such Person found on the application");
        boolean present = hivEnrollmentRepository1
                .getHivEnrollmentByPersonIdAndArchived (personId, 0)
                .isPresent ();
        if (present)
            throw new RuntimeException ("Enrollment has already been done for person with this Id " + personId);
        Session currentSession = sessionFactoryBean.getObject ().getCurrentSession ();
        currentSession.save (hivEnrollment);
        return hivEnrollment;
    }


    @Transactional("hivTransactionManger")
    public HivEnrollment updateHivEnrollment(Long id, HivEnrollment hivEnrollment) {
        hivEnrollmentRepository1.findById (id).orElseThrow (() -> new RuntimeException ("Enrollment not found with id -> " + id));
        Session currentSession = sessionFactoryBean.getObject ().getCurrentSession ();
        currentSession.update (hivEnrollment);
        return hivEnrollment;
    }

    public List<HivEnrollment> getAll() {
        List<HivEnrollment> all = hivEnrollmentRepository1.findAll ();
        log.info ("from hivRepo: {}", all);
        return all;

    }

    public HivEnrollment getHivEnrollmentById(Long id) {
        return hivEnrollmentRepository1
                .findById (id)
                .orElseThrow (() -> new RuntimeException ("Enrollment not found with id -> " + id));

    }

    @Transactional("hivTransactionManger")
    public void deleteHivEnrollment(Long id) {
        HivEnrollment hivEnrollment = hivEnrollmentRepository1
                .findById (id)
                .orElseThrow (() -> new RuntimeException ("Enrollment not found with id -> " + id));
        hivEnrollment.setArchived (1);
        Session currentSession = sessionFactoryBean.getObject ().getCurrentSession ();
        currentSession.update (hivEnrollment);
    }

}


