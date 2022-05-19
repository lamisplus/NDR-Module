package org.lamisplus.modules.hiv.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.hiv.domain.dto.HivEnrollmentDto;
import org.lamisplus.modules.hiv.domain.dto.HivPatientDto;
import org.lamisplus.modules.hiv.service.HivEnrollmentService;
import org.lamisplus.modules.hiv.service.HivPatientService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/hiv/")
public class HivEnrollmentController {
    private final HivEnrollmentService hivEnrollmentService;

    private  final HivPatientService patientService;

    @PostMapping(value = "enrollment", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<HivPatientDto> createHivEnrollment(@RequestBody HivEnrollmentDto hiv) {
        return ResponseEntity.ok (hivEnrollmentService.createHivEnrollment (hiv));
    }

    @GetMapping(value = "enrollment", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<HivPatientDto>> getAllHivEnrollments() {
        return ResponseEntity.ok (hivEnrollmentService.getAll());
    }

    @GetMapping(value = "patient", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<HivPatientDto>> getHivPatient() {
        return ResponseEntity.ok (patientService.getHivPatient ());
    }


    @GetMapping(value = "enrollment/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<HivPatientDto> getHivEnrollmentById(@PathVariable("id") Long id) {
        return ResponseEntity.ok (hivEnrollmentService.getHivEnrollmentById (id));
    }

    @PutMapping(value = "enrollment/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<HivPatientDto> updateHivEnrollmentById(@PathVariable("id") Long id, @RequestBody HivEnrollmentDto hivEnrollment) {
        return ResponseEntity.ok (hivEnrollmentService.updateHivEnrollment (id, hivEnrollment));
    }

    @DeleteMapping(value = "enrollment/{id}",  produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> deleteHivEnrollmentById(@PathVariable("id") Long id) {
        hivEnrollmentService.deleteHivEnrollment (id);
        return ResponseEntity.accepted ().build ();
    }
}
