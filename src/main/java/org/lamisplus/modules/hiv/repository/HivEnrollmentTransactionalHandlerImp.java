package org.lamisplus.modules.hiv.repository;

import lombok.RequiredArgsConstructor;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.lamisplus.modules.hiv.controller.exception.NoRecordFoundException;
import org.lamisplus.modules.hiv.domain.entity.HivEnrollment;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class HivEnrollmentTransactionalHandlerImp implements HivEnrollmentTransactionalHandler {

    private final LocalSessionFactoryBean sessionFactoryBean;

    private final HivEnrollmentRepository hivEnrollmentRepository;

    @Override
    @Transactional("hivTransactionManger")
    public HivEnrollment save(HivEnrollment hivEnrollment) {
        Session currentSession = getCurrentSession (Objects.requireNonNull (sessionFactoryBean.getObject ()));
        if (hivEnrollment.getId () == null) {
            currentSession.save (hivEnrollment);
            return hivEnrollment;
        }
        currentSession.update (hivEnrollment);
        return hivEnrollment;
    }


    @Override
    public List<HivEnrollment> getActiveHivEnrollment() {
        return hivEnrollmentRepository.getHivEnrollmentByArchived (0);
    }

    @Override
    public HivEnrollment getHivEnrollmentById(Long id) {
        return hivEnrollmentRepository
                .findById (id)
                .orElseThrow (() -> new NoRecordFoundException ("Enrollment not found with id -> " + id));
    }


    @Override
    @Transactional("hivTransactionManger")
    public void deleteHivEnrollment(Long id) {
        HivEnrollment hivEnrollment = hivEnrollmentRepository
                .findById (id)
                .orElseThrow (() -> new NoRecordFoundException ("Enrollment not found with id -> " + id));
        hivEnrollment.setArchived (1);
        Session currentSession = getCurrentSession (Objects.requireNonNull (sessionFactoryBean.getObject ()));
        currentSession.update (hivEnrollment);


    }

    @Override
    public Optional<HivEnrollment> getHivEnrollmentByPersonIdAndArchived(Long personId, Integer archived) {
        return hivEnrollmentRepository.getHivEnrollmentByPersonIdAndArchived (personId, archived);
    }

    private Session getCurrentSession(SessionFactory sessionFactoryBean) {
        return sessionFactoryBean.getCurrentSession ();
    }
}

