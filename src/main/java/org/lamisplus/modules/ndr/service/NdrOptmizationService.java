package org.lamisplus.modules.ndr.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import liquibase.pro.packaged.S;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.base.domain.repositories.OrganisationUnitRepository;
import org.lamisplus.modules.base.service.OrganisationUnitService;
import org.lamisplus.modules.base.service.UserService;
import org.lamisplus.modules.hiv.domain.entity.ArtPharmacy;
import org.lamisplus.modules.hiv.repositories.ARTClinicalRepository;
import org.lamisplus.modules.hiv.repositories.ArtPharmacyRepository;
import org.lamisplus.modules.ndr.domain.dto.*;
import org.lamisplus.modules.ndr.domain.entities.NDRCodeSet;
import org.lamisplus.modules.ndr.domain.entities.NDRDATA;
import org.lamisplus.modules.ndr.mapper.ConditionTypeMapper;
import org.lamisplus.modules.ndr.mapper.MessageHeaderTypeMapper;
import org.lamisplus.modules.ndr.mapper.NDREligibleClientMapper;
import org.lamisplus.modules.ndr.mapper.PatientDemographicsMapper;
import org.lamisplus.modules.ndr.repositories.*;
import org.lamisplus.modules.patient.repository.PersonRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;



@Service
@Slf4j
@RequiredArgsConstructor
public class NdrOptmizationService {
	
	private  final NDRMessagesRepository data;
	
	
	
	public void generatePatientsNDRXml(String patientId, long failityId, boolean initial){
		int count = 0;
		if(getPatientNDRXml(patientId,failityId, true)) count++;
		log.info("size{}",count);
	}
	
	
	
	private  boolean getPatientNDRXml(String patientId, long facilityId, boolean initial){
		log.info("starting process patient xml file information");
		PatientDemographicDTO patientDemographicDTO =  null;
		log.info("facilityId {}, patientId {}",facilityId, patientId);
		LocalDate start = LocalDate.of(1985, Month.JANUARY, 1);
		LocalDate end = LocalDate.now();
		log.info("start {}, end {}", start, end);
		Optional<PatientDemographicDTO> patientDemographicDTOOptional =
				data.getPatientDemographics(patientId, facilityId, start, end);
		
		if(patientDemographicDTOOptional.isPresent()){
			log.info("patient demographic information were retrieved successfully");
			patientDemographicDTO = patientDemographicDTOOptional.get();
			log.info("demographic data {}", patientDemographicDTO.toString());
			log.info("functional status {}", patientDemographicDTO.getFunctionalStatusStartART());
			return true;
		}
		
		return false;
	}
	
}
