package org.lamisplus.modules.ndr.repositories;

import org.lamisplus.modules.ndr.domain.NDRDATA;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface NDRDATARepository extends JpaRepository<NDRDATA, String>, JpaSpecificationExecutor<NDRDATA> {
}