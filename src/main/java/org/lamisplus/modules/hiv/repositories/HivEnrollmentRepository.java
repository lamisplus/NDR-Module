package org.lamisplus.modules.hiv.repositories;

import org.lamisplus.modules.hiv.domain.entity.HivEnrollment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface HivEnrollmentRepository extends JpaRepository<HivEnrollment, Long> {
    Optional<HivEnrollment> getHivEnrollmentByPersonIdAndArchived(Long personId, Integer archived);
    List<HivEnrollment> getHivEnrollmentByArchived(Integer archived);
}
