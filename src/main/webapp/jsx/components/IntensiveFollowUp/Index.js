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
                    <h2>Intensive Follow Up Form</h2>
                        <br/>
                        <br/>

                        <div className="row">
                        <hr/>
                        <h3>Attempted to Contact</h3>
                        <div className="form-group mb-3 col-md-3">        
                            <FormGroup>
                                <Label >Date of call</Label>
                                <Input
                                    type="date"
                                    name="attemptDate"
                                    id="attemptDate"
                                    value={attempt.attemptDate}
                                    onChange={handleInputChangeAttempt}
                                    style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                    max= {moment(new Date()).format("YYYY-MM-DD") }
                                    
                                    > 
                                </Input>
                                {errors.attemptDate !=="" ? (
                                    <span className={classes.error}>{errors.attemptDate}</span>
                                ) : "" }
                                </FormGroup> 
                            </div> 
                            <div className="form-group mb-3 col-md-3">
                                <FormGroup>
                                <Label >How do you feel generally?</Label>
                                <Input
                                    type="text"
                                    name="whoAttemptedContact"
                                    id="whoAttemptedContact"
                                    value={attempt.whoAttemptedContact}
                                    onChange={handleInputChangeAttempt}
                                    style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                    
                                />
                                {errors.whoAttemptedContact !=="" ? (
                                    <span className={classes.error}>{errors.whoAttemptedContact}</span>
                                ) : "" }   
                                </FormGroup>
                            </div>
                            <div className="form-group mb-3 col-md-3">
                                <FormGroup>
                                <Label >Do you have any of the following</Label>
                                <Input
                                    type="select"
                                    name="modeOfConatct"
                                    id="modeOfConatct"
                                    value={attempt.modeOfConatct}
                                    onChange={handleInputChangeAttempt}
                                    style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                    
                                >
                                 <option value="">Select</option> 
                                 <option value="Telephone">Telephone</option> 
                                 <option value="Home Visit">Home Visit</option> 
                                </Input> 
                                {errors.modeOfConatct !=="" ? (
                                    <span className={classes.error}>{errors.modeOfConatct}</span>
                                ) : "" }   
                                </FormGroup>
                            </div>
                             <div className="form-group mb-3 col-md-3">
                                <FormGroup>
                                <Label >Do you have any of the following</Label>
                                <Input
                                    type="select"
                                    name="modeOfConatct"
                                    id="modeOfConatct"
                                    value={attempt.modeOfConatct}
                                    onChange={handleInputChangeAttempt}
                                    style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                    
                                >
                                 <option value="">Select</option> 
                                 <option value="Telephone">Telephone</option> 
                                 <option value="Home Visit">Home Visit</option> 
                                </Input> 
                                {errors.modeOfConatct !=="" ? (
                                    <span className={classes.error}>{errors.modeOfConatct}</span>
                                ) : "" }   
                                </FormGroup>
                            </div>
                            <div className="form-group mb-3 col-md-3">
                                <FormGroup>
                                <Label >Have you missed any doses of your medications in the past 7 days</Label>
                                <Input
                                    type="select"
                                    name="modeOfConatct"
                                    id="modeOfConatct"
                                    value={attempt.modeOfConatct}
                                    onChange={handleInputChangeAttempt}
                                    style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                    
                                >
                                 <option value="">Select</option> 
                                 <option value="Yes">Yes</option> 
                                 <option value="No">No</option> 
                                </Input> 
                                {errors.modeOfConatct !=="" ? (
                                    <span className={classes.error}>{errors.modeOfConatct}</span>
                                ) : "" }   
                                </FormGroup>
                            </div>

                            <div className="form-group mb-3 col-md-3">
                                <FormGroup>
                                <Label >Reason </Label>
                                <Input
                                    type="text"
                                    name="reasonForDefaultingOthers"
                                    id="reasonForDefaultingOthers"
                                    value={attempt.reasonForDefaultingOthers}
                                    onChange={handleInputChangeAttempt}
                                    style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                    
                                />
                                {errors.reasonForDefaultingOthers !=="" ? (
                                <span className={classes.error}>{errors.reasonForDefaultingOthers}</span>
                                ) : "" }
                                </FormGroup>
                            </div>
                            <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                            <Label for="">Outcome of the call </Label>

                                <Input 
                                    type="select"
                                    name="careInFacilityDiscountinued"
                                    id="careInFacilityDiscountinued"
                                    onChange={handleInputChange}
                                    value={objValues.careInFacilityDiscountinued}  
                                >
                                    <option value=""></option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </Input>
                                {errors.careInFacilityDiscountinued !=="" ? (
                                <span className={classes.error}>{errors.careInFacilityDiscountinued}</span>
                                ) : "" }
                            </FormGroup>
                        </div>
                            <div className="form-group mb-3 col-md-2">
                            <LabelSui as='a' color='black'  onClick={addAttempt}  size='tiny' style={{ marginTop:35}}>
                                <Icon name='plus' /> Add
                            </LabelSui>
                            </div>

                            {attemptList.length >0 
                            ?
                                <List>
                                <Table  striped responsive>
                                    <thead >
                                        <tr>
                                            <th>Attempted Date</th>
                                            <th>Who Attempted Contact</th>
                                            <th>Mode Of Conatct</th>
                                            <th>Person Contacted</th>
                                            <th>Reason For Defaulting</th>
                                            <th ></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {attemptList.map((attemptObj, index) => (

                                    <AttemptedLists
                                        key={index}
                                        index={index}
                                        attemptObj={attemptObj}
                                        removeAttempt={removeAttempt}
                                    />
                                    ))}
                                    </tbody>
                                </Table>
                                </List>
                                :
                                ""
                            }       
                        <hr/>
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
