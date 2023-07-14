package org.lamisplus.modules.ndr.mapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.ndr.domain.dto.HtsReportDto;
import org.lamisplus.modules.ndr.domain.dto.NDRErrorDTO;
import org.lamisplus.modules.ndr.schema.*;
import org.lamisplus.modules.ndr.utility.DateUtil;
import org.springframework.stereotype.Component;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.datatype.DatatypeConfigurationException;
import java.sql.Date;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;


@Component
@RequiredArgsConstructor
@Slf4j
public class HtsTypeMapper {
	
	
	public boolean getHivTestingReportType(
			IndividualReportType individualReportType,
			ObjectFactory objectFactory,
			List<HtsReportDto> htsReportDtos,
			List<NDRErrorDTO> errors) {
		if(!htsReportDtos.isEmpty()) {
			List<HIVTestingReportType> hivTestingReport = individualReportType.getHIVTestingReport();
			htsReportDtos.parallelStream().forEach(h -> {
						try {
							HIVTestingReportType hivTestingReportType = NDRObjectFactory.createHIVTestingReportType();
							validateAndSetClientCode(h.getClientCode(), hivTestingReportType);
							validateAndSetVisitId(h.getVisitId(), hivTestingReportType);
							validateAndSetVisitDate(h.getVisitDate(), hivTestingReportType);
							validateAndSetSetting(h.getSetting(), hivTestingReportType);
							validateAndSetFirstTime(h.getFirstTimeVisit(), hivTestingReportType);
							PreTestInformationType preTestInformationType = setPreTest(objectFactory, h);
							hivTestingReportType.setPreTestInformation(preTestInformationType);
							PostTestCounsellingType postTestCounsellingType = setPostTest(objectFactory, h);
							hivTestingReportType.setPostTestCounselling(postTestCounsellingType);
							HIVTestResultType hivTestResultType = setResult(objectFactory, h);
							hivTestingReportType.setHIVTestResult(hivTestResultType);
							hivTestingReport.add(hivTestingReportType);
						}catch (Exception e){
							errors.add(new NDRErrorDTO(h.getClientCode(), h.getVisitId(), Arrays.toString(e.getStackTrace())));
						}
					});
			return true;
		}
		return false;
	}

	private HIVTestResultType setResult(ObjectFactory objectFactory, HtsReportDto h) {
		  HIVTestResultType hivTestResultType = objectFactory.createHIVTestResultType();
		  TestResultType testResult = objectFactory.createTestResultType();
		  if(h.getScreeningTestResult() != null){
			  testResult.setScreeningTestResult(h.getScreeningTestResult());
		  }else{
			  throw new IllegalArgumentException("ScreeningTestResult can not be null kindly correct");
		  }
		  validateAndSetTestResultDate(h.getScreeningTestResultDate(), testResult);
		  if(!h.getScreeningTestResult().equalsIgnoreCase("negative")){
			  testResult.setConfirmatoryTestResult(h.getScreeningTestResult());
			  validateAndSetConfirmatoryTestResultDate(h.getScreeningTestResultDate(), testResult);
			  testResult.setTieBreakerTestResult(h.getScreeningTestResult());
			  validateAndSetTieBreakerTestResultDate(h.getScreeningTestResultDate(), testResult);
		  }
		 testResult.setFinalTestResult(h.getFinalTestResult());
		 hivTestResultType.setTestResult(testResult);
		// RecencyTestingType recencyTesting;
		return hivTestResultType;
	}

	private static PreTestInformationType setPreTest(ObjectFactory objectFactory, HtsReportDto h) {
		KnowledgeAssessmentType knowledgeAssessment = objectFactory.createKnowledgeAssessmentType();
		knowledgeAssessment.setPreviouslyTestedHIVNegative(h.getPreviouslyTestedHIVNegative());
		knowledgeAssessment.setClientInformedAboutHIVTransmissionRoutes(h.getClientInformedAboutHIVTransmissionRoutes());
		knowledgeAssessment.setClientPregnant(h.getClientPregnant());
		knowledgeAssessment.setClientInformedOfHIVTransmissionRiskFactors(h.getClientInformedOfHIVTransmissionRiskFactors());
		knowledgeAssessment.setClientInformedAboutPreventingHIV(h.getClientInformedAboutPreventingHIV());
		knowledgeAssessment.setClientInformedAboutPossibleTestResults(h.getClientInformedAboutPossibleTestResults());
		knowledgeAssessment.setInformedConsentForHIVTestingGiven(h.getInformedConsentForHIVTestingGiven());
		HIVRiskAssessmentType assessment = objectFactory.createHIVRiskAssessmentType();
		assessment.setEverHadSexualIntercourse(h.getEverHadSexualIntercourse());
		assessment.setBloodTransfussionInLast3Months(h.getBloodTransfussionInLast3Months());
		assessment.setUnprotectedSexWithCasualPartnerinLast3Months(h.getUnprotectedSexWithCasualPartnerinLast3Months());
		assessment.setUnprotectedSexWithRegularPartnerInLast3Months(h.getUnprotectedSexWithRegularPartnerInLast3Months());
		assessment.setMoreThan1SexPartnerDuringLast3Months(h.getMoreThan1SexPartnerDuringLast3Months());
		assessment.setSTIInLast3Months(h.getStiInLast3Months());
		ClinicalTBScreeningType screening = objectFactory.createClinicalTBScreeningType();
		screening.setCurrentlyCough(h.getCurrentlyCough());
		screening.setWeightLoss(h.getWeightLoss());
		screening.setFever(h.getFever());
		screening.setNightSweats(h.getNightSweats());
		SyndromicSTIScreeningType synStiScreening = objectFactory.createSyndromicSTIScreeningType();
		synStiScreening.setVaginalDischargeOrBurningWhenUrinating(h.getVaginalDischargeOrBurningWhenUrinating());
		synStiScreening.setLowerAbdominalPainsWithOrWithoutVaginalDischarge(h.getLowerAbdominalPainsWithOrWithoutVaginalDischarge());
		synStiScreening.setUrethralDischargeOrBurningWhenUrinating(h.getUrethralDischargeOrBurningWhenUrinating());
		synStiScreening.setScrotalSwellingAndPain(h.getScrotalSwellingAndPain());
		synStiScreening.setGenitalSoreOrSwollenInguinalLymphNodes(h.getGenitalSoreOrSwollenInguinalLymphNodes());
		PreTestInformationType preTestInformationType = objectFactory.createPreTestInformationType();
		preTestInformationType.setClinicalTBScreening(screening);
		preTestInformationType.setHIVRiskAssessment(assessment);
		preTestInformationType.setSyndromicSTIScreening(synStiScreening);
		preTestInformationType.setKnowledgeAssessment(knowledgeAssessment);
		return preTestInformationType;

	}


	private static PostTestCounsellingType setPostTest(ObjectFactory objectFactory, HtsReportDto h) {
		PostTestCounsellingType postTest = objectFactory.createPostTestCounsellingType();
		if(h.getTestedForHIVBeforeWithinThisYear() != null){
			postTest.setTestedForHIVBeforeWithinThisYear(h.getTestedForHIVBeforeWithinThisYear());
		}else {
			throw new IllegalArgumentException("TestedForHIVBeforeWithinThisYear can not be null");
		}
		postTest.setPostTestDisclosurePlanDeveloped(h.getPostTestDisclosurePlanDeveloped());
		postTest.setPostTestCounsellingDone(h.getPostTestCounsellingDone());
		postTest.setProvidedWithInformationOnFPandDualContraception(h.getProvidedWithInformationOnFPandDualContraception());
		postTest.setHIVRequestAndResultFormSignedByTester(h.getHivRequestAndResultFormSignedByTester());
		postTest.setHIVRequestAndResultFormFilledWithCTIForm(h.getHivRequestAndResultFormFilledWithCTIForm());
		postTest.setClientRecievedHIVTestResult(h.getClientRecievedHIVTestResult());
		postTest.setRiskReductionPlanDeveloped(h.getRiskReductionPlanDeveloped());
		postTest.setWillBringPartnerForHIVTesting(h.getWillBringPartnerForHIVTesting());
		postTest.setWillBringOwnChildrenForHIVTesting(h.getWillBringOwnChildrenForHIVTesting());
		postTest.setClientOrPartnerUseFPMethodsOtherThanCondoms(h.getClientOrPartnerUseFPMethodsOtherThanCondoms());
		postTest.setClientOrPartnerUseCondomsAsOneFPMethods(h.getClientOrPartnerUseCondomsAsOneFPMethods());
		postTest.setCorrectCondomUseDemonstrated(h.getCorrectCondomUseDemonstrated());
		postTest.setCondomsProvidedToClient(h.getCondomsProvidedToClient());
		postTest.setClientReferredToOtherServices(h.getClientReferredToOtherServices());
         return postTest;



	}

	private static void validateAndSetFirstTime(String firstTime, HIVTestingReportType hivTestingReportType) {
		if(firstTime != null){
			hivTestingReportType.setFirstTimeVisit(firstTime);
		}else {
			throw new IllegalArgumentException("FirstTimeVisit can not be null kindly correct this");
		}
	}

	private static void validateAndSetSetting(String setting, HIVTestingReportType hivTestingReportType) {
		if(setting != null){
			hivTestingReportType.setSetting(setting);
		}else {
			throw new IllegalArgumentException("Setting can not be null kindly correct this");
		}
	}

	private static void validateAndSetVisitId(String visitId, HIVTestingReportType hivTestingReportType) {
		if(visitId != null){
			hivTestingReportType.setVisitID(visitId);
		}else {
			throw new IllegalArgumentException("VisitId can not be null kindly correct this");
		}
	}


	private static void validateAndSetClientCode(String clientCode, HIVTestingReportType hivTestingReportType) {
		if(clientCode != null){
			hivTestingReportType.setClientCode(clientCode);
		}else {
			throw new IllegalArgumentException("ClientCode can not be null kindly correct this");
		}
	}

	private static void validateAndSetVisitDate(LocalDate visitDate, HIVTestingReportType hivTestingReportType) {
		if (visitDate != null) {
			try {
				hivTestingReportType.setVisitDate(DateUtil.getXmlDate(Date.valueOf(visitDate)));
			} catch (DatatypeConfigurationException e) {
				throw new RuntimeException(e);
			}
		} else {
			throw new IllegalArgumentException("VisitDate can not be null kindly correct this");
		}
	}
		private static void validateAndSetTestResultDate(LocalDate date, TestResultType testResult){
			if (date != null) {
				try {
					testResult.setScreeningTestResultDate(DateUtil.getXmlDate(Date.valueOf(date)));
				} catch (DatatypeConfigurationException e) {
					throw new RuntimeException(e);
				}
			} else {
				throw new IllegalArgumentException("TestResultDate can not be null kindly correct this");
			}

		}

	private static void validateAndSetConfirmatoryTestResultDate(LocalDate date, TestResultType testResult){
		if (date != null) {
			try {
				testResult.setConfirmatoryTestResultDate(DateUtil.getXmlDate(Date.valueOf(date)));
			} catch (DatatypeConfigurationException e) {
				throw new RuntimeException(e);
			}
		} else {
			throw new IllegalArgumentException("ConfirmatoryTestResultDate can not be null kindly correct this");
		}

	}

	private static void validateAndSetTieBreakerTestResultDate(LocalDate date, TestResultType testResult){
		if (date != null) {
			try {
				testResult.setTieBreakerTestResultDate(DateUtil.getXmlDate(Date.valueOf(date)));
			} catch (DatatypeConfigurationException e) {
				throw new RuntimeException(e);
			}
		} else {
			throw new IllegalArgumentException("TieBreakerTestResultDate can not be null kindly correct this");
		}

	}


}
