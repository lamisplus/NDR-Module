package org.lamisplus.modules.hiv.repository;

import org.lamisplus.modules.hiv.domain.entity.HivEnrollment;

import java.util.List;
import java.util.Optional;

public interface HivEnrollmentTransactionalHandler {

    HivEnrollment save(HivEnrollment hivEnrollment);
    List<HivEnrollment> getActiveHivEnrollment();

    HivEnrollment getHivEnrollmentById(Long id);
    void  deleteHivEnrollment(Long id);

    Optional<HivEnrollment> getHivEnrollmentByPersonIdAndArchived(Long personId, Integer archived);

}
