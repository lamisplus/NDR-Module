package org.lamisplus.modules.hiv.controller;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.hiv.domain.dto.ARTClinicVisitDto;
import org.lamisplus.modules.hiv.domain.dto.HIVEacDto;
import org.lamisplus.modules.hiv.service.HIVEacService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/hiv/eac")
public class EacController {
	
	private final HIVEacService hIVEacService;
	
	
	@GetMapping(value = "/patient/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<HIVEacDto>> getAllArtClinicVisit(@PathVariable("id") Long id) {
		return ResponseEntity.ok(hIVEacService.getPatientEAcs(id));
	}
	
	@PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<HIVEacDto> stopEac(@PathVariable("id") Long id,
	                                         @RequestParam("reason") String reason) {
		return ResponseEntity.ok(hIVEacService.stopEac(id, reason));
	}
}
