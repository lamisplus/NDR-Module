
import React, { useEffect, useState} from "react";
import axios from "axios";
import {FormGroup, Label , CardBody, Spinner,Input,Form, InputGroup,
    InputGroupText,

} from "reactstrap";
import * as moment from 'moment';
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
import {token, url as baseUrl } from "../../../../api";
import 'react-phone-input-2/lib/style.css'
import 'semantic-ui-css/semantic.min.css';
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Button} from 'semantic-ui-react'
import {  Modal } from "react-bootstrap";


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


const BasicInfo = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [planArt, setPlanArt] = useState({previousArvExposure:""});
    const [enroll, setEnrollIn] = useState({previousArvExposure:""});
    let temp = { ...errors }   
    const handlePlanArt =e =>{
        setPlanArt({...planArt, [e.target.name]: e.target.value})
        
    }
    const handleEnroll =e =>{
        setEnrollIn({...enroll, [e.target.name]: e.target.value})
        
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
        props.observation.data.plan = planArt
        props.observation.data.enroll=enroll  
        toast.success("Record save successful");
        handleItemClick('regimen', 'plan' )                  
    }
        
return (
        <>  
        
            <Card >
                <CardBody>   
                <h2 style={{color:'#000'}}>Enroll In & Plan</h2>
                <br/>
                    <form >
                    {/* Medical History form inputs */}
                    <div className="row">
                    <h3>Enroll in</h3>
                    <div className="form-group mb-3 col-md-5">                                    
                            <Input 
                                type="select"
                                name="enrollIn"
                                id="enrollIn"
                                onChange={handleEnroll}  
                            >
                            <option value="">Select</option>
                            <option value="General medical follow-up">General medical follow-up</option>
                            <option value="ARV therapy">ARV therapy</option>
                            <option value="AHD management">AHD management</option>
                            <option value="Pending lab results">Pending lab results</option>
                            </Input>
                    </div>
                    <div className="form-group mb-3 col-md-7">  </div>
                    <hr/>
                    <h3>Plan for Antiretroviral Therapy (ART)</h3>
                    <div className="form-group mb-3 col-md-6">                                    
                        <FormGroup>
                            <Label>Ongoing Monitoring </Label>
                            <Input 
                                    type="select"
                                    name="previousArvExposure"
                                    id="previousArvExposure"
                                    onChange={handlePlanArt}  
                                >
                                <option value="">Select</option>
                                <option value="Restart treatment">Restart treatment</option>
                                <option value="Start new treatment">Start new treatment</option>
                                <option value="Stop treatment">Stop treatment </option>
                                <option value="Change treatment">Change treatment </option>
                                <option value="ARV TX postponed for clinical reason">ARV TX postponed for clinical reason</option>
                                </Input>
                        </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-6"> </div>
                    
                    </div>
                    <br/>
                    <Button content='Next' type="submit" icon='right arrow' labelPosition='right' style={{backgroundColor:"#014d88", color:'#fff'}} onClick={handleSubmit}/>
                    
                    </form>
                    
                </CardBody>
            </Card> 
                                     
        </>
    );
};

export default BasicInfo