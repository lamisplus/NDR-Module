package org.lamisplus.modules.hiv.repositories;

import org.lamisplus.modules.hiv.domain.entity.HIVStatusTracker;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface HIVStatusTrackerRepository extends JpaRepository<HIVStatusTracker, Long>, JpaSpecificationExecutor<HIVStatusTracker> {

    List<HIVStatusTracker> findAllByPersonAndArchived(Person person, Integer archived);

    HIVStatusTracker findDistinctFirstByPersonAndStatusDate(Person person, LocalDate statusDate);
    
    @Query(value ="SELECT * FROM hiv_status_tracker WHERE person_id = ?1 AND status_date <= ?2  AND archived = 0 " +
            "order by status_date  DESC LIMIT 1", nativeQuery = true)
    Optional<HIVStatusTracker>getStatusByPersonUuidAndDateRange(String personUuid, LocalDate endDate);
   
    @Query(value ="SELECT cause_of_death FROM hiv_status_tracker \n" +
            "WHERE person_id = ?1 \n" +
            "order by status_date desc limit 1", nativeQuery = true)
    String getCauseOfDeathByPersonUuid(String personUuid);
}
