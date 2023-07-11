package org.lamisplus.modules.ndr.domain.dto;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.datatype.XMLGregorianCalendar;
import java.io.Serializable;

public class TestResultTypeDTO implements Serializable {
	//@XmlElement(name = "ScreeningTestResult", required = true)
	 String screeningTestResult;
	@XmlElement(name = "ScreeningTestResultDate", required = true)
	@XmlSchemaType(name = "date")
	protected XMLGregorianCalendar screeningTestResultDate;
	@XmlElement(name = "ConfirmatoryTestResult", required = true)
	protected String confirmatoryTestResult;
	@XmlElement(name = "ConfirmatoryTestResultDate", required = true)
	@XmlSchemaType(name = "date")
	protected XMLGregorianCalendar confirmatoryTestResultDate;
	@XmlElement(name = "TieBreakerTestResult", required = true)
	protected String tieBreakerTestResult;
	@XmlElement(name = "TieBreakerTestResultDate", required = true)
	@XmlSchemaType(name = "date")
	protected XMLGregorianCalendar tieBreakerTestResultDate;
	@XmlElement(name = "FinalTestResult", required = true)
	protected String finalTestResult;
}
