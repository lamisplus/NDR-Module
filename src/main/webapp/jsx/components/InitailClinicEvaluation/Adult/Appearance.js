
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
import 'react-phone-input-2/lib/style.css'
import {  Modal } from "react-bootstrap";
import {Label as LabelRibbon, Button} from 'semantic-ui-react'

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
    const [saving, setSaving] = useState(false);
    let temp = { ...errors }   
    const [hideGeneralApperance, setHideGeneralApperance]=useState(false)
    const [hideSkin, setHideSkin] = useState(false)
    const [hideEye, setHideEye] = useState(false)
    const [hideBreast, setHideBreast] = useState(false)
    const [hideCardiovascular, setHideCardiovascular] = useState(false)
    const [hideGenitalia, setHideGenitalia] = useState(false);
    const [hideRespiratory, setHideRespiratory] = useState(false);
    const [hideGastrointestinal, setHideGastrointestinal] = useState(false);
    const [hideNeurological, setHideNeurological] = useState(false);
    const [handlementalstatus, setHideMentalStatus] = useState(false);
    const [generalApperance, setGeneralApperance] = useState({
        nsf: "",
        pallor: "",
        febrile: "",
        dehydrated: "",
        peripheral: "",
        other: ""
});
    const [skin, setSkin] = useState({
        nsf: "",
        pruritic: "",
        abscesses: "",
        herpes: "",
        kaposi: "",
        suborrheic: "",
        fungal: "",
        other: ""
    });
    const [eye, setEye] = useState({
        nsf: "",
        icterus: "",
        thrush: "",
        oral: "",
        abnormal: "",
        other: ""
    });
    const [breast, setBreast] = useState({
        nsf: "",
        lumps: "",
        discharge: "",
        other: ""
    });
    const [cardiovascular, setCardiovascular] = useState({});
    const [genitalia, setGenitalia] = useState({});
    const [respiratory, setRespiratory] = useState({});
    const [gastrointestinal, setGastrointestinal] = useState({});
    const [neurological, setNeurological] = useState({});
    const [mentalStatus, setMentalStatus] = useState({});
    const handleGeneralApperance =e =>{
        if(e.target.name==='nsf'){
            if(e.target.checked){
                setHideGeneralApperance(true)
                }else{
                    setHideGeneralApperance(false)
                }
        }
        setGeneralApperance({...generalApperance, [e.target.name]: e.target.value})
    }
    const handleSkin =e =>{
        if(e.target.name==='nsf'){
            if(e.target.checked){
                    setHideSkin(true)
            }else{
                setHideSkin(false)
            }
        }
        setSkin({...skin, [e.target.name]: e.target.value})
    }
    const handleEye =e =>{
        if(e.target.name==='nsf'){
            if(e.target.checked){
                setHideEye(true)
            }else{
                setHideEye(false)
            }
        }
        setEye({...eye, [e.target.name]: e.target.value})
    }
    const handleBreast =e =>{
        if(e.target.name==='nsf'){
            if(e.target.checked){
                setHideBreast(true)
            }else{
                setHideBreast(false)
            }
        }
        setBreast({...breast, [e.target.name]: e.target.value})
        console.log(breast)
    }
    const handleCardiovascular =e =>{
        if(e.target.name==='nsf'){
            if(e.target.checked){
                setHideCardiovascular(true)
            }else{
                setHideCardiovascular(false)
            }
        }
        setCardiovascular({...cardiovascular, [e.target.name]: e.target.value})
    }
    const handleGenitalia =e =>{
        if(e.target.name==='nsf'){
            if(e.target.checked){
                setHideGenitalia(true)
            }else{
                setHideGenitalia(false)
            }
        }
        setGenitalia({...genitalia, [e.target.name]: e.target.value})
        console.log(genitalia)
    }
    const handleRespiratory =e =>{
        if(e.target.name==='nsf'){
            if(e.target.checked){
                setHideRespiratory(true)
            }else{
                setHideRespiratory(false)
            }
        }
        setRespiratory({...respiratory, [e.target.name]: e.target.value})
        
    }
    const handleGastrointestinal =e =>{
        if(e.target.name==='nsf'){
            if(e.target.checked){
                setHideGastrointestinal(true)
            }else{
                setHideGastrointestinal(false)
            }
        }
        setGastrointestinal({...gastrointestinal, [e.target.name]: e.target.value})
       
    }
    const handleNeurological =e =>{
        if(e.target.name==='nsf'){
            if(e.target.checked){
                setHideNeurological(true)
            }else{
                setHideNeurological(false)
            }
        }
        setNeurological({...neurological, [e.target.name]: e.target.value})
       
    }
    const handleMentalStatus =e =>{
        if(e.target.name==='nsf'){
            if(e.target.checked){
                setHideMentalStatus(true)
            }else{
                setHideMentalStatus(false)
            }
        }
        setMentalStatus({...mentalStatus, [e.target.name]: e.target.value})
       
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
    props.observation.data.generalApperance=generalApperance
    props.observation.data.skin=skin
    props.observation.data.eye=eye
    props.observation.data.breast=breast
    props.observation.data.cardiovascular= cardiovascular
    props.observation.data.genitalia=genitalia
    props.observation.data.neurological=neurological
    props.observation.data.mentalstatus=mentalStatus
    props.observation.data.respiratory=respiratory
    props.observation.data.gastrointestinal = gastrointestinal   
    toast.success("Medical history save successful");
    handleItemClick('who', 'appearance' )                  
}
        
return (
        <>  
        
            <Card >
                <CardBody>   
                <h2 style={{color:'#000'}}>Appearance</h2>
                <br/>
                    <form >
                    {/* Medical History form inputs */}
                    <div className="row">
                    <div className="row"> 
                    <LabelRibbon as='a' color='blue' style={{width:'106%', height:'35px'}} ribbon>
                        <h3 style={{color:'#fff'}} >General Appearance</h3>
                    </LabelRibbon>
                            <div className="form-group mb-3 col-md-3">                                    
                                <div className="form-check custom-checkbox ml-1 ">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"                           
                                    name="nsf"
                                    id="nsf"
                                    onChange={handleGeneralApperance}
                                    />
                                    <label
                                    className="form-check-label"
                                    htmlFor="basic_checkbox_1"
                                    >
                                    NSF
                                    </label>
                                </div>
                            </div>
                            {!hideGeneralApperance && (
                                <>
                            <div className="form-group mb-3 col-md-3">                                    
                                <div className="form-check custom-checkbox ml-1 ">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"                           
                                    name="pallor"
                                    id="pallor"
                                    onChange={handleGeneralApperance}
                                    />
                                    <label
                                    className="form-check-label"
                                    htmlFor="basic_checkbox_1"
                                    >
                                    Pallor
                                    </label>
                                </div>
                            </div>
                            <div className="form-group mb-3 col-md-3">                                    
                                <div className="form-check custom-checkbox ml-1 ">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"                           
                                    name="febrile"
                                    id="febrile"
                                    onChange={handleGeneralApperance}
                                    />
                                    <label
                                    className="form-check-label"
                                    htmlFor="basic_checkbox_1"
                                    >
                                    Febrile
                                    </label>
                                </div>
                            </div>
                            <div className="form-group mb-3 col-md-3">                                    
                                <div className="form-check custom-checkbox ml-1 ">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"                           
                                    name="dehydrated"
                                    id="dehydrated"
                                    onChange={handleGeneralApperance}
                                    />
                                    <label
                                    className="form-check-label"
                                    htmlFor="basic_checkbox_1"
                                    >
                                    Dehydrated
                                    </label>
                                </div>
                            </div>
                            <div className="form-group mb-3 col-md-3">                                    
                                <div className="form-check custom-checkbox ml-1 ">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"                           
                                    name="peripheral"
                                    id="peripheral"
                                    onChange={handleGeneralApperance}
                                    />
                                    <label
                                    className="form-check-label"
                                    htmlFor="basic_checkbox_1"
                                    >
                                    Peripheral edema
                                    </label>
                                </div>
                            </div>

                            <div className="form-group mb-3 col-md-3">
                                    <FormGroup>
                                    <Label >Other (specify)</Label>
                                    <InputGroup> 
                                        <Input 
                                            type="text"
                                            name="other"
                                            id="other"
                                            onChange={handleGeneralApperance} 
                                        />
                                    </InputGroup>                                        
                                    </FormGroup>
                            </div>
                            </>
                            )}
                    </div>
                    <div className="row"> 
                        <LabelRibbon as='a' color='purple' style={{width:'106%', height:'35px'}} ribbon>
                            <h3 style={{color:'#fff'}} >Skin</h3>
                        </LabelRibbon>
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="nsf"
                                id="nsf"
                                onChange={handleSkin}
                                />
                                <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                NSF
                                </label>
                            </div>
                        </div>
                        {!hideSkin && (
                        <>
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="pruritic"
                                id="pruritic"
                                onChange={handleSkin}
                                />
                                <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Pruritic paplar dermatitis
                                </label>
                            </div>
                        </div>
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="abscesses"
                                id="abscesses"
                                onChange={handleSkin}
                                />
                                <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Abscesses
                                </label>
                            </div>
                        </div>
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="herpes"
                                id="herpes"
                                onChange={handleSkin}
                                />
                                <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Herpes zoster
                                </label>
                            </div>
                        </div>
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="kaposi"
                                id="kaposi"
                                onChange={handleSkin}
                                />
                                <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Kaposi's lesions
                                </label>
                            </div>
                        </div>
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="suborrheic"
                                id="suborrheic"
                                onChange={handleSkin}
                                />
                                <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Suborrheic dermatitis
                                </label>
                            </div>
                        </div>
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="fungal"
                                id="fungal"
                                onChange={handleSkin}
                                />
                                <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Fungal infections
                                </label>
                            </div>
                        </div>

                        <div className="form-group mb-3 col-md-3">
                                <FormGroup>
                                <Label >Other (specify)</Label>
                                <InputGroup> 
                                    <Input 
                                        type="text"
                                        name="other"
                                        id="other"
                                        onChange={handleSkin}
                                    />
                                </InputGroup>                                        
                                </FormGroup>
                        </div>
                        
                        </>
                        )}
                       
                    </div>
                    <div className="row">
                        <LabelRibbon as='a' color='black' style={{width:'106%', height:'35px'}} ribbon>
                            <h3 style={{color:'#fff'}} >Head/Eye/ENT</h3>
                        </LabelRibbon>
                            <div className="form-group mb-3 col-md-3">                                    
                                <div className="form-check custom-checkbox ml-1 ">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"                           
                                    name="nsf"
                                    id="nsf"
                                    onChange={handleEye}
                                    />
                                    <label
                                    className="form-check-label"
                                    htmlFor="basic_checkbox_1"
                                    >
                                    NSF
                                    </label>
                                </div>
                            </div>
                            {!hideEye && (
                                <>
                            <div className="form-group mb-3 col-md-3">                                    
                                <div className="form-check custom-checkbox ml-1 ">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"                           
                                    name="icterus"
                                    id="icterus"
                                    onChange={handleEye}
                                    />
                                    <label
                                    className="form-check-label"
                                    htmlFor="basic_checkbox_1"
                                    >
                                    Icterus
                                    </label>
                                </div>
                            </div>
                            <div className="form-group mb-3 col-md-3">                                    
                                <div className="form-check custom-checkbox ml-1 ">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"                           
                                    name="thrush"
                                    id="thrush"
                                    onChange={handleEye}
                                    />
                                    <label
                                    className="form-check-label"
                                    htmlFor="basic_checkbox_1"
                                    >
                                    Thrush
                                    </label>
                                </div>
                            </div>
                            <div className="form-group mb-3 col-md-3">                                    
                                <div className="form-check custom-checkbox ml-1 ">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"                           
                                    name="oral"
                                    id="oral"
                                    onChange={handleEye}
                                    />
                                    <label
                                    className="form-check-label"
                                    htmlFor="basic_checkbox_1"
                                    >
                                    Oral KS
                                    </label>
                                </div>
                            </div>
                            <div className="form-group mb-3 col-md-3">                                    
                                <div className="form-check custom-checkbox ml-1 ">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"                           
                                    name="abnormal"
                                    id="abnormal"
                                    onChange={handleEye}
                                    />
                                    <label
                                    className="form-check-label"
                                    htmlFor="basic_checkbox_1"
                                    >
                                    Abnormal fundoscopy
                                    </label>
                                </div>
                            </div>

                            <div className="form-group mb-3 col-md-3">
                                    <FormGroup>
                                    <Label >Other (specify)</Label>
                                    <InputGroup> 
                                        <Input 
                                            type="text"
                                            name="other"
                                            id="other"
                                            onChange={handleEye}
                                            
                                        />
                                    </InputGroup>                                        
                                    </FormGroup>
                            </div>

                            </>
                            )}
                     
                    </div>
                    <div className="row">
                        <LabelRibbon as='a' color='orange' style={{width:'106%', height:'35px'}} ribbon>
                            <h3 style={{color:'#fff'}} >Breasts</h3>
                        </LabelRibbon>
                            <div className="form-group mb-3 col-md-3">                                    
                                <div className="form-check custom-checkbox ml-1 ">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"                           
                                    name="nsf"
                                    id="nsf"
                                    onChange={handleBreast}
                                    />
                                    <label
                                    className="form-check-label"
                                    htmlFor="basic_checkbox_1"
                                    >
                                    NSF
                                    </label>
                                </div>
                            </div>
                            {!hideBreast && (
                                <>
                            <div className="form-group mb-3 col-md-3">                                    
                                <div className="form-check custom-checkbox ml-1 ">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"                           
                                    name="lumps"
                                    id="lumps"
                                    onChange={handleBreast}
                                    />
                                    <label
                                    className="form-check-label"
                                    htmlFor="basic_checkbox_1"
                                    >
                                    Lumps, masses
                                    </label>
                                </div>
                            </div>
                            <div className="form-group mb-3 col-md-3">                                    
                                <div className="form-check custom-checkbox ml-1 ">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"                           
                                    name="discharge"
                                    id="discharge"
                                    onChange={handleBreast}
                                    />
                                    <label
                                    className="form-check-label"
                                    htmlFor="basic_checkbox_1"
                                    >
                                    Discharge
                                    </label>
                                </div>
                            </div>
                            <div className="form-group mb-3 col-md-3">
                                    <FormGroup>
                                    <Label >Other (specify)</Label>
                                    <InputGroup> 
                                        <Input 
                                            type="text"
                                            name="other"
                                            id="other"
                                            onChange={handleBreast} 
                                        />
                                    </InputGroup>                                        
                                    </FormGroup>
                            </div>
                            </>
                            )}
                    </div>
                    <div className="row">   
                        <LabelRibbon as='a' color='green' style={{width:'106%', height:'35px'}} ribbon>
                            <h3 style={{color:'#fff'}} >Cardiovascular</h3>
                        </LabelRibbon>
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="nsf"
                                id="nsf"
                                onChange={handleCardiovascular}
                                />
                                <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                NSF
                                </label>
                            </div>
                        </div>
                        {!hideCardiovascular && (
                        <>
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="abnormal_heart_rate"
                                id="abnormal_heart_rate"
                                onChange={handleCardiovascular}
                                />
                                <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Abnormal heart rate
                                </label>
                            </div>
                        </div>
                        <div className="form-group mb-3 col-md-3">
                                <FormGroup>
                                <Label >Other (specify)</Label>
                                <InputGroup> 
                                    <Input 
                                        type="text"
                                        name="other"
                                        id="other"
                                        onChange={handleCardiovascular}
                                    />
                                </InputGroup>                                        
                                </FormGroup>
                        </div>
                        </>
                        )}
                        
                    </div>
                    <div className="row">
                        <LabelRibbon as='a' color='teal' style={{width:'106%', height:'35px'}} ribbon>
                            <h3 style={{color:'#fff'}} >Genitalia</h3>
                        </LabelRibbon>
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="nsf"
                                id="nsf"
                                onChange={handleGenitalia}
                                />
                                <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                NSF
                                </label>
                            </div>
                        </div>
                        {!hideGenitalia && (
                        <>
                    
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="genital_discharge"
                                id="genital_discharge"
                                onChange={handleGenitalia}
                                />
                                <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Genital discharge
                                </label>
                            </div>
                        </div>
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="genital_ulcer"
                                id="genital_ulcer"
                                onChange={handleGenitalia}
                                />
                                <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Genital ulcer/other lesion
                                </label>
                            </div>
                        </div>
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="inguinal"
                                id="inguinal"
                                onChange={handleGenitalia}
                                />
                                <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Inguinal node enlargement
                                </label>
                            </div>
                        </div>                 
                        <div className="form-group mb-3 col-md-3">
                                <FormGroup>
                                <Label >Other (specify)</Label>
                                <InputGroup> 
                                    <Input 
                                        type="text"
                                        name="other"
                                        id="other"
                                        onChange={handleGenitalia}
                                    />
                                </InputGroup>                                        
                                </FormGroup>
                        </div>
                        </>
                        )}
                   
                    </div>
                    <div className="row">
                        <LabelRibbon as='a' color='blue' style={{width:'106%', height:'35px'}} ribbon>
                            <h3 style={{color:'#fff'}} >Respiratory</h3>
                        </LabelRibbon>
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="nsf"
                                id="nsf"
                                onChange={handleRespiratory}
                                />
                                <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                NSF
                                </label>
                            </div>
                        </div>
                        {!hideRespiratory && (
                            <>
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Rate (breaths/min)
                                </label>
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="rate"
                                id="rate"
                                onChange={handleRespiratory}
                                placeholder='breaths/min'
                                />
                                
                            </div>
                        </div>
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="labored"
                                id="labored"
                                onChange={handleRespiratory}
                                />
                                <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Labored breathing
                                </label>
                            </div>
                        </div>
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="cyanosis"
                                id="cyanosis"
                                onChange={handleRespiratory}
                                />
                                <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Cyanosis
                                </label>
                            </div>
                        </div>
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="wheezing"
                                id="wheezing"
                                onChange={handleRespiratory}
                                />
                                <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Wheezing
                                </label>
                            </div>
                        </div>
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="intercostal"
                                id="intercostal"
                                onChange={handleRespiratory}
                                />
                                <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Intercostal (sub) recession
                                </label>
                            </div>
                        </div>
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="auscultation_finding"
                                id="auscultation_finding"
                                onChange={handleRespiratory}
                                />
                                <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Auscultation findings
                                </label>
                            </div>
                        </div>
                        <div className="form-group mb-3 col-md-3">
                                <FormGroup>
                                <Label >Other (specify)</Label>
                                <InputGroup> 
                                    <Input 
                                        type="text"
                                        name="other"
                                        id="other"
                                        onChange={handleRespiratory}
                                    />
                                </InputGroup>                                        
                                </FormGroup>
                        </div>
                    
                        </>
                        )}
                   
                    </div>
                    <div className="row">                
                        <LabelRibbon as='a' color='violet' style={{width:'106%', height:'35px'}} ribbon>
                            <h3 style={{color:'#fff'}} >Gastrointestinal</h3>
                        </LabelRibbon>                   
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="nsf"
                                id="nsf"
                                onChange={handleGastrointestinal}
                                />
                                <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                NSF
                                </label>
                            </div>
                        </div>
                        {!hideGastrointestinal && (
                            <>
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="distention"
                                id="distention"
                                onChange={handleGastrointestinal}
                                />
                                <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Distention
                                </label>
                            </div>
                        </div>
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="hepatomegaly"
                                id="hepatomegaly"
                                onChange={handleGastrointestinal}
                                />
                                <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Hepatomegaly
                                </label>
                            </div>
                        </div>
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="spenomegaly"
                                id="spenomegaly"
                                onChange={handleGastrointestinal}
                                />
                                <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Spenomegaly
                                </label>
                            </div>
                        </div>
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="tenderness"
                                id="tenderness"
                                onChange={handleGastrointestinal}
                                />
                                <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Tenderness
                                </label>
                            </div>
                        </div>

                        <div className="form-group mb-3 col-md-3">
                                <FormGroup>
                                <Label >Other (specify)</Label>
                                <InputGroup> 
                                    <Input 
                                        type="text"
                                        name="other"
                                        id="other"
                                        onChange={handleGastrointestinal}
                                    />
                                </InputGroup>                                        
                                </FormGroup>
                        </div>
                        
                        </>
                        )}
                    </div>
                    <div className="row">                                   
                        <LabelRibbon as='a' color='brown' style={{width:'106%', height:'35px'}} ribbon>
                            <h3 style={{color:'#fff'}} >Neurological</h3>
                        </LabelRibbon>
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="nsf"
                                id="nsf"
                                onChange={handleNeurological}
                                />
                                <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                NSF
                                </label>
                            </div>
                        </div>
                        {!hideNeurological && (
                            <>
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="orientation"
                                id="orientation"
                                onChange={handleNeurological}
                                />
                                <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Orientation to TPP
                                </label>
                            </div>
                        </div>
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="speechSlurs"
                                id="speechSlurs"
                                onChange={handleNeurological}
                                />
                                <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Speech slurs
                                </label>
                            </div>
                        </div>
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="neckStiffness"
                                id="neckStiffness"
                                onChange={handleNeurological}
                                />
                                <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Neck stiffness
                                </label>
                            </div>
                        </div>
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="blindness"
                                id="blindness"
                                onChange={handleNeurological}
                                />
                                <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Blindness 1/2 eyes
                                </label>
                            </div>
                        </div>
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="paresis"
                                id="paresis"
                                onChange={handleNeurological}
                                />
                                <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Hemiplegia/paresis
                                </label>
                            </div>
                        </div>
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="numbness"
                                id="numbness"
                                onChange={handleNeurological}
                                />
                                <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Numbness of extremities
                                </label>
                            </div>
                        </div>   
                        <div className="form-group mb-3 col-md-3">
                                <FormGroup>
                                <Label >Other (specify)</Label>
                                <InputGroup> 
                                    <Input 
                                        type="text"
                                        name="other"
                                        id="other"
                                        onChange={handleNeurological}
                                    />
                                </InputGroup>                                        
                                </FormGroup>
                        </div>
                        
                        </>
                        )}
                    </div>
                    <div className="row">                
                        <LabelRibbon as='a' color='grey' style={{width:'106%', height:'35px'}} ribbon>
                            <h3 style={{color:'#fff'}} >Mental Status</h3>
                        </LabelRibbon>                   
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="nsf"
                                id="nsf"
                                onChange={handleMentalStatus}
                                />
                                <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                NSF
                                </label>
                            </div>
                        </div>
                        {!handlementalstatus && (
                            <>
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="mentation"
                                id="mentation"
                                onChange={handleMentalStatus}
                                />
                                <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Slow mentation
                                </label>
                            </div>
                        </div>
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="memoryloss"
                                id="memoryloss"
                                onChange={handleMentalStatus}
                                />
                                <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Memory loss
                                </label>
                            </div>
                        </div>
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="moodSwings"
                                id="moodSwings"
                                onChange={handleMentalStatus}
                                />
                                <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Mood swings
                                </label>
                            </div>
                        </div>
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="depression"
                                id="depression"
                                onChange={handleMentalStatus}
                                />
                                <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Depression
                                </label>
                            </div>
                        </div>
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="anxiety"
                                id="anxiety"
                                onChange={handleMentalStatus}
                                />
                                <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Anxiety
                                </label>
                            </div>
                        </div>
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="ideation"
                                id="ideation"
                                onChange={handleMentalStatus}
                                />
                                <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Suicidal ideation
                                </label>
                            </div>
                        </div>
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="tenderness"
                                id="tenderness"
                                onChange={handleMentalStatus}
                                />
                                <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Tenderness
                                </label>
                            </div>
                        </div>

                        <div className="form-group mb-3 col-md-3">
                                <FormGroup>
                                <Label >Other (specify)</Label>
                                <InputGroup> 
                                    <Input 
                                        type="text"
                                        name="other"
                                        id="other"
                                        onChange={handleMentalStatus}
                                    />
                                </InputGroup>                                        
                                </FormGroup>
                        </div>
                        
                        </>
                        )}
                    </div>
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