package org.lamisplus.modules.hiv.repository;

import com.foreach.across.modules.hibernate.jpa.repositories.CommonJpaRepository;
import org.lamisplus.modules.hiv.domain.entity.HivEnrollment;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HivEnrollmentRepository1 extends CommonJpaRepository<HivEnrollment, Long> {

    Optional<HivEnrollment> getHivEnrollmentByPersonIdAndArchived(Long personId, Integer archived);
}
