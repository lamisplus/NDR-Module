package org.lamisplus.modules.patient.service;

import com.blazebit.persistence.CriteriaBuilderFactory;
import com.blazebit.persistence.view.EntityViewManager;
import lombok.RequiredArgsConstructor;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.lamisplus.modules.patient.domain.repository.PersonRepository;
import org.lamisplus.modules.patient.domain.views.PersonCreateView;
import org.lamisplus.modules.patient.domain.views.PersonUpdateView;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor

public class PersonService {
    private final PersonRepository personRepository;
    @Qualifier("PatientEntityViewManager")
    private final EntityViewManager evm;
    @Qualifier("PatientEntityManager")
    private final EntityManager em;
    @Qualifier("PatientCriteriaBuilderFactory")
    private final CriteriaBuilderFactory cbf;


    @Transactional
    public PersonUpdateView createPerson(PersonCreateView data) {
        evm.save (em, data);
        return evm.convert (data, PersonUpdateView.class);
    }


    @Transactional
    public PersonCreateView updatePerson(Long id, PersonUpdateView person) {
        checkAndReturnPerson (id);
        evm.save (em, person);
        return person;
    }



    public List<PersonUpdateView> getAllPerson() {
        return personRepository.getAllByArchived (0)
                .stream ()
                .map (person -> evm.convert (person, PersonUpdateView.class))
                .collect (Collectors.toList ());
    }


    public PersonUpdateView getPersonById(Long id) {
        Person person = checkAndReturnPerson (id);
        return evm.convert (person, PersonUpdateView.class);
    }


    @Transactional
    public Long deletePersonById(Long id) {
        Person person = checkAndReturnPerson (id);
        PersonUpdateView personUpdateView = evm.convert (person, PersonUpdateView.class);
        personUpdateView.setArchived (1);
        evm.save (em, personUpdateView);
        return 1L;
    }

    private Person checkAndReturnPerson(Long id) {
        return personRepository.findById (id)
                .orElseThrow (() -> new RuntimeException ("person with Id " + id + " is not found"));

    }
}


