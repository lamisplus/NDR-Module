package org.lamisplus.modules.ndr.mapper;


import lombok.RequiredArgsConstructor;
import org.lamisplus.modules.base.service.OrganisationUnitService;
import org.lamisplus.modules.ndr.domain.dto.PatientDemographicDTO;
import org.lamisplus.modules.ndr.domain.dto.PatientDemographics;
import org.lamisplus.modules.ndr.schema.FacilityType;
import org.lamisplus.modules.ndr.schema.MessageHeaderType;
import org.lamisplus.modules.ndr.utility.DateUtil;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;


@Service
@RequiredArgsConstructor
public class MessageHeaderTypeMapper {
    private final OrganisationUnitService organisationUnitService;


    public MessageHeaderType getMessageHeader(PatientDemographics demographics) {
         MessageHeaderType header = new MessageHeaderType ();
            try {
                header.setMessageCreationDateTime (DateUtil.getXmlDateTime (new Date ()));
                header.setMessageSchemaVersion (new BigDecimal ("1.6"));
                FacilityType sendingOrganization = getTreatmentFacility (demographics);
                header.setMessageSendingOrganization (sendingOrganization);
                return header;
            } catch (Exception exception) {
                exception.printStackTrace ();
        }
        return null;
    }
    
    public MessageHeaderType getMessageHeader(PatientDemographicDTO  demographics) {
        MessageHeaderType header = new MessageHeaderType ();
        try {
            header.setMessageCreationDateTime (DateUtil.getXmlDateTime (new Date ()));
            header.setMessageSchemaVersion (new BigDecimal ("1.6"));
            FacilityType sendingOrganization = getTreatmentFacility (demographics);
            header.setMessageSendingOrganization (sendingOrganization);
            return header;
        } catch (Exception exception) {
            exception.printStackTrace ();
        }
        return null;
    }


    public FacilityType getTreatmentFacility(PatientDemographics demographics) {
        FacilityType facility = new FacilityType ();
        facility.setFacilityTypeCode ("FAC");
        if(demographics.getFacilityName() != null )facility.setFacilityName (demographics.getFacilityName());
        if(demographics.getDatimId() != null) facility.setFacilityID(demographics.getDatimId());
        return facility;
    }
    
    
    public FacilityType getTreatmentFacility(PatientDemographicDTO demographics) {
        FacilityType facility = new FacilityType ();
        facility.setFacilityTypeCode ("FAC");
        if(demographics.getFacilityName() != null )facility.setFacilityName (demographics.getFacilityName());
        if(demographics.getFacilityId() != null) facility.setFacilityID(demographics.getFacilityId());
        return facility;
    }
    
    

}
