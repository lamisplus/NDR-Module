package org.lamisplus.modules.hiv.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.hiv.domain.dto.RegisterArtPharmacyDto;
import org.lamisplus.modules.hiv.service.ArtPharmacyService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/hiv/art/pharmacy")
public class ArtPharmacyController {
    private final ArtPharmacyService artPharmacyService;

    @PostMapping
    ResponseEntity<RegisterArtPharmacyDto> registerArtPharmacy(@RequestBody RegisterArtPharmacyDto registerArtPharmacyDto) throws IOException {
        return ResponseEntity.ok (artPharmacyService.registerArtPharmacy (registerArtPharmacyDto));
    }

    @PutMapping("/{id}")
    ResponseEntity<RegisterArtPharmacyDto> updateArtPharmacy(
            @PathVariable("id") Long id,
            @RequestBody RegisterArtPharmacyDto registerArtPharmacyDto) throws IOException {
        return ResponseEntity.ok (artPharmacyService.updateArtPharmacy (id, registerArtPharmacyDto));
    }

    @GetMapping
    public ResponseEntity<List<RegisterArtPharmacyDto>> getAllEmployees(
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestParam Long personId) {
        List<RegisterArtPharmacyDto> list = artPharmacyService.getPharmacyByPersonId (personId, pageNo, pageSize);
        return new ResponseEntity<> (list, new HttpHeaders (), HttpStatus.OK);
    }

}
