package org.lamisplus.modules.ndr.repositories;

import org.lamisplus.modules.hiv.domain.entity.ARTClinical;
import org.lamisplus.modules.ndr.domain.entities.NdrMessageLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface NdrMessageLogRepository extends JpaRepository<NdrMessageLog, Integer> {
    List<NdrMessageLog> getNdrMessageLogByIdentifier(String identifier);
    Optional<NdrMessageLog> findFirstByIdentifierAndFileType(String identifier, String fileType);
    
}
