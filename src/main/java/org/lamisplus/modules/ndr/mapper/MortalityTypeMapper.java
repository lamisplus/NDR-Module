package org.lamisplus.modules.ndr.mapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.ndr.domain.dto.MortalityDTO;
import org.lamisplus.modules.ndr.repositories.NdrMessageLogRepository;
import org.lamisplus.modules.ndr.schema.ClientVerificationType;
import org.lamisplus.modules.ndr.schema.MortalityType;
import org.lamisplus.modules.ndr.utility.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.xml.datatype.DatatypeConfigurationException;
import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class MortalityTypeMapper {
    @Autowired
    private NdrMessageLogRepository ndrMessageLogRepository;
    private final ClientVerificationTypeMapper clientVerificationTypeMapper;
    public MortalityType getMortalityType(String patientId, long facilityId, LocalDate start, LocalDate end) {

        MortalityType mortalityType = new MortalityType();
        List<MortalityDTO> mortalities = ndrMessageLogRepository.getPatientMortalities(patientId, facilityId, start, end);

        if (mortalities != null) {
            mortalities.forEach(mortality -> {
                //client verification
                ClientVerificationType clientVerification = clientVerificationTypeMapper.getClientVerifications(patientId, facilityId, start, end);

                if (clientVerification != null) {
                    mortalityType.setClientVerification(clientVerification);
                }

                log.info("patient mortality visit Id {}", mortality.getVisitID());
                if(mortality.getVisitID() != null)mortalityType.setVisitID(mortality.getVisitID());
                if(mortality.getVisitDate() != null) {
                    Date visitDate = java.sql.Date.valueOf(mortality.getVisitDate());
                    try {
                        mortalityType.setVisitDate(DateUtil.getXmlDate(visitDate));
                    } catch (DatatypeConfigurationException e) {
                        throw new RuntimeException(e);
                    }

                }
                if(mortality.getReasonForTracking() != null) {
                    //log.info("Reason For Tracking {}", mortality.getReasonForTracking());
                    reasonForTracking(mortality.getReasonForTracking(), mortalityType);
                }
                if(mortality.getOtherTrackingReason() != null) {
                    //log.info("OtherTrackingReason {}", mortality.getOtherTrackingReason());
                    mortalityType.setOtherTrackingReason(mortality.getOtherTrackingReason());
                }
                if(mortality.getPartnerFullName() != null) {
                    //log.info("PartnerFullName {}", mortality.getPartnerFullName());
                    mortalityType.setPartnerFullName(mortality.getPartnerFullName());
                }
                if(mortality.getAddressofTreatmentSupporter() != null) {
                    //log.info("AddressofTreatmentSupporter {}", mortality.getAddressofTreatmentSupporter());
                    mortalityType.setAddressofTreatmentSupporter(mortality.getAddressofTreatmentSupporter());
                }
                if(mortality.getContactPhoneNumber() != null) {
                    //log.info("101 {}", mortality.getContactPhoneNumber());
                    mortalityType.setContactPhoneNumber(mortality.getContactPhoneNumber());
                }
                if(mortality.getDateofLastActualContact() != null) {
                    //log.info("102 {}", mortality.getDateofLastActualContact());
                    Date contactDate = java.sql.Date.valueOf(mortality.getDateofLastActualContact());
                    try {
                        mortalityType.setDateofLastActualContact(DateUtil.getXmlDate(contactDate));
                    } catch (DatatypeConfigurationException e) {
                        throw new RuntimeException(e);
                    }

                }
                if(mortality.getDateofMissedScheduledAppointment() != null) {
                    //log.info("103 {}", mortality.getDateofMissedScheduledAppointment());
                    Date missedDate = java.sql.Date.valueOf(mortality.getDateofMissedScheduledAppointment());
                    try {
                        mortalityType.setDateofMissedScheduledAppointment(DateUtil.getXmlDate(missedDate));
                    } catch (DatatypeConfigurationException e) {
                        throw new RuntimeException(e);
                    }

                };
                if(mortality.getDatePatientContacted() != null) {
                    //log.info("104 {}", mortality.getDatePatientContacted());
                    Date patientContectedDate = java.sql.Date.valueOf(mortality.getDatePatientContacted());
                    try {
                        mortalityType.setDatePatientContacted(DateUtil.getXmlDate(patientContectedDate));
                    } catch (DatatypeConfigurationException e) {
                        throw new RuntimeException(e);
                    }

                };
                if(mortality.getNameofPersonWhoAttemptedContact() != null) {
                    //log.info("105 {}", mortality.getNameofPersonWhoAttemptedContact());
                    mortalityType.setNameofPersonWhoAttemptedContact(mortality.getNameofPersonWhoAttemptedContact());
                }
                if(mortality.getModeofCommunication() != null) {
                    //log.info("106 {}", mortality.getModeofCommunication());
                    modeofCommunication(mortality.getModeofCommunication(), mortalityType);
                }
                if(mortality.getPersonContacted() != null) {
                    //log.info("107 {}", mortality.getPersonContacted());
                    personContacted(mortality.getPersonContacted(), mortalityType);
                }
                if(mortality.getReasonforDefaulting() != null) {
                    //log.info("108 {}", mortality.getReasonforDefaulting());
                    reasonforDefaulting(mortality.getReasonforDefaulting(), mortalityType);
                }
                if(mortality.getOtherReasonforDefaulting() != null) {
                    //log.info("109 {}", mortality.getOtherReasonforDefaulting());
                    mortalityType.setOtherReasonforDefaulting(mortality.getOtherReasonforDefaulting());
                }
//                if(mortality.getLosttoFollowup() != null) {
//                    log.info("110 {}", mortality.getLosttoFollowup());
//                    mortalityType.setLosttoFollowup(true);
//                }
                if(mortality.getReasonforLosttoFollowup() != null) {
                    //log.info("111 {}", mortality.getReasonforLosttoFollowup());
                    reasonforLosttoFollowup(mortality.getReasonforLosttoFollowup(), mortalityType);
                }
//                if(mortality.getDateLosttoFollowup() != null) {
//                    log.info("121 {}", mortality.getReasonforLosttoFollowup());
//                    Date lostOtFollowUpDate = java.sql.Date.valueOf(mortality.getDateLosttoFollowup());
//                    try {
//                        mortalityType.setDateLosttoFollowup(DateUtil.getXmlDate(lostOtFollowUpDate));
//                    } catch (DatatypeConfigurationException e) {
//                        throw new RuntimeException(e);
//                    }
//
//                };
                if(mortality.getPreviousARVExposure() != null) {

                    if(mortality.getPreviousARVExposure().contains("previousARVExposure")) {
                        mortalityType.setPreviousARVExposure("Yes");
                    }
                }
                if(mortality.getDateofTermination() != null) {
                    //log.info("122 {}", mortality.getReasonforLosttoFollowup());
                    Date terminationDate = java.sql.Date.valueOf(mortality.getDateofTermination());
                    try {
                        mortalityType.setDateofTermination(DateUtil.getXmlDate(terminationDate));
                    } catch (DatatypeConfigurationException e) {
                        throw new RuntimeException(e);
                    }

                };
                if(mortality.getReasonforTermination() != null) {
                    //log.info("112 {}", mortality.getReasonforTermination());
                    reasonforTermination(mortality.getReasonforTermination(), mortalityType);
                }
//                if(mortality.getIndicationforClientVerification() != null) {
//                    log.info("113 {}", mortality.getIndicationforClientVerification());
//                    indicationforClientVerification(mortality.getIndicationforClientVerification(), mortalityType);
//                }
//                if(mortality.getClientVerificationOther() != null) {
//                    log.info("114 {}", mortality.getClientVerificationOther());
//                    mortalityType.setClientVerificationOther(mortality.getClientVerificationOther());
//                }
                if(mortality.getTransferredOutTo() != null) {
                    //log.info("115 {}", mortality.getTransferredOutTo());
                    mortalityType.setTransferredOutTo(mortality.getTransferredOutTo());
                }
                if(mortality.getDeath() != null) {
                    //log.info("117 {}", mortality.getDeath());
                    death(mortality.getDeath(), mortalityType);
                }
                if(mortality.getVaCauseofDeath() != null) {
                    //log.info("116 {}", mortality.getVaCauseofDeath());
                    vaCauseOfDeath(mortality.getVaCauseofDeath(), mortalityType);
                }
                if(mortality.getOtherCauseofDeath() != null) {
                    //log.info("117 {}", mortality.getOtherCauseofDeath());
                    mortalityType.setOtherCauseofDeath(mortality.getOtherCauseofDeath());
                }
                if(mortality.getCauseOfDeath() != null) {
                    //log.info("118 {}", mortality.getCauseOfDeath());
                    causeOfDeath(mortality.getCauseOfDeath(), mortalityType);
                }
                if(mortality.getDiscontinuedCare() != null) {
                    //log.info("120 {}", mortality.getDiscontinuedCare());
                    discontinuedCare(mortality.getDiscontinuedCare(), mortalityType);
                }

                if(mortality.getDiscontinueCareOtherSpecify() != null) {
                    //log.info("121 {}", mortality.getDiscontinueCareOtherSpecify());
                    mortalityType.setDiscontinueCareOtherSpecify(mortality.getDiscontinueCareOtherSpecify());
                }
                if(mortality.getDateReturnedtoCare() != null) {
                    //log.info("127 {}", mortality.getDiscontinueCareOtherSpecify());
                    Date returnedDate = java.sql.Date.valueOf(mortality.getDateReturnedtoCare());
                    try {
                        mortalityType.setDateReturnedtoCare(DateUtil.getXmlDate(returnedDate));
                    } catch (DatatypeConfigurationException e) {
                        throw new RuntimeException(e);
                    }

                };
                if(mortality.getReffferedFor() != null) {
                    log.info("122 {}", mortality.getReffferedFor());
                    reffferedFor(mortality.getReffferedFor(), mortalityType);
                }
                if(mortality.getReffferedForOther() != null) {
                    log.info("123 {}", mortality.getReffferedForOther());
                    mortalityType.setReffferedForOther(mortality.getReffferedForOther());
                }
                if(mortality.getNameofContactTracer() != null) {
                    log.info("124 {}", mortality.getNameofContactTracer());
                    mortalityType.setNameofContactTracer(mortality.getNameofContactTracer());
                }
//                if(mortality.getContactTrackerSignatureDate() != null) {
//                    Date trackDate = java.sql.Date.valueOf(mortality.getContactTrackerSignatureDate());
//                    try {
//                        mortalityType.setContactTrackerSignatureDate(DateUtil.getXmlDate(trackDate));
//                    } catch (DatatypeConfigurationException e) {
//                        throw new RuntimeException(e);
//                    }
//
//                };
            });
        }

        return mortalityType;
    }

    private void reasonForTracking(String reasonForTracking, MortalityType mortalityType) {
        if (reasonForTracking.contains("REASON_TRACKING_OTHER_(SPECIFY)")) {
            mortalityType.setReasonForTracking("Others");
        } else if (reasonForTracking.contains("REASON_TRACKING_INTENSIVE_FOLLOW-UP")) {
            mortalityType.setReasonForTracking("MissAppDate");
        } else if (reasonForTracking.contains("REASON_TRACKING_MISSED_APPOINTMENT")) {
            mortalityType.setReasonForTracking("MissAppDate");
        } else if (reasonForTracking.contains("REASON_TRACKING_LOST_TO_FOLLOW-UP")) {
            mortalityType.setReasonForTracking("MissPharmDate");
        }
    }

    private void modeofCommunication(String modeofCommunication, MortalityType mortalityType) {
        if (modeofCommunication.contains("MODE_OF_COMMUNICATION_TELEPHONE")) {
            mortalityType.setModeofCommunication("MobilePhone");
        }else if(modeofCommunication.contains("MODE_OF_COMMUNICATION_HOME_VISIT")){
            mortalityType.setModeofCommunication("HomeVisit");
        }
    }

    private void personContacted(String personContacted, MortalityType mortalityType) {
        if (personContacted.contains("PERSON_CONTACTED_GUARDIAN")) {
            mortalityType.setPersonContacted("Guardian");
        }else if (personContacted.contains("PERSON_CONTACTED_TX_PARTNER")) {
            mortalityType.setPersonContacted("TreatmentSupporter");
        }else if (personContacted.contains("PERSON_CONTACTED_NO_CONTACT")) {
            mortalityType.setPersonContacted("Patient");
        }else if (personContacted.contains("PERSON_CONTACTED_CLIENT")) {
            mortalityType.setPersonContacted("Patient");
        }
    }

    private void reasonforDefaulting(String reasonforDefaulting, MortalityType mortalityType) {
        if (reasonforDefaulting.contains("REASON_DEFAULTING_OTHERS_(PLS_SPECIFY)")) {
            mortalityType.setReasonforDefaulting("OthersSpecify");
        }else if (reasonforDefaulting.contains("REASON_DEFAULTING_TRANSFERRED_TO_NEW_SITE")) {
            mortalityType.setReasonforDefaulting("OthersSpecify");
        }else if (reasonforDefaulting.contains("REASON_DEFAULTING_INTENSIVE_FOLLOW-UP")) {
            mortalityType.setReasonforDefaulting("OthersSpecify");
        }
    }

    private void reasonforLosttoFollowup(String reasonforDefaulting, MortalityType mortalityType) {
        if (reasonforDefaulting.contains("DidNotAttempttoTrackPatient")) {
            mortalityType.setReasonforLosttoFollowup("DidNotAttempttoTrackPatient");
        }else if (reasonforDefaulting.contains("TrackedbutUnabletoLocate")) {
            mortalityType.setReasonforLosttoFollowup("TrackedbutUnabletoLocate");
        }
    }

    private void reasonforTermination(String reasonforTermination, MortalityType mortalityType) {
        if (reasonforTermination.contains("Treatment Stop")) {
            mortalityType.setReasonforTermination("TreatmentStop");
        }else if (reasonforTermination.contains("Self-transfer to another facility")) {
            mortalityType.setReasonforTermination("SelfTransfer");
        }else if (reasonforTermination.contains("Death")) {
            mortalityType.setReasonforTermination("Death");
        }else if (reasonforTermination.contains("Discontinued")) {
            mortalityType.setReasonforTermination("Discontinued");
        }else if (reasonforTermination.contains("DuplicateRecord")) {
            mortalityType.setReasonforTermination("DuplicateRecord");
        }else if (reasonforTermination.contains("CouldNotVerifyClient")) {
            mortalityType.setReasonforTermination("CouldNotVerifyClient");
        }else if (reasonforTermination.contains("LTFU")) {
            mortalityType.setReasonforTermination("LTFU");
        }else if (reasonforTermination.contains("Transferred Out")) {
            mortalityType.setReasonforTermination("TransferredOut");
        }
    }


//    private void indicationforClientVerification(String indicationforClientVerification, MortalityType mortalityType){
//        if (indicationforClientVerification.contains("No initial biometric capture") ) {
//            mortalityType.setIndicationforClientVerification("NoInitialBiometricCapture");
//        }else if (indicationforClientVerification.contains("Duplicated demographic and clinical variables") ) {
//            mortalityType.setIndicationforClientVerification("DuplicatedDemographicAndClinicalVariables");
//        }else if (indicationforClientVerification.contains("No biometrics recapture") ) {
//            mortalityType.setIndicationforClientVerification("NoBiometricsRecapture");
//        }else if (indicationforClientVerification.contains("Last clinical visit is over 15 months prior") ) {
//            mortalityType.setIndicationforClientVerification("LastClinicalVisitIsOver15MonthsPrior");
//        }else if (indicationforClientVerification.contains("Incomplete visit data on the care card or pharmacy forms or EMz ") ) {
//            mortalityType.setIndicationforClientVerification("IncompleteVisitData");
//        }else if (indicationforClientVerification.contains("Records of repeated clinical encounters, with no fingerprint recapture.") ) {
//            mortalityType.setIndicationforClientVerification("RepeatedClinicalEncounters");
//        }else if (indicationforClientVerification.contains("Long intervals between ARV pick-ups (pick-ups more than one year apart in the same facility)") ) {
//            mortalityType.setIndicationforClientVerification("LongIntervalsARVPickup");
//        }else if (indicationforClientVerification.contains("Same sex, DOB and ART start date") ) {
//            mortalityType.setIndicationforClientVerification("SameSexDOBARTStartDate");
//        }else if (indicationforClientVerification.contains("PickupByProxy") ) {
//            mortalityType.setIndicationforClientVerification("Consistently had drug pickup by proxy without viral load sample collection for two quarters");
//        }else if (indicationforClientVerification.contains("Others") ) {
//            mortalityType.setIndicationforClientVerification("OtherSpecify");
//        }
//    }

    private void death(String death, MortalityType mortalityType) {
        if (death.contains("Other Cause of Death")) {
            mortalityType.setDeath("OtherCauseofDeath");
        }else  if (death.contains("Suspected ARV Side Effect")) {
            mortalityType.setDeath("SuspectedARVSideEffect");
        }else  if (death.contains("Suspected Opportunistic Infection")) {
            mortalityType.setDeath("SuspectedOpportunisticInfection");
        }else  if (death.contains("Unknown")) {
            mortalityType.setDeath("Unknown");
        }
    }

    private void vaCauseOfDeath(String causeofdeath, MortalityType mortalityType) {
        if (causeofdeath.contains("VA Adult Cases of Death")) {
            mortalityType.setVACauseofDeath("VAAdultCasesofDeath");
        }if (causeofdeath.contains("VA Child Cases of Death")) {
            mortalityType.setVACauseofDeath("VAChildCasesofDeath");
        }
    }

    private void causeOfDeath(String causeofdeath, MortalityType mortalityType) {
        if (causeofdeath.contains("AIDS")) {
            mortalityType.setCauseOfDeath("AIDS");
        }else if (causeofdeath.contains("Diarrhea Dysentery")) {
            mortalityType.setCauseOfDeath("DiarrheaDysentery");
        }else if (causeofdeath.contains("Malaria")) {
            mortalityType.setCauseOfDeath("Malaria");
        }else if (causeofdeath.contains("Maternal")) {
            mortalityType.setCauseOfDeath("Maternal");
        }else if (causeofdeath.contains("Other Infetious Diseases")) {
            mortalityType.setCauseOfDeath("OtherInfetiousDiseases");
        }else if (causeofdeath.contains("Pneumonia")) {
            mortalityType.setCauseOfDeath("Pneumonia");
        }else if (causeofdeath.contains("TB")) {
            mortalityType.setCauseOfDeath("TB");
        }else if (causeofdeath.contains("Acute Myocardial Infection")) {
            mortalityType.setCauseOfDeath("AcuteMyocardialInfection");
        }else if (causeofdeath.contains("Breast Cancer")) {
            mortalityType.setCauseOfDeath("BreastCancer");
        }else if (causeofdeath.contains("Chronic Respiratory Diseases")) {
            mortalityType.setCauseOfDeath("ChronicRespiratoryDiseases");
        }else if (causeofdeath.contains("Cervical Cancer")) {
            mortalityType.setCauseOfDeath("CervicalCancer");
        }else if (causeofdeath.contains("Cirrhosis")) {
            mortalityType.setCauseOfDeath("Cirrhosis");
        }else if (causeofdeath.contains("Colorectal Cancer")) {
            mortalityType.setCauseOfDeath("ColorectalCancer");
        }else if (causeofdeath.contains("Diabetes")) {
            mortalityType.setCauseOfDeath("Diabetes");
        }else if (causeofdeath.contains("Esophageal Cancer")) {
            mortalityType.setCauseOfDeath("EsophagealCancer");
        }else if (causeofdeath.contains("Leukamia Lymphomas")) {
            mortalityType.setCauseOfDeath("LeukamiaLymphomas");
        }else if (causeofdeath.contains("Lung Cancer")) {
            mortalityType.setCauseOfDeath("LungCancer");
        }else if (causeofdeath.contains("Other Cardiovascular Diseases")) {
            mortalityType.setCauseOfDeath("OtherCardiovascularDiseases");
        }else if (causeofdeath.contains("Other Non Communicable Diseases")) {
            mortalityType.setCauseOfDeath("OtherNonCommunicableDiseases");
        }else if (causeofdeath.contains("Prostate Cancer")) {
            mortalityType.setCauseOfDeath("ProstateCancer");
        }else if (causeofdeath.contains("Chronic Kidney Disease")) {
            mortalityType.setCauseOfDeath("ChronicKidneyDisease");
        }else if (causeofdeath.contains("StomachCancer")) {
            mortalityType.setCauseOfDeath("StomachCancer");
        }else if (causeofdeath.contains("Stroke")) {
            mortalityType.setCauseOfDeath("Stroke");
        }else if (causeofdeath.contains("Other Cancers")) {
            mortalityType.setCauseOfDeath("OtherCancers");
        }else if (causeofdeath.contains("Bite of Venomous Animal")) {
            mortalityType.setCauseOfDeath("BiteofVenomousAnimal");
        }else if (causeofdeath.contains("Drowning")) {
            mortalityType.setCauseOfDeath("Drowning");
        }else if (causeofdeath.contains("Falls")) {
            mortalityType.setCauseOfDeath("Falls");
        }else if (causeofdeath.contains("Fires")) {
            mortalityType.setCauseOfDeath("Fires");
        }else if (causeofdeath.contains("Homicide")) {
            mortalityType.setCauseOfDeath("Homicide");
        }else if (causeofdeath.contains("Other Injuries")) {
            mortalityType.setCauseOfDeath("OtherInjuries");
        }else if (causeofdeath.contains("Accidental Poisoning")) {
            mortalityType.setCauseOfDeath("AccidentalPoisoning");
        }else if (causeofdeath.contains("Road Traffic")) {
            mortalityType.setCauseOfDeath("RoadTraffic");
        }else if (causeofdeath.contains("Suicide By Multiple Means")) {
            mortalityType.setCauseOfDeath("SuicideByMultipleMeans");
        }else if (causeofdeath.contains("Encephalitis")) {
            mortalityType.setCauseOfDeath("Encephalitis");
        }else if (causeofdeath.contains("Hemorrhagic Fever")) {
            mortalityType.setCauseOfDeath("HemorrhagicFever");
        }else if (causeofdeath.contains("Sepsis")) {
            mortalityType.setCauseOfDeath("Sepsis");
        }else if (causeofdeath.contains("Meningitis")) {
            mortalityType.setCauseOfDeath("Meningitis");
        }else if (causeofdeath.contains("Measles")) {
            mortalityType.setCauseOfDeath("Measles");
        }else if (causeofdeath.contains("Other Defined Causes of ChildDeaths")) {
            mortalityType.setCauseOfDeath("OtherDefinedCausesofChildDeaths");
        }else if (causeofdeath.contains("Other Digestive Diseases")) {
            mortalityType.setCauseOfDeath("OtherDigestiveDiseases");
        }else if (causeofdeath.contains("Birth Asphyxia")) {
            mortalityType.setCauseOfDeath("BirthAsphyxia");
        }else if (causeofdeath.contains("CongenitalMalformation")) {
            mortalityType.setCauseOfDeath("CongenitalMalformation");
        }else if (causeofdeath.contains("Neonatal Meningitis")) {
            mortalityType.setCauseOfDeath("NeonatalMeningitis");
        }else if (causeofdeath.contains("Neonatal Pneumonia")) {
            mortalityType.setCauseOfDeath("NeonatalPneumonia");
        }else if (causeofdeath.contains("PretermDelivery")) {
            mortalityType.setCauseOfDeath("PretermDelivery");
        }else if (causeofdeath.contains("Still birth")) {
            mortalityType.setCauseOfDeath("Stillbirth");
        }
    }

    private void discontinuedCare(String discontinuedCare, MortalityType mortalityType) {
        if (discontinuedCare.contains("Yes")) {
            mortalityType.setDiscontinuedCare("SelfDiscontinuation");
        }else if (discontinuedCare.contains("Forced Discontinuation")) {
            mortalityType.setDiscontinuedCare("ForcedDiscontinuation");
        }else if (discontinuedCare.contains("Moved Out of Area")) {
            mortalityType.setDiscontinuedCare("MovedOutofArea");
        }else if (discontinuedCare.contains("Other")) {
            mortalityType.setDiscontinuedCare("Other");
        }
    }

    private void reffferedFor(String discontinuedCare, MortalityType mortalityType) {
        if (discontinuedCare.contains("Adherence Counseling")) {
            mortalityType.setReffferedFor("AdherenceCounseling");
        }else if (discontinuedCare.contains("Other")) {
            mortalityType.setReffferedFor("Other");
        }
    }




}
