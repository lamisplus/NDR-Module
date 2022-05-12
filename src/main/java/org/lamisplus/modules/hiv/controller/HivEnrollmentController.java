package org.lamisplus.modules.hiv.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.hiv.domain.dto.HivEnrollmentDto;
import org.lamisplus.modules.hiv.service.HivEnrollmentService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/hiv/enrollment")
public class HivEnrollmentController {
    private final HivEnrollmentService hivEnrollmentService;

    @PostMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<HivEnrollmentDto> createHivEnrollment(@RequestBody HivEnrollmentDto hiv) {
        return ResponseEntity.ok (hivEnrollmentService.createHivEnrollment (hiv));
    }

    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<HivEnrollmentDto>> getAllHivEnrollments() {
        return ResponseEntity.ok (hivEnrollmentService.getAll());
    }


    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<HivEnrollmentDto> getHivEnrollmentById(@PathVariable("id") Long id) {
        return ResponseEntity.ok (hivEnrollmentService.getHivEnrollmentById (id));
    }

    @PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<HivEnrollmentDto> updateHivEnrollmentById(@PathVariable("id") Long id, @RequestBody HivEnrollmentDto hivEnrollment) {
        return ResponseEntity.ok (hivEnrollmentService.updateHivEnrollment (id, hivEnrollment));
    }

    @DeleteMapping(value = "/{id}",  produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> deleteHivEnrollmentById(@PathVariable("id") Long id) {
        hivEnrollmentService.deleteHivEnrollment (id);
        return ResponseEntity.accepted ().build ();
    }
}
