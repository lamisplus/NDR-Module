//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.8-b130911.1802 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2023.05.26 at 09:32:03 AM WAT 
//


package org.lamisplus.modules.ndr.schema.recapture;

import lombok.ToString;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for PatientDemographicsType complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="PatientDemographicsType">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="PatientIdentifier">
 *           &lt;simpleType>
 *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *               &lt;minLength value="0"/>
 *               &lt;maxLength value="2000"/>
 *             &lt;/restriction>
 *           &lt;/simpleType>
 *         &lt;/element>
 *         &lt;element name="FingerPrints" type="{}FingerPrintType" maxOccurs="unbounded"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "PatientDemographicsType", propOrder = {
    "patientIdentifier",
    "fingerPrints"
})
@ToString
public class PatientDemographicsType {

    @XmlElement(name = "PatientIdentifier", required = true)
    protected String patientIdentifier;
    @XmlElement(name = "FingerPrints", required = true)
    protected List<FingerPrintType> fingerPrints;

    /**
     * Gets the value of the patientIdentifier property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPatientIdentifier() {
        return patientIdentifier;
    }

    /**
     * Sets the value of the patientIdentifier property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPatientIdentifier(String value) {
        this.patientIdentifier = value;
    }

    /**
     * Gets the value of the fingerPrints property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the fingerPrints property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getFingerPrints().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link FingerPrintType }
     * 
     * 
     */
    public List<FingerPrintType> getFingerPrints() {
        if (fingerPrints == null) {
            fingerPrints = new ArrayList<FingerPrintType>();
        }
        return this.fingerPrints;
    }

}
