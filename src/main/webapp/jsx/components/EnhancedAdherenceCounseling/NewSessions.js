import React, {useState, useEffect} from 'react';
import { Card,CardBody, FormGroup, Label, Input} from 'reactstrap';
import MatButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import axios from "axios";
import { toast} from "react-toastify";
import { url as baseUrl } from "../../../api";
import { token as token } from "../../../api";
import "react-widgets/dist/css/react-widgets.css";
import moment from "moment";
import { Spinner } from "reactstrap";
import { Icon,Button, } from 'semantic-ui-react'
import Select from "react-select";
import ButtonMui from "@material-ui/core/Button";


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

const NEWEACSESSION = (props) => {
    //const patientObj = props.patientObj;
    const classes = useStyles()
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true)
    const [objValues, setObjValues]=useState({
                                                barriers: null,
                                                barriersOthers:"",
                                                intervention: null,
                                                interventionOthers:"",
                                                comment: null,
                                                followUpDate: "",
                                                referral:"",
                                                adherence: "",
                                                personId: props.patientObj.id,
                                                status: "",
                                                visitId:""
                                            })
    useEffect(() => {
        EACHistory()
    }, [props.patientObj.id]);
    ///GET LIST OF EAC
    const EACHistory =()=>{
        setLoading(true)
        axios
            .get(`${baseUrl}observation/eac/person/current-eac/${props.patientObj.id}`,
                { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then((response) => {
            setLoading(false)
            setObjValues(response.data)
            })
            .catch((error) => {
            //console.log(error);
            });    
    }
    const handleInputChange = e => {
        setObjValues ({...objValues,  [e.target.name]: e.target.value});
    }  
    const BackToSession = (row, actionType) =>{  
        // props.setActiveContent({...props.activeContent, route:'pharmacy', activeTab:"hsitory"})
         props.setActiveContent({...props.activeContent, route:'eac-session', id:row.id, activeTab:"history", actionType:actionType, obj:row})
     }        
    /**** Submit Button Processing  */
    const handleSubmit = (e) => {        
        e.preventDefault();        
          setSaving(true);
          objValues.status='Third'
          axios.post(`${baseUrl}observation/eac`,objValues,
           { headers: {"Authorization" : `Bearer ${token}`}},
          
          )
              .then(response => {
                  setSaving(false);
                  props.setHideThird(false)
                  props.setHideFirst(false)                 
                  props.setEacObj(response.data)
                  toast.success(" Save successful");
                  props.setActiveContent({...props.activeContent, route:'final-eac'})

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
                    <h2>New EAC Session 
                    <ButtonMui
                        variant="contained"
                        color="primary"
                        className=" float-end ms-2 mr-2 mt-2 "
                        //startIcon={<FaUserPlus size="10"/>}
                        //startIcon={<TiArrowBack  />}
                        onClick={BackToSession}
                        style={{backgroundColor:"#014D88", color:'#fff', height:'35px'}}

                        >
                            <span style={{ textTransform: "capitalize" }}>Back To EAC Session</span>
                    </ButtonMui>
                    </h2>
                    <br/>
                    <br/>
                    <br/>

                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label for="">Current Viral Load Result (copies/ml)</Label>
                            <Input
                                type="text"
                                name="dateOfEac3"
                                id="dateOfEac3"
                                value={objValues.dateOfEac3}
                                onChange={handleInputChange}
                                //max= {moment(new Date()).format("YYYY-MM-DD") }
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                disabled
                            />
                            
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label for="">Date Result Recieved</Label>
                            <Input
                                type="date"
                                name="dateOfEac1"
                                id="dateOfEac1"
                                value={objValues.dateOfEac1}
                                onChange={handleInputChange}
                                min= {moment(objValues.dateOfLastViralLoad).format("YYYY-MM-DD") }
                                max= {moment(new Date()).format("YYYY-MM-DD") }
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                disabled
                            />
                           
                            </FormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-6">
                                <FormGroup>
                                <Label >Adherence</Label>
                                <Input
                                    type="select"
                                    name="adherence"
                                    id="adherence"
                                    value={objValues.adherence}
                                    onChange={handleInputChange}
                                    style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                    
                                >
                                 <option value="">Select</option> 
                                 <option value="Good">Good</option> 
                                 <option value="Fair">Fair</option> 
                                 <option value="Poor">Poor</option> 
                                 
                                </Input>
                                 
                        </FormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-6">
                                <FormGroup>
                                <Label >Any missed pharmacy drug pick-ups?</Label>
                                <Input
                                    type="select"
                                    name="missedDrug"
                                    id="missedDrug"
                                    value={objValues.missedDrug}
                                    onChange={handleInputChange}
                                    style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                    
                                >
                                 <option value="">Select</option> 
                                 <option value="Yes">Yes</option> 
                                 <option value="No">No</option> 
                                 
                                </Input>
                                
                        </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-6">
                                <FormGroup>
                                <Label >Barriers</Label>
                                <Input
                                    type="select"
                                    name="barriers"
                                    id="barriers"
                                    value={objValues.barriers}
                                    onChange={handleInputChange}
                                    style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                    
                                >
                                 <option value="">Select</option> 
                                 <option value="Forgot">  Forgot</option> 
                                 <option value="Knowledge/beliefs">Knowledge/beliefs</option> 
                                 <option value="Side effects">Side effects</option> 
                                 <option value="Physical illness">Physical illness</option>
                                 <option value="Substance use">Substance use</option> 
                                 <option value="Depression">Depression</option> 
                                 <option value="Pill burden">Pill burden</option> 
                                 <option value="Lost/ran out">Lost/ran out</option> 
                                 <option value="Transport">Transport</option>
                                 <option value="Child behavior/refusing Scheduling">Child behavior/refusing Scheduling</option>
                                 <option value="Fear disclosure Family/partner Food insecurity Drug stock out Long wait Stigma">Fear disclosure Family/partner Food insecurity Drug stock out Long wait Stigma</option>
                                 <option value="Others">Others</option>

                                </Input>
                                  
                                </FormGroup>
                        </div>
                        {objValues.barriers==='Others' && (<>
                        <div className="form-group mb-3 col-md-6">
                                <FormGroup>
                                <Label >Barriers - Others</Label>
                                <Input
                                    type="text"
                                    name="barriersOthers"
                                    id="barriersOthers"
                                    value={objValues.barriersOthers}
                                    onChange={handleInputChange}
                                    style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                    
                                >
                               
                                </Input>
                                
                        </FormGroup>
                        </div>
                        
                        </>)}
                        <div className="form-group mb-3 col-md-6">
                                <FormGroup>
                                <Label >Intervention</Label>
                                <Input
                                    type="select"
                                    name="intervention"
                                    id="intervention"
                                    value={objValues.intervention}
                                    onChange={handleInputChange}
                                    style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                    
                                >
                                 <option value="">Select</option> 
                                 <option value="Education">  Education</option> 
                                 <option value="Counseling (ind)">Counseling (ind)</option> 
                                 <option value="Counseling (grp)">Counseling (grp)</option> 
                                 <option value="Peer support">Peer support</option>
                                 <option value="Treatment buddy"> Treatment buddy</option> 
                                 <option value="Extended Drug pick-up">Extended Drug pick-up</option> 
                                 <option value="Community ART Group">Community ART Group</option> 
                                 <option value="Directly Observed Therapy">Directly Observed Therapy</option> 
                                 <option value="Transport">Transport</option>
                                 <option value="Child behavior/refusing Scheduling">Child behavior/refusing Scheduling</option>
                                 <option value="Fear disclosure Family/partner Food insecurity Drug stock out Long wait Stigma">Fear disclosure Family/partner Food insecurity Drug stock out Long wait Stigma</option>
                                 <option value="Tools Pill box Calendar">Tools Pill box Calendar</option>
                                 <option value="Incentive calendar (peds) ARV swallowing instruction Written instructions Phone calls SMS">Incentive calendar (peds) ARV swallowing instruction Written instructions Phone calls SMS</option>
                                 <option value="Others">Others</option>

                                </Input>
                                  
                                </FormGroup>
                        </div>
                        {objValues.intervention==='Others' && (<>
                        <div className="form-group mb-3 col-md-6">
                                <FormGroup>
                                <Label >Intervention - Others</Label>
                                <Input
                                    type="text"
                                    name="interventionOthers"
                                    id="interventionOthers"
                                    value={objValues.interventionOthers}
                                    onChange={handleInputChange}
                                    style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                    
                                >
                               
                                </Input>
                                
                        </FormGroup>
                        </div>
                        </>)}
                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label for="">Referrals</Label>
                            <Input
                                type="text"
                                name="referral"
                                id="referral"
                                value={objValues.referral}
                                onChange={handleInputChange}
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                            />
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label for="">Follow Up Date</Label>
                            <Input
                                type="date"
                                name="followUpDate"
                                id="followUpDate"
                                value={objValues.followUpDate}
                                onChange={handleInputChange}
                                //min= {moment(objValues.dateOfLastViralLoad).format("YYYY-MM-DD") }
                                max= {moment(new Date()).format("YYYY-MM-DD") }
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                required
                            />
                           
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label for="">Comments</Label>
                            <Input
                                type="textarea"
                                name="comment"
                                id="comment"
                                value={objValues.comment}
                                onChange={handleInputChange}
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                            />
                            </FormGroup>
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
                    disabled={objValues.dateOfEac3==="" ? true : false}
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

export default NEWEACSESSION;
