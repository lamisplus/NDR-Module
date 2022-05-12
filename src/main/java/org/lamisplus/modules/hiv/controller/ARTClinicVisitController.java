package org.lamisplus.modules.hiv.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.hiv.domain.dto.ARTClinicVisitDto;
import org.lamisplus.modules.hiv.service.ArtClinicVisitService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/hiv/art/clinic-visit")
public class ARTClinicVisitController {

    private final ArtClinicVisitService artClinicVisitService;


    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ARTClinicVisitDto> createArtClinicVisit(@RequestBody ARTClinicVisitDto artClinicVisitDto) {
        return ResponseEntity.ok (artClinicVisitService.createArtClinicVisit (artClinicVisitDto));
    }

    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ARTClinicVisitDto>> getAllArtClinicVisit() {
        return ResponseEntity.ok (artClinicVisitService.getAllArtClinicVisit ());
    }


    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ARTClinicVisitDto> getArtClinicVisitById(@PathVariable("id") Long id) {
        return ResponseEntity.ok (artClinicVisitService.getArtClinicVisitById (id));
    }

    @PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ARTClinicVisitDto> updateArtClinicVisitById(
            @PathVariable("id") Long id,
            @RequestBody ARTClinicVisitDto artClinicVisitDto) {
        return ResponseEntity.ok (artClinicVisitService.updateClinicVisit (id, artClinicVisitDto));
    }

    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> deleteArtClinicVisitId(@PathVariable("id") Long id) {
        artClinicVisitService.archivedClinicVisit (id);
        return ResponseEntity.accepted ().build ();
    }
}
