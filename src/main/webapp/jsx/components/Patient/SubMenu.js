import React, { useState } from "react";
import {Dropdown, Menu } from "semantic-ui-react";
import {Link} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import EnhancedAdherenceCounseling from './../EnhancedAdherenceCounseling/EnhancedAdherenceCounseling'
import DifferentiatedCare from './../DifferentiatedCare/DifferentiatedCare';
import StatusUpdate from './../ClientStatusUpdate/ClientStatusUpdate';
import ClinicFollowUp from './../ClinicFollowUpVisit/ClinicFollowUp';
import CervicalCancer from './../CervicalCancer/Index'
import PrEPRegistrationForm from './../PrepServices/PrEPRegistrationForm'
import PrEPDiscontinuationsInterruptions from './../PrepServices/PrEPDiscontinuationsInterruptions'
import PrEPCommencementForm from './../PrepServices/PrEPCommencementForm'
import Pharmacy from './../Pharmacy/Index'
import Laboratory from './../Laboratory/index'
import PrEPEligibiltyScreeningForm from './../PrepServices/PrEPEligibiltyScreeningForm'
import PrEPVisit from './../PrepServices/PrEPVisit'

const useStyles = makeStyles((theme) => ({
    navItemText: {
        padding: theme.spacing(2),
    },
}));

function SubMenu(props) {
    const classes = useStyles();
    const patientObjs = props.patientObj ? props.patientObj : {}
    const [patientObj, setpatientObj] = useState(patientObjs)
    const [ancModal, setAncModal] = useState(false);
    const Anctoggle = () => setAncModal(!ancModal);
    const [careModal, setCareModal] = useState(false);
    const Caretoggle = () => setCareModal(!careModal);
    const [clientStatusUpdateModal, setClientStatusUpdateModal] = useState(false);
    const ClientStatusUpdatetoggle = () => setClientStatusUpdateModal(!clientStatusUpdateModal);
    const [clinicFollowUpModal, setClinicFollowUpModal] = useState(false);
    const ClinicFollowUptoggle = () => setClinicFollowUpModal(!clinicFollowUpModal);
    const [cervicalCancerModal, setCervicalCancerModal] = useState(false);
    const CervicalCancerToggle = () => setCervicalCancerModal(!cervicalCancerModal)
    //Laboratory Modal
    const [laboratoryModal, setLaboratoryModal] = useState(false);
    const LaboratoryToggle = () => setLaboratoryModal(!laboratoryModal)
    //Pharmacy Modal
    const [pharmacyModal, setPharmacyModal] = useState(false);
    const PharmacyToggle = () => setPharmacyModal(!pharmacyModal)
    //PreP Services Forms
    const [prEPRegistrationFormModal, setPrEPRegistrationFormModal] = useState(false);
    const PrEPRegistrationFormToggle = () => setPrEPRegistrationFormModal(!prEPRegistrationFormModal)
    const [prEPDiscontinuationsInterruptionsModal, setPrEPDiscontinuationsInterruptionsModal] = useState(false);
    const PrEPDiscontinuationsInterruptionsToggle = () => setPrEPDiscontinuationsInterruptionsModal(!prEPDiscontinuationsInterruptionsModal)
    const [prEPCommencementFormModal, setPrEPCommencementFormModal] = useState(false);
    const PrEPCommencementFormToggle = () => setPrEPCommencementFormModal(!prEPCommencementFormModal)
    const [prEPEligibiltyScreeningFormModal, setPrEPEligibiltyScreeningFormModal] = useState(false);
    const PrEPEligibiltyScreeningFormToggle = () => setPrEPEligibiltyScreeningFormModal(!prEPEligibiltyScreeningFormModal)
    const [prEPVisitModal, setPrEPVisitModal] = useState(false);
    const PrEPVisitToggle = () => setPrEPVisitModal(!prEPVisitModal)
    
    const loadAnc =(row)=> {
        setpatientObj({...patientObj, ...row});
            setAncModal(!ancModal)
    }
    const loadCare =(row)=> {
        setpatientObj({...patientObj, ...row});
            setCareModal(!careModal)
    }
    const loadStatusUpdate =(row)=> {
        setpatientObj({...patientObj, ...row});
        setClientStatusUpdateModal(!clientStatusUpdateModal)
    }
    const loadPharmacyModal =(row)=> {
        props.setActiveContent('pharmacy')
        // setpatientObj({...patientObj, ...row});
        // setPharmacyModal(!pharmacyModal)
    }
    const loadLaboratoryModal =(row)=> {
        props.setActiveContent('laboratory')
        // setpatientObj({...patientObj, ...row});
        // setLaboratoryModal(!laboratoryModal)
    }
    const loadClinicFolowUp = (row) =>{
        setpatientObj({...patientObj, ...row});
        setClinicFollowUpModal(!clinicFollowUpModal)
    }
    const loadCervicalCancer = (row) =>{
        setpatientObj({...patientObj, ...row});
        setCervicalCancerModal(!cervicalCancerModal)
    }
    const loadPrEPDiscontinuationsInterruptions = (row) =>{
        setpatientObj({...patientObj, ...row});
        setPrEPDiscontinuationsInterruptionsModal(!prEPDiscontinuationsInterruptionsModal)
    }
    const loadPrEPRegistrationForm = (row) =>{
        setpatientObj({...patientObj, ...row});
        setPrEPRegistrationFormModal(!prEPRegistrationFormModal)
    }
    const loadPrEPCommencementForm = (row) =>{
        setpatientObj({...patientObj, ...row});
        setPrEPCommencementFormModal(!prEPCommencementFormModal)
    }
    const loadPrEPEligibiltyScreeningForm = (row) =>{
        setpatientObj({...patientObj, ...row});
        setPrEPEligibiltyScreeningFormModal(!prEPEligibiltyScreeningFormModal)
    }
    const loadPrEPVisitForm = (row) =>{
        setpatientObj({...patientObj, ...row});
        setPrEPVisitModal(!prEPVisitModal)
    }
    const onClickConsultation = (row) =>{        
        props.setActiveContent('consultation')
    }
    const onClickHome = (row) =>{        
        props.setActiveContent(false)
    }

    return (
        <div>
            {!patientObj.commenced!==true ?
                (
                <Menu size="mini" color={"grey"} inverted >
                    <Menu.Item onClick={() => onClickHome()} style={{color:"black"}} disabled> Home</Menu.Item>
                    <Menu.Item onClick={() => loadClinicFolowUp(patientObj)} style={{color:"black"}} disabled>  Clinic Follow Up </Menu.Item>
                    <Menu.Item onClick={() => loadAnc(patientObj)} color={"black"} disabled> Enhanced Adherence Counselling</Menu.Item>
                    <Menu.Item onClick={() => loadStatusUpdate(patientObj)} disabled>Clint Status Update</Menu.Item>
                    <Menu.Item disabled>PMTCT</Menu.Item>
                    <Menu.Item disabled>HEI</Menu.Item>
                    <Menu.Item disabled>Cervical Cancer</Menu.Item>
                    <Menu.Item disabled>PREP</Menu.Item>
                    
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
                    <Dropdown text="PMTCT"   labeled simple    className='icon link item'>
                    <Dropdown.Menu style={{backgroundColor:"#000"}}>
                        <Dropdown.Item>
                            <Link to={{pathname: "/admin-program-manager-home"}} >
                            Labour and Delivery
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Link to={{pathname: "/admin-program-manager-home"}} >
                            ANC and DNC
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Link to={{pathname: "/admin-program-manager-home"}} >
                            ANC Enrolment
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Link to={{pathname: "/admin-program-manager-home"}} >
                             Child Clinic Visit Follow Up
                            </Link>
                        </Dropdown.Item>
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
                    <Menu.Item>HEI</Menu.Item>
                    <Menu.Item onClick={() => loadCervicalCancer(patientObj)}>Cervical Cancer</Menu.Item>
                    <Menu.Item></Menu.Item>
                    
                </Menu>
               )
           }
            <ClinicFollowUp toggle={ClinicFollowUptoggle} showModal={clinicFollowUpModal} patientObj={patientObj}/>
            <EnhancedAdherenceCounseling  toggle={Anctoggle} showModal={ancModal} patientObj={patientObj} /> 
            <DifferentiatedCare toggle={Caretoggle} showModal={careModal} patientObj={patientObj} />
            <StatusUpdate toggle={ClientStatusUpdatetoggle} showModal={clientStatusUpdateModal} patientObj={patientObj} />
            <CervicalCancer toggle={CervicalCancerToggle} showModal={cervicalCancerModal} patientObj={patientObj} />
            <PrEPRegistrationForm toggle={PrEPRegistrationFormToggle} showModal={prEPRegistrationFormModal} patientObj={patientObj} />
            <PrEPDiscontinuationsInterruptions toggle={PrEPDiscontinuationsInterruptionsToggle} showModal={prEPDiscontinuationsInterruptionsModal} patientObj={patientObj} />
            <PrEPCommencementForm toggle={PrEPCommencementFormToggle} showModal={prEPCommencementFormModal} patientObj={patientObj} />
            <PrEPEligibiltyScreeningForm toggle={PrEPEligibiltyScreeningFormToggle} showModal={prEPEligibiltyScreeningFormModal} patientObj={patientObj} />
            <PrEPVisit toggle={PrEPVisitToggle} showModal={prEPVisitModal} patientObj={patientObj} />
            {/* <Laboratory toggle={LaboratoryToggle} showModal={laboratoryModal} patientObj={patientObj}/> */}
            {/* <Pharmacy toggle={PharmacyToggle} showModal={pharmacyModal} patientObj={patientObj}/> */}
        </div>
    );
}



export default SubMenu;
