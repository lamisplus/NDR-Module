package org.lamisplus.modules.ndr.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.ndr.domain.dto.*;
import org.lamisplus.modules.ndr.domain.entities.NdrMessageLog;
import org.lamisplus.modules.ndr.mapper.ConditionTypeMapper;
import org.lamisplus.modules.ndr.mapper.MessageHeaderTypeMapper;
import org.lamisplus.modules.ndr.mapper.PatientDemographicsMapper;
import org.lamisplus.modules.ndr.repositories.NdrMessageLogRepository;
import org.lamisplus.modules.ndr.repositories.NdrXmlStatusRepository;
import org.lamisplus.modules.ndr.schema.*;
import org.springframework.stereotype.Service;

import javax.xml.XMLConstants;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.Marshaller;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@Slf4j
@Service
@RequiredArgsConstructor
public class HtsService {
	
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
	
	
	public String generatePatientHtsNDRXml(long facilityId,
	                                       PatientDemographicDTO patientDemographic,
	                                   // List<EncounterDTO> patientEncounters,
	                                    //List<RegimenDTO> patientRegimens,
	                                   // List<LaboratoryEncounterDTO> patientLabEncounters,
	                                    boolean initial, List<NDRErrorDTO> ndrErrors) {
		log.info("generating ndr xml of patient with uuid {}", patientDemographic.getPatientIdentifier());
		try {
			log.info("fetching patient demographics....");
			long id = messageId.incrementAndGet();
			Container container = new Container();
			JAXBContext jaxbContext = JAXBContext.newInstance(Container.class);
			//caching this because is static
			PatientDemographicsType patientDemographics =
					patientDemographicsMapper.getPatientDemographics(patientDemographic, true);
			if (patientDemographics != null) {
				log.info("fetching treatment details... ");
				IndividualReportType individualReportType = new IndividualReportType();
				ConditionType conditionType =
						conditionTypeMapper.getConditionType(patientDemographic, true);
				individualReportType.setPatientDemographics(patientDemographics);
				MessageHeaderType messageHeader = messageHeaderTypeMapper.getMessageHeader(patientDemographic);
				String messageStatusCode = "INITIAL";
				if (!initial) {
					Optional<NdrMessageLog> firstByIdentifier =
							data.findFirstByIdentifier(patientDemographic.getPatientIdentifier());
					if (firstByIdentifier.isPresent()) {
						messageStatusCode = "UPDATED";
					}
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
				individualReportType.getHIVTestingReport();
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
			log.error("error: " + e.toString());
			e.printStackTrace();
			ndrErrors.add(new NDRErrorDTO(patientDemographic.getPersonUuid(),
					patientDemographic.getHospitalNumber(), e.toString()));
		}
		return null;
	}
}
