package org.lamisplus.modules.ndr.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.TypeFactory;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.ndr.domain.dto.*;
import org.lamisplus.modules.ndr.domain.entities.NdrMessageLog;
import org.lamisplus.modules.ndr.mapper.ConditionTypeMapper;
import org.lamisplus.modules.ndr.mapper.MessageHeaderTypeMapper;
import org.lamisplus.modules.ndr.mapper.PatientDemographicsMapper;
import org.lamisplus.modules.ndr.repositories.*;
import org.lamisplus.modules.ndr.schema.*;
import org.lamisplus.modules.ndr.utility.ZipUtility;
import org.springframework.stereotype.Service;

import javax.xml.XMLConstants;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.Marshaller;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;
import java.io.File;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;


@Service
@Slf4j
@RequiredArgsConstructor
public class NdrOptimizationService {
	
	private final NdrMessageLogRepository data;
	
	private final NDRService ndrService;
	
	private final MessageHeaderTypeMapper messageHeaderTypeMapper;
	private final PatientDemographicsMapper patientDemographicsMapper;
	private final ConditionTypeMapper conditionTypeMapper;
	
	private final NdrXmlStatusRepository ndrXmlStatusRepository;
	
	public static final String BASE_DIR = "runtime/ndr/transfer/";
	
	public static final String USER_DIR = "user.dir";
	
	public static final String JAXB_ENCODING = "UTF-8";
	public static final String XML_WAS_GENERATED_FROM_LAMISPLUS_APPLICATION = "\n<!-- This XML was generated from LAMISPlus application -->";
	public static final String HEADER_BIND_COMMENT = "com.sun.xml.bind.xmlHeaders";
	public final AtomicLong messageId = new AtomicLong(0);
	
	
	public void generatePatientsNDRXml(long facilityId, boolean initial) {
		AtomicInteger generatedCount = new AtomicInteger();
		AtomicInteger errorCount = new AtomicInteger();
		LocalDateTime start = LocalDateTime.of(1984, 1, 1, 0, 0);
		List<String> patientIds = new ArrayList<String>();
		List<NDRErrorDTO> ndrErrors = new ArrayList<NDRErrorDTO>();
		if (initial) {
			patientIds = data.getPatientIdsEligibleForNDR(start, facilityId);
		} else {
			Optional<Timestamp> lastGenerateDateTimeByFacilityId =
					ndrXmlStatusRepository.getLastGenerateDateTimeByFacilityId(facilityId);
			if (lastGenerateDateTimeByFacilityId.isPresent()) {
				LocalDateTime lastModified =
						lastGenerateDateTimeByFacilityId.get().toLocalDateTime();
				patientIds = data.getPatientIdsEligibleForNDR(lastModified, facilityId);
			}
		}
		patientIds.parallelStream().forEach(id -> {
					if (getPatientNDRXml(id, facilityId, initial, ndrErrors)){
						generatedCount.getAndIncrement();
					}else {
					    errorCount.getAndIncrement();
					}
				});
		log.info("generated  {}/{}", generatedCount.get(), patientIds.size());
		log.info("files not generated  {}/{}", errorCount.get(), patientIds.size());
		
		File folder = new File(BASE_DIR + "temp/" + facilityId + "/");
		log.info("fileSize {} bytes ", ZipUtility.getFolderSize(folder));
		if (ZipUtility.getFolderSize(folder) >= 15_000_000) {
			log.info(BASE_DIR + "temp/" + facilityId + "/" + " will be split into two");
		}
	}
	
	
	private boolean getPatientNDRXml(String patientId, long facilityId, boolean initial, List<NDRErrorDTO> ndrErrors) {
		ObjectMapper objectMapper = new ObjectMapper();
		log.info("starting process patient xml file information");
		log.info("facilityId {}, patientId {}", facilityId, patientId);
		LocalDate start = LocalDate.of(1985, Month.JANUARY, 1);
		LocalDate end = LocalDate.now().plusDays(1);
		log.info("start {}, end {}", start, end);
		
		PatientDemographicDTO patientDemographic =
				getPatientDemographic(patientId, facilityId,ndrErrors);
		
		if(!initial && patientDemographic != null) {
			Optional<NdrMessageLog> messageLog =
					data.findFirstByIdentifierAndFileType(patientDemographic.getPatientIdentifier(), "treatment");
			if (messageLog.isPresent()) {
				 start = messageLog.get().getLastUpdated().toLocalDate();
			}
		}
		List<EncounterDTO> patientEncounters =
				getPatientEncounters(patientId, facilityId, objectMapper, start, end, ndrErrors);
		
		List<RegimenDTO> patientRegimens =
				getPatientRegimens(patientId, facilityId, objectMapper, start, end, ndrErrors);
		if (patientDemographic == null) return false;
		String fileName = generatePatientNDRXml(facilityId,patientDemographic, patientEncounters, patientRegimens, initial, ndrErrors);
		if(fileName != null){
			saveTheXmlFile(patientDemographic.getPatientIdentifier(), fileName);
		}
		return fileName != null;
	}
	
	
	public String generatePatientNDRXml(long facilityId, PatientDemographicDTO patientDemographic,
	                                       List<EncounterDTO> patientEncounters,
	                                       List<RegimenDTO> patientRegimens, boolean initial, List<NDRErrorDTO> ndrErrors) {
		log.info("generating ndr xml of patient with uuid {}", patientDemographic.getPatientIdentifier());
		try {
			log.info("fetching patient demographics....");
			long id = messageId.incrementAndGet();
			Container container = new Container();
			JAXBContext jaxbContext = JAXBContext.newInstance(Container.class);
			//caching this because is static
			PatientDemographicsType patientDemographics =
					patientDemographicsMapper.getPatientDemographics(patientDemographic);
			if (patientDemographics != null) {
				log.info("fetching treatment details... ");
				IndividualReportType individualReportType = new IndividualReportType();
				ConditionType conditionType =
						conditionTypeMapper.getConditionType(patientDemographic, patientEncounters, patientRegimens);
				individualReportType.setPatientDemographics(patientDemographics);
				MessageHeaderType messageHeader = messageHeaderTypeMapper.getMessageHeader(patientDemographic);
				String messageStatusCode = "INITIAL";
				if (!initial) {
					messageStatusCode = "UPDATED";
				}
				messageHeader.setMessageStatusCode(messageStatusCode);
				messageHeader.setMessageUniqueID(Long.toString(id));
				container.setMessageHeader(messageHeader);
				container.setIndividualReport(individualReportType);
				log.info("done fetching treatment details ");
				Marshaller jaxbMarshaller = ndrService.getMarshaller(jaxbContext);
				jaxbMarshaller.setProperty(HEADER_BIND_COMMENT, XML_WAS_GENERATED_FROM_LAMISPLUS_APPLICATION);
				jaxbMarshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
				jaxbMarshaller.setProperty(Marshaller.JAXB_ENCODING, JAXB_ENCODING);
				SchemaFactory sf = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
				Schema schema = sf.newSchema(getClass().getClassLoader().getResource("NDR 1.6.2.xsd"));
				jaxbMarshaller.setSchema(schema);
				String identifier = patientDemographics.getPatientIdentifier();
				if (conditionType != null) {
					individualReportType.getCondition().add(conditionType);
				}
				log.info("converting treatment details to xml... ");
				String fileName = ndrService.processAndGenerateNDRFile(facilityId, jaxbMarshaller, container, patientDemographic, id, ndrErrors);
				if (fileName != null) {
					log.info("NDR XML was successfully generated for patient with hospital number " + patientDemographic.getHospitalNumber());
				}
				return fileName;
			}
		} catch (Exception e) {
			log.error("An error occur when generating person with hospital number {}",
					patientDemographic.getHospitalNumber());
			log.error("error: " + e.getMessage());
			ndrErrors.add(new NDRErrorDTO(patientDemographic.getPersonUuid(),
					patientDemographic.getHospitalNumber(), e.getMessage()));
		}
		return null;
	}
	
	
	private List<RegimenDTO> getPatientRegimens(String patientId, long facilityId,
	                                            ObjectMapper objectMapper, LocalDate start, LocalDate end, List<NDRErrorDTO> ndrErrors) {
		try {
			PatientPharmacyEncounterDTO patientPharmacyEncounterDTO;
			Optional<PatientPharmacyEncounterDTO> patientPharmacyEncounter =
					data.getPatientPharmacyEncounter(patientId, facilityId, start, end);
			if (patientPharmacyEncounter.isPresent()) {
				patientPharmacyEncounterDTO = patientPharmacyEncounter.get();
				log.info("patient pharmacy data {}", patientPharmacyEncounterDTO.getRegimens());
				List<RegimenDTO> patientRegimenList =
						getPatientRegimenList(patientPharmacyEncounterDTO, objectMapper, ndrErrors);
				log.info("patientRegimenList {}", patientRegimenList);
				return patientRegimenList;
			}
		} catch (Exception e) {
			log.error("An error occurred while getting patient regimen list", e.getMessage());
			ndrErrors.add(new NDRErrorDTO(patientId, "", e.getMessage()));
		}
		return null;
	}
	
	private List<EncounterDTO> getPatientEncounters(String patientId, long facilityId, ObjectMapper objectMapper, LocalDate start, LocalDate end, List<NDRErrorDTO> ndrErrors) {
		PatientEncounterDTO patientEncounterDTO;
		Optional<PatientEncounterDTO> patientEncounter =
				data.getPatientEncounter(patientId, facilityId, start, end);
		if (patientEncounter.isPresent()) {
			patientEncounterDTO = patientEncounter.get();
			log.info("patient encounter data {}", patientEncounterDTO.getEncounters());
			List<EncounterDTO> patientEncounterDTOList =
					getPatientEncounterDTOList(patientEncounterDTO, objectMapper, ndrErrors);
			log.info("patientEncounterDTOList {}", patientEncounterDTOList);
			return patientEncounterDTOList;
		}
		
		return null;
	}
	
	private PatientDemographicDTO getPatientDemographic(String patientId, long facilityId,List<NDRErrorDTO> ndrErrors ) {
		try {
			PatientDemographicDTO patientDemographicDTO;
			Optional<PatientDemographicDTO> patientDemographicDTOOptional =
					data.getPatientDemographics(patientId, facilityId);
			if (patientDemographicDTOOptional.isPresent()) {
				log.info("patient demographic information were retrieved successfully");
				patientDemographicDTO = patientDemographicDTOOptional.get();
				log.info("demographic data {}", patientDemographicDTO.toString());
				log.info("functional status {}", patientDemographicDTO.getFunctionalStatusStartART());
				return patientDemographicDTO;
			}
		}catch (Exception e) {
		    log.error("An error occur while fetching patient with uuid {} information error {}",patientId, e.getMessage());
			 ndrErrors.add(new NDRErrorDTO(patientId, "", e.getMessage()));
		}
		return null;
	}
	
	private List<EncounterDTO> getPatientEncounterDTOList(
			PatientEncounterDTO patientEncounterDTO,
			ObjectMapper objectMapper,
			List<NDRErrorDTO> ndrErrors) {
		try {
			TypeFactory typeFactory = objectMapper.getTypeFactory();
			return objectMapper.readValue(patientEncounterDTO.getEncounters(), typeFactory.constructCollectionType(List.class, EncounterDTO.class));
		} catch (Exception e) {
			log.error("Error reading encounters of patient with uuid {} errorMsg {}",
					patientEncounterDTO.getPatientUuid(), e.getMessage());
			ndrErrors.add(new NDRErrorDTO(patientEncounterDTO.getPatientUuid(),
					"", e.getMessage()));
			
		}
		return new ArrayList<>();
	}
	
	private List<RegimenDTO> getPatientRegimenList(PatientPharmacyEncounterDTO pharmacyEncounterDTO, ObjectMapper objectMapper, List<NDRErrorDTO> ndrErrors) {
		try {
			TypeFactory typeFactory = objectMapper.getTypeFactory();
			return objectMapper.readValue(pharmacyEncounterDTO.getRegimens(), typeFactory.constructCollectionType(List.class, RegimenDTO.class));
		} catch (Exception e) {
			log.error("Error reading regimens of patient with uuid {}  errorMsg {}",
					pharmacyEncounterDTO.getPatientUuid(), e.getMessage());
			ndrErrors.add(new NDRErrorDTO(pharmacyEncounterDTO.getPatientUuid(), "", e.getMessage()));
		}
		return new ArrayList<>();
	}
	
	private void saveTheXmlFile(String identifier, String fileName) {
		NdrMessageLog ndrMessageLog = new NdrMessageLog();
		ndrMessageLog.setIdentifier(identifier);
		ndrMessageLog.setFile(fileName);
		ndrMessageLog.setLastUpdated(LocalDateTime.now());
		ndrMessageLog.setFileType("treatment");
		data.save(ndrMessageLog);
	}
	
}
	

