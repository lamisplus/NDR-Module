import React, {useState, useEffect} from 'react';
import {Card,CardBody, FormGroup, Label, Input, InputGroup} from 'reactstrap';
import MatButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import axios from "axios";
import { toast} from "react-toastify";
import { url as baseUrl, token } from "../../../api";
import { useHistory } from "react-router-dom";
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

const ChildClinicEvaluationForm = (props) => {
    const patientObj = props.patientObj;
    console.log(patientObj)
    let history = useHistory();
    const classes = useStyles()
    //const [values, setValues] = useState([]);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});

    const [vital, setVitalSignDto]= useState({

                                                bodyWeight: "",
                                                diastolic: "",
                                                encounterDate: "",
                                                facilityId: 1,
                                                height: "",
                                                personId: "",
                                                pulse: "",
                                                respiratoryRate: "",
                                                systolic:"",
                                                temperature: "",
                                                visitId:""
                                            })
    
        const handleInputChangeVitalSignDto = e => {            
            setVitalSignDto ({...vital,  [e.target.name]: e.target.value});
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
            
            setSaving(true);
            axios.post(`${baseUrl}patient/vital-sign/`, vital,
            { headers: {"Authorization" : `Bearer ${token}`}},
            
            )
              .then(response => {
                  setSaving(false);
                  props.patientObj.commenced=true
                  toast.success("Vital signs save successful");
                  props.toggle()
                  props.patientsVitalsSigns()

              })
              .catch(error => {
                  setSaving(false);
                  toast.error("Something went wrong");
                 
              });
          
        }

  return (      
      <div >
                   
        <Card >
            <CardBody>
            <form >
                <div className="row">
                    <h2>Pediatric - Initial Clinical Evaluation </h2>
                    <h3>Medical History</h3>
                    {/* Medical History form inputs */}
                        <div className="form-group mb-3 col-md-2"> 
                            <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Fever/Chills
                            </label>                                      
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                                
                                name="ovc_enrolled"
                                id="ovc_enrolled"
                                />
                                
                            </div>
                        </div>
                        <div className="form-group mb-3 col-md-2">
                            <FormGroup>
                            <Label >Duration</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />

                            </InputGroup>
                        
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-2"> 
                            <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Nausea/Vomitiing
                            </label>                                      
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                                
                                name="ovc_enrolled"
                                id="ovc_enrolled"
                                />
                                
                            </div>
                        </div>
                        <div className="form-group mb-3 col-md-2">
                            <FormGroup>
                            <Label >Duration</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />

                            </InputGroup>
                        
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-2"> 
                            <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Night Sweats
                            </label>                                      
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                                
                                name="ovc_enrolled"
                                id="ovc_enrolled"
                                />
                                
                            </div>
                        </div>
                        <div className="form-group mb-3 col-md-2">
                            <FormGroup>
                            <Label >Duration</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />

                            </InputGroup>
                        
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-2"> 
                            <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Recent Weight Loss
                            </label>                                      
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                                
                                name="ovc_enrolled"
                                id="ovc_enrolled"
                                />
                                
                            </div>
                        </div>
                        <div className="form-group mb-3 col-md-2">
                            <FormGroup>
                            <Label >Duration</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />

                            </InputGroup>
                        
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-2"> 
                            <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Cough
                            </label>                                      
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                                
                                name="ovc_enrolled"
                                id="ovc_enrolled"
                                />
                                
                            </div>
                        </div>
                        <div className="form-group mb-3 col-md-2">
                            <FormGroup>
                            <Label >Duration</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />

                            </InputGroup>
                        
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-2"> 
                            <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Headache
                            </label>                                      
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                                
                                name="ovc_enrolled"
                                id="ovc_enrolled"
                                />
                                
                            </div>
                        </div>
                        <div className="form-group mb-3 col-md-2">
                            <FormGroup>
                            <Label >Duration</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />

                            </InputGroup>
                        
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-2"> 
                            <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                New Visual imparity
                            </label>                                      
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                                
                                name="ovc_enrolled"
                                id="ovc_enrolled"
                                />
                                
                            </div>
                        </div>
                        <div className="form-group mb-3 col-md-2">
                            <FormGroup>
                            <Label >Duration</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />

                            </InputGroup>
                        
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-2"> 
                            <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Pain & Difficulty when swallowing 
                            </label>                                      
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                                
                                name="ovc_enrolled"
                                id="ovc_enrolled"
                                />
                                
                            </div>
                        </div>
                        <div className="form-group mb-3 col-md-2">
                            <FormGroup>
                            <Label >Duration</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />

                            </InputGroup>
                        
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-2"> 
                            <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Rash
                            </label>                                      
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                                
                                name="ovc_enrolled"
                                id="ovc_enrolled"
                                />
                                
                            </div>
                        </div>
                        <div className="form-group mb-3 col-md-2">
                            <FormGroup>
                            <Label >Duration</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />

                            </InputGroup>
                        
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-2"> 
                            <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Itching
                            </label>                                      
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                                
                                name="ovc_enrolled"
                                id="ovc_enrolled"
                                />
                                
                            </div>
                        </div>
                        <div className="form-group mb-3 col-md-2">
                            <FormGroup>
                            <Label >Duration</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />

                            </InputGroup>
                        
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-2"> 
                            <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Chronic Diarrhea
                            </label>                                      
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                                
                                name="ovc_enrolled"
                                id="ovc_enrolled"
                                />
                                
                            </div>
                        </div>
                        <div className="form-group mb-3 col-md-2">
                            <FormGroup>
                            <Label >Duration</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />

                            </InputGroup>
                        
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-2"> 
                            <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Genital itching
                            </label>                                      
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                                
                                name="ovc_enrolled"
                                id="ovc_enrolled"
                                />
                                
                            </div>
                        </div>
                        <div className="form-group mb-3 col-md-2">
                            <FormGroup>
                            <Label >Duration</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />

                            </InputGroup>
                        
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-2"> 
                            <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Genital Sores
                            </label>                                      
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                                
                                name="ovc_enrolled"
                                id="ovc_enrolled"
                                />
                                
                            </div>
                        </div>
                        <div className="form-group mb-3 col-md-2">
                            <FormGroup>
                            <Label >Duration</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />

                            </InputGroup>
                        
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-2"> 
                            <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Shortness of breath
                            </label>                                      
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                                
                                name="ovc_enrolled"
                                id="ovc_enrolled"
                                />
                                
                            </div>
                        </div>
                        <div className="form-group mb-3 col-md-2">
                            <FormGroup>
                            <Label >Duration</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />

                            </InputGroup>
                        
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-2"> 
                            <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Numbness/tingling
                            </label>                                      
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                                
                                name="ovc_enrolled"
                                id="ovc_enrolled"
                                />
                                
                            </div>
                        </div>
                        <div className="form-group mb-3 col-md-2">
                            <FormGroup>
                            <Label >Duration</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />

                            </InputGroup>
                        
                            </FormGroup>
                        </div>

                    {/* end of medical form inputs */}
                     {/* TB Screening section */}
                     <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Patient Screen for TB</Label>
                            <InputGroup> 
                                <Input 
                                    type="select"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                                </Input>

                            </InputGroup>
                        
                            </FormGroup>
                     </div>
                    {/* end of TB Screening section */}
                    {/* Past medical history */}
                    <div className="form-group mb-3 col-md-12">
                            <FormGroup>
                            <Label >Past Medical History</Label>
                            <InputGroup> 
                                <Input 
                                    type="textarea"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />

                            </InputGroup>
                        
                            </FormGroup>
                    </div>
                    {/* end of Past medical history  */}
                    {/* Past Family medical history */}
                    <div className="form-group mb-3 col-md-12">
                            <FormGroup>
                            <Label >Relevant Family History</Label>
                            <InputGroup> 
                                <Input 
                                    type="textarea"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />

                            </InputGroup>
                        
                            </FormGroup>
                    </div>
                    {/* end of FamilyPast medical history  */}
                    {/* hospitalization */}
                    <div className="form-group mb-3 col-md-12">
                            <FormGroup>
                            <Label >Hospitalization</Label>
                            <InputGroup> 
                                <Input 
                                    type="textarea"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />

                            </InputGroup>
                        
                            </FormGroup>
                    </div>
                    {/* end of hosiptalization */}
                    {/* Drug Allergies */}
                    <div className="form-group mb-3 col-md-12">
                            <FormGroup>
                            <Label >Drug Allergies</Label>
                            <InputGroup> 
                                <Input 
                                    type="textarea"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />

                            </InputGroup>
                        
                            </FormGroup>
                    </div>
                    {/* end of Drug Allergies  */}
                    <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Current Pregnant</Label>
                            <InputGroup> 
                                <Input 
                                    type="select"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                                <option value="Uncertain">Uncertain</option>
                                </Input>

                            </InputGroup>
                        
                            </FormGroup>
                     </div>
                     <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Last menstrual period</Label>
                            <InputGroup> 
                                <Input 
                                    type="date"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />

                            </InputGroup>
                        
                            </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Gestational Age (weeks)</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />

                            </InputGroup>
                        
                            </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Current BreastFeeding</Label>
                            <InputGroup> 
                                <Input 
                                    type="select"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                                <option value="Uncertain">Uncertain</option>
                                </Input>

                            </InputGroup>
                        
                            </FormGroup>
                     </div>
                     <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >previous ARV exposure</Label>
                            <InputGroup> 
                                <Input 
                                    type="select"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                                <option value="Uncertain">Uncertain</option>
                                </Input>

                            </InputGroup>
                        
                            </FormGroup>
                     </div>
                     <div className="form-group mb-3 col-md-4">
                                    
                        <div className="form-check custom-checkbox ml-1 ">
                        <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Early ARV but not transfer in
                        </label>
                            <input
                            type="checkbox"
                            className="form-check-input"                            
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                                    
                        <div className="form-check custom-checkbox ml-1 ">
                        <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            PMTCT only
                        </label>
                            <input
                            type="checkbox"
                            className="form-check-input"                            
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                                    
                        <div className="form-check custom-checkbox ml-1 ">
                        <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            As never receive ARVs
                        </label>
                            <input
                            type="checkbox"
                            className="form-check-input"                            
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                            <Label >Name of the Facility</Label>
                            <InputGroup> 
                                <Input 
                                    type="date"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />

                            </InputGroup>
                        
                            </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                            <Label >Duration of care from</Label>
                            <InputGroup> 
                                <Input 
                                    type="Date"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />

                            </InputGroup>
                        
                            </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                            <Label >To</Label>
                            <InputGroup> 
                                <Input 
                                    type="date"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />

                            </InputGroup>
                        
                            </FormGroup>
                    </div>
                    <h3>Current Medications(Caregiver should be prob ) if yes </h3>
                    <hr/>
                    <div className="form-group mb-3 col-md-2">
                    <div className="form-check custom-checkbox ml-1 ">
                        <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            None
                        </label>
                            <input
                            type="checkbox"
                            className="form-check-input"                            
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">
                    <div className="form-check custom-checkbox ml-1 ">
                        <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            ART
                        </label>
                            <input
                            type="checkbox"
                            className="form-check-input"                            
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">
                    <div className="form-check custom-checkbox ml-1 ">
                        <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            CTX
                        </label>
                            <input
                            type="checkbox"
                            className="form-check-input"                            
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">
                    <div className="form-check custom-checkbox ml-1 ">
                        <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Anti-TB drugs
                        </label>
                            <input
                            type="checkbox"
                            className="form-check-input"                            
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                            <Label >Others</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />

                            </InputGroup>
                        
                            </FormGroup>
                    </div>
                   <h3>Patient has disclosed status to:</h3>
                   <hr/>
                   <div className="form-group mb-3 col-md-2">
                    <div className="form-check custom-checkbox ml-1 ">
                        <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            No one
                        </label>
                            <input
                            type="checkbox"
                            className="form-check-input"                            
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">
                    <div className="form-check custom-checkbox ml-1 ">
                        <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Family member
                        </label>
                            <input
                            type="checkbox"
                            className="form-check-input"                            
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">
                    <div className="form-check custom-checkbox ml-1 ">
                        <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Friend
                        </label>
                            <input
                            type="checkbox"
                            className="form-check-input"                            
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">
                    <div className="form-check custom-checkbox ml-1 ">
                        <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Spouse
                        </label>
                            <input
                            type="checkbox"
                            className="form-check-input"                            
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">
                    <div className="form-check custom-checkbox ml-1 ">
                        <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Spiritual leader
                        </label>
                            <input
                            type="checkbox"
                            className="form-check-input"                            
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">
                            <FormGroup>
                            <Label >Other</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />
                            </InputGroup>                                        
                            </FormGroup>
                    </div>
                   
                    <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >HIV Status can be discussed with (Record reported person, if any):</Label>
                            <InputGroup> 
                                <Input 
                                    type="date"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />
                            </InputGroup>                                        
                            </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-6"></div>

                    <hr/>
                    <h3>Past or current ARV or other medication's side effect</h3>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                            
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            None
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                            
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Signif.nausea/vomit
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                            
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Diarrhea
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                            
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Headache
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                            
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Pain in abdomen or muscle
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                            
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Jaundice
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                            
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Insomnia/bad dreams
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                            
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Confussion/Dizzy
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                            
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Tingling of extremities
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                            
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Rash
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                            
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Pancreatities
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                            
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Steven Johnson Syndrome
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                            
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Itching
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                            
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Anemia
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                            
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Weekness/Fatigue
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                            
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Fat accumulation or loss
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                            
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Hyperglycemia
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                            
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Kidney Problem
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                            
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Liver Problem
                            </label>
                        </div>
                    </div>

                    <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Others(Specify)</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />
                            </InputGroup>                                        
                            </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-12">
                            <FormGroup>
                            <Label >If yes to past or current ARV or other medication's side effect, specify medication(s) </Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />
                            </InputGroup>                                        
                            </FormGroup>
                    </div>
                    <hr/>
                    <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Physical exam</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />
                            </InputGroup> 
                            <span >(note: NSF = no significant findings)</span>                                       
                            </FormGroup>

                    </div>
                    <div className="form-group mb-3 col-md-6"></div>
                    <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                            <Label >Temperature(<sup>o</sup>C)</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />
                            </InputGroup>                                        
                            </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                            <Label >Blood Presure(mm/Hg)</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />
                            </InputGroup>                                        
                            </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                            <Label >Weight(kg)</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />
                            </InputGroup>                                        
                            </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                            <Label >Height(m)</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />
                            </InputGroup>                                        
                            </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-4"></div>
                    <hr/>
                    <h3>General Appearance</h3>
                    <hr/>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            NSF
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Pallor
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Febrile
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Dehydrated
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Peripheral edema
                            </label>
                        </div>
                    </div>

                    <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Other (specify)</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />
                            </InputGroup>                                        
                            </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-6"></div>
                    <hr/>
                    <h3>Skin</h3>
                    <hr/>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            NSF
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Pruritic paplar dermatitis
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Abscesses
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Herpes zoster
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Kaposi's lesions
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Suborrheic dermatitis
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Fungal infections
                            </label>
                        </div>
                    </div>

                    <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Other (specify)</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />
                            </InputGroup>                                        
                            </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-6"></div>
                    <hr/>
                    <h3>Head/Eye/ENT</h3>
                    <hr/>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            NSF
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Icterus
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Thrush
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Oral KS
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Abnormal fundoscopy
                            </label>
                        </div>
                    </div>

                    <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Other (specify)</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />
                            </InputGroup>                                        
                            </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-6"></div>
                    <hr/>
                    <h3>Breasts</h3>
                    <hr/>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            NSF
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Lumps, masses
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Discharge
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Other (specify)</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />
                            </InputGroup>                                        
                            </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-6"></div>
                    <hr/>
                    <h3>Cardiovascular</h3>
                    <hr/>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            NSF
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Abnormal heart rate
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Other (specify)</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />
                            </InputGroup>                                        
                            </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-6"></div>
                    <hr/>
                    <h3>Genitalia</h3>
                    <hr/>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            NSF
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Genital discharge
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Genital ulcer/other lesion
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Inguinal node enlargement
                            </label>
                        </div>
                    </div>                 
                    <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Other (specify)</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />
                            </InputGroup>                                        
                            </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-6"></div>
                    <hr/>
                    <h3>Respiratory</h3>
                    <hr/>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            NSF
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Rate (breaths/min)
                            </label>
                            <input
                            type="text"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            placeholder='breaths/min'
                            />
                            
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Labored breathing
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Cyanosis
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Wheezing
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Intercostal (sub) recession
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Auscultation findings
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Other (specify)</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />
                            </InputGroup>                                        
                            </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-6"></div>
                    <hr/>
                    <h3>Gastrointestinal</h3>
                    <hr/>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            NSF
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Distention
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Hepatomegaly
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Spenomegaly
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Tenderness
                            </label>
                        </div>
                    </div>

                    <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Other (specify)</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />
                            </InputGroup>                                        
                            </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-6"></div>
                    <hr/>
                    <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Additional and detailed findings</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />
                            </InputGroup>                                        
                            </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-6"></div>
                    <hr/>
                    <h3>Assessment</h3>
                    <div className="form-group mb-3 col-md-3">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Asymptomatic
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-3">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            AIDS defining illness
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-3">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Symptomatic
                            </label>
                        </div>
                    </div>
                    <hr/>
                    <h3>WHO staging criteria (History of any of the following)</h3>
                    <h3>STAGE 1</h3>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Asymptomatic
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-3">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Persistent generalized lymphadenopathy
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-3">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Performance scale: 1 asymptomatic, normal activity
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-4"> </div>
                    <hr/>
                    <h3>STAGE 2</h3>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Weight loss {"<"}10% of body weight
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Minor Mucocutaneous Manifestations
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Herpes Zoster (within last 5 years)
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Recurrent Upper Respiratory Tract Infections
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Performance scale: 2 symptomatic, normal activity
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2"></div>
                    <hr/>
                    <h3>STAGE 3</h3>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Weight loss {">"}10% of body weight
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Unexplained Chronic Diarrhea ({">"}1 month)
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Unexplained Prolonged Fever
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Oral Candidiasis
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Oral Hairy Leukoplakia
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            TB, Pulmonary (within previous year)
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Severe Bacterial Infections
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Performance scale: 3 bedridden {"<"}50% of day in last month
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-8"></div>
                    <hr/>
                    <h3>STAGE 4</h3>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            HIV Wasting syndrome
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            PCP
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Toxoplasmosis, CNS
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Cryptosporidiosis with Diarrhea ({">"}1 month)
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Cryptococcosis, Extrapulmonary
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Cytomegalovirus disease
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Herpes Simplex (mucotaneous {">"}1 month)
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Progressive Multifocal Leukoencephalopathy
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Mycosis, disseminated
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Oesophageal Candidiasis
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Atypical Mycobacteriosis, disseminated
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Salmonella Septicemia, Non-typhoid
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            TB, Extrapulmonary
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Lymphoma
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Kaposi's Sarcoma
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            HIV encephalopathy
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Performance scale: 4 bedridden {">"}50% of the day in last month
                            </label>
                        </div>
                    </div>
                    <hr/>
                    <h3> Plan (specify orders on requisition)</h3>
                    <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Lab evaluation</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />
                            </InputGroup>                                        
                            </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >CD4 count evaluation</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />
                            </InputGroup>                                        
                            </FormGroup>
                    </div>
                    <hr/>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            TB Investigations
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Xpert MTB/RIF
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            CXR
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            LF_LAM
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            CD4 LFA
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            {"<"}200
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                                ≥200
                            </label>
                        </div>
                    </div>
                    <hr/>
                    <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >OI Prophylaxis</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />
                            </InputGroup>                                        
                            </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >OI therapy </Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />
                            </InputGroup>                                        
                            </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Adherence counseling</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />
                            </InputGroup>                                        
                            </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Admission</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />
                            </InputGroup>                                        
                            </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Cervical cancer screening</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />
                            </InputGroup>                                        
                            </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Symptomatic treatment/pain control (specify)</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />
                            </InputGroup>                                        
                            </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Cryptococcal antigen test</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />
                            </InputGroup>                                        
                            </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Other referrals (specify)</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />
                            </InputGroup>                                        
                            </FormGroup>
                    </div>
                    <hr/>
                    <h3>Enroll in</h3>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            General medical follow-up
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            ARV therapy
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            AHD management
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Pending lab results
                            </label>
                        </div>
                    </div>
                    <hr/>
                    <h3>Plan for Antiretroviral Therapy (ART)</h3>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Ongoing monitoring: ARV Tx postponed for clinical reasons
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Restart treatment
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Start new treatment
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Stop treatment 
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Change treatment 
                            </label>
                        </div>
                    </div>
                    <hr/>
                    <h3>Regimen</h3>
                    <h3>First Line</h3>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            TDF+3TC (or FTC) +DTG
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            TDF+3TC(or FTC) + EFV 400
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            ABC +3TC+DTG 
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                             TDF+3TC (or FTC) +EFV
                            </label>
                        </div>
                    </div>
                    <hr/>
                    <h3>Second Line</h3>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Change treatment 
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                             AZT+ 3TC + ATV/r
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            TDF +3TC + ATV/r
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                             TDF +3TC + LPV/r 
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            TDF +3TC + LPV/r 
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            AZT + TDF + 3TC+ ATV/r 
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            AZT + TDF + 3TC+ LPV/r 
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                             TDF+3TC +DTG
                            </label>
                        </div>
                    </div>
                    <hr/>
                    <h3>Thirt Line</h3>
                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            DRV/r +DTG ± 1-2 NRTIs 
                            </label>
                        </div>
                    </div>

                    <div className="form-group mb-3 col-md-2">                                    
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                           
                            name="ovc_enrolled"
                            id="ovc_enrolled"
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                             DRV/r +2NRTIs ± ETV 
                            </label>
                        </div>
                    </div>
                    <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Drugs in regimen</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />
                            </InputGroup>                                        
                            </FormGroup>
                    </div>                  
                    <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Next appointment</Label>
                            <InputGroup> 
                                <Input 
                                    type="date"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                />
                            </InputGroup>                                        
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

export default ChildClinicEvaluationForm;
