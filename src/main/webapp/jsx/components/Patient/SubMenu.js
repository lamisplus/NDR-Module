import React, { useState } from "react";
import {Dropdown, Menu } from "semantic-ui-react";
import {Link} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    navItemText: {
        padding: theme.spacing(2),
    },
}));

function SubMenu(props) {
    const classes = useStyles();
    const patientObjs = props.patientObj ? props.patientObj : {}
    const [patientObj, setpatientObj] = useState(patientObjs)
    const [genderType, setGenderType] = useState(props.patientObj.gender.display==="Female" || props.patientObj.gender.display==="Transgebder(Female)" ? true : false)
    const loadAnc =(row)=> {
        props.setActiveContent('counseling')
    }
    const loadCare =(row)=> {
        // setpatientObj({...patientObj, ...row});
        //     setCareModal(!careModal)
    }
    const loadStatusUpdate =(row)=> {
        props.setActiveContent('status-update')
    }
    const loadPharmacyModal =(row)=> {
        props.setActiveContent('pharmacy')
    }
    const loadLaboratoryModal =(row)=> {
        props.setActiveContent('laboratory')
    }
    const loadClinicFolowUp = (row) =>{
        // setpatientObj({...patientObj, ...row});
        // setClinicFollowUpModal(!clinicFollowUpModal)
    }
    const loadCervicalCancer = (row) =>{
        props.setActiveContent('cervical-cancer')
    }
    const loadPrEPDiscontinuationsInterruptions = (row) =>{
        props.setActiveContent('prep-interruptions')
    }
    const loadPrEPRegistrationForm = (row) =>{
        props.setActiveContent('prep-registration')
    }
    const loadPrEPCommencementForm = (row) =>{
        props.setActiveContent('prep-commencement')
    }
    const loadPrEPEligibiltyScreeningForm = (row) =>{
        props.setActiveContent('prep-screening')
    }
    const loadPrEPVisitForm = (row) =>{
        props.setActiveContent('prep-visit')
    }
    const onClickConsultation = (row) =>{        
        props.setActiveContent('consultation')
    }
    const onClickHome = (row) =>{        
        props.setActiveContent('recent-history')
    }
    const loadAncPnc =(row)=> {
        props.setActiveContent('anc-pnc')
    }
    const loadAncAncEnrollment =(row)=> {
        props.setActiveContent('anc-enrollment')
    }
    const onClickChildConsultation =(row)=> {
        props.setActiveContent('child-consultation')
    }
    const loadLabourDelivery =(row)=> {
        props.setActiveContent('labour-delivery')
    }

    return (
        <div>
            {patientObj.commenced!==true ?
                (
                <Menu size="mini" color={"grey"} inverted >
                    <Menu.Item onClick={() => onClickHome()} > Home</Menu.Item>
                    <Menu.Item onClick={() => onClickConsultation()} > Clinic Visit</Menu.Item>
                    <Menu.Item onClick={() => loadLaboratoryModal()} > Laboratory</Menu.Item>
                    <Menu.Item onClick={() => loadPharmacyModal()} > Pharmacy</Menu.Item>
                    {/* <Menu.Item onClick={() => loadClinicFolowUp(patientObj)}>  Clinic Follow Up Visit</Menu.Item> */}
                    <Menu.Item onClick={() => loadAnc(patientObj)}> Enhanced Adherence Counselling</Menu.Item>
                    <Menu.Item onClick={() => loadStatusUpdate(patientObj)}>Clint Status Update</Menu.Item>
                    {genderType===true ? 
                        (
                            <>
                            <Dropdown text="PMTCT"   labeled simple    className='icon link item'>
                            <Dropdown.Menu style={{backgroundColor:"#000"}}>
                                <Dropdown.Item onClick={() => loadAncPnc(patientObj)}><span  style={{color:"#fff",}}> ANC and DNC</span></Dropdown.Item>
                                <Dropdown.Item onClick={() => loadAncAncEnrollment(patientObj)}><span  style={{color:"#fff",}}>ANC Enrolment</span></Dropdown.Item>
                                <Dropdown.Item onClick={() => onClickChildConsultation(patientObj)}><span  style={{color:"#fff",}}>Child Clinic Visit Follow Up</span></Dropdown.Item>
                                <Dropdown.Item onClick={() => loadLabourDelivery(patientObj)}><span  style={{color:"#fff",}}>Labour and Delivery</span></Dropdown.Item>                        
                            </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown text="PrEP" labeled simple className='icon link item'>
                            <Dropdown.Menu style={{backgroundColor:"#000", color:"#fff", fontColor:"#fff"}}>
                                <Dropdown.Item onClick={() => loadPrEPRegistrationForm(patientObj)}> <span  style={{color:"#fff",}}>PrEP Registration</span></Dropdown.Item>
                                <Dropdown.Item onClick={() => loadPrEPVisitForm(patientObj)}><span  style={{color:"#fff",}}>PrEP Visit</span></Dropdown.Item>
                                <Dropdown.Item onClick={() => loadPrEPEligibiltyScreeningForm(patientObj)}><span  style={{color:"#fff",}}>PrEP Eligibilty Screening Form</span></Dropdown.Item>
                                <Dropdown.Item onClick={() => loadPrEPDiscontinuationsInterruptions(patientObj)}><span  style={{color:"#fff",}}>PrEP Discontinuations & Interruptions</span></Dropdown.Item>
                                <Dropdown.Item onClick={() => loadPrEPCommencementForm(patientObj)}><span  style={{color:"#fff",}}>PrEP Commencement</span></Dropdown.Item>
                            </Dropdown.Menu>
                            </Dropdown>
                            
                            <Menu.Item onClick={() => loadCervicalCancer(patientObj)}>Cervical Cancer</Menu.Item>
                            <Menu.Item></Menu.Item>
                            </>
                        )
                        :""
                    }
                    
                    
                </Menu>
               )
               :
               (
                <Menu size="mini" color={"black"} inverted>
                    <Menu.Item onClick={() => onClickHome()} > Home</Menu.Item>
                    <Menu.Item onClick={() => onClickConsultation()} > Clinic Visit</Menu.Item>
                    <Menu.Item onClick={() => loadLaboratoryModal()} > Laboratory</Menu.Item>
                    <Menu.Item onClick={() => loadPharmacyModal()} > Pharmacy</Menu.Item>
                    {/* <Menu.Item onClick={() => loadClinicFolowUp(patientObj)}>  Clinic Follow Up Visit</Menu.Item> */}
                    <Menu.Item onClick={() => loadAnc(patientObj)}> Enhanced Adherence Counselling</Menu.Item>
                    <Menu.Item onClick={() => loadStatusUpdate(patientObj)}>Clint Status Update</Menu.Item>
                    {genderType===true ? 
                        (
                            <>
                            <Dropdown text="PMTCT"   labeled simple    className='icon link item'>
                            <Dropdown.Menu style={{backgroundColor:"#000"}}>
                                <Dropdown.Item onClick={() => loadAncPnc(patientObj)}><span  style={{color:"#fff",}}> ANC and DNC</span></Dropdown.Item>
                                <Dropdown.Item onClick={() => loadAncAncEnrollment(patientObj)}><span  style={{color:"#fff",}}>ANC Enrolment</span></Dropdown.Item>
                                <Dropdown.Item onClick={() => onClickChildConsultation(patientObj)}><span  style={{color:"#fff",}}>Child Clinic Visit Follow Up</span></Dropdown.Item>
                                <Dropdown.Item onClick={() => loadLabourDelivery(patientObj)}><span  style={{color:"#fff",}}>Labour and Delivery</span></Dropdown.Item>                        
                            </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown text="PrEP" labeled simple className='icon link item'>
                            <Dropdown.Menu style={{backgroundColor:"#000", color:"#fff", fontColor:"#fff"}}>
                                <Dropdown.Item onClick={() => loadPrEPRegistrationForm(patientObj)}> <span  style={{color:"#fff",}}>PrEP Registration</span></Dropdown.Item>
                                <Dropdown.Item onClick={() => loadPrEPVisitForm(patientObj)}><span  style={{color:"#fff",}}>PrEP Visit</span></Dropdown.Item>
                                <Dropdown.Item onClick={() => loadPrEPEligibiltyScreeningForm(patientObj)}><span  style={{color:"#fff",}}>PrEP Eligibilty Screening Form</span></Dropdown.Item>
                                <Dropdown.Item onClick={() => loadPrEPDiscontinuationsInterruptions(patientObj)}><span  style={{color:"#fff",}}>PrEP Discontinuations & Interruptions</span></Dropdown.Item>
                                <Dropdown.Item onClick={() => loadPrEPCommencementForm(patientObj)}><span  style={{color:"#fff",}}>PrEP Commencement</span></Dropdown.Item>
                            </Dropdown.Menu>
                            </Dropdown>
                            
                            <Menu.Item onClick={() => loadCervicalCancer(patientObj)}>Cervical Cancer</Menu.Item>
                            <Menu.Item></Menu.Item>
                            </>
                        )
                        :""
                    }
                    
                </Menu>
               )
           }
                       
        </div>
    );
}



export default SubMenu;
