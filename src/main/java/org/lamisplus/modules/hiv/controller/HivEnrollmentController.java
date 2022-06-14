package org.lamisplus.modules.hiv.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.hiv.domain.dto.HivEnrollmentDto;
import org.lamisplus.modules.hiv.domain.dto.HivPatientDto;
import org.lamisplus.modules.hiv.domain.dto.HivPatientEnrollmentDto;
import org.lamisplus.modules.hiv.service.HivEnrollmentService;
import org.lamisplus.modules.hiv.service.HivPatientService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/hiv/")
public class HivEnrollmentController {
    private final HivEnrollmentService hivEnrollmentService;

    private  final HivPatientService patientService;

    @PostMapping(value = "enrollment", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<HivPatientDto> createHivEnrollment(@RequestBody HivEnrollmentDto hiv) {
        return ResponseEntity.ok (hivEnrollmentService.createHivEnrollment (hiv));
    }

    @GetMapping(value = "patient/enrollment", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<HivPatientDto>> getAllHivEnrollments() {
        return ResponseEntity.ok (hivEnrollmentService.getAll());
    }

    @GetMapping(value = "patients", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<HivPatientDto>> getHivPatient() {
        return ResponseEntity.ok (patientService.getHivPatients ());
    }

    @PostMapping(value = "patient", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<HivPatientDto> RegisterHivPatient(@RequestBody HivPatientEnrollmentDto hivPatientEnrollmentDto) {
        return ResponseEntity.ok (patientService.registerAndEnrollHivPatient(hivPatientEnrollmentDto));
    }
    @GetMapping(value = "patient/checked-in", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<HivPatientDto>> getHivCheckInPatients() {
        return ResponseEntity.ok (patientService.getHivCheckedInPatients ());
    }
    @GetMapping(value = "patient/id", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<HivPatientDto> getHivPatientById(@PathVariable("id") Long id) {
        return ResponseEntity.ok (patientService.getHivPatientById (id));
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
