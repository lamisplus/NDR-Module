package org.lamisplus.modules.patient.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.patient.domain.views.PersonCreateView;
import org.lamisplus.modules.patient.domain.views.PersonUpdateView;
import org.lamisplus.modules.patient.service.PersonService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/patient")
public class PatientController {
    private final PersonService personService;

    @RequestMapping(value = "",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PersonUpdateView> createPerson(@RequestBody PersonCreateView patient) {
        return ResponseEntity.ok (personService.createPerson (patient));
    }

    @RequestMapping(value = "",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<PersonUpdateView>> getAllPersons() {
        return ResponseEntity.ok (personService.getAllPerson ());
    }

    @RequestMapping(value = "/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PersonUpdateView> getPerson(@PathVariable("id") Long id) {
        return ResponseEntity.ok (personService.getPersonById (id));
    }

    @RequestMapping(value = "/{id}",
            method = RequestMethod.PUT,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PersonCreateView> updatePerson(
            @PathVariable("id") Long id,
            @RequestBody PersonUpdateView patient) {
        return ResponseEntity.ok (personService.updatePerson (id, patient));
    }

    @RequestMapping(value = "/{id}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> deletePerson(@PathVariable("id") Long id) throws Exception {
        personService.deletePersonById (id);
        return ResponseEntity.accepted ().build ();
    }

}
