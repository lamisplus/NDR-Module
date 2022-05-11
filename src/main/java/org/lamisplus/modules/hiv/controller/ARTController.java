package org.lamisplus.modules.hiv.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.hiv.domain.dto.ARTDto;
import org.lamisplus.modules.hiv.service.ArtService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/hiv/art")
public class ARTController {

    private final ArtService artService;

    @PostMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ARTDto> createArtCommencement(@RequestBody ARTDto artDto) {
        return ResponseEntity.ok (artService.createArtCommence (artDto));
    }

    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ARTDto>> getAllArtCommencement() {
        return ResponseEntity.ok (artService.getAll ());
    }


    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ARTDto> getArtCommencementById(@PathVariable("id") Long id) {
        return ResponseEntity.ok (artService.getArtById (id));
    }

    @PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ARTDto> updateArtCommencementById(
            @PathVariable("id") Long id,
            @RequestBody ARTDto artDto) {
        return ResponseEntity.ok (artService.updateArtCommence (id, artDto));
    }

    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> deleteArtCommencementId(@PathVariable("id") Long id) {
        artService.archivedArt (id);
        return ResponseEntity.accepted ().build ();
    }
}
