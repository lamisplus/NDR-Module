
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
        }
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
    const [cardiovascular, setCardiovascular] = useState({
                                                            nsf:"",  
                                                            abnormal_heart_rate:"",
                                                            other:"",
                                                         });
    const [genitalia, setGenitalia] = useState({ nsf:"", 
                                                genital_discharge:"", 
                                                genital_ulcer :"", 
                                                inguinal:"",   
                                                other :"",
                                            });
    const [respiratory, setRespiratory] = useState({nsf:"",
                                                    rate:"",
                                                    labored:"",
                                                    cyanosis:"",
                                                    wheezing :"",
                                                    intercostal :"",
                                                    auscultation_finding :"",
                                                    other:"",
        
                                                    });
    const [gastrointestinal, setGastrointestinal] = useState({nsf :"", 
                                                                spenomegaly:"", 
                                                                distention:"",
                                                                hepatomegaly:"", 
                                                                tenderness:"", 
                                                                other:"",
                                                            });
    const [neurological, setNeurological] = useState({  nsf:"",
                                                        numbness :"",
                                                        paresis:"", 
                                                        blindness:"", 
                                                        neckStiffness:"", 
                                                        speechSlurs:"",  
                                                        orientation:"",
                                                        other:"" 
                                                       
                                                    });
    const [mentalStatus, setMentalStatus] = useState({nsf:"",
                                                        mentation:"", 
                                                        memoryloss:"", 
                                                        moodSwings:"",  
                                                        depression:"", 
                                                        anxiety:"", 
                                                        ideation:"", 
                                                        tenderness:"", 
                                                        other:"",
                                                    });

    useEffect(() => { 
        if(props.observation.data){
            setGeneralApperance(props.observation.data.generalApperance)
            setMentalStatus(props.observation.data.mentalstatus)
            setNeurological(props.observation.data.neurological)
            setGastrointestinal(props.observation.data.gastrointestinal)
            setRespiratory(props.observation.data.respiratory)
            setGenitalia(props.observation.data.genitalia)
            setCardiovascular(props.observation.data.cardiovascular)
            setBreast(props.observation.data.breast)
            setEye(props.observation.data.eye)
            setSkin(props.observation.data.skin)
        }
        
    }, [props.observation.data])

   
    const handleGeneralApperance =e =>{
        if(e.target.name!=='other'){
        if(e.target.checked){
            if(e.target.name==='nsf'){
                generalApperance.nsf=""
                generalApperance.pallor=""
                generalApperance.febrile=""
                generalApperance.dehydrated=""
                generalApperance.peripheral=""
                generalApperance.other=""
            }
            setGeneralApperance({...generalApperance, [e.target.name]: e.target.checked})
        }else{
            setGeneralApperance({...generalApperance, [e.target.name]: false})
        }
        }else{
            setGeneralApperance({...generalApperance, [e.target.name]: e.target.value})
        }
    }
    const handleSkin =e =>{
        if(e.target.name!=='other'){
            if(e.target.checked){
                if(e.target.name==='nsf'){
                    skin.nsf=""
                    skin.pruritic=""
                    skin.abscesses=""
                    skin.herpes=""
                    skin.kaposi=""
                    skin.suborrheic=""
                    skin.fungal=""
                    skin.other=""
                }
                setSkin({...skin, [e.target.name]: e.target.checked})
            }else{
                setSkin({...skin, [e.target.name]: false})
            }
            }else{
                setSkin({...skin, [e.target.name]: e.target.value})
            }
    }
    const handleEye =e =>{
        if(e.target.name!=='other'){
            if(e.target.checked){
                if(e.target.name==='nsf'){
                    eye.nsf=""
                    eye.icterus=""
                    eye.thrush=""
                    eye.oral=""
                    eye.abnormal=""
                    eye.other=""
                }
                setEye({...eye, [e.target.name]: e.target.checked})
            }else{
                setEye({...eye, [e.target.name]: false})
            }
            }else{
                setEye({...eye, [e.target.name]: e.target.value})
        }
    }
    const handleBreast =e =>{
        if(e.target.name!=='other'){
            if(e.target.checked){
                if(e.target.name==='nsf'){
                    breast.nsf=""
                    breast.lumps=""
                    breast.discharge=""
                    breast.other=""
                }
                setBreast({...breast, [e.target.name]: e.target.checked})
            }else{
                setBreast({...breast, [e.target.name]: false})
            }
            }else{
                setBreast({...breast, [e.target.name]: e.target.value})
        }
    }
    const handleCardiovascular =e =>{
        if(e.target.name!=='other'){
            if(e.target.checked){
                if(e.target.name==='nsf'){
                    cardiovascular.nsf=""
                    cardiovascular.abnormal_heart_rate=""
                    cardiovascular.other=""
                }
                setCardiovascular({...cardiovascular, [e.target.name]: e.target.checked})
            }else{
                setCardiovascular({...cardiovascular, [e.target.name]: false})
            }
            }else{
                setCardiovascular({...cardiovascular, [e.target.name]: e.target.value})
        }
    }
    const handleGenitalia =e =>{
        if(e.target.name!=='other'){
            if(e.target.checked){
                if(e.target.name==='nsf'){
                    genitalia.nsf=""
                    genitalia.genital_discharge=""
                    genitalia.genital_ulcer=""
                    genitalia.inguinal=""
                    genitalia.other=""
                }
                setGenitalia({...genitalia, [e.target.name]: e.target.checked})
            }else{
                setGenitalia({...genitalia, [e.target.name]: false})
            }
            }else{
                setGenitalia({...genitalia, [e.target.name]: e.target.value})
        }
    }
    const handleRespiratory =e =>{
        if(e.target.name!=='other'){
            if(e.target.checked){
                if(e.target.name==='nsf'){
                    respiratory.nsf=""
                    respiratory.rate=""
                    respiratory.labored=""
                    respiratory.cyanosis=""
                    respiratory.wheezing=""
                    respiratory.intercostal=""
                    respiratory.auscultation_finding=""
                    respiratory.other=""
                }
                setRespiratory({...respiratory, [e.target.name]: e.target.checked})
            }else{
                setRespiratory({...respiratory, [e.target.name]: false})
            }
            }else{
                setRespiratory({...respiratory, [e.target.name]: e.target.value})
        }
        
    }
    const handleGastrointestinal =e =>{
        if(e.target.name!=='other'){
            if(e.target.checked){
                if(e.target.name==='nsf'){
                    gastrointestinal.nsf=""
                    gastrointestinal.spenomegaly=""
                    gastrointestinal.distention=""
                    gastrointestinal.hepatomegaly=""
                    gastrointestinal.tenderness=""
                    gastrointestinal.other=""
                }
                setGastrointestinal({...gastrointestinal, [e.target.name]: e.target.checked})
            }else{
                setGastrointestinal({...gastrointestinal, [e.target.name]: false})
            }
            }else{
                setGastrointestinal({...gastrointestinal, [e.target.name]: e.target.value})
        }
    }
    const handleNeurological =e =>{
        if(e.target.name!=='other'){
            if(e.target.checked){
                if(e.target.name==='nsf'){
                    neurological.nsf=""
                    neurological.numbness=""
                    neurological.paresis=""
                    neurological.blindness=""
                    neurological.neckStiffness=""
                    neurological.speechSlurs=""
                    neurological.orientation=""
                    neurological.other=""
                }
                setNeurological({...neurological, [e.target.name]: e.target.checked})
            }else{
                setNeurological({...neurological, [e.target.name]: false})
            }
            }else{
                setNeurological({...neurological, [e.target.name]: e.target.value})
        }
       
    }
    const handleMentalStatus =e =>{
        if(e.target.name!=='other'){
            if(e.target.checked){
                if(e.target.name==='nsf'){
                    mentalStatus.nsf=""
                    mentalStatus.mentation=""
                    mentalStatus.memoryloss=""
                    mentalStatus.moodSwings=""
                    mentalStatus.depression=""
                    mentalStatus.anxiety=""
                    mentalStatus.ideation=""
                    mentalStatus.tenderness=""
                    mentalStatus.other=""
                }
                setMentalStatus({...mentalStatus, [e.target.name]: e.target.checked})
            }else{
                setMentalStatus({...mentalStatus, [e.target.name]: false})
            }
            }else{
                setMentalStatus({...mentalStatus, [e.target.name]: e.target.value})
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
    //toast.success("Medical history save successful");
    handleItemClick('who', 'appearance' )                  
}
        
return (
        <>  
        
            <Card className={classes.root}>
                <CardBody>   
                <h2 style={{color:'#000'}}>General Appearance</h2>
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
                                    checked={generalApperance.nsf}
                                    value={generalApperance.nsf}
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
                            {(generalApperance.nsf==='' || generalApperance.nsf===false) && (
                                <>
                            <div className="form-group mb-3 col-md-3">                                    
                                <div className="form-check custom-checkbox ml-1 ">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"                           
                                    name="pallor"
                                    id="pallor"
                                    checked={generalApperance.pallor}
                                    value={generalApperance.pallor}
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
                                    checked={generalApperance.febrile}
                                    value={generalApperance.febrile}
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
                                    checked={generalApperance.dehydrated}
                                    value={generalApperance.dehydrated}
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
                                    checked={generalApperance.peripheral}
                                    value={generalApperance.peripheral}
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
                                            value={generalApperance.other}
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
                                checked={skin.nsf }
                                value={skin.nsf}
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
                        {(skin.nsf==='' || skin.nsf===false) && (
                        <>
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="pruritic"
                                id="pruritic"
                                value={skin.pruritic}
                                checked={skin.pruritic}
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
                                checked={skin.abscesses}
                                value={skin.abscesses}
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
                                checked={skin.herpes}
                                value={skin.herpes}
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
                                checked={skin.kaposi}
                                value={skin.kaposi}
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
                                checked={skin.suborrheic}
                                value={skin.suborrheic}
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
                                value={skin.fungal}
                                checked={skin.fungal}
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
                                        value={skin.other}
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
                                    value={eye.nsf}
                                    checked={eye.nsf}
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
                            {(eye.nsf==='' || eye.nsf===false) && (
                                <>
                            <div className="form-group mb-3 col-md-3">                                    
                                <div className="form-check custom-checkbox ml-1 ">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"                           
                                    name="icterus"
                                    id="icterus"
                                    checked={eye.icterus}
                                    value={eye.icterus}
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
                                    checked={eye.thrush}
                                    value={eye.thrush}
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
                                    checked={eye.oral}
                                    value={eye.oral}
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
                                    checked={eye.abnormal}
                                    value={eye.abnormal}
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
                                            value={eye.other}
                                            onChange={handleEye}
                                            
                                        />
                                    </InputGroup>                                        
                                    </FormGroup>
                            </div>

                            </>
                            )}
                     
                    </div>
                    {props.patientAge>14 && props.patientObj.sex==='Female' &&(
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
                                    checked={breast.nsf}
                                    value={breast.nsf}
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
                            {(breast.nsf===''  || breast.nsf===false) && (
                                <>
                            <div className="form-group mb-3 col-md-3">                                    
                                <div className="form-check custom-checkbox ml-1 ">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"                           
                                    name="lumps"
                                    id="lumps"
                                    checked={breast.lumps}
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
                                    checked={breast.discharge}
                                    value={breast.discharge}
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
                                            value={breast.other}
                                            onChange={handleBreast} 
                                        />
                                    </InputGroup>                                        
                                    </FormGroup>
                            </div>
                            </>
                            )}
                    </div>
                    )}
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
                                checked={cardiovascular.nsf}
                                value={cardiovascular.nsf}
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
                        {(cardiovascular.nsf==='' || cardiovascular.nsf===false) && (
                        <>
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="abnormal_heart_rate"
                                id="abnormal_heart_rate"
                                checked={cardiovascular.abnormal_heart_rate}
                                value={cardiovascular.abnormal_heart_rate}
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
                                        value={cardiovascular.other}
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
                                checked={genitalia.nsf}
                                value={genitalia.nsf}
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
                        {(genitalia.nsf==='' || genitalia.nsf===false) && (
                        <>
                    
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="genital_discharge"
                                id="genital_discharge"
                                checked={genitalia.genital_discharge}
                                value={genitalia.genital_discharge}
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
                                checked={genitalia.genital_ulcer}
                                value={genitalia.genital_ulcer}
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
                                checked={genitalia.inguinal}
                                value={genitalia.inguinal}
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
                                        value={genitalia.other}
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
                                checked={respiratory.nsf}
                                value={respiratory.nsf}
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
                        {(respiratory.nsf==='' || respiratory.nsf===false) && (
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
                                checked={respiratory.rate}
                                value={respiratory.rate}
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
                                checked={respiratory.labored}
                                value={respiratory.labored}
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
                                checked={respiratory.cyanosis}
                                value={respiratory.cyanosis}
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
                                checked={respiratory.wheezing}
                                value={respiratory.wheezing}
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
                                checked={respiratory.intercostal}
                                value={respiratory.intercostal}
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
                                checked={respiratory.auscultation_finding}
                                value={respiratory.auscultation_finding}
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
                                        value={respiratory.other}
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
                                checked={gastrointestinal.nsf}
                                value={gastrointestinal.nsf}
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
                        {(gastrointestinal.nsf==='' || gastrointestinal.nsf===false) && (
                            <>
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="distention"
                                id="distention"
                                checked={gastrointestinal.distention}
                                value={gastrointestinal.distention}
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
                                checked={gastrointestinal.hepatomegaly}
                                value={gastrointestinal.hepatomegaly}
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
                                checked={gastrointestinal.spenomegaly}
                                value={gastrointestinal.spenomegaly}
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
                                checked={gastrointestinal.tenderness}
                                value={gastrointestinal.tenderness}
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
                                        value={gastrointestinal.other}
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
                                checked={neurological.nsf}
                                value={neurological.nsf}
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
                        {(neurological.nsf==='' || neurological.nsf===false) && (
                            <>
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="orientation"
                                id="orientation"
                                checked={neurological.orientation}
                                value={neurological.orientation}
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
                                checked={neurological.speechSlurs}
                                value={neurological.speechSlurs}
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
                                checked={neurological.neckStiffness}
                                value={neurological.neckStiffness}
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
                                checked={neurological.blindness}
                                value={neurological.blindness}
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
                                checked={neurological.paresis}
                                value={neurological.paresis}
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
                                checked={neurological.numbness}
                                id="numbness"
                                value={neurological.numbness}
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
                                        value={neurological.other}
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
                                checked={mentalStatus.nsf}
                                value={mentalStatus.nsf}
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
                        {(mentalStatus.nsf==='' || mentalStatus.nsf===false) && (
                            <>
                        <div className="form-group mb-3 col-md-3">                                    
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                           
                                name="mentation"
                                id="mentation"
                                checked={mentalStatus.mentation}
                                value={mentalStatus.mentation}
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
                                checked={mentalStatus.memoryloss}
                                value={mentalStatus.memoryloss}
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
                                checked={mentalStatus.moodSwings}
                                value={mentalStatus.moodSwings}
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
                                checked={mentalStatus.depression}
                                value={mentalStatus.depression}
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
                                checked={mentalStatus.anxiety}
                                value={mentalStatus.anxiety}
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
                                checked={mentalStatus.ideation}
                                value={mentalStatus.ideation}
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
                                checked={mentalStatus.tenderness}
                                value={mentalStatus.tenderness}
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
                                        value={mentalStatus.other}
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
                    <Button content='Back' icon='left arrow' labelPosition='left' style={{backgroundColor:"#992E62", color:'#fff'}} onClick={()=>handleItemClick('physical-examination', 'physical-examination')}/>
                    <Button content='Next' type="submit" icon='right arrow' labelPosition='right' style={{backgroundColor:"#014d88", color:'#fff'}} onClick={handleSubmit}/>
                    
                    </form>
                    
                </CardBody>
            </Card> 
                                     
        </>
    );
};

export default BasicInfo