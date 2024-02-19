package org.lamisplus.modules.ndr.mapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.lamisplus.modules.hiv.domain.entity.ArtPharmacy;
import org.lamisplus.modules.hiv.domain.entity.Regimen;
import org.lamisplus.modules.hiv.repositories.ArtPharmacyRepository;
import org.lamisplus.modules.hiv.repositories.RegimenTypeRepository;
import org.lamisplus.modules.ndr.domain.dto.PatientDemographicDTO;
import org.lamisplus.modules.ndr.domain.dto.PatientDemographics;
import org.lamisplus.modules.ndr.domain.dto.RegimenDTO;
import org.lamisplus.modules.ndr.schema.CodedSimpleType;
import org.lamisplus.modules.ndr.schema.ConditionType;
import org.lamisplus.modules.ndr.schema.RegimenType;
import org.lamisplus.modules.ndr.service.NDRCodeSetResolverService;
import org.lamisplus.modules.ndr.utility.DateUtil;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.lamisplus.modules.patient.repository.PersonRepository;
import org.springframework.stereotype.Service;
import javax.xml.datatype.DatatypeConfigurationException;
import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Slf4j
public class RegimenTypeMapper {
	
	private final RegimenTypeRepository regimenTypeRepository;
	
	private final ArtPharmacyRepository artPharmacyRepository;
	
	private final PersonRepository personRepository;
	
	private final NDRCodeSetResolverService ndrCodeSetResolverService;
	
	
	public ConditionType regimenType(PatientDemographics demographics, ConditionType condition) {
		if(demographics != null ){
			Person person = personRepository.getOne(demographics.getId());
			Comparator<ArtPharmacy> artVisitDateComparator = Comparator.comparing(ArtPharmacy::getVisitDate);
			Set<ArtPharmacy> patientRegimens = artPharmacyRepository
					.findAll()
					.stream()
					.filter(artPharmacy -> artPharmacy.getPerson().getUuid().equals(person.getUuid()))
					.collect(Collectors.toSet());
			log.info(person.getHospitalNumber() + " pharmacy visit is : {}", patientRegimens.size());
			List<Long> regimenTypeIds = new ArrayList<> (Arrays.asList (1L, 2L, 3L, 4L, 14L, 8L));
			patientRegimens.forEach(artPharmacy -> {
				Set<Regimen> regimens = artPharmacy.getRegimens()
						.stream()
						.filter(r -> regimenTypeIds.contains(r.getRegimenType ().getId ())).collect(Collectors.toSet());
				log.info(person.getHospitalNumber() + "regimens : {}", regimens.size() );
				processAndSetPrescribeRegimen(artPharmacy, regimens, artVisitDateComparator, patientRegimens, condition);
			});
		}
		sortConditionRegimenType(condition);
		return condition;
	}
	
	
	
	public ConditionType regimenType(PatientDemographics demographics, ConditionType condition, List<ArtPharmacy> patientRegimens) {
		if(demographics != null ){
			Person person = personRepository.getOne(demographics.getId());
			Comparator<ArtPharmacy> artVisitDateComparator = Comparator.comparing(ArtPharmacy::getVisitDate);
			 artPharmacyRepository
					.findAll()
					.stream()
					.filter(artPharmacy -> artPharmacy.getPerson().getUuid().equals(person.getUuid()))
					.collect(Collectors.toSet());
			log.info(person.getHospitalNumber() + " pharmacy visit is : {}", patientRegimens.size());
			List<Long> regimenTypeIds = new ArrayList<> (Arrays.asList (1L, 2L, 3L, 4L, 14L, 8L));
			patientRegimens.forEach(artPharmacy -> {
				Set<Regimen> regimens = artPharmacy.getRegimens()
						.stream()
						.filter(r -> regimenTypeIds.contains(r.getRegimenType ().getId ())).collect(Collectors.toSet());
				log.info(person.getHospitalNumber() + "regimens : {}", regimens.size() );
				processAndSetPrescribeRegimen(artPharmacy, regimens, artVisitDateComparator, patientRegimens.stream().collect(Collectors.toSet()), condition);
			});
		}
		sortConditionRegimenType(condition);
		return condition;
	}
	public ConditionType regimenType(PatientDemographicDTO demographics, ConditionType condition, List<RegimenDTO> regimens) {
		List<RegimenType> regimenTypeList = condition.getRegimen();
//		@XmlElement(name = "VisitID", required = true) ---- >  done checked
//		protected String visitID;
//		@XmlElement(name = "VisitDate", required = true)  ---- >  done checked
//		@XmlSchemaType(name = "date")
//		protected XMLGregorianCalendar visitDate;
//		@XmlElement(name = "PrescribedRegimen", required = true) ---- >  done checked
//		protected CodedSimpleType prescribedRegimen;
//		@XmlElement(name = "PrescribedRegimenTypeCode", required = true) ---- >  done checked
//		@XmlElement(name = "PrescribedRegimenDuration", required = true)  ---- >  done checked
//		@XmlElement(name = "PrescribedRegimenDispensedDate", required = true)   ---- >  done checked
		if(regimens != null ) {
			regimens.parallelStream()
					.forEach(regimen -> {
						
						RegimenType regimenType = new RegimenType();
						
						
						if (StringUtils.isNotBlank(regimen.getVisitDate())) {
							try {
								LocalDate local = LocalDate.parse(regimen.getVisitDate());
								regimenType.setVisitDate(DateUtil.getXmlDate(Date.valueOf(local)));
								regimenType.setPrescribedRegimenDispensedDate(DateUtil.getXmlDate(Date.valueOf(local)));
							} catch (Exception e) {
								log.info("An error occurred parsing the regimen date: error{}" + e.getMessage());
							}
						} else {
							throw new IllegalArgumentException("Regimen visit date cannot be null");
							
						}
						
						
						if (StringUtils.isNotBlank(regimen.getVisitID())) {
							regimenType.setVisitID(regimen.getVisitID());
						} else {
							throw new IllegalArgumentException("Regimen visit Id cannot be null");
						}
						
						if (StringUtils.isNotBlank(regimen.getPrescribedRegimenDuration())) {
							regimenType.setPrescribedRegimenDuration(regimen.getPrescribedRegimenDuration());
						} else {
							log.error("Regimen duration cannot be null");
							regimenType.setPrescribedRegimenDuration("60");
							//throw new IllegalArgumentException("Regimen duration cannot be null");
						}
						
						if (StringUtils.isNotBlank(regimen.getPrescribedRegimenTypeCode())) {
							regimenType.setPrescribedRegimenTypeCode(regimen.getPrescribedRegimenTypeCode());
						} else {
							log.error("Regimen type code cannot be null");
							regimenType.setPrescribedRegimenTypeCode("1b");
							//throw new IllegalArgumentException("Regimen type code cannot be null");
						}
						if (StringUtils.isNotBlank(regimen.getPrescribedRegimenCode())
								&& StringUtils.isNotBlank(regimen.getPrescribedRegimenCodeDescTxt())) {
							CodedSimpleType simpleTypeCode = new CodedSimpleType();
							simpleTypeCode.setCode(regimen.getPrescribedRegimenCode());
							simpleTypeCode.setCodeDescTxt(regimen.getPrescribedRegimenCodeDescTxt());
							regimenType.setPrescribedRegimen(simpleTypeCode);
						} else {
							log.error("Prescribed Regimen code cannot be null");
							CodedSimpleType simpleTypeCodeTest = new CodedSimpleType();
							simpleTypeCodeTest.setCode("1m");
							simpleTypeCodeTest.setCodeDescTxt("TDF-3TC-DTG");
							regimenType.setPrescribedRegimen(simpleTypeCodeTest);
							//throw new IllegalArgumentException("Regimen type code cannot be null");
						}
						if (StringUtils.isNotBlank(regimen.getDateRegimenStarted())) {
							try {
								LocalDate local = LocalDate.parse(regimen.getDateRegimenStarted());
								regimenType.setVisitDate(DateUtil.getXmlDate(Date.valueOf(local)));
								regimenType.setDateRegimenStarted(DateUtil.getXmlDate(Date.valueOf(local)));
							} catch (Exception e) {
								log.info("An error occurred parsing the Date Regimen Started date: error{}" + e.getMessage());
							}
						}
						regimenTypeList.add(regimenType);
					});
			
			if (!condition.getRegimen().isEmpty()) {
				sortConditionRegimenType(condition);
			}
		}
			return condition;
	}
	
	public ConditionType regimenType(PatientDemographics demographics, ConditionType condition, LocalDateTime lastUpdate) {
		if(demographics != null ){
			Person person = personRepository.getOne(demographics.getId());
			Comparator<ArtPharmacy> artVisitDateComparator = Comparator.comparing(ArtPharmacy::getVisitDate);
			Set<ArtPharmacy> patientRegimens = artPharmacyRepository
					.findAll()
					.stream()
					.filter(artPharmacy -> artPharmacy.getPerson().getUuid().equals(person.getUuid()))
					.filter(artPharmacy -> artPharmacy.getLastModifiedDate().isAfter(lastUpdate))
					.collect(Collectors.toSet());
			log.info(person.getHospitalNumber() + " pharmacy visit is : {}", patientRegimens.size());
			List<Long> regimenTypeIds = new ArrayList<> (Arrays.asList (1L, 2L, 3L, 4L, 14L, 8L));
			patientRegimens.forEach(artPharmacy -> {
				Set<Regimen> regimens = artPharmacy.getRegimens()
						.stream()
						.filter(r -> regimenTypeIds.contains(r.getRegimenType ().getId ())).collect(Collectors.toSet());
				log.info(person.getHospitalNumber() + "regimens : {}", regimens.size() );
				processAndSetPrescribeRegimen(artPharmacy, regimens, artVisitDateComparator, patientRegimens, condition);
			});
		}
		sortConditionRegimenType(condition);
		return condition;
	}
	
	
	private void processAndSetPrescribeRegimen(
			ArtPharmacy artPharmacy, Set<Regimen> regimens,
			Comparator<ArtPharmacy> artVisitDateComparator,
			Set<ArtPharmacy> patientRegimens,
			ConditionType conditionType
	) {
		List<RegimenType> regimenTypeList = conditionType.getRegimen();
		regimens.forEach(regimen -> {
			if (regimen.getRegimenType() != null) {
				log.info("prescribedRegimenType id {}", regimen.getRegimenType().getId());
				RegimenType regimenType = new RegimenType();
				processAndSetRegimenStartDate(regimenType, patientRegimens, artVisitDateComparator);
				regimenType.setVisitID(artPharmacy.getUuid());
				processAndSetVisitDate(regimenType, artPharmacy.getVisitDate());
				Integer refillPeriod = artPharmacy.getRefillPeriod();
				if (refillPeriod == null || refillPeriod < 1) {
					refillPeriod = 1;
				}
				if (refillPeriod > 180) refillPeriod = 180;
				regimenType.setPrescribedRegimenDuration(String.valueOf(refillPeriod));
				Map<Long, String> prescribedRegimenTypeMapper = prescribedRegimenTypeMapper();
				log.info("prescribedRegimenType Mapper code  {}", prescribedRegimenTypeMapper);
				String prescribedRegimenType = prescribedRegimenTypeMapper.get(regimen.getRegimenType().getId());
				regimenType.setPrescribedRegimenTypeCode(prescribedRegimenType);
				processAndSetPrescribedRegimenDispensedDate(regimenType, artPharmacy.getVisitDate());
				String regimeLineCode = getRegimeLineCode(regimen, regimen.getId());
				if (regimeLineCode != null && !regimeLineCode.isEmpty()) {
					Optional<String> regimenLine = ndrCodeSetResolverService.getNDRCodeSetCode("REGIMEN_LINE", regimeLineCode);
					regimenLine.ifPresent(regimenType::setPrescribedRegimenLineCode);
				}
				Optional<CodedSimpleType> regimenCodedSimpleType = ndrCodeSetResolverService.getRegimen(regimen.getDescription());
				regimenCodedSimpleType.ifPresent(regimenType::setPrescribedRegimen);
				if (prescribedRegimenType != null && prescribedRegimenType.equals("OI")) {
					String description = regimen.getDescription();
					log.info("Regimen Cotrimazole {}", description);
					Optional<CodedSimpleType> regimenOI = ndrCodeSetResolverService.getNDRCodeSet("OI_REGIMEN", description);
					if (regimenOI.isPresent()) {
						log.info("Regimen Cotrimazole Code {}", regimenOI.get().getCode());
						regimenType.setPrescribedRegimen(regimenOI.get());
					}
				}
				regimenTypeList.add(regimenType);
			}
			
		});
	}
	
	
	private void sortConditionRegimenType(ConditionType condition) {
		List<RegimenType> regimenTypeSet = new ArrayList<>(condition.getRegimen());
		//log.info("regimen  type {}", regimenTypeSet);
		List<RegimenType> regimenTypes = regimenTypeSet.stream()
				.filter(Objects::nonNull)
				.sorted(Comparator.comparing(RegimenType::getPrescribedRegimenDuration))
				.sorted((r1, r2) -> r1.getVisitDate().compare(r2.getVisitDate()))
				.collect(Collectors.toList());
		condition.getRegimen().clear();
		condition.getRegimen().addAll(regimenTypes);
	}
	
	
	private void processAndSetVisitDate(RegimenType regimenType, LocalDate visitDate) {
		if (visitDate != null) {
			try {
				regimenType.setVisitDate(DateUtil.getXmlDate(Date.valueOf(visitDate)));
			} catch (DatatypeConfigurationException e) {
				e.printStackTrace();
			}
		}
	}
	
	private void processAndSetPrescribedRegimenDispensedDate(RegimenType regimenType, LocalDate visitDate) {
		if (visitDate != null) {
			try {
				regimenType.setPrescribedRegimenDispensedDate(DateUtil.getXmlDate(Date.valueOf(visitDate)));
			} catch (DatatypeConfigurationException e) {
				e.printStackTrace();
			}
		}
	}
	
	
	private void processAndSetRegimenStartDate(
			RegimenType regimenType,
			Set<ArtPharmacy> patientRegimens,
			Comparator<ArtPharmacy> artVisitDateComparator) {
		Optional<ArtPharmacy> firstRegimen = patientRegimens.stream()
				.min(artVisitDateComparator);
		firstRegimen.ifPresent(artPharmacy -> {
			LocalDate visitDate = artPharmacy.getVisitDate();
			try {
				regimenType.setDateRegimenStarted(DateUtil.getXmlDate(Date.valueOf(visitDate)));
			} catch (DatatypeConfigurationException e) {
				e.printStackTrace();
			}
		});
	}
	
	
	private Map<Long, String> prescribedRegimenTypeMapper() {
		Map<Long, String> regimenTypeMapper = new HashMap<>();
		regimenTypeRepository
				.findAll()
				.forEach(regimenType -> getRegimenTypeMapperFunction(regimenTypeMapper, regimenType));
		return regimenTypeMapper;
	}
	
	private void getRegimenTypeMapperFunction(
			Map<Long, String> regimenTypeMapper,
			org.lamisplus.modules.hiv.domain.entity.RegimenType regimenType) {
		String regimenTypeDescription = regimenType.getDescription();
		if (regimenTypeDescription.contains("ART") || regimenTypeDescription.contains("Third Line")) {
			regimenTypeMapper.put(regimenType.getId(), "ART");
		}
		if (regimenTypeDescription.contains("TB")) {
			regimenTypeMapper.put(regimenType.getId(), "TB");
		}
		
		if (regimenTypeDescription.contains("PEP")) {
			regimenTypeMapper.put(regimenType.getId(), "PEP");
		}
		if (regimenTypeDescription.contains("ARV")) {
			regimenTypeMapper.put(regimenType.getId(), "PMTCT");
		}
		if (regimenTypeDescription.contains("CTX") || regimenTypeDescription.contains("OI")) {
			regimenTypeMapper.put(regimenType.getId(), "OI");
		}
	}
	
	public String getRegimeLineCode(Regimen regimen, Long previousRegimenId) {
		if (regimen != null && regimen.getRegimenType() != null) {
			//Long regimenId = regimen.getId();
			if (regimen.getRegimenType().getId() == 1 || regimen.getRegimenType().getId() == 3) {
				//if (previousRegimenId != 0 && !(previousRegimenId .equals ( regimenId))) {
				// }
				return "First Line";
			}
			if (regimen.getRegimenType().getId() == 2 || regimen.getRegimenType().getId() == 4) {
				//if (previousRegimenId != 0 && previousRegimenId != regimenId) {
				// }
				return "Second Line";
			}
			if (regimen.getRegimenType().getId() == 14) {
				return "Third Line";
			}
		}
		return null;
	}
}
