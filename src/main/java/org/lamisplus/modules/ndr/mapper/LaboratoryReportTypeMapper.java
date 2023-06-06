/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.lamisplus.modules.ndr.mapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.lamisplus.modules.ndr.domain.dto.LabDTO;
import org.lamisplus.modules.ndr.repositories.NdrXmlStatusRepository;
import org.lamisplus.modules.ndr.schema.*;
import org.lamisplus.modules.ndr.service.NDRCodeSetResolverService;
import org.lamisplus.modules.ndr.utility.DateUtil;
import org.lamisplus.modules.ndr.utility.NumericUtils;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Slf4j
@Component
@RequiredArgsConstructor
public class LaboratoryReportTypeMapper {
	
	
  private final NdrXmlStatusRepository ndrXmlStatusRepository;
  
	private final NDRCodeSetResolverService ndrCodeSetResolverService;
	
	public ConditionType laboratoryReportType(String patientUuid, LocalDateTime lastGenerateTime,  ConditionType condition) {
		
		List<LabDTO> labDTOS = ndrXmlStatusRepository.getLabInfoByPersonUuid(patientUuid,lastGenerateTime);
		labDTOS.forEach(labDTO -> {
					try {
						
						LaboratoryReportType laboratory = new LaboratoryReportType();
						laboratory.setVisitID(labDTO.getVisitId());
						LocalDateTime dateSampleCollected = labDTO.getDateSampleCollected();
						log.info("dateSampleCollected {}", dateSampleCollected);
						if (dateSampleCollected != null) {
							Date dateCollected = java.sql.Date.valueOf(dateSampleCollected.toLocalDate());
							laboratory.setVisitDate(DateUtil.getXmlDate(dateCollected));
							laboratory.setCollectionDate(DateUtil.getXmlDate(dateCollected));
							laboratory.setLaboratoryTestIdentifier("0000001");
							//laboratoryTestTypeCode
							String description = labDTO.getLabTestName();
							log.info(" lab test name {}", description);
							LaboratoryOrderAndResult labResult = new LaboratoryOrderAndResult();
							
						
							
							Optional<CodedSimpleType> labCode =
									ndrCodeSetResolverService.getNDRCodeSet("LAB_RESULTED_TEST", description);
							if (labCode.isPresent()) {
								CodedSimpleType ndrCodeSet = labCode.get();
								log.info(" lab  code {}", ndrCodeSet.getCode());
								labResult.setLaboratoryResultedTest(ndrCodeSet);
							}
							String result = StringUtils.trimToEmpty(labDTO.getResultReported());
							
							if (StringUtils.isNotEmpty(result)) {
								//Set the NDR code & description for this lab test
								log.info(" result is available: {}", result);
								LocalDateTime dateAssayed = labDTO.getDateAssayed();
								if (dateAssayed != null) {
									Date dateAssayedDate = java.sql.Date.valueOf(dateAssayed.toLocalDate());
									labResult.setOrderedTestDate(DateUtil.getXmlDate(dateAssayedDate));
									
								}
								LocalDateTime dateReportedTime = labDTO.getResultDate();
								if (dateReportedTime != null) {
									Date dateReported = java.sql.Date.valueOf(dateReportedTime.toLocalDate());
									labResult.setResultedTestDate(DateUtil.getXmlDate(dateReported));
								}
								//Set the lab test result values either numeric or text
								AnswerType answer = new AnswerType();
								NumericType numeric = new NumericType();
								if (NumericUtils.isNumeric(StringUtils.replace(result, ",", ""))) {
									double d = Double.parseDouble(StringUtils.replace(result, ",", ""));
									numeric.setValue1((int) d);
									answer.setAnswerNumeric(numeric);
								} else {
									if (labDTO.getLabTestName().equals("Viral Load")) {
										numeric.setValue1(0);  //if lab test is a viralLoad set the value to 0
										answer.setAnswerNumeric(numeric);
									} else {
										answer.setAnswerText(result);
									}
								}
								labResult.setLaboratoryResult(answer);
								labResult.setLaboratoryTestTypeCode("00001");
								laboratory.getLaboratoryOrderAndResult().add(labResult);
								if (laboratory.getVisitDate() != null && laboratory.getLaboratoryOrderAndResult() != null) {
									condition.getLaboratoryReport().add(laboratory);
								}
							}
						}

					} catch (Exception e) {
                      e.printStackTrace();
					}
				});
		return condition;
	}
	
	public ConditionType laboratoryReportType(
			String patientUuid,
			LocalDateTime lastGenerateTime,
			ConditionType condition,
			List<LabDTO> labDTOS ) {
		
		labDTOS.forEach(labDTO -> {
			try {
				
				LaboratoryReportType laboratory = new LaboratoryReportType();
				laboratory.setVisitID(labDTO.getVisitId());
				LocalDateTime dateSampleCollected = labDTO.getDateSampleCollected();
				log.info("dateSampleCollected {}", dateSampleCollected);
				if (dateSampleCollected != null) {
					Date dateCollected = java.sql.Date.valueOf(dateSampleCollected.toLocalDate());
					laboratory.setVisitDate(DateUtil.getXmlDate(dateCollected));
					laboratory.setCollectionDate(DateUtil.getXmlDate(dateCollected));
					laboratory.setLaboratoryTestIdentifier("0000001");
					//laboratoryTestTypeCode
					String description = labDTO.getLabTestName();
					log.info(" lab test name {}", description);
					LaboratoryOrderAndResult labResult = new LaboratoryOrderAndResult();
					
					
					
					Optional<CodedSimpleType> labCode =
							ndrCodeSetResolverService.getNDRCodeSet("LAB_RESULTED_TEST", description);
					if (labCode.isPresent()) {
						CodedSimpleType ndrCodeSet = labCode.get();
						log.info(" lab  code {}", ndrCodeSet.getCode());
						labResult.setLaboratoryResultedTest(ndrCodeSet);
					}
					String result = StringUtils.trimToEmpty(labDTO.getResultReported());
					
					if (StringUtils.isNotEmpty(result)) {
						//Set the NDR code & description for this lab test
						log.info(" result is available: {}", result);
						LocalDateTime dateAssayed = labDTO.getDateAssayed();
						if (dateAssayed != null) {
							Date dateAssayedDate = java.sql.Date.valueOf(dateAssayed.toLocalDate());
							labResult.setOrderedTestDate(DateUtil.getXmlDate(dateAssayedDate));
							
						}
						LocalDateTime dateReportedTime = labDTO.getResultDate();
						if (dateReportedTime != null) {
							Date dateReported = java.sql.Date.valueOf(dateReportedTime.toLocalDate());
							labResult.setResultedTestDate(DateUtil.getXmlDate(dateReported));
						}
						//Set the lab test result values either numeric or text
						AnswerType answer = new AnswerType();
						NumericType numeric = new NumericType();
						if (NumericUtils.isNumeric(StringUtils.replace(result, ",", ""))) {
							double d = Double.parseDouble(StringUtils.replace(result, ",", ""));
							numeric.setValue1((int) d);
							answer.setAnswerNumeric(numeric);
						} else {
							if (labDTO.getLabTestName().equals("Viral Load")) {
								numeric.setValue1(0);  //if lab test is a viralLoad set the value to 0
								answer.setAnswerNumeric(numeric);
							} else {
								answer.setAnswerText(result);
							}
						}
						labResult.setLaboratoryResult(answer);
						labResult.setLaboratoryTestTypeCode("00001");
						laboratory.getLaboratoryOrderAndResult().add(labResult);
						if (laboratory.getVisitDate() != null && laboratory.getLaboratoryOrderAndResult() != null) {
							condition.getLaboratoryReport().add(laboratory);
						}
					}
				}
				
			} catch (Exception e) {
				e.printStackTrace();
			}
		});
		return condition;
	}

	
	}
