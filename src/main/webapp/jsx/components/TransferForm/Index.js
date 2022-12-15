import React, {useState, useEffect} from 'react';
import { Card,CardBody, FormGroup, Label, Input} from 'reactstrap';
import MatButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import { Table  } from "react-bootstrap";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";
import { toast} from "react-toastify";
import { url as baseUrl } from "./../../../api";
import { token as token } from "./../../../api";
import "react-widgets/dist/css/react-widgets.css";
import moment from "moment";
import { Spinner } from "reactstrap";
import {Icon, List, Label as LabelSui} from 'semantic-ui-react'

const useStyles = makeStyles(theme => ({
    card: {
        margin: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    cardBottom: {
        marginBottom: 20
    },
    Select: {
        height: 45,
        width: 350
    },
    button: {
        margin: theme.spacing(1)
    },

    root: {
        flexGrow: 1,
        "& .card-title":{
            color:'#fff',
            fontWeight:'bold'
        },
        "& .form-control":{
            borderRadius:'0.25rem',
            height:'41px'
        },
        "& .card-header:first-child": {
            borderRadius: "calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0"
        },
        "& .dropdown-toggle::after": {
            display: " block !important"
        },
        "& select":{
            "-webkit-appearance": "listbox !important"
        },
        "& p":{
            color:'red'
        },
        "& label":{
            fontSize:'14px',
            color:'#014d88',
            fontWeight:'bold'
        }
    },
    input: {
        display: 'none'
    } ,
    error: {
        color: "#f85032",
        fontSize: "11px",
      },
}))

const Tracking = (props) => {
    const patientObj = props.patientObj;
    const [errors, setErrors] = useState({});
    let temp = { ...errors }
    const enrollDate = patientObj && patientObj.enrollment ? patientObj.enrollment.dateOfRegistration : null
    const classes = useStyles()
    const [saving, setSaving] = useState(false);
    const [eacObj, setEacObj] = useState([]);
    
    const [observation, setObservation]=useState({
        data: {},
        dateOfObservation: "yyyy-MM-dd",
        facilityId: null,
        personId: 0,
        type: "Tracking form",
        visitId: null
    })
    const [objValues, setObjValues]=useState({
            durationOnART:"", 
            dsdStatus:"", 
            dsdModel:"", 
            reasonForTracking:"",
            dateLastAppointment:"",
            dateMissedAppointment :"",
            careInFacilityDiscountinued :"",
            dateOfDiscontinuation :"",
            reasonForDiscountinuation:"",
            reasonForLossToFollowUp :"",
            causeOfDeath :"",
            dateReturnToCare :"",
            referredFor:"",
            referredForOthers:"",
            reasonForTrackingOthers:"",
            causeOfDeathOthers:"",
            reasonForLossToFollowUpOthers:"",
            attempts:"",
            patientId:props.patientObj.id
            })
    const handleInputChange = e => {
        setErrors({...temp, [e.target.name]:""})
        setObjValues ({...objValues,  [e.target.name]: e.target.value});
    }  
    const [attempt, setAttempt] = useState({ attemptDate: "", whoAttemptedContact: "", 
                modeOfConatct: "", personContacted: "", reasonForDefaulting: "", reasonForDefaultingOthers:""
    });
    const [attemptList, setAttemptList] = useState([])          
    const handleInputChangeAttempt = e => {
        //console.log(e.target.value)
        setErrors({...temp, [e.target.name]:""})
        setAttempt ({...attempt,  [e.target.name]: e.target.value});
    }
    //Validations of the forms
    const validate = () => {        
    temp.durationOnART = objValues.durationOnART ? "" : "This field is required"
    temp.dsdStatus = objValues.dsdStatus ? "" : "This field is required"
    {objValues.dsdStatus==='Devolved' && (temp.dsdModel = objValues.dsdModel ? "" : "This field is required")}
    temp.reasonForTracking = objValues.reasonForTracking ? "" : "This field is required"
    temp.dateLastAppointment = objValues.dateLastAppointment ? "" : "This field is required"
    temp.dateMissedAppointment = objValues.dateMissedAppointment ? "" : "This field is required"

    temp.careInFacilityDiscountinued = objValues.careInFacilityDiscountinued ? "" : "This field is required"
    {objValues.careInFacilityDiscountinued==='Yes' && (temp.dateOfDiscontinuation = objValues.dateOfDiscontinuation ? "" : "This field is required")}
    {objValues.careInFacilityDiscountinued==='Yes' && (temp.reasonForDiscountinuation = objValues.reasonForDiscountinuation ? "" : "This field is required")}
    {objValues.reasonForDiscountinuation==='Loss to follow-up' && (temp.reasonForLossToFollowUp = objValues.reasonForLossToFollowUp ? "" : "This field is required")}
    {objValues.reasonForDiscountinuation==='Death' && (temp.causeOfDeath = objValues.causeOfDeath ? "" : "This field is required")}
    temp.dateReturnToCare = objValues.dateReturnToCare ? "" : "This field is required"
    temp.referredFor = objValues.referredFor ? "" : "This field is required"
    {objValues.referredFor==='Others' && (temp.referredForOthers = objValues.referredForOthers ? "" : "This field is required")}
    {objValues.reasonForTracking==='Others' && (temp.reasonForTrackingOthers = objValues.reasonForTrackingOthers ? "" : "This field is required")}
    {objValues.causeOfDeath==='Unknown' || objValues.causeOfDeath==='Other cause of death' || objValues.causeOfDeath==='Suspected Opportunistic Infection' && (temp.causeOfDeathOthers = objValues.causeOfDeathOthers ? "" : "This field is required")}
    {objValues.reasonForLossToFollowUp==='Others' && ( temp.reasonForLossToFollowUpOthers = objValues.reasonForLossToFollowUpOthers ? "" : "This field is required")}
    setErrors({
        ...temp
    })
    return Object.values(temp).every(x => x == "")
    }
    //Validations of the forms
    const validateAttempt = () => {        
    temp.attemptDate = attempt.attemptDate ? "" : "This field is required"
    temp.whoAttemptedContact = attempt.whoAttemptedContact ? "" : "This field is required"
    temp.modeOfConatct = attempt.modeOfConatct ? "" : "This field is required"
    temp.personContacted = attempt.personContacted ? "" : "This field is required"
    temp.reasonForDefaulting = attempt.reasonForDefaulting ? "" : "This field is required"
    setErrors({
        ...temp
    })
    return Object.values(temp).every(x => x == "")
  }
    const addAttempt = e => {
        if(validateAttempt()){ 
            setAttemptList([...attemptList, attempt])
            setAttempt({attemptDate: "", whoAttemptedContact: "", 
                        modeOfConatct: "", personContacted: "", 
                        reasonForDefaulting: "", reasonForDefaultingOthers:""
            })
        }else{
            toast.error("Please fill the required fields");
        }
      }
    /* Remove ADR  function **/
    const removeAttempt = index => {       
        attemptList.splice(index, 1);
        setAttemptList([...attemptList]);        
    }; 
    
    /**** Submit Button Processing  */
    const handleSubmit = (e) => {        
        e.preventDefault();
        if(validate()){
            if(attemptList.length >0){
                objValues.attempts=attemptList
                observation.dateOfObservation= moment(new Date()).format("YYYY-MM-DD")       
                observation.personId =patientObj.id
                observation.data=objValues        
                setSaving(true);
                axios.post(`${baseUrl}patient-tracker`,objValues,
                { headers: {"Authorization" : `Bearer ${token}`}},
                
                )
                    .then(response => {
                        setSaving(false);
                        toast.success(" Save successful");
                        props.setActiveContent({...props.activeContent, route:'recent-history'})
                        //props.setActiveContent('recent-history')

                    })
                    .catch(error => {
                        setSaving(false);
                        if(error.response && error.response.data){
                            let errorMessage = error.response.data.apierror && error.response.data.apierror.message!=="" ? error.response.data.apierror.message :  "Something went wrong, please try again";
                            toast.error(errorMessage);
                        }
                        else{
                            toast.error("Something went wrong. Please try again...");
                        }
                    });
                }else{
                    toast.error("Attempt to Contact can not be empty");
                }
            }  
    }

  return (      
        <div>                   
            <Card className={classes.root}>
                <CardBody>
                <form >
                    <div className="row">
                    <h2>Transfer Form</h2>
                        <br/>
                        <br/>
                        <div className="row">
                        <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                            <Label for="">Facility Name From</Label>

                                <Input 
                                    type="text"
                                    name="durationOnART"
                                    id="durationOnART"
                                    onChange={handleInputChange}
                                    value={objValues.durationOnART} 
                                >
                                </Input>
                                {errors.durationOnART !=="" ? (
                                    <span className={classes.error}>{errors.durationOnART}</span>
                                ) : "" }
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                            <Label for=""> State Transfer From</Label>
                                <Input 
                                    type="select"
                                    name="dsdStatus"
                                    id="dsdStatus"
                                    onChange={handleInputChange}
                                    value={objValues.dsdStatus} 
                                >
                                   <option value="Not devolved">Not devolved</option>
                                    <option value="Devolved">Devolved</option>
                                    
                                </Input>
                                {errors.dsdStatus !=="" ? (
                                    <span className={classes.error}>{errors.dsdStatus}</span>
                                ) : "" }
                            </FormGroup>
                        </div>
                        {objValues.dsdStatus==='Devolved' && (
                        <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                            <Label for="">LGA Transfer From</Label>

                                <Input 
                                    type="select"
                                    name="dsdModel"
                                    id="dsdModel"
                                    onChange={handleInputChange}
                                    value={objValues.dsdModel} 
                                >
                                    <option value=""></option>
                                    <option value="FBM">FBM</option>
                                    <option value="CBM">CBM</option>
                                </Input>
                                {errors.dsdModel !=="" ? (
                                    <span className={classes.error}>{errors.dsdModel}</span>
                                ) : "" }
                            </FormGroup>
                        </div>
                        )}
                        </div>
                        <div className="row">
                        <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                            <Label for="">Facility Name To</Label>

                                <Input 
                                    type="text"
                                    name="durationOnART"
                                    id="durationOnART"
                                    onChange={handleInputChange}
                                    value={objValues.durationOnART} 
                                >
                                </Input>
                                {errors.durationOnART !=="" ? (
                                    <span className={classes.error}>{errors.durationOnART}</span>
                                ) : "" }
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                            <Label for=""> State Transfer To</Label>
                                <Input 
                                    type="select"
                                    name="dsdStatus"
                                    id="dsdStatus"
                                    onChange={handleInputChange}
                                    value={objValues.dsdStatus} 
                                >
                                   <option value="Not devolved">Not devolved</option>
                                    <option value="Devolved">Devolved</option>
                                    
                                </Input>
                                {errors.dsdStatus !=="" ? (
                                    <span className={classes.error}>{errors.dsdStatus}</span>
                                ) : "" }
                            </FormGroup>
                        </div>
                        {objValues.dsdStatus==='Devolved' && (
                        <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                            <Label for="">LGA Transfer To</Label>

                                <Input 
                                    type="select"
                                    name="dsdModel"
                                    id="dsdModel"
                                    onChange={handleInputChange}
                                    value={objValues.dsdModel} 
                                >
                                    <option value=""></option>
                                    <option value="FBM">FBM</option>
                                    <option value="CBM">CBM</option>
                                </Input>
                                {errors.dsdModel !=="" ? (
                                    <span className={classes.error}>{errors.dsdModel}</span>
                                ) : "" }
                            </FormGroup>
                        </div>
                        )}
                        </div>
                        <div className="row">
                        <div className="form-group mb-3 col-md-12">
                            <FormGroup>
                            <Label for="">Clinical Note</Label>

                                <Input 
                                    type="textarea"
                                    name="reasonForTracking"
                                    id="reasonForTracking"
                                    onChange={handleInputChange}
                                    value={objValues.reasonForTracking} 
                                >
                                  
                                </Input>
                                {errors.reasonForTracking !=="" ? (
                                    <span className={classes.error}>{errors.reasonForTracking}</span>
                                ) : "" }
                            </FormGroup>
                        </div>
                        </div>
                        <div className="row">
                        <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                            <Label for="">Date Confirmed HIV Positive</Label>

                            <Input 
                                    type="text"
                                    name="reasonForTrackingOthers"
                                    id="reasonForTrackingOthers"
                                    onChange={handleInputChange}
                                    value={objValues.reasonForTrackingOthers} 
                                />
                                {errors.reasonForTracking !=="" ? (
                                    <span className={classes.error}>{errors.reasonForTracking}</span>
                                ) : "" }
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                            <Label for="">Mode of HIV Test</Label>

                                <Input 
                                    type="text"
                                    name="reasonForTrackingOthers"
                                    id="reasonForTrackingOthers"
                                    onChange={handleInputChange}
                                    value={objValues.reasonForTrackingOthers} 
                                />
                                 {errors.reasonForTrackingOthers !=="" ? (
                                    <span className={classes.error}>{errors.reasonForTrackingOthers}</span>
                                    ) : "" }
                            
                            </FormGroup>
                        </div>
                        </div>
                        <div className="row">
                        <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                            <Label for="">Preganacy Status</Label>

                            <Input 
                                    type="text"
                                    name="reasonForTrackingOthers"
                                    id="reasonForTrackingOthers"
                                    onChange={handleInputChange}
                                    value={objValues.reasonForTrackingOthers} 
                                />
                                {errors.reasonForTracking !=="" ? (
                                    <span className={classes.error}>{errors.reasonForTracking}</span>
                                ) : "" }
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                            <Label for="">Gestational Age in weeks</Label>

                                <Input 
                                    type="number"
                                    name="reasonForTrackingOthers"
                                    id="reasonForTrackingOthers"
                                    onChange={handleInputChange}
                                    value={objValues.reasonForTrackingOthers} 
                                />
                                 {errors.reasonForTrackingOthers !=="" ? (
                                    <span className={classes.error}>{errors.reasonForTrackingOthers}</span>
                                    ) : "" }
                            
                            </FormGroup>
                        </div>
                        </div>
                        <div className="row">
                        <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                            <Label for="">Date Enroll in Care</Label>

                            <Input 
                                    type="date"
                                    name="reasonForTrackingOthers"
                                    id="reasonForTrackingOthers"
                                    onChange={handleInputChange}
                                    value={objValues.reasonForTrackingOthers} 
                                />
                                {errors.reasonForTracking !=="" ? (
                                    <span className={classes.error}>{errors.reasonForTracking}</span>
                                ) : "" }
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                            <Label for="">Date Enroll in Treatment</Label>

                                <Input 
                                    type="number"
                                    name="reasonForTrackingOthers"
                                    id="reasonForTrackingOthers"
                                    onChange={handleInputChange}
                                    value={objValues.reasonForTrackingOthers} 
                                />
                                 {errors.reasonForTrackingOthers !=="" ? (
                                    <span className={classes.error}>{errors.reasonForTrackingOthers}</span>
                                    ) : "" }
                            
                            </FormGroup>
                        </div>
                        </div>
                        <div className="row">
                        <div className="form-group mb-3 col-md-3">
                            <FormGroup>
                            <Label for="">Current WHO Clinical Stage</Label>

                            <Input 
                                    type="text"
                                    name="reasonForTrackingOthers"
                                    id="reasonForTrackingOthers"
                                    onChange={handleInputChange}
                                    value={objValues.reasonForTrackingOthers} 
                                />
                                {errors.reasonForTracking !=="" ? (
                                    <span className={classes.error}>{errors.reasonForTracking}</span>
                                ) : "" }
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-3">
                            <FormGroup>
                            <Label for=""> Baseline CD4 Counts(mm3 )</Label>

                                <Input 
                                    type="text"
                                    name="reasonForTrackingOthers"
                                    id="reasonForTrackingOthers"
                                    onChange={handleInputChange}
                                    value={objValues.reasonForTrackingOthers} 
                                />
                                 {errors.reasonForTrackingOthers !=="" ? (
                                    <span className={classes.error}>{errors.reasonForTrackingOthers}</span>
                                    ) : "" }
                            
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-3">
                            <FormGroup>
                            <Label for="">Current CD4</Label>

                                <Input 
                                    type="text"
                                    name="reasonForTrackingOthers"
                                    id="reasonForTrackingOthers"
                                    onChange={handleInputChange}
                                    value={objValues.reasonForTrackingOthers} 
                                />
                                 {errors.reasonForTrackingOthers !=="" ? (
                                    <span className={classes.error}>{errors.reasonForTrackingOthers}</span>
                                    ) : "" }
                            
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-3">
                            <FormGroup>
                            <Label for=""> Current viral load (copies/ml)</Label>

                                <Input 
                                    type="text"
                                    name="reasonForTrackingOthers"
                                    id="reasonForTrackingOthers"
                                    onChange={handleInputChange}
                                    value={objValues.reasonForTrackingOthers} 
                                />
                                 {errors.reasonForTrackingOthers !=="" ? (
                                    <span className={classes.error}>{errors.reasonForTrackingOthers}</span>
                                    ) : "" }
                            
                            </FormGroup>
                        </div> 
                        </div>
                        <div className="row">
                        <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                            <Label for="">Height/length </Label>

                            <Input 
                                    type="text"
                                    name="reasonForTrackingOthers"
                                    id="reasonForTrackingOthers"
                                    onChange={handleInputChange}
                                    value={objValues.reasonForTrackingOthers} 
                                />
                                {errors.reasonForTracking !=="" ? (
                                    <span className={classes.error}>{errors.reasonForTracking}</span>
                                ) : "" }
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                            <Label for=""> Weight</Label>

                                <Input 
                                    type="text"
                                    name="reasonForTrackingOthers"
                                    id="reasonForTrackingOthers"
                                    onChange={handleInputChange}
                                    value={objValues.reasonForTrackingOthers} 
                                />
                                 {errors.reasonForTrackingOthers !=="" ? (
                                    <span className={classes.error}>{errors.reasonForTrackingOthers}</span>
                                    ) : "" }
                            
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                            <Label for="">BMI/MUAC </Label>

                                <Input 
                                    type="text"
                                    name="reasonForTrackingOthers"
                                    id="reasonForTrackingOthers"
                                    onChange={handleInputChange}
                                    value={objValues.reasonForTrackingOthers} 
                                />
                                 {errors.reasonForTrackingOthers !=="" ? (
                                    <span className={classes.error}>{errors.reasonForTrackingOthers}</span>
                                    ) : "" }
                            
                            </FormGroup>
                        </div> 
                        </div>
                        <div className="row">
                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label for="">Original first line ART regimen</Label>

                            <Input 
                                    type="text"
                                    name="reasonForTrackingOthers"
                                    id="reasonForTrackingOthers"
                                    onChange={handleInputChange}
                                    value={objValues.reasonForTrackingOthers} 
                                />
                                {errors.reasonForTracking !=="" ? (
                                    <span className={classes.error}>{errors.reasonForTracking}</span>
                                ) : "" }
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label for="">Current Regimen Line</Label>

                                <Input 
                                    type="text"
                                    name="reasonForTrackingOthers"
                                    id="reasonForTrackingOthers"
                                    onChange={handleInputChange}
                                    value={objValues.reasonForTrackingOthers} 
                                />
                                 {errors.reasonForTrackingOthers !=="" ? (
                                    <span className={classes.error}>{errors.reasonForTrackingOthers}</span>
                                    ) : "" }
                            
                            </FormGroup>
                        </div> 
                        </div>
                        <div className="row">
                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label for=""> Adherence Measure </Label>
                            <Input 
                                type="text"
                                name="reasonForTrackingOthers"
                                id="reasonForTrackingOthers"
                                onChange={handleInputChange}
                                value={objValues.reasonForTrackingOthers} 
                            />
                            </FormGroup>
                        </div> 
                        </div>
                        <div className="row">
                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label for="">Current Medications/ Dose </Label>
                            <br/>
                            <p>Medications list will be here </p>
                            </FormGroup>
                        </div> 
                        </div>
                        <div className="row">
                            <div className="form-group mb-3 col-md-6">
                                <FormGroup>
                                <Label for="">Latest lab results </Label>
                                <br/>
                                <p>Lab list will be here </p>
                                </FormGroup>
                            </div> 
                        </div>
                        <div className="row">
                        <div className="form-group mb-3 col-md-6">
                        <FormGroup>
                        <Label for="">Reason for Transfer</Label>
                        <Input
                            type="date"
                            name="dateLastAppointment"
                            id="dateLastAppointment"
                            onChange={handleInputChange}
                            value={objValues.dateLastAppointment} 
                            //min= {moment(objValues.dateOfLastViralLoad).format("YYYY-MM-DD") }
                            max= {moment(new Date()).format("YYYY-MM-DD") }
                            style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                            
                        />
                        {errors.dateLastAppointment !=="" ? (
                            <span className={classes.error}>{errors.dateLastAppointment}</span>
                            ) : "" }
                        </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                            <Label for="">Name of Treatment supporter</Label>
                            <Input
                                type="date"
                                name="dateLastAppointment"
                                id="dateLastAppointment"
                                onChange={handleInputChange}
                                value={objValues.dateLastAppointment} 
                                //min= {moment(objValues.dateOfLastViralLoad).format("YYYY-MM-DD") }
                                max= {moment(new Date()).format("YYYY-MM-DD") }
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                
                            />
                            {errors.dateLastAppointment !=="" ? (
                                <span className={classes.error}>{errors.dateLastAppointment}</span>
                                ) : "" }
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-12">
                            <FormGroup>
                            <Label for="">Additional Notes and/or Recommendations</Label>
                            <Input
                                type="date"
                                name="dateMissedAppointment"
                                id="dateMissedAppointment"
                                onChange={handleInputChange}
                                value={objValues.dateMissedAppointment} 
                                //min= {moment(objValues.dateOfLastViralLoad).format("YYYY-MM-DD") }
                                max= {moment(new Date()).format("YYYY-MM-DD") }
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                
                            />
                            {errors.dateMissedAppointment !=="" ? (
                                <span className={classes.error}>{errors.dateMissedAppointment}</span>
                                ) : "" }
                            </FormGroup>
                        </div> 
                        <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                            <Label for="">Clinicians's Name</Label>
                            <Input
                                type="date"
                                name="dateLastAppointment"
                                id="dateLastAppointment"
                                onChange={handleInputChange}
                                value={objValues.dateLastAppointment} 
                                //min= {moment(objValues.dateOfLastViralLoad).format("YYYY-MM-DD") }
                                max= {moment(new Date()).format("YYYY-MM-DD") }
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                
                            />
                            {errors.dateLastAppointment !=="" ? (
                                <span className={classes.error}>{errors.dateLastAppointment}</span>
                                ) : "" }
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                            <Label for="">Clinicians's Name</Label>
                            <Input
                                type="text"
                                name="dateLastAppointment"
                                id="dateLastAppointment"
                                onChange={handleInputChange}
                                value={objValues.dateLastAppointment} 
                                //min= {moment(objValues.dateOfLastViralLoad).format("YYYY-MM-DD") }
                                max= {moment(new Date()).format("YYYY-MM-DD") }
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                
                            />
                            {errors.dateLastAppointment !=="" ? (
                                <span className={classes.error}>{errors.dateLastAppointment}</span>
                                ) : "" }
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                            <Label for=""> Date of last clinical visit at transferring site</Label>
                            <Input
                                type="date"
                                name="dateLastAppointment"
                                id="dateLastAppointment"
                                onChange={handleInputChange}
                                value={objValues.dateLastAppointment} 
                                //min= {moment(objValues.dateOfLastViralLoad).format("YYYY-MM-DD") }
                                max= {moment(new Date()).format("YYYY-MM-DD") }
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                
                            />
                            {errors.dateLastAppointment !=="" ? (
                                <span className={classes.error}>{errors.dateLastAppointment}</span>
                                ) : "" }
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                            <Label for=""> Date of first confirmed scheduled appointment at the receiving site</Label>
                            <Input
                                type="date"
                                name="dateLastAppointment"
                                id="dateLastAppointment"
                                onChange={handleInputChange}
                                value={objValues.dateLastAppointment} 
                                //min= {moment(objValues.dateOfLastViralLoad).format("YYYY-MM-DD") }
                                max= {moment(new Date()).format("YYYY-MM-DD") }
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                
                            />
                            {errors.dateLastAppointment !=="" ? (
                                <span className={classes.error}>{errors.dateLastAppointment}</span>
                                ) : "" }
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                            <Label for="">Name of the person effecting the transfer</Label>
                            <Input
                                type="text"
                                name="dateLastAppointment"
                                id="dateLastAppointment"
                                onChange={handleInputChange}
                                value={objValues.dateLastAppointment} 
                                //min= {moment(objValues.dateOfLastViralLoad).format("YYYY-MM-DD") }
                                max= {moment(new Date()).format("YYYY-MM-DD") }
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                
                            />
                            {errors.dateLastAppointment !=="" ? (
                                <span className={classes.error}>{errors.dateLastAppointment}</span>
                                ) : "" }
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                            <Label for=""> Telephone Number</Label>
                            <Input
                                type="number"
                                name="dateLastAppointment"
                                id="dateLastAppointment"
                                onChange={handleInputChange}
                                value={objValues.dateLastAppointment} 
                                //min= {moment(objValues.dateOfLastViralLoad).format("YYYY-MM-DD") }
                                max= {moment(new Date()).format("YYYY-MM-DD") }
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                
                            />
                            {errors.dateLastAppointment !=="" ? (
                                <span className={classes.error}>{errors.dateLastAppointment}</span>
                                ) : "" }
                            </FormGroup>
                        </div>
                        </div>
                    <h3>ACKNOWLEDGEMENT OF TRANSFER (to be completed by receiving ART service point)</h3>
                    <div className="row">
                        <div className="form-group mb-3 col-md-6">
                        <FormGroup>
                        <Label for=""> Patient came with Transfer form</Label>
                        <Input
                            type="date"
                            name="dateLastAppointment"
                            id="dateLastAppointment"
                            onChange={handleInputChange}
                            value={objValues.dateLastAppointment} 
                            //min= {moment(objValues.dateOfLastViralLoad).format("YYYY-MM-DD") }
                            max= {moment(new Date()).format("YYYY-MM-DD") }
                            style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                            
                        />
                        {errors.dateLastAppointment !=="" ? (
                            <span className={classes.error}>{errors.dateLastAppointment}</span>
                            ) : "" }
                        </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-6">
                        <FormGroup>
                        <Label for="">Patient has attended his/her first visit at our ART site</Label>
                        <Input
                            type="text"
                            name="dateLastAppointment"
                            id="dateLastAppointment"
                            onChange={handleInputChange}
                            value={objValues.dateLastAppointment} 
                            //min= {moment(objValues.dateOfLastViralLoad).format("YYYY-MM-DD") }
                            max= {moment(new Date()).format("YYYY-MM-DD") }
                            style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                            
                        />
                        {errors.dateLastAppointment !=="" ? (
                            <span className={classes.error}>{errors.dateLastAppointment}</span>
                            ) : "" }
                        </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-6">
                        <FormGroup>
                        <Label for="">Received date</Label>
                        <Input
                            type="text"
                            name="dateLastAppointment"
                            id="dateLastAppointment"
                            onChange={handleInputChange}
                            value={objValues.dateLastAppointment} 
                            //min= {moment(objValues.dateOfLastViralLoad).format("YYYY-MM-DD") }
                            max= {moment(new Date()).format("YYYY-MM-DD") }
                            style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                            
                        />
                        {errors.dateLastAppointment !=="" ? (
                            <span className={classes.error}>{errors.dateLastAppointment}</span>
                            ) : "" }
                        </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-6">
                        <FormGroup>
                        <Label for="">Date of visit</Label>
                        <Input
                            type="date"
                            name="dateLastAppointment"
                            id="dateLastAppointment"
                            onChange={handleInputChange}
                            value={objValues.dateLastAppointment} 
                            //min= {moment(objValues.dateOfLastViralLoad).format("YYYY-MM-DD") }
                            max= {moment(new Date()).format("YYYY-MM-DD") }
                            style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                            
                        />
                        {errors.dateLastAppointment !=="" ? (
                            <span className={classes.error}>{errors.dateLastAppointment}</span>
                            ) : "" }
                        </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-6">
                        <FormGroup>
                        <Label for="">Date of visit</Label>
                        <Input
                            type="date"
                            name="dateLastAppointment"
                            id="dateLastAppointment"
                            onChange={handleInputChange}
                            value={objValues.dateLastAppointment} 
                            //min= {moment(objValues.dateOfLastViralLoad).format("YYYY-MM-DD") }
                            max= {moment(new Date()).format("YYYY-MM-DD") }
                            style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                            
                        />
                        {errors.dateLastAppointment !=="" ? (
                            <span className={classes.error}>{errors.dateLastAppointment}</span>
                            ) : "" }
                        </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-6">
                        <FormGroup>
                        <Label for="">Name of the Clinician receiving the transfer</Label>
                        <Input
                            type="date"
                            name="dateLastAppointment"
                            id="dateLastAppointment"
                            onChange={handleInputChange}
                            value={objValues.dateLastAppointment} 
                            //min= {moment(objValues.dateOfLastViralLoad).format("YYYY-MM-DD") }
                            max= {moment(new Date()).format("YYYY-MM-DD") }
                            style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                            
                        />
                        {errors.dateLastAppointment !=="" ? (
                            <span className={classes.error}>{errors.dateLastAppointment}</span>
                            ) : "" }
                        </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-6">
                        <FormGroup>
                        <Label for="">Telephone Number</Label>
                        <Input
                            type="date"
                            name="dateLastAppointment"
                            id="dateLastAppointment"
                            onChange={handleInputChange}
                            value={objValues.dateLastAppointment} 
                            //min= {moment(objValues.dateOfLastViralLoad).format("YYYY-MM-DD") }
                            max= {moment(new Date()).format("YYYY-MM-DD") }
                            style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                            
                        />
                        {errors.dateLastAppointment !=="" ? (
                            <span className={classes.error}>{errors.dateLastAppointment}</span>
                            ) : "" }
                        </FormGroup>
                        </div>
                    </div>
                    </div>
                    
                    {saving ? <Spinner /> : ""}
                    <br />
                
                    <MatButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    onClick={handleSubmit}
                    style={{backgroundColor:"#014d88"}}
                    disabled={objValues.dateOfEac1==="" ? true : false}
                    >
                    {!saving ? (
                    <span style={{ textTransform: "capitalize" }}>Save</span>
                    ) : (
                    <span style={{ textTransform: "capitalize" }}>Saving...</span>
                    )}
                    </MatButton>
                
                    </form>
                </CardBody>
            </Card>                    
        </div>
  );
}

function AttemptedLists({
    attemptObj,
    index,
    removeAttempt,
  }) {
  
  
    return (
            <tr>
                <th>{attemptObj.attemptDate}</th>
                <th>{attemptObj.whoAttemptedContact}</th>
                <th>{attemptObj.modeOfConatct}</th>
                <th>{attemptObj.personContacted}</th>
                <th>{attemptObj.reasonForDefaulting==='' ? attemptObj.reasonForDefaultingOthers : attemptObj.reasonForDefaulting}</th>
                <th></th>
                <th >
                    <IconButton aria-label="delete" size="small" color="error" onClick={() =>removeAttempt(index)}>
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                    
                </th>
            </tr> 
    );
  }
export default Tracking;
