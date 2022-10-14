package org.lamisplus.modules.hiv.repositories;

import org.lamisplus.modules.hiv.domain.entity.HIVDrug;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HIVDrugRepository extends JpaRepository<HIVDrug, Long> {
}