
package org.lamisplus.modules.ndr.schema;

import javax.xml.bind.annotation.*;
import javax.xml.datatype.XMLGregorianCalendar;


/**
 * <p>Java class for FingerPrintType complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="FingerPrintType">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="dateCaptured" type="{http://www.w3.org/2001/XMLSchema}date" minOccurs="0"/>
 *         &lt;element name="replacePrint" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/&gt;
 *         &lt;element name="rightHand" type="{}rightHandType"/>
 *         &lt;element name="leftHand" type="{}leftHandType"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "FingerPrintType", propOrder = {
    "dateCaptured",
        "replacePrint",
    "rightHand",
    "leftHand"
})
public class FingerPrintType {

    @XmlSchemaType(name = "date")
    protected XMLGregorianCalendar dateCaptured;

    protected Integer replacePrint;

    @XmlElement(required = true)
    protected RightHandType rightHand;
    @XmlElement(required = true)
    protected LeftHandType leftHand;

    /**
     * Gets the value of the dateCaptured property.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getDateCaptured() {
        return dateCaptured;
    }

    /**
     * Sets the value of the dateCaptured property.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setDateCaptured(XMLGregorianCalendar value) {
        this.dateCaptured = value;
    }

    /**
     * Gets the value of the replacePrint property.
     *
     * @return
     *     possible object is
     *     {@link Integer }
     *
     */
    public Integer getReplacePrint() {
        return replacePrint;
    }

    /**
     * Sets the value of the replacePrint property.
     *
     * @param value
     *     allowed object is
     *     {@link Integer }
     *
     */
    public void setReplacePrint(Integer value) {
        this.replacePrint = value;
    }

    /**
     * Gets the value of the rightHand property.
     * 
     * @return
     *     possible object is
     *     {@link RightHandType }
     *     
     */
    public RightHandType getRightHand() {
        return rightHand;
    }

    /**
     * Sets the value of the rightHand property.
     * 
     * @param value
     *     allowed object is
     *     {@link RightHandType }
     *     
     */
    public void setRightHand(RightHandType value) {
        this.rightHand = value;
    }

    /**
     * Gets the value of the leftHand property.
     * 
     * @return
     *     possible object is
     *     {@link LeftHandType }
     *     
     */
    public LeftHandType getLeftHand() {
        return leftHand;
    }

    /**
     * Sets the value of the leftHand property.
     * 
     * @param value
     *     allowed object is
     *     {@link LeftHandType }
     *     
     */
    public void setLeftHand(LeftHandType value) {
        this.leftHand = value;
    }

}
