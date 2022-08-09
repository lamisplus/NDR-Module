import React, {useState, useEffect} from 'react';
import { Form,Row, Card,CardBody, FormGroup, Label, Input} from 'reactstrap';
import MatButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import axios from "axios";
import { toast} from "react-toastify";
import "react-widgets/dist/css/react-widgets.css";
import moment from "moment";
import { Spinner } from "reactstrap";
import { url as baseUrl, token } from "../../../api";
import { Icon,Button, } from 'semantic-ui-react'

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
        '& > *': {
            margin: theme.spacing(1)
        }
    },
    input: {
        display: 'none'
    } 
}))

const ClientStatusUpdate = (props) => {

    const patientObj = props.patientObj;
    const classes = useStyles()
    const [hideConfirmDeath, setHideConfirmDeath] = useState(true);
    const [hideReturn, setHideReturn] = useState(true);
    const [trackingOutCome, setTrankingOutCome] = useState([])
    const [hivStatus, setHivStatus] = useState([]);
    const [reasonForInteruption, setReasonForInteruption] = useState([]);
    const [causeDeath, setCauseDeath] = useState([]);
    const [values, setValues] = useState([]);
    const [objValues, setObjValues] = useState({ agreedDate: null,
                                                causeOfDeath: null,
                                                facilityId: "",
                                                hivStatus: "",
                                                personId: "",
                                                reasonForInterruption: "",
                                                statusDate: null,
                                                trackDate:null,
                                                trackOutcome: "",
                                                visitId: null
                                            });
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});
    useEffect(() => {
        CauseDeath();
        ReasonForInteruption();
        HIVStatus();
        TrackingOutcome();
      }, []);

    //Get list of HIV_STATUS
    const HIVStatus =()=>{
        axios
           .get(`${baseUrl}application-codesets/v2/HIV_STATUS`,
               { headers: {"Authorization" : `Bearer ${token}`} }
           )
           .then((response) => {
               
               setHivStatus(response.data.filter((x)=> x.display!=='Lost to Follow Up' && x.display!=='ART Transfer In'));
           })
           .catch((error) => {
           //console.log(error);
           });
       
    }
    //Tracking Outcome HIV_STATUS_TXML
    const TrackingOutcome =()=>{
        axios
           .get(`${baseUrl}application-codesets/v2/HIV_STATUS_TXML`,
               { headers: {"Authorization" : `Bearer ${token}`} }
           )
           .then((response) => {
               //console.log(response.data);
               setTrankingOutCome(response.data);
           })
           .catch((error) => {
           //console.log(error);
           });
       
    }
    // REASON_INTERRUPTION
    const ReasonForInteruption =()=>{
        axios
           .get(`${baseUrl}application-codesets/v2/REASON_INTERRUPTION`,
               { headers: {"Authorization" : `Bearer ${token}`} }
           )
           .then((response) => {
               //console.log(response.data);
               setReasonForInteruption(response.data);
           })
           .catch((error) => {
           //console.log(error);
           });
       
    }
    // CAUSE_DEATH
    const CauseDeath =()=>{
        axios
           .get(`${baseUrl}application-codesets/v2/CAUSE_DEATH`,
               { headers: {"Authorization" : `Bearer ${token}`} }
           )
           .then((response) => {
               //console.log(response.data);
               setCauseDeath(response.data);
           })
           .catch((error) => {
           //console.log(error);
           });
       
    }
     const handleInputChangeOut = e => {

        setObjValues ({...objValues,  [e.target.name]: e.target.value});
        }
    const handleInputChange = e => {
        console.log(e.target.value)
        if(e.target.value==='Died (Confirmed)'){
            setHideConfirmDeath(false)
            setHideReturn(false)
        }else{
            setHideConfirmDeath(true)
            setHideReturn(true)
        }
        setObjValues ({...objValues,  [e.target.name]: e.target.value});
        }
          
    /**** Submit Button Processing  */
    const handleSubmit = (e) => {        
        e.preventDefault();        
          objValues.personId= patientObj.id

          setSaving(true);
          axios.post(`${baseUrl}hiv/status/`,objValues,
           { headers: {"Authorization" : `Bearer ${token}`}},
          
          )
              .then(response => {
                  setSaving(false);                  
                  toast.success("Client Status Update Successfully!");
                  props.setActiveContent({...props.activeContent, route:'recent-history'})

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
    }

  return (      
        <div>                  
            <Card >
                <CardBody>
                <form >
                    <div className="row">

                    <div className="col-md-6">
                    <h2> Client Status Update </h2>
                    </div>
                    
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <div className="form-group mb-3 col-md-6"></div>
                    <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >New Status</Label>
                            <Input
                                type="select"
                                name="hivStatus"
                                id="hivStatus"
                                value={values.hivStatus}
                                onChange={handleInputChange}
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                required
                                >
                                <option value="">Select</option>
                                {hivStatus.map((value) => (
                                <option key={value.id} value={value.display}>
                                    {value.display}
                                </option>
                                ))}
                            </Input>
                            {errors.hivStatus !=="" ? (
                                <span className={classes.error}>{errors.hivStatus}</span>
                            ) : "" }
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label for="participant_id">Date of New Status </Label>                           
                             <Input
                                type="date"
                                name="statusDate"
                                id="statusDate"
                                value={objValues.statusDate}
                                onChange={handleInputChange}
                                max= {moment(new Date()).format("YYYY-MM-DD") }
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                required
                            /> 
                            {errors.statusDate !=="" ? (
                                <span className={classes.error}>{errors.statusDate}</span>
                            ) : "" }
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Tracking Outcome</Label>
                            <Input
                                type="select"
                                name="trackOutcome"
                                id="trackOutcome"
                                value={objValues.trackOutcome}
                                onChange={handleInputChangeOut}
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                required
                                >
                                <option value=""> Select</option>
                                {trackingOutCome.map((value) => (
                                <option key={value.id} value={value.display}>
                                    {value.display}
                                </option>
                                ))}
                            </Input>
                            {errors.trackOutcome !=="" ? (
                                <span className={classes.error}>{errors.trackOutcome}</span>
                            ) : "" }
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label for="participant_id">Date of Tracked</Label>
                           
                            <Input
                                type="date"
                                name="trackDate"
                                id="trackDate"
                                value={objValues.trackDate}
                                onChange={handleInputChange}
                                max= {moment(new Date()).format("YYYY-MM-DD") }
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                required
                            /> 
                            {errors.trackDate !=="" ? (
                                <span className={classes.error}>{errors.trackDate}</span>
                            ) : "" }
                            </FormGroup>
                        </div>
                        {hideReturn && (
                        <>
                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label for="participant_id">Date Agreed to Return</Label>
                            
                            <Input
                                type="date"
                                name="agreedDate"
                                id="agreedDate"
                                value={objValues.agreedDate}
                                onChange={handleInputChange}
                                max= {moment(new Date()).format("YYYY-MM-DD") }
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                required
                            /> 
                            {errors.agreedDate !=="" ? (
                                <span className={classes.error}>{errors.agreedDate}</span>
                            ) : "" }
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Reason for Interruption</Label>
                            <Input
                                type="select"
                                name="reasonForInterruption"
                                id="reasonForInterruption"
                                value={objValues.reasonForInterruption}
                                onChange={handleInputChange}
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                required
                                >
                                <option value=""> Select</option>
                                {reasonForInteruption.map((value) => (
                                <option key={value.id} value={value.display}>
                                    {value.display}
                                </option>
                                ))}
                            </Input>
                            {errors.reasonForInterruption !=="" ? (
                                <span className={classes.error}>{errors.reasonForInterruption}</span>
                            ) : "" }
                            </FormGroup>
                        </div>
                        </>
                        )}
                        {!hideConfirmDeath && (
                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Cause of Death</Label>
                            <Input
                                type="select"
                                name="causeOfDeath"
                                id="causeOfDeath"
                                value={objValues.causeOfDeath}
                                onChange={handleInputChange}
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                required
                                >
                                <option value=""> Select</option>
                                {causeDeath.map((value) => (
                                <option key={value.id} value={value.display}>
                                    {value.display}
                                </option>
                                ))}
                            </Input>
                            {errors.trackOutcome !=="" ? (
                                <span className={classes.error}>{errors.trackOutcome}</span>
                            ) : "" }
                            </FormGroup>
                        </div>
                        )}
                    </div>
                   
                    {saving ? <Spinner /> : ""}
                    <br />
                
                    <MatButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    style={{backgroundColor:"#014d88"}}
                    onClick={handleSubmit}
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

export default ClientStatusUpdate;
