package org.lamisplus.modules.hiv.controller;

import com.google.common.base.Stopwatch;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.base.domain.dto.PageDTO;
import org.lamisplus.modules.hiv.service.HivEnrollmentService;
import org.lamisplus.modules.hiv.service.HivPatientService;
import org.lamisplus.modules.hiv.service.PatientActivityService;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v2/hiv/")
public class HIVPatientController {
	
	private final HivEnrollmentService hivEnrollmentService;
	
	private final HivPatientService patientService;
	
	private final PatientActivityService patientActivityService;
	
	@GetMapping(value = "patients", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<PageDTO> getHivPatient(
			@RequestParam(required = false ) String searchValue,
			@RequestParam(defaultValue = "0") Integer pageNo,
			@RequestParam(defaultValue = "10") Integer pageSize) {
		Stopwatch stopwatch = Stopwatch.createStarted();
		PageDTO hivPatients = patientService.getHivPatients(searchValue, PageRequest.of(pageNo, pageSize));
		log.info("total time taken to load 10 records :{}", stopwatch.elapsed().toMillis());
		return ResponseEntity.ok (hivPatients);
	}
}
