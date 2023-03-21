package org.lamisplus.modules.ndr.mapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.ndr.domain.PatientDemographics;
import org.lamisplus.modules.ndr.schema.*;
import org.lamisplus.modules.ndr.service.NDRCodeSetResolverService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ConditionTypeMapper {

    private final NDRCodeSetResolverService ndrCodeSetResolverService;

    private final AddressTypeMapper addressTypeMapper;

    private final CommonQuestionsTypeMapper commonQuestionsTypeMapper;

    private final ConditionSpecificQuestionsTypeMapper specificQuestionsTypeMapper;

    private final EncountersTypeMapper encountersTypeMapper;

    private final RegimenTypeMapper regimenTypeMapper;
    
    private final LaboratoryReportTypeMapper laboratoryReportTypeMapper;


    public ConditionType getConditionType(PatientDemographics demographics) {
       
        ConditionType condition = new ConditionType ();
        Optional<String> conditionCode = ndrCodeSetResolverService.getNDRCodeSetCode ("CONDITION_CODE", "HIV_CODE");
        conditionCode.ifPresent (condition::setConditionCode);
        Optional<String> programAreaCode = ndrCodeSetResolverService.getNDRCodeSetCode ("PROGRAM_AREA", "HIV");
        ProgramAreaType programArea = new ProgramAreaType ();
        programAreaCode.ifPresent (programArea::setProgramAreaCode);
        condition.setProgramArea (programArea);

        //Address
        AddressType address = addressTypeMapper.getPatientAddress (demographics);
        if (address.getStateCode () != null && address.getLGACode () != null) {
            condition.setPatientAddress (address);
        }
        //common questions
        CommonQuestionsType common = commonQuestionsTypeMapper.getPatientCommonQuestion (demographics);
        if (common != null) {
            condition.setCommonQuestions (common);
        }
        //specific questions
        ConditionSpecificQuestionsType disease = specificQuestionsTypeMapper.getConditionSpecificQuestionsType (demographics);
        if (disease != null) {
            condition.setConditionSpecificQuestions (disease);
        }
        //encounter
        EncountersType encounter = encountersTypeMapper.encounterType (demographics);
        if(encounter != null) {
            condition.setEncounters (encounter);
         }
        //
        regimenTypeMapper.regimenType (demographics, condition);
        LocalDateTime lastUpdated = LocalDateTime.of(1990, 1, 1, 0, 0);
        laboratoryReportTypeMapper.laboratoryReportType(demographics.getPersonUuid(), lastUpdated, condition);
        return condition;
    }
    
    public ConditionType getConditionType(PatientDemographics demographics, LocalDateTime lastUpdate) {
        ConditionType condition = new ConditionType ();
        Optional<String> conditionCode = ndrCodeSetResolverService.getNDRCodeSetCode ("CONDITION_CODE", "HIV_CODE");
        conditionCode.ifPresent (condition::setConditionCode);
        Optional<String> programAreaCode = ndrCodeSetResolverService.getNDRCodeSetCode ("PROGRAM_AREA", "HIV");
        ProgramAreaType programArea = new ProgramAreaType ();
        programAreaCode.ifPresent (programArea::setProgramAreaCode);
        condition.setProgramArea (programArea);
        
        //Address
        AddressType address = addressTypeMapper.getPatientAddress (demographics);
        if (address.getStateCode () != null && address.getLGACode () != null) {
            condition.setPatientAddress (address);
        }
        //common questions
        CommonQuestionsType common = commonQuestionsTypeMapper.getPatientCommonQuestion (demographics);
        if (common != null) {
            condition.setCommonQuestions (common);
        }
        //specific questions
        ConditionSpecificQuestionsType disease = specificQuestionsTypeMapper.getConditionSpecificQuestionsType (demographics);
        if (disease != null) {
            condition.setConditionSpecificQuestions (disease);
        }
        //encounter
        EncountersType encounter = encountersTypeMapper.encounterType (demographics, lastUpdate);
        if(encounter != null){
            condition.setEncounters (encounter);
        }
        regimenTypeMapper.regimenType (demographics, condition, lastUpdate);
        
        //Lab
        laboratoryReportTypeMapper.laboratoryReportType(demographics.getPersonUuid(), lastUpdate, condition);
        
        return condition;
    }

}
