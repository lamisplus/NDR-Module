package org.lamisplus.modules.ndr.domain.dto;

import org.lamisplus.modules.ndr.schema.YNCodeType;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.datatype.XMLGregorianCalendar;

public class RecencyDTO {
	@XmlElement(name = "TestName", required = true)
	protected String testName;
	@XmlElement(name = "TestDate", required = true)
	@XmlSchemaType(name = "date")
	protected XMLGregorianCalendar testDate;
	@XmlElement(name = "SampleType", required = true)
	protected String sampleType;
	@XmlElement(name = "DateSampleCollected", required = true)
	@XmlSchemaType(name = "date")
	protected XMLGregorianCalendar dateSampleCollected;
	@XmlElement(name = "DateSampleSent", required = true)
	@XmlSchemaType(name = "date")
	protected XMLGregorianCalendar dateSampleSent;
	@XmlElement(name = "PCRLab", required = true)
	protected String pcrLab;
	@XmlElement(name = "RapidRecencyAssay", required = true)
	protected String rapidRecencyAssay;
	@XmlElement(name = "ViralLoadConfirmationResult")
	protected Double viralLoadConfirmationResult;
	@XmlElement(name = "ViralLoadConfirmationTestDate")
	@XmlSchemaType(name = "date")
	protected XMLGregorianCalendar viralLoadConfirmationTestDate;
	@XmlElement(name = "FinalRecencyTestResult", required = true)
	protected String finalRecencyTestResult;
	@XmlElement(name = "Consent", required = true)
	@XmlSchemaType(name = "string")
	protected YNCodeType consent;
	@XmlElement(name = "RecencyNumber", required = true)
	protected String recencyNumber;
	@XmlElement(name = "ControlLine", required = true)
	@XmlSchemaType(name = "string")
	protected YNCodeType controlLine;
	@XmlElement(name = "VerificationLine", required = true)
	@XmlSchemaType(name = "string")
	protected YNCodeType verificationLine;
	@XmlElement(name = "LongTermLine", required = true)
	@XmlSchemaType(name = "string")
	protected YNCodeType longTermLine;
	@XmlElement(name = "RecencyInterpretation", required = true)
	protected String recencyInterpretation;
	@XmlElement(name = "ViralLoadRequest", required = true)
	@XmlSchemaType(name = "string")
	protected YNCodeType viralLoadRequest;
	@XmlElement(name = "SampleReferenceNumber", required = true)
	protected String sampleReferenceNumber;
	@XmlElement(name = "ViralLoadClassification", required = true)
	protected String viralLoadClassification;
}
