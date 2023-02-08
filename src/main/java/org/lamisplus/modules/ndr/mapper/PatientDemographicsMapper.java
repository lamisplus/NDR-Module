package org.lamisplus.modules.ndr.mapper;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.ndr.domain.PatientDemographics;
import org.lamisplus.modules.ndr.schema.FacilityType;
import org.lamisplus.modules.ndr.schema.FingerPrintType;
import org.lamisplus.modules.ndr.schema.PatientDemographicsType;
import org.lamisplus.modules.ndr.service.NDRCodeSetResolverService;
import org.lamisplus.modules.ndr.utility.DateUtil;
import org.springframework.stereotype.Service;

import javax.xml.datatype.DatatypeConfigurationException;
import java.sql.Date;
import java.time.LocalDate;
import java.util.Optional;


@RequiredArgsConstructor
@Slf4j
@Service
public class PatientDemographicsMapper {
    private final MessageHeaderTypeMapper messageHeaderTypeMapper;
    private  final NDRCodeSetResolverService ndrCodeSetResolverService;
    private  final  BiometricTemplateMapper biometricTemplateMapper;
    
    public PatientDemographicsType getPatientDemographics(PatientDemographics patientDemographics) {
        PatientDemographicsType patientDemographicsType = new PatientDemographicsType ();
            try {
                    FacilityType treatmentFacility =
                            messageHeaderTypeMapper.getTreatmentFacility (patientDemographics);
                    String identifier = patientDemographics.getDatimId() + "_" + patientDemographics.getPersonUuid();
                    patientDemographicsType.setPatientIdentifier (identifier);
                    patientDemographicsType.setTreatmentFacility (treatmentFacility);
                    processAndSetDateOFBirth (patientDemographicsType, patientDemographics.getDateOfBirth());
                    processAndSetSex (patientDemographicsType, patientDemographics.getSex());
                    processAndSetEducationLevelCode (patientDemographicsType, patientDemographics.getEducation());
                    processAndSetMaritalStatusCode (patientDemographicsType, patientDemographics.getMaritalStatus());
                    processAndSetStateOfOrigin(patientDemographicsType, patientDemographics.getResidentialState());
                    processAndSetOccupationalStatusCode(patientDemographicsType, patientDemographics.getOccupation());
                    FingerPrintType fingerPrintTypeForPatient =
                            biometricTemplateMapper.getFingerPrintTypeForPatient (patientDemographics.getPersonUuid ());
                    if(fingerPrintTypeForPatient != null){
                        patientDemographicsType.setFingerPrints (fingerPrintTypeForPatient);
                    }
                return patientDemographicsType;
            } catch (Exception e) {
               e.printStackTrace ();
            }
        return null;
    }

    private void processAndSetDateOFBirth(PatientDemographicsType patientDemographics, LocalDate dateOfBirth)
            throws DatatypeConfigurationException {
        if (dateOfBirth != null) {
            patientDemographics.setPatientDateOfBirth (DateUtil.getXmlDate (Date.valueOf (dateOfBirth)));
        }
    }

    private void processAndSetSex(PatientDemographicsType patientDemographics, String sex) {
        if(sex.equalsIgnoreCase("Female")){
            sex = "Female";
        }else {
            sex = "Male";
        }
            Optional<String> sexCode = ndrCodeSetResolverService.getNDRCodeSetCode ("SEX", sex);
            sexCode.ifPresent (patientDemographics::setPatientSexCode);

    }


    private void processAndSetEducationLevelCode(PatientDemographicsType demographicsType, String education) {
        if (education != null) {
            Optional<String> educationalLevelCode = ndrCodeSetResolverService.getNDRCodeSetCode ("EDUCATIONAL_LEVEL", education);
            educationalLevelCode.ifPresent (demographicsType::setPatientEducationLevelCode);
        }
    }

    private void processAndSetMaritalStatusCode(PatientDemographicsType demographicsType, String maritalStatus) {
        if (maritalStatus != null ) {
            Optional<String> maritalStatusCode = ndrCodeSetResolverService.getNDRCodeSetCode ("MARITAL_STATUS", maritalStatus);
            maritalStatusCode.ifPresent (demographicsType::setPatientMaritalStatusCode);
        }
    }

    private void processAndSetStateOfOrigin(PatientDemographicsType demographicsType, String currentState) {
        if (currentState != null) {
                    Optional<String> state = ndrCodeSetResolverService.getNDRCodeSetCode ("STATES", currentState);
                    state.ifPresent (demographicsType::setStateOfNigeriaOriginCode);
                }
        
    }

    private void processAndSetOccupationalStatusCode(PatientDemographicsType demographicsType, String occupation) {
        if (occupation != null) {
            Optional<String> occupationCode = ndrCodeSetResolverService.getNDRCodeSetCode ("OCCUPATION_STATUS", occupation);
            occupationCode.ifPresent (demographicsType::setPatientOccupationCode);
        }
    }


}
