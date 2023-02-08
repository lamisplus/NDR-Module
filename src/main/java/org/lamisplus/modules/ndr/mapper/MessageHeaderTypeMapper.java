package org.lamisplus.modules.ndr.mapper;


import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.lamisplus.modules.base.domain.entities.OrganisationUnit;
import org.lamisplus.modules.base.domain.entities.OrganisationUnitIdentifier;
import org.lamisplus.modules.base.service.OrganisationUnitService;
import org.lamisplus.modules.ndr.domain.PatientDemographics;
import org.lamisplus.modules.ndr.schema.FacilityType;
import org.lamisplus.modules.ndr.schema.MessageHeaderType;
import org.lamisplus.modules.ndr.utility.DateUtil;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Optional;


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


    public FacilityType getTreatmentFacility(PatientDemographics demographics) {
        FacilityType facility = new FacilityType ();
        facility.setFacilityTypeCode ("FAC");
        if(demographics.getFacilityName() != null )facility.setFacilityName (demographics.getFacilityName());
        if(demographics.getDatimId() != null) facility.setFacilityID(demographics.getDatimId());
        return facility;
    }

    @NotNull
    public Optional<String> getDatimCode(Long facilityId) {
        OrganisationUnit ndrFacility = organisationUnitService.getOrganizationUnit (facilityId);
        return ndrFacility.getOrganisationUnitIdentifiers ()
                .stream ()
                .filter (identifier -> identifier.getName ().equalsIgnoreCase ("DATIM_ID"))
                .map (OrganisationUnitIdentifier::getCode)
                .findFirst ();
    }

}
