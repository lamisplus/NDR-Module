package org.lamisplus.modules.hiv.repository;

import com.foreach.across.modules.hibernate.jpa.repositories.CommonJpaRepository;
import org.lamisplus.modules.hiv.domain.entity.TestEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface TestEntityRepository extends CommonJpaRepository<TestEntity, Long> {
}
