import React, { useState, useEffect } from "react";
import axios from "axios";
import {Dropdown, Menu, Segment, } from "semantic-ui-react";
import { url as baseUrl, token } from "../../../api";

function SubMenu(props) {
    //const classes = useStyles();
    const [activeItem, setActiveItem] = useState('home');
    const patientObj = props.patientObj
    const patientCurrentStatus=props.patientObj && props.patientObj.currentStatus==="Died (Confirmed)" ? true : false ;
    //const [patientObj, setpatientObj] = useState(patientObjs)
    // let mentalStatus=false
    // let initialEvaluationStatus=false

    useEffect(() => {
        if(props.patientObj && props.patientObj!==null){
            Observation();
        }
    }, [props.patientObj]);
   
    //Get list 
    const Observation =()=>{
        axios
            .get(`${baseUrl}observation/person/${props.patientObj.id}`,
                { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then((response) => {
                //const observation = response.data
                // const mental= observation.filter((x)=> x.type==='mental health')
                // const evaluation= observation.filter((x)=> x.type==='initial evaluation')
                // if(mental.length > 1){
                //     mentalStatus=true
                // }
                // if(evaluation.length > 1){
                //     initialEvaluationStatus=true
                // }

            })
            .catch((error) => {
            //console.log(error);
            });
        
    }

    const loadEAC =(row)=> {
        setActiveItem('eac')
        props.setActiveContent({...props.activeContent, route:'counseling'})
    }

    const loadPharmacyModal =(row)=> {
        setActiveItem('pharmacy')
        props.setActiveContent({...props.activeContent, route:'pharmacy'})
    }
    const loadLaboratoryOrderResult =(row)=> {
        setActiveItem('lab')
        props.setActiveContent({...props.activeContent, route:'laboratoryOrderResult'})
    }
    const loadLaboratoryViralLoadOrderResult =(row)=> {
        setActiveItem('lab')
        props.setActiveContent({...props.activeContent, route:'laboratoryViralLoadOrderResult'})
    }
    const loadCervicalCancer = (row) =>{
        setActiveItem('cancer')
        props.setActiveContent({...props.activeContent, route:'cervical-cancer'})
    }
   
    const onClickConsultation = (row) =>{ 
        setActiveItem('visit')       
        props.setActiveContent({...props.activeContent, route:'consultation'})
    }
    const onClickHome = (row) =>{    
        setActiveItem('home')    
        props.setActiveContent({...props.activeContent, route:'recent-history'})
    }

    const loadTrackingForm =(row)=> {
        setActiveItem('tracking')
        props.setActiveContent({...props.activeContent, route:'tracking-form'})
    }
    
    const loadMentalHealth = ()=>{
        setActiveItem('health')
        props.setActiveContent({...props.activeContent, route:'mhs'})
    }
    const loadAdultEvaluation =(row)=> {
        setActiveItem('initial')
        props.setActiveContent({...props.activeContent, route:'adult-evaluation'})

    }
    const loadPatientHistory = ()=>{
        setActiveItem('history')
        props.setActiveContent({...props.activeContent, route:'patient-history'})
    }
    const loadIntensiveForm = ()=>{
        setActiveItem('intensive')
        props.setActiveContent({...props.activeContent, route:'intensive-followup'})
    }
    const loadTransferForm = ()=>{
        setActiveItem('transfer')
        props.setActiveContent({...props.activeContent, route:'transfer-form'})
    }
    const loadArtCommencement = ()=>{
        setActiveItem('art')
        props.setActiveContent({...props.activeContent, route:'art-commencementPage'})
    }
    const loadChronicCare = ()=>{
        setActiveItem('chronic-care')
        props.setActiveContent({...props.activeContent, route:'chronic-care'})
    }
    //

    return (
         <div>
           {props.patientObj && props.patientObj!==null && (
            <Segment inverted>
         {/*!props.art && patientObj.commenced!==true && patientObj.enrollment.targetGroupId===473) || (!props.art && (patientObj.commenced!==true || patientObj.commenced===true)  && patientObj.mentalHealth!==true) */}
            { (patientObj.commenced===false || patientObj.createBy!=="Lamis data migration system" ) && (patientObj.commenced!==true || patientObj.clinicalEvaluation!==true || (patientObj.targetGroupId!==473 ? patientObj.mentalHealth!==true : false ) )
           
                ?
                (
                <Menu size='tiny' color={"blue"} inverted pointing >
                    <Menu.Item onClick={() => onClickHome()} name='home' 
                    active={activeItem === 'home'} title="Home"> Home</Menu.Item>
                    {!patientObj.clinicalEvaluation  && (<Menu.Item onClick={() => loadAdultEvaluation()} name='initial'
                    active={activeItem === 'initial'} title="Initial Evaluation"> Initial Evaluation</Menu.Item>)}
                    {!patientObj.commenced && (<Menu.Item onClick={() => loadArtCommencement()} name='art'
                    active={activeItem === 'art'}  disabled={patientObj.biometricStatus} title="Art Commencement">Art Commencement</Menu.Item>)}
                    { (patientObj.targetGroupId!==null && patientObj.targetGroupId!=="" ) && patientObj.targetGroupId!==473 && patientObj.mentalHealth===false  && (<Menu.Item onClick={() => loadMentalHealth(patientObj)} name='health'
                    active={activeItem === 'health'} title="Mental Health Screening">Mental Health Screening</Menu.Item>)}
                    {/* <Menu.Item onClick={() => loadStatusUpdate(patientObj)} disabled>Client Status Update</Menu.Item>                     */}
                    <Menu.Item onClick={() => loadPatientHistory(patientObj)} name='history'
                    active={activeItem === 'history'} title="History">History</Menu.Item>
                </Menu>
                )
               :
               (
                <Menu size='tiny' color={"black"} inverted>                    
                    <Menu.Item onClick={() => onClickHome()} disabled={patientCurrentStatus} name='home'
                    active={activeItem === 'home'} title="Home"> Home</Menu.Item>
                     {!patientObj.clinicalEvaluation && patientObj.createBy==="Lamis data migration system" && (<Menu.Item onClick={() => loadAdultEvaluation()} name='initial'
                    active={activeItem === 'initial'} title="Initial Evaluation"> Initial Evaluation</Menu.Item>)}
                    <Menu.Item onClick={() => onClickConsultation()} disabled={patientCurrentStatus} name='visit'
                    active={activeItem === 'visit'} title="Care Card">Care Card</Menu.Item>
                     <Menu.Menu position='' name='lab' active={activeItem === 'lab'}>
                        <Dropdown item text='Laboratory'>
                            <Dropdown.Menu>
                            <Dropdown.Item onClick={() => loadLaboratoryOrderResult()} disabled={patientCurrentStatus} title="Laboratory Order & Result">Laboratory Order & Result</Dropdown.Item>
                            <Dropdown.Item onClick={() => loadLaboratoryViralLoadOrderResult()} disabled={patientCurrentStatus} title="Viral Load Order & Result">Viral Load Order & Result</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        </Menu.Menu>
                    <Menu.Item onClick={() => loadPharmacyModal()} disabled={patientCurrentStatus} name='pharmacy'
                    active={activeItem === 'pharmacy'} title="Pharmacy"> Pharmacy</Menu.Item>
                    <Menu.Item onClick={() => loadEAC(patientObj)} disabled={patientCurrentStatus} name='eac'
                    active={activeItem === 'eac'} title="EAC"> EAC</Menu.Item>
                    {/* <Menu.Item onClick={() => loadStatusUpdate(patientObj)} name='status'
                    active={activeItem === 'status'}>Client Status Update</Menu.Item> */}
                    {/* {patientObj.currentStatus && patientObj.currentStatus==='IIT' && (<Menu.Item onClick={() => loadTrackingForm(patientObj)} >Tracking Form</Menu.Item>)} */}
                    {(!patientObj.mentalHealth  && (patientObj.targetGroupId!==null && patientObj.targetGroupId!==473)) && patientObj.createBy==="Lamis data migration system" && (<Menu.Item onClick={() => loadMentalHealth(patientObj)} name='health'
                    active={activeItem === 'health'} title="Mental Health Screening">Mental Health Screening</Menu.Item>)}
                   
                    {(props.patientObj.sex==='Female' || props.patientObj.sex==='FEMALE' || props.patientObj.sex==='female') ? 
                        (
                            <>
        
                            <Menu.Item onClick={() => loadCervicalCancer(patientObj)} name='cancer'
                            active={activeItem === 'cancer'} title="Cervical Cancer">Cervical Cancer</Menu.Item>
                            </>
                            )
                            :""
                    }  
                    <Menu.Item onClick={() => loadTrackingForm(patientObj)} name='tracking'
                    active={activeItem === 'tracking'} title="Tracking Form">Tracking Form</Menu.Item>
                     {/* patientObj.currentStatus && patientObj.currentStatus==='IIT' &&  (<Menu.Item onClick={() => loadChronicCare(patientObj)} >Chronic Care</Menu.Item> */}
                     <Menu.Item onClick={() => loadIntensiveForm(patientObj)} name='intensive'
                    active={activeItem === 'intensive'} title="Intensive Follow Up">Intensive Follow Up</Menu.Item>
                    <Menu.Item onClick={() => loadTransferForm(patientObj)} name='transfer'
                    active={activeItem === 'transfer'} title="Transfer">Transfer</Menu.Item>
                    <Menu.Item onClick={() => loadChronicCare(patientObj)} name='transfer'
                    active={activeItem === 'chronic-care'} title="Chronic Care">Chronic Care</Menu.Item>
                    <Menu.Item onClick={() => loadPatientHistory(patientObj)} name='history'
                    active={activeItem === 'history'} title="History">History</Menu.Item>
                    
                </Menu>
               )
           }
         </Segment>
         )}              
        </div>
    );
}



export default SubMenu;
