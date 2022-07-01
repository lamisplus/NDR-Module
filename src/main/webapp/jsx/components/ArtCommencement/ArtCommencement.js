import React, {useState, useEffect} from 'react';
import { Card,CardBody, FormGroup, Label, Input, InputGroup,InputGroupText} from 'reactstrap';
import MatButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import axios from "axios";
import { toast} from "react-toastify";
import { url as baseUrl, token } from "../../../api";
//import { useHistory } from "react-router-dom";
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

const ArtCommencement = (props) => {
    const patientObj = props.patientObj;
    //let history = useHistory();
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
                                                    personId:props.patientObj.id,
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
                                                personId: props.patientObj.id,
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
                  props.setArt(true)
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
      <div >
         
              <Modal show={props.showModal} toggle={props.toggle} className="fade" size="xl">
             <Modal.Header toggle={props.toggle} style={{backgroundColor:"#eeeeee"}}>
                 ART Commencement 
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
                                
                                    <div className="form-group mb-3 col-md-4">
                                        <FormGroup>
                                        <Label for="artDate">ART Start Date  * </Label>
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
                                    <div className="form-group mb-3 col-md-4">
                                        <FormGroup>
                                        <Label for="cd4">CD4 at start of ART </Label>
                                        <Input
                                            type="text"
                                            name="cd4"
                                            id="cd4"
                                            onChange={handleInputChange}
                                            value={objValues.cd4}
                                            required
                                        />
                                        
                                        </FormGroup>
                                    </div>
                              
                                    <div className="form-group mb-3 col-md-4">
                                    <FormGroup>
                                    <Label for="cd4Percentage">CD4%</Label>
                                    <Input
                                        type="number"
                                        name="cd4Percentage"
                                        id="cd4Percentage"
                                        onChange={handleInputChange}
                                        value={objValues.cd4Percentage}
                                        required
                                    />
                                    
                                    </FormGroup>
                                    </div>
                                    <div className="form-group mb-3 col-md-4">
                                    <FormGroup>
                                    <Label >Original Regimen Line  </Label>
                                    <Input
                                            type="select"
                                            name="regimenId"
                                            id="regimenId"
                                            //value={objValues.regimenId}
                                            onChange={handleSelecteRegimen}
                                            required
                                            >
                                             <option value=""> Select</option>
                      
                                                {regimenLine.map((value) => (
                                                    <option key={value.id} value={value.id}>
                                                        {value.description}
                                                    </option>
                                                ))}
                                        </Input>
                                    </FormGroup>
                                    </div>
                                    
                                    <div className="form-group mb-3 col-md-4">
                                    <FormGroup>
                                    <Label >Original Regimen</Label>
                                    <Input
                                            type="select"
                                            name="regimenTypeId"
                                            id="regimenTypeId"
                                            value={objValues.regimenTypeId}
                                            onChange={handleInputChange}
                                            required
                                            >
                                             <option value=""> Select</option>
                      
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
                                
                                    <div className="form-group mb-3 col-md-4">
                                        <FormGroup>
                                        <Label >Viral Load at Start of ART *</Label>
                                        <Input
                                            type="date"
                                            name="viralLoad"
                                            id="viralLoad"
                                            onChange={handleInputChange2}
                                            value={objValues.viralLoad}
                                            required
                                        />
                                            {values.viralLoad ==="Invalid date" ? (
                                                <span className={classes.error}>{"This field is required"}</span>
                                            ) : "" }
                                            {errors.viralLoad !=="" ? (
                                            <span className={classes.error}>{errors.viralLoad}</span>
                                        ) : "" }
                                        </FormGroup>
                                    </div>
                                    <div className="form-group mb-3 col-md-4">
                                        <FormGroup>
                                        <Label >WHO Staging</Label>
                                        <Input
                                            type="select"
                                            name="whoStagingId"
                                            id="whoStagingId"
                                            value={objValues.whoStagingId}
                                            onChange={handleInputChange}
                                            required
                                            >
                                             <option value=""> Select</option>
                      
                                                {clinicalStage.map((value) => (
                                                    <option key={value.id} value={value.id}>
                                                        {value.display}
                                                    </option>
                                                ))}
                                        </Input>
                                        
                                        </FormGroup>
                                    </div>
                                    
                                    <div className="form-group mb-3 col-md-4">
                                        <FormGroup>
                                        <Label >Functional Status</Label>
                                        <Input
                                            type="select"
                                            name="functionalStatusId"
                                            id="functionalStatusId"
                                            value={objValues.functionalStatusId}
                                            onChange={handleInputChange}
                                            required
                                            >
                                             <option value=""> Select</option>
                      
                                                {functionalStatus.map((value) => (
                                                    <option key={value.id} value={value.id}>
                                                        {value.display}
                                                    </option>
                                                ))}
                                        </Input>
                                        </FormGroup>
                                    </div>
                                    <div className="form-group mb-3 col-md-4">
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
                                             <option value=""> Select</option>
                      
                                                {tbStatus.map((value) => (
                                                    <option key={value.id} value={value.id}>
                                                        {value.display}
                                                    </option>
                                                ))}
                                        </Input>
                                        </FormGroup>
                                    </div>
                                    <div className="form-group mb-3 col-md-4">
                                        <FormGroup>
                                        <Label >Body Weight</Label>
                                        <InputGroup> 
                                            <Input 
                                                type="number"
                                                name="bodyWeight"
                                                id="bodyWeight"
                                                onChange={handleInputChangeVitalSignDto}
                                                value={vital.bodyWeight} 
                                            />
                                           
                                            <InputGroupText>
                                               kg
                                            </InputGroupText>
                                        </InputGroup>
                                        {vital.bodyWeight > 200 ? (
                                                <span className={classes.error}>{"Body Weight cannot be greater than 200."}</span>
                                            ) : "" 
                                        }
                                        </FormGroup>
                                    </div>
                                   
                                    <div className="form-group mb-3 col-md-4">
                                        <FormGroup>
                                        <Label >Height</Label>
                                        <InputGroup> 
                                            <Input 
                                                type="number"
                                                name="height"
                                                id="height"
                                                onChange={handleInputChangeVitalSignDto}
                                                value={vital.height} 
                                            />
                                            <InputGroupText>
                                               m
                                            </InputGroupText>
                                        </InputGroup>
                                        {vital.height > 3 ? (
                                            <span className={classes.error}>{"Height cannot be greater than 3."}</span>
                                        ) : "" }
                                        </FormGroup>
                                    </div>
                                    <div className="form-group mb-3 col-md-4">
                                        <FormGroup>
                                        <Label >Blood Pressure</Label>
                                        <InputGroup> 
                                            <Input 
                                                type="number"
                                                name="systolic"
                                                id="systolic"
                                                onChange={handleInputChangeVitalSignDto}
                                                value={vital.systolic} 
                                            />
                                            <InputGroupText>
                                                systolic(mmHg)
                                            </InputGroupText>
                                        </InputGroup>
                                        {vital.systolic > 200 ? (
                                                <span className={classes.error}>{"Blood Pressure cannot be greater than 200."}</span>
                                            ) : "" }
                                        </FormGroup>
                                    </div>
                                    <div className="form-group mb-3 col-md-4">
                                        <FormGroup>
                                        <Label >Blood Pressure</Label>
                                        
                                        <InputGroup> 
                                            <Input 
                                                type="text"
                                                name="diastolic"
                                                id="diastolic"
                                                onChange={handleInputChangeVitalSignDto}
                                                value={vital.diastolic} 
                                            />
                                            <InputGroupText>
                                                diastolic(mmHg)
                                            </InputGroupText>
                                        </InputGroup>
                                        {vital.diastolic > 200 ? (
                                            <span className={classes.error}>{"Blood Pressure cannot be greater than 200."}</span>
                                        ) : "" }
                                        </FormGroup>
                                    </div>
                                    {props.patientObj.gender.display==="Female" || props.patientObj.gender.display==="Transgebder(Female)"? (
                                        <>
                                        <div className="form-group mb-3 col-md-4">
                                            <FormGroup>
                                            <Label >Pregnancy Status</Label>
                                            <Input
                                                type="select"
                                                name="address"
                                                id="address"
                                                onChange={handleInputChange}
                                                value={objValues.address}
                                                required
                                            >
                                                <option value=""> Select</option>
                        
                                                {pregancyStatus.map((value) => (
                                                    <option key={value.id} value={value.id}>
                                                        {value.display}
                                                    </option>
                                                ))}
                                            </Input>
                                            </FormGroup>
                                        </div>
                                        <div className="form-group mb-3 col-md-4">
                                            <FormGroup>
                                            <Label >LMP</Label>
                                            <Input
                                                type="date"
                                                name="LMPDate"
                                                id="LMPDate"
                                                onChange={handleInputChange}
                                                value={values.address}
                                                required
                                            />
                                            </FormGroup>
                                        </div>
                                        </>
                                    ) :
                                    ""
                                    }
                                    <div className="form-group mb-3 col-md-12">
                                        <FormGroup>
                                        <Label >Clinical Notes</Label>
                                        <Input
                                            type="textarea"
                                            name="clinicalNote"
                                            rows="40" cols="50"
                                            id="clinicalNote"
                                            onChange={handleInputChange}
                                            value={objValues.clinicalNote}
                                            required
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
                    </Modal.Body>
        
      </Modal>
    </div>
  );
}

export default ArtCommencement;
