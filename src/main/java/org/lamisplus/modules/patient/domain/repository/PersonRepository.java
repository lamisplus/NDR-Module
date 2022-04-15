package org.lamisplus.modules.patient.domain.repository;

import org.lamisplus.modules.patient.domain.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {
    Person findPersonByUuid(String uuid);
    List<Person> getAllByArchived(Integer value);


    @Query(value = "Update person SET archived=true WHERE id=?",
            nativeQuery = true)
    void deletePersonById(Long id);
}
