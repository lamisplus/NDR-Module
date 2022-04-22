import React, {useState, useEffect} from 'react';
import { Form,Row, Card,CardBody, FormGroup, Label, Input} from 'reactstrap';
import MatButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
// import { Alert } from 'reactstrap';
// import { Spinner } from 'reactstrap';
import axios from "axios";
import { toast} from "react-toastify";
import { url as baseUrl } from "./../../../api";
import { token as token } from "./../../../api";
import { useHistory } from "react-router-dom";
import {  Modal, Button } from "react-bootstrap";
import "react-widgets/dist/css/react-widgets.css";
import { DateTimePicker } from "react-widgets";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import moment from "moment";
import { Spinner } from "reactstrap";

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

const Enrollment = (props) => {

    const patientObj = props.patientObj;
    let history = useHistory();
    const classes = useStyles()
    const [values, setValues] = useState([]);
    const [objValues, setObjValues] = useState({id:"", uniqueId: "",dateOfRegistration:"",entryPointId:"", facilityName:"",statusAtRegistrationId:"",dateConfirmedHiv:"",sourceOfReferrer:"",enrollmentSettingId:"",pregnancyStatusId:"",dateOfLpm:"",tbStatusId:"",targetGroupId:"",ovc_enrolled:"",ovcNumber:""});
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});
    const [carePoints, setCarePoints] = useState([]);
    const [sourceReferral, setSourceReferral] = useState([]);
    const [hivStatus, setHivStatus] = useState([]);
    const [enrollSetting, setEnrollSetting] = useState([]);
    const [tbStatus, setTbStatus] = useState([]);
    const [kP, setKP] = useState([]);
    const [pregnancyStatus, setPregnancyStatus] = useState([]);
    //set ro show the facility name field if is transfer in 
    const [transferIn, setTransferIn] = useState(false);
    // display the OVC number if patient is enrolled into OVC 
    const [ovcEnrolled, setOvcEnrolled] = useState(false);

    useEffect(() => {         
        CareEntryPoint();
        SourceReferral();
        HivStatus();
        EnrollmentSetting();
        TBStatus();
        KP();
        PregnancyStatus();
      }, []);

      //Get list of CareEntryPoint
      const CareEntryPoint =()=>{
             axios
                .get(`${baseUrl}application-codesets/v2/POINT_ENTRY`,
                    { headers: {"Authorization" : `Bearer ${token}`} }
                )
                .then((response) => {
                    //console.log(response.data);
                    setCarePoints(response.data);
                })
                .catch((error) => {
                //console.log(error);
                });
            
      }
    //Get list of Source of Referral
    const SourceReferral =()=>{
            axios
            .get(`${baseUrl}application-codesets/v2/SOURCE_REFERRAL`,
                { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then((response) => {
                //console.log(response.data);
                setSourceReferral(response.data);
            })
            .catch((error) => {
            //console.log(error);
            });
        
    }
     //Get list of HIV STATUS ENROLLMENT
     const HivStatus =()=>{
        axios
           .get(`${baseUrl}application-codesets/v2/SOURCE_REFERRAL`,
               { headers: {"Authorization" : `Bearer ${token}`} }
           )
           .then((response) => {
               //console.log(response.data);
               setHivStatus(response.data);
           })
           .catch((error) => {
           //console.log(error);
           });
       
     }
      //Get list of HIV STATUS ENROLLMENT
      const EnrollmentSetting =()=>{
        axios
           .get(`${baseUrl}application-codesets/v2/ENROLLMENT_SETTING`,
               { headers: {"Authorization" : `Bearer ${token}`} }
           )
           .then((response) => {
               //console.log(response.data);
               setEnrollSetting(response.data);
           })
           .catch((error) => {
           //console.log(error);
           });
       
     }
      //Get list of HIV STATUS ENROLLMENT
      const TBStatus =()=>{
        axios
           .get(`${baseUrl}application-codesets/v2/TB_STATUS`,
               { headers: {"Authorization" : `Bearer ${token}`} }
           )
           .then((response) => {
               //console.log(response.data);
               setTbStatus(response.data);
           })
           .catch((error) => {
           //console.log(error);
           });
       
     }
      //Get list of KP
      const KP =()=>{
        axios
           .get(`${baseUrl}application-codesets/v2/KP_TYPE`,
               { headers: {"Authorization" : `Bearer ${token}`} }
           )
           .then((response) => {
               //console.log(response.data);
               setKP(response.data);
           })
           .catch((error) => {
           //console.log(error);
           });
       
     }
      //Get list of KP
      const PregnancyStatus =()=>{
        axios
           .get(`${baseUrl}application-codesets/v2/PREGANACY_STATUS`,
               { headers: {"Authorization" : `Bearer ${token}`} }
           )
           .then((response) => {
               //console.log(response.data);
               setPregnancyStatus(response.data);
           })
           .catch((error) => {
           //console.log(error);
           });
       
     }
        const handleInputChange = e => {
            
            setObjValues ({...objValues,  [e.target.name]: e.target.value});
            if(e.target.name ==="entryPointId" ){
                console.log(e.target.value)
                if(e.target.value==="21"){
                    setTransferIn(true)
                }else{
                    setTransferIn(false)
                }
            }

          }
          
    //Handle CheckBox 
    const handleCheckBox =e =>{
        if(e.target.checked){
            setOvcEnrolled(true)
        }else{
            setOvcEnrolled(false)
        }
    }      
    /**** Submit Button Processing  */
    const handleSubmit = (e) => {        
        e.preventDefault();
        
          objValues.personId= patientObj.id
          delete objValues['tableData'];
            console.log(objValues)
          setSaving(true);
          axios.post(`${baseUrl}hiv`,objValues,
           { headers: {"Authorization" : `Bearer ${token}`}},
          
          )
              .then(response => {
                  setSaving(false);
                  toast.success("Record save successful");
                  props.toggle()
                  props.loadPatients()
                  //history.push("/")

              })
              .catch(error => {
                  setSaving(false);
                  toast.error("Something went wrong");
              });
          
    }

  return (      
      <div >
         
              <Modal show={props.showModal} toggle={props.toggle} className="fade" size="lg">
             <Modal.Header toggle={props.toggle} style={{backgroundColor:"#eeeeee"}}>
                 HIV Enrollment Form - <b>{patientObj.firstname + " " + patientObj.surname }</b>
                 <Button
                    variant=""
                    className="btn-close"
                    onClick={props.toggle}
                ></Button>
            </Modal.Header>
                <Modal.Body>                   
                        <Card >
                            <CardBody>
                            <form >
                                <div className="row">
                                
                                    <div className="form-group mb-3 col-md-6">
                                        <FormGroup>
                                        <Label for="uniqueId">Unique ID No  * </Label>
                                        <Input
                                            type="text"
                                            name="uniqueId"
                                            id="uniqueId"
                                            onChange={handleInputChange}
                                            value={objValues.uniqueId}
                                            required
                                        />
                                        {errors.uniqueId !=="" ? (
                                            <span className={classes.error}>{errors.uniqueId}</span>
                                        ) : "" }
                                        </FormGroup>
                                    </div>
                                    <div className="form-group mb-3 col-md-6">
                                        <FormGroup>
                                        <Label for="dateOfRegistration">Date of Enrollment * </Label>
                                        <DateTimePicker
                                            time={false}
                                            name="dateOfRegistration"
                                            id="dateOfRegistration"
                                            value={objValues.regDate}
                                            onChange={value1 =>
                                                setObjValues({ ...objValues, dateOfRegistration: moment(value1).format("YYYY-MM-DD") })
                                            }
                                            
                                                max={new Date()}
                                        />
                                        {errors.dateOfRegistration !=="" ? (
                                            <span className={classes.error}>{errors.dateOfRegistration}</span>
                                        ) : "" }
                                        </FormGroup>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group mb-3 col-md-6">
                                    <FormGroup>
                                    <Label for="entryPointId">Care Entry Point</Label>
                                    <Input
                                        type="select"
                                        name="entryPointId"
                                        id="entryPointId"
                                        onChange={handleInputChange}
                                        value={objValues.entryPointId}
                                        required
                                    >
                                    <option value=""> </option>
                      
                                    {carePoints.map((value) => (
                                        <option key={value.id} value={value.id}>
                                            {value.display}
                                        </option>
                                    ))}
                                    {errors.entryPointId !=="" ? (
                                            <span className={classes.error}>{errors.entryPointId}</span>
                                        ) : "" }
                                    </Input>
                                    </FormGroup>
                                    
                                    </div>
                                    <div className="form-group mb-3 col-md-6">
                                    {transferIn===true ? 
                                        (
                                            <FormGroup>
                                            <Label >Facility Name</Label>
                                            <Input
                                                type="text"
                                                name="facilityName"
                                                id="facilityName"
                                                onChange={handleInputChange}
                                                value={objValues.facilityName}
                                                required
                                            />
                                            </FormGroup>
                                        )
                                        :
                                        ""
                                        }
                                    </div>
                                    
                                    <div className="form-group mb-3 col-md-6">
                                    <FormGroup>
                                    <Label >HIV Status at Registration</Label>
                                    <Input
                                        type="select"
                                        name="statusAtRegistrationId"
                                        id="statusAtRegistrationId"
                                        onChange={handleInputChange}
                                        value={objValues.statusAtRegistrationId}
                                        required
                                    >
                                    <option value=""> </option>
                      
                                    {hivStatus.map((value) => (
                                        <option key={value.id} value={value.id}>
                                            {value.display}
                                        </option>
                                    ))}
                                    {errors.statusAtRegistrationId !=="" ? (
                                            <span className={classes.error}>{errors.statusAtRegistrationId}</span>
                                        ) : "" }
                                    </Input>
                                    </FormGroup>
                                    </div>
                                
                                    <div className="form-group mb-3 col-md-6">
                                        <FormGroup>
                                        <Label >Date of Confirmed HIV Test *</Label>
                                        <DateTimePicker
                                            time={false}
                                            name="dateConfirmedHiv"
                                            id="dateConfirmedHiv"
                                            value={objValues.regDate}
                                            onChange={value1 =>
                                                setObjValues({ ...objValues, dateConfirmedHiv: moment(value1).format("YYYY-MM-DD") })
                                            }
                                            
                                                max={new Date()}
                                        />
                                           
                                        </FormGroup>
                                    </div>
                                    <div className="form-group mb-3 col-md-6">
                                        <FormGroup>
                                        <Label >Source of Referral</Label>
                                        <Input
                                            type="select"
                                            name="sourceOfReferrer"
                                            id="sourceOfReferrer"
                                            value={objValues.sourceOfReferrer}
                                            onChange={handleInputChange}
                                            required
                                            >
                                             <option value=""> </option>
                      
                                                {sourceReferral.map((value) => (
                                                    <option key={value.id} value={value.id}>
                                                        {value.display}
                                                    </option>
                                                ))}
                                        </Input>
                                        {errors.sourceOfReferrer !=="" ? (
                                            <span className={classes.error}>{errors.sourceOfReferrer}</span>
                                        ) : "" }
                                        </FormGroup>
                                    </div>
                                    
                                    <div className="form-group mb-3 col-md-6">
                                        <FormGroup>
                                        <Label >Enrollment Setting</Label>
                                        <Input
                                            type="select"
                                            name="enrollmentSettingId"
                                            id="enrollmentSettingId"
                                            value={objValues.enrollmentSettingId}
                                            onChange={handleInputChange}
                                            required
                                            >
                                             <option value=""> </option>
                      
                                                {enrollSetting.map((value) => (
                                                    <option key={value.id} value={value.id}>
                                                        {value.display}
                                                    </option>
                                                ))}
                                        </Input>
                                        {errors.enrollmentSettingId !=="" ? (
                                            <span className={classes.error}>{errors.enrollmentSettingId}</span>
                                        ) : "" }
                                        </FormGroup>
                                    </div>
                                {
                                    patientObj.gender !== 1 ?
                                        (
                                        <div className = "form-group mb-3 col-md-6" >
                                        <FormGroup>
                                        <Label> Pregnancy </Label>
                                        <Input
                                            type = "select"
                                            name = "pregnancyStatusId"
                                            id = "pregnancyStatusId"
                                            value = {objValues.pregnancyStatusId}
                                            onChange = {handleInputChange}
                                            required
                                            >
                                            < option
                                            value = "" > </option>

                                            {
                                                pregnancyStatus.map((value) => (
                                                    < option
                                                key = {value.id}
                                                value = {value.id} >
                                                    {value.display}
                                                    </option>
                                            ))
                                            }
                                        </Input>
                                        
                                            {
                                                errors.pregnancy_status !== "" ? (
                                                    < span className = {classes.error} > {errors.pregnancy_status} </span>
                                                    
                                            ) :
                                                ""
                                            }
                                      </FormGroup>  
                                    </div>
                                )
                                :
                                    ""
                                }
                                {
                                    patientObj.gender !== 1 ?
                                        (
                                    <div className="form-group mb-3 col-md-6">
                                        <FormGroup>
                                        <Label >Date of LPM </Label>
                                        <DateTimePicker
                                            time={false}
                                            name="dateOfLpm"
                                            id="dateOfLpm"
                                            value={values.regDate}
                                            onChange={value1 =>
                                                setObjValues({ ...objValues, dateOfLpm: moment(value1).format("YYYY-MM-DD") })
                                            }

                                                max={new Date()}
                                        />
                                            
                                        </FormGroup>
                                    </div>
                                )
                                :
                                    ""
                                }
                                    <div className="form-group mb-3 col-md-6">
                                        <FormGroup>
                                        <Label >TB Status</Label>
                                        <Input
                                            type="select"
                                            name="tbStatusId"
                                            id="tbStatusId"
                                            value={objValues.tbStatusId}
                                            onChange={handleInputChange}
                                            required
                                            >
                                             <option value=""> </option>
                      
                                                {tbStatus.map((value) => (
                                                    <option key={value.id} value={value.id}>
                                                        {value.display}
                                                    </option>
                                                ))}
                                        </Input>
                                        {errors.tbStatusId !=="" ? (
                                            <span className={classes.error}>{errors.tbStatusId}</span>
                                        ) : "" }
                                        </FormGroup>
                                    </div>
                                    <div className="form-group mb-3 col-md-6">
                                        <FormGroup>
                                        <Label >KP Target Group</Label>
                                        <Input
                                            type="select"
                                            name="targetGroupId"
                                            id="targetGroupId"
                                            value={objValues.targetGroupId}
                                            onChange={handleInputChange}
                                            required
                                            >
                                             <option value=""> </option>
                      
                                                {kP.map((value) => (
                                                    <option key={value.id} value={value.id}>
                                                        {value.display}
                                                    </option>
                                                ))}
                                        </Input>
                                        {errors.targetGroupId !=="" ? (
                                            <span className={classes.error}>{errors.targetGroupId}</span>
                                        ) : "" }
                                        </FormGroup>
                                    </div>
                                    <div className="form-group mb-3 col-md-6">
                                        
                                        <div className="form-check custom-checkbox ml-1 ">
                                            <input
                                            type="checkbox"
                                            className="form-check-input"
                                            
                                            name="ovc_enrolled"
                                            id="ovc_enrolled"
                                            onChange={handleCheckBox}
                                            //value={values.ovc_enrolled}
                                            />
                                            <label
                                            className="form-check-label"
                                            htmlFor="basic_checkbox_1"
                                            >
                                            Enrolled into OVC?
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group mb-3 col-md-6">
                                        {ovcEnrolled===true ? 
                                            (
                                            <FormGroup>
                                            <Label >OVC Number</Label>
                                            <Input
                                                type="text"
                                                name="ovcNumber"
                                                id="ovcNumber"
                                                onChange={handleInputChange}
                                                value={objValues.ovcNumber}
                                                required
                                            />
                                            </FormGroup>
                                            )
                                            :
                                            ""
                                        }
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
                            >
                                {!saving ? (
                                <span style={{ textTransform: "capitalize" }}>Save</span>
                                ) : (
                                <span style={{ textTransform: "capitalize" }}>Saving...</span>
                                )}
                            </MatButton>
                          
                            <MatButton
                                variant="contained"
                                className={classes.button}
                                startIcon={<CancelIcon />}
                                onClick={props.toggle}
                                
                            >
                                <span style={{ textTransform: "capitalize" }}>Cancel</span>
                            </MatButton>
                          
                                </form>
                            </CardBody>
                        </Card> 
                    </Modal.Body>
        
      </Modal>
    </div>
  );
}

export default Enrollment;
