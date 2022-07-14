package org.lamisplus.modules.hiv.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.hiv.domain.dto.RegisterArtPharmacyDto;
import org.lamisplus.modules.hiv.service.ArtPharmacyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

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

}
