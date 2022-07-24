import React, { useState, useEffect } from "react";
import axios from "axios";
import {Dropdown, Menu } from "semantic-ui-react";
import { makeStyles } from "@material-ui/core/styles";
import { url as baseUrl, token } from "../../../api";


const useStyles = makeStyles((theme) => ({
    navItemText: {
        padding: theme.spacing(2),
    },
}));

function SubMenu(props) {
    const classes = useStyles();
    const patientObjs = props.patientObj ? props.patientObj : {}
    const patientCurrentStatus=props.patientObj && props.patientObj.currentStatus==="Died (Confirmed)" ? true : false ;
    const [patientObj, setpatientObj] = useState(patientObjs)
    const [genderType, setGenderType] = useState(props.patientObj.gender.display==="Female" || props.patientObj.gender.display==="Transgebder(Female)" ? true : false)
    let mentalStatus=false
    let initialEvaluationStatus=false
    useEffect(() => {
        Observation();
        }, []);
     //Get list of RegimenLine
     const Observation =()=>{
        axios
            .get(`${baseUrl}observation/person/${props.patientObj.id}`,
                { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then((response) => {
                const observation = response.data
                const mental= observation.filter((x)=> x.type==='mental health')
                const evaluation= observation.filter((x)=> x.type==='initial evaluation')
                if(mental.length > 1){
                    mentalStatus=true
                }
                if(evaluation.length > 1){
                    initialEvaluationStatus=true
                }

            })
            .catch((error) => {
            //console.log(error);
            });
        
        }

    const loadAnc =(row)=> {
        props.setActiveContent('counseling')
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
    const loadMentalHealth = ()=>{
        props.setActiveContent('mhs')
    }
    const loadAdultEvaluation =(row)=> {
        props.setActiveContent('adult-evaluation')
      }


    return (
        <div>
            {!props.art && patientObj.commenced!==true ?
                (
                <Menu size="mini" color={"grey"} inverted >
                    <Menu.Item onClick={() => onClickHome()} disabled> Home</Menu.Item>
                    {!patientObj.clinicalEvaluation && (<Menu.Item onClick={() => loadAdultEvaluation()} > Initial Clinic Evaluation</Menu.Item>)}
                    <Menu.Item onClick={() => onClickConsultation()} disabled> Clinic Visit</Menu.Item>
                    <Menu.Item onClick={() => loadLaboratoryModal()} disabled> Laboratory</Menu.Item>
                    <Menu.Item onClick={() => loadPharmacyModal()} disabled> Pharmacy</Menu.Item>
                    <Menu.Item onClick={() => loadAnc(patientObj)} disabled> Enhanced Adherence Counselling</Menu.Item>
                    {!patientObj.mentalStatus && (<Menu.Item onClick={() => loadMentalHealth(patientObj)} disabled>Mental Health Screening</Menu.Item>)}
                    <Menu.Item onClick={() => loadStatusUpdate(patientObj)} disabled>Client Status Update</Menu.Item>
                    {/* <Dropdown text="PrEP" labeled simple className='icon link item' disabled>
                            <Dropdown.Menu style={{backgroundColor:"#000", color:"#fff", fontColor:"#fff"}}>
                                <Dropdown.Item onClick={() => loadPrEPRegistrationForm(patientObj)} disabled> <span  style={{color:"#fff",}}>PrEP Registration</span></Dropdown.Item>
                                <Dropdown.Item onClick={() => loadPrEPVisitForm(patientObj)} disabled><span  style={{color:"#fff",}}>PrEP Visit</span></Dropdown.Item>
                                <Dropdown.Item onClick={() => loadPrEPEligibiltyScreeningForm(patientObj)} disabled><span  style={{color:"#fff",}}>PrEP Eligibilty Screening Form</span></Dropdown.Item>
                                <Dropdown.Item onClick={() => loadPrEPDiscontinuationsInterruptions(patientObj)} disabled><span  style={{color:"#fff",}}>PrEP Discontinuations & Interruptions</span></Dropdown.Item>
                                <Dropdown.Item onClick={() => loadPrEPCommencementForm(patientObj)} disabled><span  style={{color:"#fff",}}>PrEP Commencement</span></Dropdown.Item>
                            </Dropdown.Menu>
                    </Dropdown> */}
                            
                    {/* {genderType===true ? 
                        (
                            <>
                            <Dropdown text="PMTCT"   labeled simple    className='icon link item' disabled>
                            <Dropdown.Menu style={{backgroundColor:"#000"}}>
                                <Dropdown.Item onClick={() => loadAncPnc(patientObj)} disabled><span  style={{color:"#fff",}}> ANC and DNC</span></Dropdown.Item>
                                <Dropdown.Item onClick={() => loadAncAncEnrollment(patientObj)} disabled><span  style={{color:"#fff",}}>ANC Enrolment</span></Dropdown.Item>
                                <Dropdown.Item onClick={() => onClickChildConsultation(patientObj)} disabled><span  style={{color:"#fff",}}>Child Clinic Visit Follow Up</span></Dropdown.Item>
                                <Dropdown.Item onClick={() => loadLabourDelivery(patientObj)} disabled><span  style={{color:"#fff",}}>Labour and Delivery</span></Dropdown.Item>                        
                            </Dropdown.Menu>
                            </Dropdown>
                            <Menu.Item onClick={() => loadCervicalCancer(patientObj)} disabled>Cervical Cancer</Menu.Item>
                            </>
                        )
                        :""
                    } */}
                    
                    
                </Menu>
               )
               :
               (
                <Menu size="mini" color={"black"} inverted>
                    
                    <Menu.Item onClick={() => onClickHome()} disabled={patientCurrentStatus} > Home</Menu.Item>
                    {!patientObj.clinicalEvaluation && (<Menu.Item onClick={() => loadAdultEvaluation()} disabled={patientCurrentStatus}> Initial Clinic Evaluation</Menu.Item>)}
                    <Menu.Item onClick={() => onClickConsultation()} disabled={patientCurrentStatus}> Clinic Visit</Menu.Item>
                    <Menu.Item onClick={() => loadLaboratoryModal()} disabled={patientCurrentStatus}> Laboratory</Menu.Item>
                    <Menu.Item onClick={() => loadPharmacyModal()} disabled={patientCurrentStatus}> Pharmacy</Menu.Item>
                    <Menu.Item onClick={() => loadAnc(patientObj)} disabled={patientCurrentStatus}> Enhanced Adherence Counselling</Menu.Item>
                    <Menu.Item onClick={() => loadStatusUpdate(patientObj)} >Client Status Update</Menu.Item>
                    {!patientObj.mentalStatus && (<Menu.Item onClick={() => loadMentalHealth(patientObj)} >Mental Health Screening</Menu.Item>)}
                    {/* <Dropdown text="PrEP" labeled simple className='icon link item'>
                            <Dropdown.Menu style={{backgroundColor:"#000", color:"#fff", fontColor:"#fff"}}>
                                <Dropdown.Item onClick={() => loadPrEPRegistrationForm(patientObj)}> <span  style={{color:"#fff",}}>PrEP Registration</span></Dropdown.Item>
                                <Dropdown.Item onClick={() => loadPrEPVisitForm(patientObj)}><span  style={{color:"#fff",}}>PrEP Visit</span></Dropdown.Item>
                                <Dropdown.Item onClick={() => loadPrEPEligibiltyScreeningForm(patientObj)}><span  style={{color:"#fff",}}>PrEP Eligibilty Screening Form</span></Dropdown.Item>
                                <Dropdown.Item onClick={() => loadPrEPDiscontinuationsInterruptions(patientObj)}><span  style={{color:"#fff",}}>PrEP Discontinuations & Interruptions</span></Dropdown.Item>
                                <Dropdown.Item onClick={() => loadPrEPCommencementForm(patientObj)}><span  style={{color:"#fff",}}>PrEP Commencement</span></Dropdown.Item>
                            </Dropdown.Menu>
                    </Dropdown> */}
                            
                    {/* {genderType===true ? 
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
                            <Menu.Item onClick={() => loadCervicalCancer(patientObj)}>Cervical Cancer</Menu.Item>
                            </>
                        )
                        :""
                    } */}
                    
                </Menu>
               )
           }
                       
        </div>
    );
}



export default SubMenu;
