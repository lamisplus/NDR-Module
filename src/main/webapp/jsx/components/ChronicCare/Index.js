import React, {useCallback, useEffect, useState} from "react";
import { Button} from 'semantic-ui-react'
import {Card, CardBody} from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import {Link, useLocation} from "react-router-dom";
//import {TiArrowBack} from 'react-icons/ti'
//import {token, url as baseUrl } from "../../../api";
import 'react-phone-input-2/lib/style.css'
import { Icon, Menu } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import ChronicConditions from './ChronicConditions'
import NutritionalStatus from './NutritionalStatus'
import PositiveHealthDignity from './PositiveHealthDignity'
import GenderBase from './GenderBase'
import ReproductiveIntentions from './ReproductiveIntentions'
import Eligibilty from './Eligibilty'
import moment from "moment";



const ChronicCare = (props) => {
    //const classes = useStyles();
    const location = useLocation();
    const locationState = location.state;
    const [saving, setSaving] = useState(false);
    const [activeItem, setactiveItem] = useState('eligibility');
    const [completed, setCompleted] = useState([]);
    const [patientObj, setPatientObj] = useState("");
    const [observation, setObservation]=useState({
        data: {
                medicalHistory:"",
                currentMedical:"",
                patientDisclosure:"",
                pastArvMedical:"",
                physicalExamination:"",
                generalApperance:"",
                skin:"",
                eye:"",
                breast:"",
                cardiovascular:"",
                genitalia:"",
                respiratory:"",
                gastrointestinal:"",
                assesment :"",
                who:"",
                plan:"",
                regimen:"",
                enroll:"",
                planArt:"" ,
                nextAppointment:"",
                neurological:"",
                mentalstatus:"",
                visitDate:""           
        },
        dateOfObservation: null,
        facilityId: null,
        personId: patientObj.id,
        type: "Clinical evaluation",
        visitId: null
    })
    const handleItemClick =(activeItem)=>{
        setactiveItem(activeItem)
        //setCompleted({...completed, ...completedMenu})
    }
    useEffect(() => { 
        if(locationState && locationState.patientObj){
            setPatientObj(locationState.patientObj)           
        }
    }, []);
    const calculate_age = dob => {
        var today = new Date();
        var dateParts = dob.split("-");
        var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
        var birthDate = new Date(dateObject); // create a date object directlyfrom`dob1`argument
        var age_now = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    age_now--;
                }
            if (age_now === 0) {
                    return m;
                }
                return age_now;
    };
    const patientAge=calculate_age(moment(patientObj.dateOfBirth).format("DD-MM-YYYY"));

    return (
        <>

            
            <Card >
                <CardBody>
              
                    <div className="row">
                    
                        <h2>Chronic Care </h2> 
                       
                        <br/>
                        <br/>
                        <form >
                        <div className="col-md-3 float-start">
                        <Menu  size='large'  vertical  style={{backgroundColor:"#014D88"}}>
                            <Menu.Item
                                name='inbox'
                                active={activeItem === 'eligibility'}
                                onClick={()=>handleItemClick('eligibility')}
                                style={{backgroundColor:activeItem === 'eligibility' ? '#000': ""}}
                                //disabled={activeItem !== 'past-arv' ? true : false}
                            >               
                                <span style={{color:'#fff'}}>Eligibility Assessment
                                {completed.includes('eligibility') && (
                                    <Icon name='check' color='green' />
                                )}
                                </span>
                                
                                {/* <Label color='teal'>3</Label> */}
                            </Menu.Item>
                            <Menu.Item
                                name='spam'
                                active={activeItem === 'nutrition'}
                                onClick={()=>handleItemClick('nutrition')}
                                style={{backgroundColor:activeItem === 'nutrition' ? '#000': ""}}
                                //disabled={activeItem !== 'appearance' ? true : false}
                            >
                            {/* <Label>4</Label> */}
                            <span style={{color:'#fff'}}>Nutritional Status Assessment
                            {completed.includes('nutrition') && (
                                <Icon name='check' color='green' />
                            )}
                            </span>
                            
                            </Menu.Item>                           
                            <Menu.Item
                                name='spam'
                                active={activeItem === 'gender-base'}
                                onClick={()=>handleItemClick('gender-base')}
                                style={{backgroundColor:activeItem === 'gender-base' ? '#000': ""}}
                                //disabled={activeItem !== 'who' ? true : false}
                            >
                                {/* <Label>4</Label> */}
                                <span style={{color:'#fff'}}>Gender Based Violence Screening 
                                    {completed.includes('gender-base') && (
                                        <Icon name='check' color='green' />
                                    )}
                                </span>                            
                            </Menu.Item>
                            <Menu.Item
                                name='spam'
                                active={activeItem === 'chronic-conditions'}
                                onClick={()=>handleItemClick('chronic-conditions')}
                                style={{backgroundColor:activeItem === 'chronic-conditions' ? '#000': ""}}
                                //disabled={activeItem !== 'plan' ? true : false}
                            >
                                {/* <Label>4</Label> */}
                                <span style={{color:'#fff'}}>Screening for Chronic Conditions
                                    {completed.includes('chronic-conditions') && (
                                        <Icon name='check' color='green' />
                                    )}
                                </span>                            
                            </Menu.Item>
                           
                            <Menu.Item
                                name='spam'
                                active={activeItem === 'positive-health'}
                                onClick={()=>handleItemClick('positive-health')}
                                style={{backgroundColor:activeItem === 'positive-health' ? '#000': ""}}
                                //disabled={activeItem !== 'regimen' ? true : false}
                            >
                                {/* <Label>4</Label> */}
                                <span style={{color:'#fff'}}>Positive Health Dignity and Prevention(PHDP)
                                    {completed.includes('positive-health') && (
                                        <Icon name='check' color='green' />
                                    )}
                                </span>                            
                            </Menu.Item>
                            <Menu.Item
                                name='spam'
                                active={activeItem === 'reproductive'}
                                onClick={()=>handleItemClick('reproductive')}
                                style={{backgroundColor:activeItem === 'reproductive' ? '#000': ""}}
                                //disabled={activeItem !== 'regimen' ? true : false}
                            >
                                {/* <Label>4</Label> */}
                                <span style={{color:'#fff'}}>Reproductive Intentions
                                    {completed.includes('reproductive') && (
                                        <Icon name='check' color='green' />
                                    )}
                                </span>                            
                            </Menu.Item>
                        </Menu>
                        </div>
                        <div className="col-md-9 float-end" style={{ backgroundColor:"#fff", }}>
                            {activeItem==='nutrition' && (<NutritionalStatus handleItemClick={handleItemClick} setCompleted={setCompleted} completed={completed} setPatientObj={setPatientObj} patientObj={patientObj} setObservation={setObservation} observation={observation} patientAge={patientAge}/>)}
                            {activeItem==='positive-health' && (<PositiveHealthDignity handleItemClick={handleItemClick} setCompleted={setCompleted} completed={completed} setPatientObj={setPatientObj} patientObj={patientObj} setObservation={setObservation} observation={observation} patientAge={patientAge}/>)}
                            {activeItem==='chronic-conditions' && (<ChronicConditions handleItemClick={handleItemClick} setCompleted={setCompleted} completed={completed} setPatientObj={setPatientObj} patientObj={patientObj} setObservation={setObservation} observation={observation} patientAge={patientAge}/>)}
                            {activeItem==='gender-base' && (<GenderBase handleItemClick={handleItemClick} setCompleted={setCompleted} completed={completed} setPatientObj={setPatientObj} patientObj={patientObj} setObservation={setObservation} observation={observation} patientAge={patientAge}/>)}
                            {activeItem==='reproductive' && (<ReproductiveIntentions  handleItemClick={handleItemClick} setCompleted={setCompleted} completed={completed} setPatientObj={setPatientObj} patientObj={patientObj} setObservation={setObservation} observation={observation} patientAge={patientAge}/>)}
                            {activeItem==='eligibility' && (<Eligibilty  handleItemClick={handleItemClick} setCompleted={setCompleted} completed={completed} setPatientObj={setPatientObj} patientObj={patientObj} setObservation={setObservation} observation={observation} patientAge={patientAge}/>)}
                        </div>  
                        </form>                                 
                    </div>
                </CardBody>
            </Card>                                 
        </>
    );
};

export default ChronicCare