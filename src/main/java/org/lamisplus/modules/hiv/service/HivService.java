package org.lamisplus.modules.hiv.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.Session;
import org.lamisplus.modules.hiv.domain.entity.HivEnrollment;
import org.lamisplus.modules.hiv.domain.entity.TestEntity;
import org.lamisplus.modules.hiv.repository.HivEnrollmentRepository1;
import org.lamisplus.modules.hiv.repository.TestEntityRepository;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.sql.DataSource;
import java.util.List;
import java.util.UUID;



@Service
@RequiredArgsConstructor
@Slf4j
public class HivService {
    private final HivEnrollmentRepository1 hivEnrollmentRepository1;
    private final TestEntityRepository testEntityRepository;
    private final DataSource dataSource;

    private final LocalSessionFactoryBean sessionFactoryBean;


    @Transactional("hivTransactionManger")
    public HivEnrollment createHivEnrollment(HivEnrollment hivEnrollment) {
        hivEnrollment.setUuid (UUID.randomUUID ().toString ());
       // final Long personId = hivEnrollment.getPersonId ();
        //Boolean isPersonValid = hivEnrollmentRepository.isPersonExist (personId);
        // if (!isPersonValid) throw new RuntimeException ("No such Person found on the application");
        //Boolean isPersonEnrolled = hivEnrollmentRepository.isPersonEnrolled (personId);
        //if (isPersonEnrolled) throw new RuntimeException ("Enrollment has already been done for this person");
        //log.info ("I am in Hiv {}", hivEnrollment);
        try {
            Session currentSession = sessionFactoryBean.getObject ().getCurrentSession ();
            currentSession.save (hivEnrollment);
            return hivEnrollment;
        }catch (Exception e){
            e.printStackTrace ();
        }

        //return hivEnrollmentRepository.save (hivEnrollment);
  return null;
    }


    @Transactional("hivTransactionManger")
    public TestEntity createTest(TestEntity testEntity) {
        try {
            log.info ("data source from HIV  {}", dataSource.getClass ().getName ());
            Session currentSession = sessionFactoryBean.getObject ().getCurrentSession ();
            currentSession.save (testEntity);
            return testEntity;
        }catch (Exception e){
            e.printStackTrace ();
        }
        return null;
    }

//    @Transactional
//    public HivEnrollmentDto updateHivEnrollment(Long id, HivEnrollment hivEnrollment) {
//        hivEnrollmentRepository
//                .findById (id)
//                .orElseThrow (() -> new RuntimeException ("Enrollment not found with id -> " + id));
//        return hivEnrollmentRepository.save (hivEnrollment);
//    }

    public List<HivEnrollment> getAll() {
        //List<PersonResponseDto> allPerson = personService.getAllPerson ();
        //log.info ("Persons: => {}", allPerson);
        List<HivEnrollment> all = hivEnrollmentRepository1.findAll ();
        log.info ("from hivRepo: {}", all);
        return all;

    }
//
//    public HivEnrollmentDto getHivEnrollmentById(Long id) {
//        return hivEnrollmentRepository
//                .findById (id)
//                .orElseThrow (() -> new RuntimeException ("Enrollment not found with id -> " + id));
//
//    }
//
//    @Transactional
//    public Integer deleteHivEnrollment(Long id) {
//        hivEnrollmentRepository
//                .findById (id)
//                .orElseThrow (() -> new RuntimeException ("Enrollment not found with id -> " + id));
//        return hivEnrollmentRepository.deleteById (id);
//    }

}


