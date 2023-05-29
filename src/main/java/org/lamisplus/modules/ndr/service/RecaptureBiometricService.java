package org.lamisplus.modules.ndr.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.ndr.domain.PatientDemographics;
import org.lamisplus.modules.ndr.domain.dto.RecaptureBiometricDTO;
import org.lamisplus.modules.ndr.domain.entities.NdrMessageLog;
import org.lamisplus.modules.ndr.domain.entities.NdrXmlStatus;
import org.lamisplus.modules.ndr.mapper.RecaptureBiometricMapper;
import org.lamisplus.modules.ndr.repositories.NDRCodeSetRepository;
import org.lamisplus.modules.ndr.repositories.NdrMessageLogRepository;
import org.lamisplus.modules.ndr.repositories.NdrXmlStatusRepository;
import org.lamisplus.modules.ndr.schema.recapture.Container;
import org.springframework.stereotype.Service;
import org.xml.sax.SAXException;

import javax.xml.XMLConstants;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;
import java.io.File;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;

import static javax.xml.bind.Marshaller.JAXB_ENCODING;
import static org.lamisplus.modules.ndr.service.NDRService.formulateFileName;

@Service
@RequiredArgsConstructor
@Slf4j
public class RecaptureBiometricService {
	
	private final RecaptureBiometricMapper biometricMapper;
	
	private final NdrMessageLogRepository ndrMessageLogRepository;
	
	private final NdrXmlStatusRepository ndrXmlStatusRepository;
	private final NDRCodeSetRepository nDRCodeSetRepository;
	
	private final NDRCodeSetResolverService ndrCodeSetResolverService;
	
	private final  NDRService ndrService;
	
	

	
	public boolean generateRecaptureBiometrics(Long facilityId) {
		String pathname = NDRService.BASE_DIR + "temp/biorecapture/" + facilityId  + "/";
		ndrService.cleanupFacility(facilityId,pathname);
		AtomicInteger count = new AtomicInteger(0);
		log.info("start generating recapture biometrics patients");
		List<String> patientsIds = nDRCodeSetRepository.getNDREligiblePatientUuidList(facilityId);
		log.info("About {} patients are identified for generating NDR file", patientsIds.size());
		if (patientsIds.isEmpty()) {
			return false;
		}
		log.info("fetching patient demographics");
		List<PatientDemographics> demographics = new ArrayList<>();
		patientsIds.parallelStream()
				.limit(2)
				.forEach(id -> {
					Optional<PatientDemographics> demographicsOptional =
							ndrXmlStatusRepository.getPatientDemographicsByUUID(id);
					demographicsOptional.ifPresent(d -> {
						try {
							Container container = biometricMapper.getRecaptureBiometricMapper(d);
							if (container != null) {
								JAXBContext jaxbContext = JAXBContext.newInstance(Container.class);
								Marshaller jaxbMarshaller = getMarshaller(jaxbContext);
								SchemaFactory sf = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
								Schema schema = sf.newSchema(getClass().getClassLoader().getResource("NDR_FP_1.xsd"));
								jaxbMarshaller.setSchema(schema);
								//creating file
								File dir = new File(pathname);
								if (!dir.exists()) {
									log.info("directory created => : {}", dir.mkdirs());
								}
								String identifier = container.getPatientDemographics().getPatientIdentifier();
								String fileName = generateFileName(d, identifier);
								File file = new File(pathname + fileName);
								jaxbMarshaller.marshal(container, file);
								saveTheXmlFile(identifier, fileName);
								count.getAndIncrement();
								demographics.add(d);
							}
						} catch (JAXBException | SAXException e) {
							log.error("An error occurred while marshalling the container for patient with id {}  error {}",
									id, e.getMessage());
						}
					});
				});
		if(!demographics.isEmpty()) {
			zipAndSaveTheFilesforDownload(facilityId, pathname, count, demographics);
		}
		
		return true;
	}
	
	
	private void saveTheXmlFile(String identifier, String fileName) {
		NdrMessageLog ndrMessageLog = new NdrMessageLog();
		ndrMessageLog.setIdentifier(identifier);
		ndrMessageLog.setFile(fileName);
		ndrMessageLog.setLastUpdated(LocalDateTime.now());
		ndrMessageLog.setFileType("recaptured-biometric");
		ndrMessageLogRepository.save(ndrMessageLog);
	}
	
	
	private void zipAndSaveTheFilesforDownload(Long facilityId, String pathname, AtomicInteger count, List<PatientDemographics> demographics) {
		String zipFileName = ndrService.zipFiles(demographics.get(0), pathname);
		NdrXmlStatus ndrXmlStatus = new NdrXmlStatus ();
		ndrXmlStatus.setFacilityId (facilityId);
		ndrXmlStatus.setFiles (count.get());
		ndrXmlStatus.setFileName (zipFileName);
		ndrXmlStatus.setLastModified (LocalDateTime.now ());
		ndrXmlStatus.setPushIdentifier(demographics.get(0).getDatimId().concat("_").concat(demographics.get(0).getPersonUuid()));
		ndrXmlStatus.setCompletelyPushed(Boolean.FALSE);
		ndrXmlStatus.setPercentagePushed(0L);
		ndrXmlStatusRepository.save (ndrXmlStatus);
	}
	
	private Marshaller getMarshaller(JAXBContext jaxbContext) throws JAXBException {
		Marshaller marshaller = jaxbContext.createMarshaller();
		marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
		marshaller.setProperty(Marshaller.JAXB_ENCODING, "UTF-8");
		//marshaller.setProperty(Marshaller.JAXB_ENCODING, JAXB_ENCODING);
		return marshaller;
	}
	
	
	private String generateFileName( PatientDemographics demographics, String identifier) {
		return formulateFileName(demographics, identifier+"_bio_recapture", ndrCodeSetResolverService);
	}
	
	
	
	
}
