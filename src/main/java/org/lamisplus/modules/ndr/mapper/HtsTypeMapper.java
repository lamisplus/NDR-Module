package org.lamisplus.modules.ndr.mapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.ndr.schema.HIVTestingReportType;
import org.springframework.stereotype.Component;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.datatype.XMLGregorianCalendar;


@Component
@RequiredArgsConstructor
@Slf4j
public class HtsTypeMapper {
	
	
	public HIVTestingReportType getHivTestingReportType(String  patientUuid) {
		HIVTestingReportType hivTestingReportType = NDRObjectFactory.createHIVTestingReportType();
		//demographicDTO.getPersonUuid();
		//demographicDTO.get
		
//		@XmlElement(name = "ClientCode", required = true)
//		protected String clientCode;
//		@XmlElement(name = "VisitDate", required = true)
//		@XmlSchemaType(name = "date")
//		protected XMLGregorianCalendar visitDate;
//		@XmlElement(name = "VisitID", required = true)
//		protected String visitID;
//		@XmlElement(name = "Setting", required = true)
//		protected String setting;
//		@XmlElement(name = "FirstTimeVisit", required = true)
//		protected String firstTimeVisit;
		
		return hivTestingReportType;
	}


}
