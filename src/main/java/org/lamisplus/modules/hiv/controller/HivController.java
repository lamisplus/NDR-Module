package org.lamisplus.modules.hiv.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.hiv.domain.dto.HivEnrollmentDto;
import org.lamisplus.modules.hiv.domain.entity.HivEnrollment;
import org.lamisplus.modules.hiv.domain.entity.TestEntity;
import org.lamisplus.modules.hiv.service.HivService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/hiv")
public class HivController {

    private final HivService hivService;

    @RequestMapping(value = "",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<HivEnrollment> createHivEnrollment(@RequestBody HivEnrollment hiv) {
        return ResponseEntity.ok (hivService.createHivEnrollment (hiv));
    }

    @RequestMapping(value = "/test", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TestEntity> createTest(@RequestBody TestEntity testEntity) {
        return ResponseEntity.ok (hivService.createTest (testEntity));
    }

    @RequestMapping(value = "", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<HivEnrollment>> getAllHivEnrollments() {
        return ResponseEntity.ok (hivService.getAll());
    }


    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<HivEnrollmentDto> getHivEnrollmentById(@PathVariable("id") Long id) {
        return ResponseEntity.ok (hivService.getHivEnrollmentById (id));
    }
//
//    @RequestMapping(value = "/{id}",
//            method = RequestMethod.PUT,
//            produces = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<HivEnrollmentDto> updateHivEnrollmentById(
//            @PathVariable("id") Long id,
//            @RequestBody HivEnrollment hivEnrollmentUpdateView) {
//        return ResponseEntity.ok (hivService.updateHivEnrollment (id, hivEnrollmentUpdateView));
//    }
//
    @RequestMapping(value = "/{id}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> deleteHivEnrollmentById(@PathVariable("id") Long id) {
        hivService.deleteHivEnrollment (id);
        return ResponseEntity.accepted ().build ();
    }
}
