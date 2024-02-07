package org.lamisplus.modules.ndr.mapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.ndr.domain.dto.ClientVerificationDTO;
import org.lamisplus.modules.ndr.repositories.NdrMessageLogRepository;
import org.lamisplus.modules.ndr.schema.ClientVerificationType;
import org.lamisplus.modules.ndr.utility.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.xml.datatype.DatatypeConfigurationException;
import java.sql.Date;
import java.time.LocalDate;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ClientVerificationTypeMapper {
    //get CV source
    @Autowired
    private NdrMessageLogRepository ndrMessageLogRepository;
    public ClientVerificationType getClientVerifications(String patientId, long facilityId, LocalDate start, LocalDate end) {
        ClientVerificationType clientVerificationType = new ClientVerificationType();

        ClientVerificationDTO clientVerificationVal = ndrMessageLogRepository.getClientVerification(patientId, facilityId, start, end);

        if(clientVerificationVal.getClientVerification() != null) {
            clientVerificationType.setClientVerification("YES");
        }else{
            clientVerificationType.setClientVerification("NO");
        }

        if(clientVerificationVal.getPickupByProxy() != null) {
            clientVerificationType.setPickupByProxy("TRUE");
        }else{
            clientVerificationType.setPickupByProxy("FALSE");
        }

        if(clientVerificationVal.getDuplicatedDemographic() != null) {
            clientVerificationType.setDuplicatedDemographic("TRUE");
        }else{
            clientVerificationType.setDuplicatedDemographic("FALSE");
        }

        if(clientVerificationVal.getNoRecapture() != null) {
            clientVerificationType.setNoRecapture("TRUE");
        }else{
            clientVerificationType.setNoRecapture("FALSE");
        }

        if(clientVerificationVal.getBatchPickupDates() != null) {
            clientVerificationType.setBatchPickupDates("TRUE");
        }else{
            clientVerificationType.setBatchPickupDates("FALSE");
        }

        if(clientVerificationVal.getLastVisitIsOver18M() != null) {
            clientVerificationType.setLastVisitIsOver18M("TRUE");
        }else{
            clientVerificationType.setLastVisitIsOver18M("FALSE");
        }

        if(clientVerificationVal.getArtStartPickupDate() != null) {
            clientVerificationType.setARTStartPickupDate("TRUE");
        }else{
            clientVerificationType.setARTStartPickupDate("FALSE");
        }

        if(clientVerificationVal.getNoInitBiometric() != null) {
            clientVerificationType.setNoInitBiometric("TRUE");
        }else{
            clientVerificationType.setNoInitBiometric("FALSE");
        }

        if(clientVerificationVal.getIncompleteVisitData() != null) {
            clientVerificationType.setIncompleteVisitData("TRUE");
        }else{
            clientVerificationType.setIncompleteVisitData("FALSE");
        }

        if(clientVerificationVal.getRepeatEncounterNoPrint() != null) {
            clientVerificationType.setRepeatEncounterNoPrint("TRUE");
        }else{
            clientVerificationType.setRepeatEncounterNoPrint("FALSE");
        }

        if(clientVerificationVal.getLongIntervalsARVPickup() != null) {
            clientVerificationType.setLongIntervalsARVPickup("TRUE");
        }else{
            clientVerificationType.setLongIntervalsARVPickup("FALSE");
        }

        if(clientVerificationVal.getSameSexDOBARTStartDate() != null) {
            clientVerificationType.setSameSexDOBARTStartDate("TRUE");
        }else{
            clientVerificationType.setSameSexDOBARTStartDate("FALSE");
        }

        if(clientVerificationVal.getOtherSpecifyForCV() != null) {
            clientVerificationType.setOtherSpecifyForCV(clientVerificationVal.getOtherSpecifyForCV());
        }

        if(clientVerificationVal.getCt1STDate() != null) {
//            log.info("122 {}", clientVerificationVal.ct1STDate());
            Date ct1STDate = java.sql.Date.valueOf(clientVerificationVal.getCt1STDate());
            try {
                clientVerificationType.setCT1STDate(DateUtil.getXmlDate(ct1STDate));
            } catch (DatatypeConfigurationException e) {
                throw new RuntimeException(e);
            }
        };

        if(clientVerificationVal.getFirstStatus() != null) {
            getStatus(clientVerificationVal.getFirstStatus(), clientVerificationType);
        }

        if(clientVerificationVal.getFirstOutcome() != null) {
            getOutcome(clientVerificationVal.getFirstOutcome(), clientVerificationType);
        }

        if(clientVerificationVal.getCt2NdDate() != null) {
//            log.info("122 {}", clientVerificationVal.ct1STDate());
            Date ct2NdDate = java.sql.Date.valueOf(clientVerificationVal.getCt2NdDate());
            try {
                clientVerificationType.setCT1STDate(DateUtil.getXmlDate(ct2NdDate));
            } catch (DatatypeConfigurationException e) {
                throw new RuntimeException(e);
            }
        };

        if(clientVerificationVal.getSecondStatus() != null) {
            getStatus(clientVerificationVal.getSecondStatus(), clientVerificationType);
        }

        if(clientVerificationVal.getSecondOutcome() != null) {
            getOutcome(clientVerificationVal.getSecondOutcome(), clientVerificationType);
        }

        if(clientVerificationVal.getCtLastDate() != null) {
//            log.info("122 {}", clientVerificationVal.ct1STDate());
            Date ctLastDate = java.sql.Date.valueOf(clientVerificationVal.getCtLastDate());
            try {
                clientVerificationType.setCT1STDate(DateUtil.getXmlDate(ctLastDate));
            } catch (DatatypeConfigurationException e) {
                throw new RuntimeException(e);
            }
        };

        if(clientVerificationVal.getLastStatus() != null) {
            getStatus(clientVerificationVal.getLastStatus(), clientVerificationType);
        }

        if(clientVerificationVal.getLastOutcome() != null) {
            getOutcome(clientVerificationVal.getLastOutcome(), clientVerificationType);
        }

        return  clientVerificationType;
    }

    private void getStatus(String otherSpecifyForCv, ClientVerificationType clientVerificationType) {
        if (otherSpecifyForCv.contains("VerificationOngoing")) {
            clientVerificationType.setOtherSpecifyForCV("VerificationOngoing");
        }else if(otherSpecifyForCv.contains("RecordDiscontinued")){
            clientVerificationType.setOtherSpecifyForCV("RecordDiscontinued");
        }else if(otherSpecifyForCv.contains("RecordVerified")){
            clientVerificationType.setOtherSpecifyForCV("RecordVerified");
        }
    }

    private void getOutcome(String firstOutcome, ClientVerificationType clientVerificationType) {
        if (firstOutcome.contains("Pending")) {
            clientVerificationType.setFirstStatus("Pending");
        }else if(firstOutcome.contains("Valid")){
            clientVerificationType.setOtherSpecifyForCV("Valid");
        }else if(firstOutcome.contains("Invalid")){
            clientVerificationType.setOtherSpecifyForCV("Invalid");
        }
    }

}
