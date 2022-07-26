package org.lamisplus.modules.hiv.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.hiv.domain.dto.HIVEacDto;
import org.lamisplus.modules.hiv.domain.dto.ObservationDto;
import org.lamisplus.modules.hiv.service.HIVEacService;
import org.lamisplus.modules.hiv.service.ObservationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/observation")
public class ObservationController {

    private final ObservationService observationService;

    private final HIVEacService hivEacService;

    @PostMapping
    public ResponseEntity<ObservationDto> createObservation(@RequestBody ObservationDto observationDto) {
        return ResponseEntity.ok (observationService.createAnObservation (observationDto));
    }



    @PutMapping("/{id}")
    public ResponseEntity<ObservationDto> updateObservation(@PathVariable("id") Long id, @RequestBody ObservationDto observationDto) {
        return ResponseEntity.ok (observationService.updateObservation (id, observationDto));
    }

    @GetMapping("/person/{id}")
    public ResponseEntity<List<ObservationDto>> getObservationByPersonId(@PathVariable("id") Long id) {
        return ResponseEntity.ok (observationService.getAllObservationByPerson (id));
    }

    @PostMapping("/eac")
    public ResponseEntity<HIVEacDto> handleEac(@RequestBody HIVEacDto dto) {
        return ResponseEntity.ok (hivEacService.handleEac (dto));
    }
    @GetMapping("/eac/person/{id}")
    public ResponseEntity<List<HIVEacDto>> getEac(@PathVariable("id") Long id) {
        return ResponseEntity.ok (hivEacService.getEacByPersonId (id));
    }

    @GetMapping("/eac/person/current-eac/{id}")
    public ResponseEntity<HIVEacDto> getCurrentEac(@PathVariable("id") Long id) {
        return ResponseEntity.ok (hivEacService.getOpenEacByPersonId (id));
    }


}
