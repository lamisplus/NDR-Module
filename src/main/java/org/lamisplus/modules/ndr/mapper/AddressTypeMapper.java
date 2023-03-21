package org.lamisplus.modules.ndr.mapper;


import lombok.RequiredArgsConstructor;
import org.lamisplus.modules.ndr.domain.PatientDemographics;
import org.lamisplus.modules.ndr.schema.AddressType;
import org.lamisplus.modules.ndr.service.NDRCodeSetResolverService;
import org.lamisplus.modules.patient.repository.PersonRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class AddressTypeMapper {
	private final NDRCodeSetResolverService ndrCodeSetResolverService;
	
	
	
	public AddressType getPatientAddress(PatientDemographics demographics ) {
		AddressType address = new AddressType();
		address.setAddressTypeCode("H");
		address.setCountryCode("NGA");
		processAndSetPatientCurrentAddress(address, demographics);
		return address;
	}
	
	
	private void processAndSetPatientCurrentAddress(AddressType addressType, PatientDemographics patientDemographics) {
		if (patientDemographics.getTown() != null) {
			addressType.setTown(patientDemographics.getTown());
		}
		Optional<String> stateCode =
				ndrCodeSetResolverService.getNDRCodeSetCode("STATES", patientDemographics.getState());
		Optional<String> lgaCode =
				ndrCodeSetResolverService.getNDRCodeSetCode("LGA", patientDemographics.getLga());
		stateCode.ifPresent(addressType::setStateCode);
		lgaCode.ifPresent(addressType::setLGACode);
	}
	
}