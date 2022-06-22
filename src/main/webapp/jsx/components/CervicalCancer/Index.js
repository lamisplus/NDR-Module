import React, {useState, useEffect} from 'react';
import { Form,Row, Card,CardBody, FormGroup, Label, Input, InputGroup,InputGroupText} from 'reactstrap';
import MatButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import axios from "axios";
import { toast} from "react-toastify";
import { url as baseUrl } from "../../../api";
import { token as token } from "../../../api";
import { useHistory } from "react-router-dom";
import {  Modal, Button } from "react-bootstrap";
import "react-widgets/dist/css/react-widgets.css";

import 'react-summernote/dist/react-summernote.css'; // import styles
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
    }, 
    error: {
        color: "#f85032",
        fontSize: "11px",
    },
    success: {
        color: "#4BB543 ",
        fontSize: "11px",
    },
}))

const CervicalCancer = (props) => {
    const patientObj = props.patientObj;
    let history = useHistory();
    const classes = useStyles()
    const [clinicalStage, setClinicalStage] = useState([])
    const [values, setValues] = useState([]);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});
    const [tbStatus, setTbStatus] = useState([]);
    const [regimenLine, setRegimenLine] = useState([]);
    const [regimenType, setRegimenType] = useState([]);
    const [pregancyStatus, setPregancyStatus] = useState([]);
    const [functionalStatus, setFunctionalStatus] = useState([]);
    const [objValues, setObjValues] = useState({
                                                    personId:"",
                                                    visitDate: "",
                                                    viralLoad: "",
                                                    whoStagingId:"",
                                                    clinicalStageId:"",
                                                    cd4: "",
                                                    cd4Percentage: "",
                                                    isCommencement: true,
                                                    functionalStatusId: "",
                                                    clinicalNote: "",
                                                    hivEnrollmentId: "",
                                                    vitalSignDto:"",
                                                    facilityId:1,
                                                    regimenTypeId: 0,
                                                    regimenId:0                                                   

                                                });

    const [vital, setVitalSignDto]= useState({
                                                bodyWeight: "",
                                                diastolic:"",
                                                encounterDate: "",
                                                facilityId: 1,
                                                height: "",
                                                personId: "",
                                                serviceTypeId: 1,
                                                systolic:"" 
                                            })

    useEffect(() => {
        FunctionalStatus();
        WhoStaging();
        TBStatus();
        PreganacyStatus();
        RegimenLine();
      }, []);
      //Get list of WhoStaging
      const WhoStaging =()=>{
        axios
           .get(`${baseUrl}application-codesets/v2/CLINICAL_STAGE`,
               { headers: {"Authorization" : `Bearer ${token}`} }
           )
           .then((response) => {
               //console.log(response.data);
               setClinicalStage(response.data);
           })
           .catch((error) => {
           //console.log(error);
           });
       
        }
        //Get list of RegimenLine
        const RegimenLine =()=>{
        axios
           .get(`${baseUrl}hiv/regimen/types`,
               { headers: {"Authorization" : `Bearer ${token}`} }
           )
           .then((response) => {
               //console.log(response.data);
               setRegimenLine(response.data);
           })
           .catch((error) => {
           //console.log(error);
           });
       
        }
         //Get list of RegimenLine
         const RegimenType =(id)=>{
            axios
               .get(`${baseUrl}hiv/regimen/types/${id}`,
                   { headers: {"Authorization" : `Bearer ${token}`} }
               )
               .then((response) => {
                   //console.log(response.data);
                   setRegimenType(response.data);
               })
               .catch((error) => {
               //console.log(error);
               });
           
            }
        //Get list of PREGANACY_STATUS
      const PreganacyStatus =()=>{
        axios
           .get(`${baseUrl}application-codesets/v2/PREGANACY_STATUS`,
               { headers: {"Authorization" : `Bearer ${token}`} }
           )
           .then((response) => {
               //console.log(response.data);
               setPregancyStatus(response.data);
           })
           .catch((error) => {
           //console.log(error);
           });
       
        }
        ///GET LIST OF FUNCTIONAL%20_STATUS
        async function FunctionalStatus() {
            axios
                .get(`${baseUrl}application-codesets/v2/FUNCTIONAL%20_STATUS`,
                { headers: {"Authorization" : `Bearer ${token}`} }
                )
                .then((response) => {
                    
                    setFunctionalStatus(response.data);
                    //setValues(response.data)
                })
                .catch((error) => {    
                });        
        }
        // TB STATUS
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

        const handleInputChange = e => {
            setObjValues ({...objValues,  [e.target.name]: e.target.value});
        }
        const handleInputChangeVitalSignDto = e => {            
            setVitalSignDto ({...vital,  [e.target.name]: e.target.value});
        }
        const handleSelecteRegimen = e => { 
            let regimenID=  e.target.value
            setObjValues ({...objValues, regimenId:regimenID});
            RegimenType(regimenID)           
            //setVitalSignDto ({...vital,  [e.target.name]: e.target.value});
        }
        
        const handleInputChange2 = e => {
        let temp = { ...errors }
        if(e.target.name === objValues.bodyWeight && e.target.value >3){
            temp.name = objValues.bodyWeight ? "" : "Body Weight cannot be greater than 200."
            setErrors({
                ...temp
                })    
            return Object.values(temp).every(x => x == "")
        }
        //temp.name = details.name ? "" : "This field is required"
        setObjValues ({...objValues,  [e.target.name]: e.target.value});
        }
        //FORM VALIDATION
        const validate = () => {
            let temp = { ...errors }
            //temp.name = details.name ? "" : "This field is required"
            //temp.description = details.description ? "" : "This field is required"
            setErrors({
                ...temp
                })    
            return Object.values(temp).every(x => x == "")
        }
          
        /**** Submit Button Processing  */
        const handleSubmit = (e) => {                  
            e.preventDefault();                     
            objValues.personId = props.patientObj.id
            vital.encounterDate = objValues.visitDate
            vital.personId=props.patientObj.id
            objValues.vitalSignDto= vital
            objValues.hivEnrollmentId= props.patientObj.enrollment.id
            objValues.clinicalStageId = objValues.whoStagingId 
            setSaving(true);
            axios.post(`${baseUrl}hiv/art/commencement/`,objValues,
            { headers: {"Authorization" : `Bearer ${token}`}},
            
            )
              .then(response => {
                  setSaving(false);
                  props.patientObj.commenced=true
                  toast.success("Record save successful");
                  props.toggle()
                  props.PatientCurrentStatus()

              })
              .catch(error => {
                  setSaving(false);
                  if(error.apierror){
                    toast.error(error.apierror.message);
                  }else{
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
                        <h2> Cervical Cancer </h2>
                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label for="artDate">Date of Screening * </Label>
                            <Input
                                type="date"
                                name="visitDate"
                                id="visitDate"
                                onChange={handleInputChange}
                                value={objValues.visitDate}
                                required
                            />
                            </FormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-6">
                        <FormGroup>
                        <Label >Screen Type</Label>
                        <Input
                                type="select"
                                name="regimenId"
                                id="regimenId"
                                //value={objValues.regimenId}
                                onChange={handleSelecteRegimen}
                                required
                                >
                                    <option value="Select"> </option>
            
                                    {regimenLine.map((value) => (
                                        <option key={value.id} value={value.id}>
                                            {value.description}
                                        </option>
                                    ))}
                            </Input>
                        </FormGroup>
                        </div>
                        
                        <div className="form-group mb-3 col-md-6">
                        <FormGroup>
                        <Label >Screening Method</Label>
                        <Input
                                type="select"
                                name="regimenTypeId"
                                id="regimenTypeId"
                                value={objValues.regimenTypeId}
                                onChange={handleInputChange}
                                required
                                >
                                    <option value="Select"> </option>
            
                                    {regimenType.map((value) => (
                                        <option key={value.id} value={value.id}>
                                            {value.description}
                                        </option>
                                    ))}
                            </Input>
                        {/* {errors.last_name !=="" ? (
                                <span className={classes.error}>{errors.last_name}</span>
                            ) : "" } */}
                        </FormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Screening Result *</Label>
                            <Input
                                type="select"
                                name="whoStagingId"
                                id="whoStagingId"
                                value={objValues.whoStagingId}
                                onChange={handleInputChange}
                                required
                                >
                                    <option value="Select"> </option>
            
                                    {clinicalStage.map((value) => (
                                        <option key={value.id} value={value.id}>
                                            {value.display}
                                        </option>
                                    ))}
                            </Input>
                            
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
                    
                >
                    <span style={{ textTransform: "capitalize" }}>Cancel</span>
                </MatButton>
                
                    </form>
                </CardBody>
            </Card>                     
        </div>
  );
}

export default CervicalCancer;
