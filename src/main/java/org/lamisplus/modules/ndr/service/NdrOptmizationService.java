package org.lamisplus.modules.ndr.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.type.TypeFactory;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.ndr.domain.dto.*;
import org.lamisplus.modules.ndr.repositories.*;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@Slf4j
@RequiredArgsConstructor
public class NdrOptmizationService {
	
	private final NdrMessageLogRepository data;
	
	
	public void generatePatientsNDRXml(String patientId, long failityId, boolean initial) {
		int count = 0;
		if (getPatientNDRXml(patientId, failityId, true)) count++;
		log.info("size{}", count);
	}
	
	
	private boolean getPatientNDRXml(String patientId, long facilityId, boolean initial) {
		ObjectMapper objectMapper = new ObjectMapper();
		log.info("starting process patient xml file information");
		log.info("facilityId {}, patientId {}", facilityId, patientId);
		LocalDate start = LocalDate.of(1985, Month.JANUARY, 1);
		LocalDate end = LocalDate.now();
		log.info("start {}, end {}", start, end);
		
		PatientDemographicDTO patientDemographic =
				getPatientDemographic(patientId, facilityId, start, end);
		
		List<EncounterDTO> patientEncounters =
				getPatientEncounters(patientId, facilityId, objectMapper, start, end);
		
		List<RegimenDTO> patientRegimens =
				getPatientRegimens(patientId, facilityId, objectMapper, start, end);
		
		return true;
	}
	
	
	private List<RegimenDTO> getPatientRegimens(String patientId, long facilityId,
	    ObjectMapper objectMapper, LocalDate start, LocalDate end) {
		PatientPharmacyEncounterDTO patientPharmacyEncounterDTO;
		Optional<PatientPharmacyEncounterDTO> patientPharmacyEncounter =
				data.getPatientPharmacyEncounter(patientId, facilityId, start, end);
		if (patientPharmacyEncounter.isPresent()) {
			patientPharmacyEncounterDTO = patientPharmacyEncounter.get();
			log.info("patient pharmacy data {}", patientPharmacyEncounterDTO.getRegimens());
			List<RegimenDTO> patientRegimenList =
					getPatientRegimenList(patientPharmacyEncounterDTO, objectMapper);
			log.info("patientRegimenList {}", patientRegimenList);
			return  patientRegimenList;
		}
		return null;
	}
	
	private List<EncounterDTO> getPatientEncounters(String patientId, long facilityId,
	    ObjectMapper objectMapper, LocalDate start, LocalDate end) {
		PatientEncounterDTO patientEncounterDTO;
		Optional<PatientEncounterDTO> patientEncounter =
				data.getPatientEncounter(patientId, facilityId, start, end);
		if (patientEncounter.isPresent()) {
			patientEncounterDTO = patientEncounter.get();
			log.info("patient encounter data {}", patientEncounterDTO.getEncounters());
			List<EncounterDTO> patientEncounterDTOList =
					getPatientEncounterDTOList(patientEncounterDTO, objectMapper);
			log.info("patientEncounterDTOList {}", patientEncounterDTOList);
			return patientEncounterDTOList;
		}
		
		return null;
	}
	
	private PatientDemographicDTO getPatientDemographic(String patientId, long facilityId,
	               LocalDate start, LocalDate end) {
		PatientDemographicDTO patientDemographicDTO;
		Optional<PatientDemographicDTO> patientDemographicDTOOptional =
				data.getPatientDemographics(patientId, facilityId, start, end);
		if (patientDemographicDTOOptional.isPresent()) {
			log.info("patient demographic information were retrieved successfully");
			patientDemographicDTO = patientDemographicDTOOptional.get();
			log.info("demographic data {}", patientDemographicDTO.toString());
			log.info("functional status {}", patientDemographicDTO.getFunctionalStatusStartART());
			return  patientDemographicDTO;
		}
		return null;
	}
	
	private List<EncounterDTO> getPatientEncounterDTOList(PatientEncounterDTO patientEncounterDTO, ObjectMapper objectMapper) {
		try {
			TypeFactory typeFactory = objectMapper.getTypeFactory();
			return objectMapper.readValue(patientEncounterDTO.getEncounters(), typeFactory.constructCollectionType(List.class, EncounterDTO.class));
		} catch (Exception e) {
			log.error("Error reading encounters of patient with uuid {} errorMsg {}",
					patientEncounterDTO.getPatientUuid(), e.getMessage());
		}
		return new ArrayList<>();
	}
	
	private List<RegimenDTO> getPatientRegimenList(PatientPharmacyEncounterDTO pharmacyEncounterDTO, ObjectMapper objectMapper) {
		try {
			TypeFactory typeFactory = objectMapper.getTypeFactory();
			return objectMapper.readValue(pharmacyEncounterDTO.getRegimens(), typeFactory.constructCollectionType(List.class, RegimenDTO.class));
		} catch (Exception e) {
			log.error("Error reading regimens of patient with uuid {}  errorMsg {}",
					pharmacyEncounterDTO.getPatientUuid(), e.getMessage());
		}
		return new ArrayList<>();
	}
	
}
	

