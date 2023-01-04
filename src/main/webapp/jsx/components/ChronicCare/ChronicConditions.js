
import React, { useEffect, useState} from "react";
import axios from "axios";
import {FormGroup, Label , CardBody, Spinner,Input,Form, InputGroup,
    InputGroupText,

} from "reactstrap";
import {makeStyles} from "@material-ui/core/styles";
import {Card, CardContent} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
// import AddIcon from "@material-ui/icons/Add";
// import CancelIcon from "@material-ui/icons/Cancel";
import {ToastContainer, toast} from "react-toastify";
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
        maxWidth: 752,
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


const ChronicConditions = (props) => {
    const classes = useStyles();
    //const history = useHistory();
    const [errors, setErrors] = useState({});
    let temp = { ...errors }   
    useEffect(() => { 
        if(props.observation.data ){
            setVitalSignDto(props.observation.data.physicalExamination)           
        }
    }, [props.observation.data]); 
    const [vital, setVitalSignDto]= useState({
        bodyWeight: "",
        diastolic:"",
        encounterDate: "",
        facilityId: 1,
        height: "",
        personId: props.patientObj.id,
        serviceTypeId: 1,
        systolic:"",
        pulse:"",
        temperature:"",
        respiratoryRate:"" 
    })
    //Vital signs clinical decision support 
    const [vitalClinicalSupport, setVitalClinicalSupport] = useState({
                                bodyWeight: "",
                                diastolic: "",
                                height: "",
                                systolic: "",
                                pulse:"",
                                temperature:"",
                                respiratoryRate:""
                            })
    const handleInputChangeVitalSignDto = e => {
        setVitalSignDto({ ...vital, [e.target.name]: e.target.value });
    }

    const handleInputValueCheckSystolic =(e)=>{
        if(e.target.name==="systolic" && (e.target.value < 90 || e.target.value>240)){      
        const message ="Blood Pressure systolic must not be greater than 240 and less than 90"
        setVitalClinicalSupport({...vitalClinicalSupport, systolic:message})
        }else{
        setVitalClinicalSupport({...vitalClinicalSupport, systolic:""})
        }
    }
    const handleInputValueCheckDiastolic =(e)=>{
        if(e.target.name==="diastolic" && (e.target.value < 60 || e.target.value>140)){      
        const message ="Blood Pressure diastolic must not be greater than 140 and less than 60"
        setVitalClinicalSupport({...vitalClinicalSupport, diastolic:message})
        }else{
        setVitalClinicalSupport({...vitalClinicalSupport, diastolic:""})
        }
    }

    const handleItemClick =(page, completedMenu)=>{
        props.handleItemClick(page)
        if(props.completed.includes(completedMenu)) {

        }else{
            props.setCompleted([...props.completed, completedMenu])
        }
    }  
    /**** Submit Button Processing  */
    const handleSubmit = (e) => { 
        e.preventDefault();  
        props.observation.data.physicalExamination=vital   
        toast.success("Medical history save successful");
        handleItemClick('appearance', 'physical-examination' )                  
    }
    
return (
        <>  
        
            <Card >
                <CardBody>   
                <h2 style={{color:'#000'}}>Screening for Chronic Conditions(Hypertension & Diabetics)</h2>
                <br/>
                    <form >
                    {/* Medical History form inputs */}
                    <div className="row">
                    <div className="form-group mb-3 col-md-6">                                    
                            <FormGroup>
                            <Label>Known Hypertensive ?</Label>
                                    <Input 
                                        type="select"
                                        name="assessment"
                                        id="assessment"
                                        
                                    >
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                    </Input>

                            </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-6">                                    
                            <FormGroup>
                            <Label>First time identified within the programme?</Label>
                                    <Input 
                                        type="select"
                                        name="assessment"
                                        id="assessment"
                                        
                                    >
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                    </Input>

                            </FormGroup>
                    </div>
                    <div className="row">
                    <div className="form-group mb-3 col-md-12">
                        <FormGroup>
                        <Label >Blood Pressure</Label>
                        <InputGroup>
                        <InputGroupText addonType="append" style={{ backgroundColor:"#014D88", color:"#fff", border: "1px solid #014D88", borderRadius:"0rem"}}>
                                systolic(mmHg)
                        </InputGroupText> 
                            <Input 
                                type="number"
                                name="systolic"
                                id="systolic"
                                min="90"
                                max="2240"
                                onChange={handleInputChangeVitalSignDto}
                                value={vital.systolic}
                                onKeyUp={handleInputValueCheckSystolic}
                                style={{border: "1px solid #014D88", borderRadius:"0rem"}} 
                            />
                            <InputGroupText addonType="append" style={{ backgroundColor:"#014D88", color:"#fff", border: "1px solid #014D88", borderRadius:"0rem"}}>
                            diastolic(mmHg)
                            </InputGroupText>
                                <Input 
                                type="number"
                                name="diastolic"
                                id="diastolic"
                                min={0}
                                max={140}
                                onChange={handleInputChangeVitalSignDto}
                                value={vital.diastolic}
                                onKeyUp={handleInputValueCheckDiastolic} 
                                style={{border: "1px solid #014D88", borderRadius:"0rem"}}
                                />
                            
                            
                        </InputGroup>
                        {vitalClinicalSupport.systolic !=="" ? (
                        <span className={classes.error}>{vitalClinicalSupport.systolic}</span>
                        ) : ""}
                        {errors.systolic !=="" ? (
                            <span className={classes.error}>{errors.systolic}</span>
                        ) : "" }  
                        {vitalClinicalSupport.diastolic !=="" ? (
                        <span className={classes.error}>{vitalClinicalSupport.diastolic}</span>
                        ) : ""}
                        {errors.diastolic !=="" ? (
                            <span className={classes.error}>{errors.diastolic}</span>
                        ) : "" }          
                        </FormGroup>
                    </div>
                    </div>
                    <div className="form-group mb-3 col-md-6">                                    
                            <FormGroup>
                            <Label>BP above 14080mmHg?</Label>
                                    <Input 
                                        type="select"
                                        name="assessment"
                                        id="assessment"
                                        
                                    >
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                    </Input>

                            </FormGroup>
                    </div>

                    <div className="row">
                        <div className="form-group mb-3 col-md-6">                                    
                                <FormGroup>
                                <Label>Know diabetic?</Label>
                                        <Input 
                                            type="select"
                                            name="assessment"
                                            id="assessment"
                                            
                                        >
                                        <option value="">Select</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                        </Input>

                                </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-6">                                    
                                <FormGroup>
                                <Label>First time identified within the programme?</Label>
                                        <Input 
                                            type="select"
                                            name="assessment"
                                            id="assessment"
                                            
                                        >
                                        <option value="">Select</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                        </Input>

                                </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-6">                                    
                                <FormGroup>
                                <Label>Increased frequency of urination</Label>
                                        <Input 
                                            type="select"
                                            name="assessment"
                                            id="assessment"
                                            
                                        >
                                        <option value="">Select</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                        </Input>

                                </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-6">                                    
                                <FormGroup>
                                <Label>Increased water(fluid) intake?</Label>
                                        <Input 
                                            type="select"
                                            name="assessment"
                                            id="assessment"
                                            
                                        >
                                        <option value="">Select</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                        </Input>

                                </FormGroup>
                        </div>
                    </div>
                    </div>
                    <br/>
                    <Button content='Back' icon='left arrow' labelPosition='left' style={{backgroundColor:"#992E62", color:'#fff'}} onClick={()=>handleItemClick('past-arv', 'past-arv')}/>
                    <Button content='Next' type="submit" icon='right arrow' labelPosition='right' style={{backgroundColor:"#014d88", color:'#fff'}} onClick={handleSubmit}/>
                    
                    </form>
                    
                </CardBody>
            </Card> 
                                     
        </>
    );
};

export default ChronicConditions