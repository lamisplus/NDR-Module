package org.lamisplus.modules.hiv.repositories;

import com.foreach.across.modules.hibernate.jpa.repositories.CommonJpaRepository;
import org.lamisplus.modules.hiv.domain.entity.ART;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ARTRepository extends CommonJpaRepository<ART, Long> {
    List<ART> findByArchived(int i);
}
