
import React, { useEffect, useState} from "react";
import axios from "axios";
import {FormGroup, Label , CardBody, Spinner,Input,Form, InputGroup} from "reactstrap";
import * as moment from 'moment';
import {makeStyles} from "@material-ui/core/styles";
import {Card, } from "@material-ui/core";
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import { useHistory, } from "react-router-dom";
// import {TiArrowBack} from 'react-icons/ti'
import {token, url as baseUrl } from "../../../api";
import 'react-phone-input-2/lib/style.css'
import 'semantic-ui-css/semantic.min.css';
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import 'react-phone-input-2/lib/style.css'
import { Button} from 'semantic-ui-react'


const useStyles = makeStyles((theme) => ({
    card: {
        margin: theme.spacing(20),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    cardBottom: {
        marginBottom: 20,
    },
    Select: {
        height: 45,
        width: 300,
    },
    button: {
        margin: theme.spacing(1),
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
        },
        
    },
    demo: {
        backgroundColor: theme.palette.background.default,
    },
    inline: {
        display: "inline",
    },
    error:{
        color: '#f85032',
        fontSize: '12.8px'
    }
}));


const Eligibility = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [allergies, setAllergies]= useState([])
    useEffect(() => {
        PrepSideEffect();
      }, []);
        //Get list of PrepSideEffect
        const PrepSideEffect =()=>{
        axios
            .get(`${baseUrl}application-codesets/v2/PREP_SIDE_EFFECTS`,
                { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then((response) => {
                //console.log(response.data);
                setAllergies(response.data);
            })
            .catch((error) => {
            //console.log(error);
            });
        
        }
    useEffect(() => { 
        if(props.observation.data && props.observation.data.medicalHistory){
            setobjValues(props.observation.data.medicalHistory)           
        }
    }, [props.observation.data]);
    const [visit, setVisit] = useState({visitDate:""})
    const [objValues, setobjValues] = useState({Nausea:"", 
                                                Nausea_fever:"",
                                                as_never_receive_arvs:"",
                                                chronic:"",
                                                chronic_duration:"",
                                                cough:"",
                                                cough_duration:"",
                                                drug_allergies:"",
                                                duration_of_care_from:"",
                                                early_arv_but_not_transfer_in:"",
                                                fever:"",
                                                fever_duration:"",
                                                genital:"",
                                                genital_duration :"",
                                                genital_score:"",
                                                genital_score_duration:"",
                                                headache:"",
                                                headache_duration:"",
                                                hospitalization:"",
                                                itching:"",
                                                itching_duration:"",
                                                name_of_the_facility:"",
                                                new_visual:"",
                                                new_visual_duration:"",
                                                night_duration:"",
                                                numbness:"",
                                                numbness_duration:"",
                                                pain:"",
                                                pain_duration:"",
                                                past_medical_history:"",
                                                previous_arv_exposure:"",
                                                rash:"",
                                                rash_duration:"",
                                                recent:"",
                                                recent_duration:"",
                                                relevant_family_history:"",
                                                screen_for_tb:"",
                                                shortness_of_breath:"",
                                                shortness_of_breath_duration:"",
                                                duration_of_care_to:"",
                                                disclosureNoOne:"",  
                                                familyMember:"", 
                                                friend:"", 
                                                spouse:"", 
                                                spiritualLeader:"", 
                                                disclosureOthers:"", 
                                                HivStatusCanBeDiscussed:"",
                                                CurrentMedicationNone :"",
                                                currentART :"",
                                                currentCTX:"", 
                                                currentAntiTbDdrugs :"",
                                                currentOthers:"",
                                                childMotherAlive:"", 
                                                motherName:"", 
                                                motherAddress:"", 
                                                childFatherAlive:"", 
                                                immunisationComplete:"",
                                                fatherName:"", 
                                                fatherAddress:"", 
                                                parentChildMarriageStatus:"",  
                                                howManySibiling:"", 
                                                immunisationComplete:"",
                                                modeOfInfantFeeding:""
                                                });
    let temp = { ...errors }
    const [hideOtherPatientDisclosure, setHideOtherPatientDisclosure]=useState(false)
    const [hideOtherCurrentMedication, setHideOtherCurrentMedication]=useState(false)
    //Handle CheckBox 
    const handleMedicalHistory =e =>{
        setErrors({...errors, [e.target.name]: ""}) 
        if(e.target.name==='disclosureNoOne'){
            if(e.target.checked){
            setHideOtherPatientDisclosure(true)
                }else{
                    setHideOtherPatientDisclosure(false)
                }
        }
        if(e.target.name==='CurrentMedicationNone'){
            if(e.target.checked){
                setHideOtherCurrentMedication(true)

                }else{
                    setHideOtherCurrentMedication(false)
                }
        }        
        setobjValues({...objValues, [e.target.name]: e.target.value})
    }
    const handleInputChangeobjValues = e => { 
        setErrors({...errors, [e.target.name]: ""})           
        setVisit ({...visit,  [e.target.name]: e.target.value});
    }
    const handleItemClick =(page, completedMenu)=>{
        props.handleItemClick(page)
        if(props.completed.includes(completedMenu)) {

        }else{
            props.setCompleted([...props.completed, completedMenu])
        }
    } 
    //Validations of the forms
  const validate = () => {        
    temp.screen_for_tb = objValues.screen_for_tb ? "" : "This field is required"
    temp.past_medical_history = objValues.past_medical_history ? "" : "This field is required"
    temp.relevant_family_history = objValues.relevant_family_history ? "" : "This field is required"
    temp.drug_allergies = objValues.drug_allergies ? "" : "This field is required"
    temp.visitDate = visit.visitDate ? "" : "This field is required"

    setErrors({
        ...temp
    })
    return Object.values(temp).every(x => x == "")
  } 
     /**** Submit Button Processing  */
     const handleSubmit = (e) => { 
        e.preventDefault(); 
        if(validate()){
            props.observation.dateOfObservation= visit.visitDate 
            props.observation.data.medicalHistory=objValues   
            //toast.success("Medical history save successful");
            handleItemClick('past-arv', 'medical-history' ) 
        }else{
            toast.error("All fields are required");
        }                 
    }


    return (
        <>  
        
            <Card className={classes.root}>
                <CardBody>   
                <h2 style={{color:'#000'}}>Eligibility Assessment</h2>
                <br/>
                    <form >
     
                    <div className="row">
                    <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                            <Label >Visit Date *</Label>
                            <InputGroup> 
                                <Input 
                                    type="date"
                                    min={props.patientObj && props.patientObj.enrollment ? props.patientObj.enrollment.dateOfRegistration :""}
                                    max= {moment(new Date()).format("YYYY-MM-DD") }
                                    name="visitDate"
                                    id="visitDate"
                                    value={props.observation.dateOfObservation !=="" && props.observation.dateOfObservation!==null ? props.observation.dateOfObservation : visit.visitDate}
                                    onChange={handleInputChangeobjValues} 
                                />
                            </InputGroup>                                        
                            </FormGroup>
                            {errors.visitDate !=="" ? (
                                <span className={classes.error}>{errors.visitDate}</span>
                            ) : "" }
                    </div>
                    <div className="form-group mb-3 col-md-8"></div>   
                    </div>

                    <div className="row">
                    {/* Past medical history */}
                    <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Past Medical History *</Label>
                            <InputGroup> 
                                <Input 
                                    type="textarea"
                                    name="past_medical_history"
                                    id="past_medical_history"
                                    onChange={handleMedicalHistory} 
                                    value={objValues.past_medical_history}   
                                />
                                
                            </InputGroup>
                            </FormGroup>
                            {errors.past_medical_history !=="" ? (
                                <span className={classes.error}>{errors.past_medical_history}</span>
                            ) : "" }
                    </div>
                    {/* end of Past medical history  */}
                    {/* Past Family medical history */}
                    <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Relevant Family History *</Label>
                            <InputGroup> 
                                <Input 
                                    type="textarea"
                                    name="relevant_family_history"
                                    id="relevant_family_history"
                                    onChange={handleMedicalHistory}
                                    value={objValues.relevant_family_history}    
                                />
                                
                            </InputGroup>
                            </FormGroup>
                            {errors.relevant_family_history !=="" ? (
                                <span className={classes.error}>{errors.relevant_family_history}</span>
                            ) : "" }
                    </div>
                    {/* end of FamilyPast medical history  */}
                    {/* hospitalization */}
                    <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Hospitalization</Label>
                            <InputGroup> 
                                <Input 
                                    type="textarea"
                                    name="hospitalization"
                                    id="hospitalization"
                                    onChange={handleMedicalHistory} 
                                    value={objValues.hospitalization}   
                                />

                            </InputGroup>
                        
                            </FormGroup>
                    </div>
                    {/* end of hosiptalization */}
                    {/* Drug Allergies */}
                    <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Drug Allergies *</Label>
                            
                            <Input
                                type="select"
                                name="drug_allergies"
                                id="drug_allergies"
                                value={objValues.drug_allergies}
                                onChange={handleMedicalHistory}
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                required
                                >
                                <option value=""> Select</option>
                                    {allergies.map((value) => (
                                        <option key={value.id} value={value.display}>
                                            {value.display}
                                        </option>
                                    ))}
                            </Input>    
                            </FormGroup>
                            {errors.drug_allergies !=="" ? (
                                <span className={classes.error}>{errors.drug_allergies}</span>
                            ) : "" }
                    </div>
                    </div>
                    {/* end of Drug Allergies  */}
                    <div className="row">
                    {(props.patientObj.sex==='Female' || props.patientObj.sex==='FEMALE' || props.patientObj.sex==='female') && (<>
                    {props.patientAge>14 && (
                        <div className="form-group mb-3 col-md-6">
                                <FormGroup>
                                <Label >Currently Pregnant</Label>
                                <InputGroup> 
                                    <Input 
                                        type="select"
                                        name="current_pregnant"
                                        id="current_pregnant"
                                        onChange={handleMedicalHistory} 
                                        value={objValues.current_pregnant} 
                                    >
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                    <option value="Uncertain">Uncertain</option>
                                    </Input>

                                </InputGroup>
                            
                                </FormGroup>
                        </div>
                        )}
                        {objValues.current_pregnant==='Yes' && (<>
                        <div className="form-group mb-3 col-md-6">
                                <FormGroup>
                                <Label >Last menstrual period</Label>
                                <InputGroup> 
                                    <Input 
                                        type="date"
                                        name="last_menstrual_period"
                                        id="last_menstrual_period"
                                        onChange={handleMedicalHistory}
                                        value={objValues.last_menstrual_period}   
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
                                        name="gestational_age"
                                        id="gestational_age"
                                        onChange={handleMedicalHistory} 
                                        value={objValues.gestational_age}  
                                    />

                                </InputGroup>
                            
                                </FormGroup>
                        </div>
                        </>
                        )}
                        {objValues.current_pregnant!=='Yes' && objValues.current_pregnant!=='' && (
                        <div className="form-group mb-3 col-md-6">
                                <FormGroup>
                                <Label >Current BreastFeeding</Label>
                                <InputGroup> 
                                    <Input 
                                        type="select"
                                        name="current_breastfeeding"
                                        id="current_breastfeeding"
                                        onChange={handleMedicalHistory} 
                                        value={objValues.current_breastfeeding}  
                                    >
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                    <option value="Uncertain">Uncertain</option>
                                    </Input>

                                </InputGroup>
                            
                                </FormGroup>
                        </div>
                        )}
                    </>)}
                    </div>
                    <div className="row">
                     <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Previous ARV exposure</Label>
                            <InputGroup> 
                                <Input 
                                    type="select"
                                    name="previous_arv_exposure"
                                    id="previous_arv_exposure"
                                    onChange={handleMedicalHistory} 
                                    value={objValues.previous_arv_exposure}  
                                >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                                <option value="Uncertain">Uncertain</option>
                                </Input>

                            </InputGroup>
                        
                            </FormGroup>
                     </div>
                     <div className="form-group mb-3 col-md-6"></div>
                     </div>
                     <div className="row">
                     <div className="form-group mb-3 col-md-6">
                                    
                        <div className="form-check custom-checkbox ml-1 ">
                        
                            <input
                            type="checkbox"
                            className="form-check-input"                            
                            name="early_arv_but_not_transfer_in"
                            id="early_arv_but_not_transfer_in"
                            onChange={handleMedicalHistory} 
                            value={objValues.early_arv_but_not_transfer_in}  
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Early ARV but not transfer in
                        </label>
                        </div>
                    </div>
                    {props.patientObj.sex==='Female' && (
                    <div className="form-group mb-3 col-md-4">
                                    
                        <div className="form-check custom-checkbox ml-1 ">
                        
                            <input
                            type="checkbox"
                            className="form-check-input"                            
                            name="pmtct_only"
                            id="pmtct_only"
                            onChange={handleMedicalHistory} 
                            value={objValues.pmtct_only} 
                            />
                           <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            PMTCT only
                        </label> 
                        </div>
                    </div>
                    )}
                     <div className="row">
                    <div className="form-group mb-3 col-md-4">
                                    
                        <div className="form-check custom-checkbox ml-1 ">
                       
                            <input
                            type="checkbox"
                            className="form-check-input"                            
                            name="as_never_receive_arvs"
                            id="as_never_receive_arvs"
                            onChange={handleMedicalHistory} 
                            value={objValues.as_never_receive_arvs} 
                            />
                             <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Has never received ARVs
                            </label>
                        </div>
                    </div>
                    </div>
                    {objValues.previous_arv_exposure==='Yes' &&  objValues.previous_arv_exposure!=='' && (
                    <>
                         <div className="row">
                        <div className="form-group mb-3 col-md-4">
                                <FormGroup>
                                <Label >Name of the Facility</Label>
                                <InputGroup> 
                                    <Input 
                                        type="text"
                                        name="name_of_the_facility"
                                        id="name_of_the_facility"
                                        onChange={handleMedicalHistory} 
                                        value={objValues.name_of_the_facility}
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
                                        name="duration_of_care_from"
                                        id="duration_of_care_from"
                                        onChange={handleMedicalHistory} 
                                        value={objValues.duration_of_care_from}
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
                                        name="duration_of_care_to"
                                        id="duration_of_care_to"
                                        onChange={handleMedicalHistory}
                                        value={objValues.duration_of_care_to} 
                                    />

                                </InputGroup>
                            
                                </FormGroup>
                        </div>
                        </div>
                    </>
                    )}
                    </div>
                    
                    <br/>
                    <Button content='Next' type="submit" icon='right arrow' labelPosition='right' style={{backgroundColor:"#014d88", color:'#fff'}} onClick={handleSubmit}/>
                    </form>
                    
                </CardBody>
            </Card> 
                                     
        </>
    );
};

export default Eligibility