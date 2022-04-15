package org.lamisplus.modules.hiv.domain.repository;

import org.lamisplus.modules.hiv.domain.entity.HivEnrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HivEnrollmentRepository extends JpaRepository<HivEnrollment, Long> {
    List<HivEnrollment> getAllByArchived(Integer value);
}
