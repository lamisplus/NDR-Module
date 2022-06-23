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

const ClinicEvaluationFrom = (props) => {
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
                    <h2>Adult- Initial Clinic Evaluation </h2>
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
                    <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >ART started in L&D ward</Label>
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
                            <Label >Source of Referral</Label>
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
                            <Label >Hepatitis B Status</Label>
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
                            <Label >Hepatitis C Status</Label>
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
                    
                    <h3>Child's Information</h3>
                    <hr/>
                    <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Hospital No</Label>
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
                            <Label >Surname</Label>
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
                            <Label >Other name</Label>
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
                            <Label >Gender</Label>
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
                    <h3>Partner Notification</h3>
                    <hr/>
                    <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Body Weight (Kg)</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                >
                                </Input>
                            </InputGroup>                                        
                            </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Apger Score</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                >
                                </Input>
                            </InputGroup>                                        
                            </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Date of Birth </Label>
                            <InputGroup> 
                                <Input 
                                    type="date"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                >
                                </Input>
                            </InputGroup>                                        
                            </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >ARV at 72hrs</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                >
                                </Input>
                            </InputGroup>                                        
                            </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >HepB within 24hrs? </Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                >
                                </Input>
                            </InputGroup>                                        
                            </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Non HBV - HBV Vaccine 24hrs? </Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                >
                                </Input>
                            </InputGroup>                                        
                            </FormGroup>
                    </div>
                    <h3>Partner Information</h3>
                    <hr/>
                    <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Agreed to partner notification? </Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                >
                                </Input>
                            </InputGroup>                                        
                            </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Non HBV - HBV Vaccine 24hrs? </Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                >
                                </Input>
                            </InputGroup>                                        
                            </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Partner referred to </Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="encounterDate"
                                    id="encounterDate"
                                    onChange={handleInputChangeVitalSignDto}
                                    value={vital.encounterDate} 
                                >
                                </Input>
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

export default ClinicEvaluationFrom;
