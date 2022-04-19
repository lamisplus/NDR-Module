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
    const [objValues, setObjValues] = useState({unique_id: "",date_hiv_enrollment:"",entry_point:"", facility_name:"",status_registration:"",date_confirmed_hiv:"",source_referral:"",enrollment_setting:"",pregnancy_status:"",date_lmp:"",tb_status:"",target_group:"",ovc_enrolled:"",ovc_number:""});
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
            if(e.target.name ==="entry_point" ){
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
        
          objValues.patient_id= patientObj.id

          setSaving(true);
          axios.post(`${baseUrl}covid/patientstatus`,objValues,
           { headers: {"Authorization" : `Bearer ${token}`}},
          
          )
              .then(response => {
                  setSaving(false);
                  toast.success("Transfer successful");
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
                 HIV Enrollment Form - <b>{patientObj.first_name + " " + patientObj.last_name }</b>
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
                                        <Label for="unique_id">Unique ID No  * </Label>
                                        <Input
                                            type="text"
                                            name="unique_id"
                                            id="unique_id"
                                            onChange={handleInputChange}
                                            value={values.unique_id}
                                            required
                                        />
                                        {errors.unique_id !=="" ? (
                                            <span className={classes.error}>{errors.unique_id}</span>
                                        ) : "" }
                                        </FormGroup>
                                    </div>
                                    <div className="form-group mb-3 col-md-6">
                                        <FormGroup>
                                        <Label for="date_hiv_enrollment">Date of Enrollment * </Label>
                                        <DateTimePicker
                                            time={false}
                                            name="date_hiv_enrollment"
                                            id="date_hiv_enrollment"
                                            value={values.regDate}
                                            onChange={value1 =>
                                                setValues({ ...values, date_hiv_enrollment: moment(value1).format("YYYY-MM-DD") })
                                            }
                                            
                                                max={new Date()}
                                        />
                                        {errors.date_hiv_enrollment !=="" ? (
                                            <span className={classes.error}>{errors.date_hiv_enrollment}</span>
                                        ) : "" }
                                        </FormGroup>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group mb-3 col-md-6">
                                    <FormGroup>
                                    <Label for="entry_point">Care Entry Point</Label>
                                    <Input
                                        type="select"
                                        name="entry_point"
                                        id="entry_point"
                                        onChange={handleInputChange}
                                        value={values.entry_point}
                                        required
                                    >
                                    <option value=""> </option>
                      
                                    {carePoints.map((value) => (
                                        <option key={value.id} value={value.id}>
                                            {value.display}
                                        </option>
                                    ))}
                                    {errors.entry_point !=="" ? (
                                            <span className={classes.error}>{errors.entry_point}</span>
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
                                                name="facility_name"
                                                id="facility_name"
                                                onChange={handleInputChange}
                                                value={values.facility_name}
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
                                        name="status_registration"
                                        id="status_registration"
                                        onChange={handleInputChange}
                                        value={values.status_registration}
                                        required
                                    >
                                    <option value=""> </option>
                      
                                    {hivStatus.map((value) => (
                                        <option key={value.id} value={value.id}>
                                            {value.display}
                                        </option>
                                    ))}
                                    {errors.status_registration !=="" ? (
                                            <span className={classes.error}>{errors.status_registration}</span>
                                        ) : "" }
                                    </Input>
                                    </FormGroup>
                                    </div>
                                
                                    <div className="form-group mb-3 col-md-6">
                                        <FormGroup>
                                        <Label >Date of Confirmed HIV Test *</Label>
                                        <DateTimePicker
                                            time={false}
                                            name="date_confirmed_hiv"
                                            id="date_confirmed_hiv"
                                            value={values.regDate}
                                            onChange={value1 =>
                                                setValues({ ...values, date_confirmed_hiv: moment(value1).format("YYYY-MM-DD") })
                                            }
                                            
                                                max={new Date()}
                                        />
                                            {values.date_confirmed_hiv ==="Invalid date" ? (
                                                <span className={classes.error}>{"This field is required"}</span>
                                            ) : "" }
                                            {errors.date_confirmed_hiv !=="" ? (
                                            <span className={classes.error}>{errors.date_confirmed_hiv}</span>
                                        ) : "" }
                                        </FormGroup>
                                    </div>
                                    <div className="form-group mb-3 col-md-6">
                                        <FormGroup>
                                        <Label >Source of Referral</Label>
                                        <Input
                                            type="select"
                                            name="source_referral"
                                            id="source_referral"
                                            value={values.source_referral}
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
                                        {errors.source_referral !=="" ? (
                                            <span className={classes.error}>{errors.source_referral}</span>
                                        ) : "" }
                                        </FormGroup>
                                    </div>
                                    
                                    <div className="form-group mb-3 col-md-6">
                                        <FormGroup>
                                        <Label >Enrollment Setting</Label>
                                        <Input
                                            type="select"
                                            name="enrollment_setting"
                                            id="enrollment_setting"
                                            value={values.enrollment_setting}
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
                                        {errors.enrollment_setting !=="" ? (
                                            <span className={classes.error}>{errors.enrollment_setting}</span>
                                        ) : "" }
                                        </FormGroup>
                                    </div>
                                {
                                    patientObj.gender !== 1 ?
                                        (
                                        <div className = "form-group mb-3 col-md-6" >
                                        <FormGroup >
                                        < Label > Pregnancy < /Label>
                                        < Input
                                            type = "select"
                                            name = "pregnancy_status"
                                            id = "pregnancy_status"
                                            value = {values.pregnancy_status}
                                            onChange = {handleInputChange}
                                            required
                                            >
                                            < option
                                            value = "" > < /option>

                                            {
                                                pregnancyStatus.map((value) => (
                                                    < option
                                                key = {value.id}
                                                value = {value.id} >
                                                    {value.display}
                                                    < /option>
                                            ))
                                            }
                                        </Input>
                                            {
                                                errors.pregnancy_status !== "" ? (
                                                    < span className = {classes.error} > {errors.pregnancy_status} < /span>
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
                                            name="date_lmp"
                                            id="date_lmp"
                                            value={values.regDate}
                                            onChange={value1 =>
                                                setValues({ ...values, date_lmp: moment(value1).format("YYYY-MM-DD") })
                                            }

                                                max={new Date()}
                                        />
                                            {values.date_lmp ==="Invalid date" ? (
                                                <span className={classes.error}>{"This field is required"}</span>
                                            ) : "" }
                                            {errors.date_lmp !=="" ? (
                                            <span className={classes.error}>{errors.date_lmp}</span>
                                        ) : "" }
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
                                            name="tb_status"
                                            id="tb_status"
                                            value={values.tb_status}
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
                                        {errors.tb_status !=="" ? (
                                            <span className={classes.error}>{errors.tb_status}</span>
                                        ) : "" }
                                        </FormGroup>
                                    </div>
                                    <div className="form-group mb-3 col-md-6">
                                        <FormGroup>
                                        <Label >KP Target Group</Label>
                                        <Input
                                            type="select"
                                            name="target_group"
                                            id="target_group"
                                            value={values.target_group}
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
                                        {errors.target_group !=="" ? (
                                            <span className={classes.error}>{errors.target_group}</span>
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
                                                type="select"
                                                name="ovc_number"
                                                id="ovc_number"
                                                onChange={handleInputChange}
                                                value={values.ovc_number}
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
