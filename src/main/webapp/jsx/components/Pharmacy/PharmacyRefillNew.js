import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Input, Label, FormGroup, CardBody, Card, InputGroupText, InputGroup } from "reactstrap";
import MatButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import "react-widgets/dist/css/react-widgets.css";
import moment from "moment";
import { Spinner } from "reactstrap";
import Select from "react-select";
import { url as baseUrl, token } from "../../../api";
import { toast} from "react-toastify";
//import { Icon,Button, } from 'semantic-ui-react'


const useStyles = makeStyles(theme => ({ 
    button: {
      margin: theme.spacing(1)
    },
    error: {
      color: "#f85032",
      fontSize: "11px",
  },
  success: {
      color: "#4BB543 ",
      fontSize: "11px",
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
}))
let refillPeriodValue=null

const Pharmacy = (props) => {
    const patientObj = props.patientObj;
    const enrollDate = patientObj && patientObj.artCommence ? patientObj.artCommence.visitDate : null
    const classes = useStyles();
    const [saving, setSaving] = useState(false);
    const [selectedOption, setSelectedOption] = useState([]);
    const [selectedOptionAdr, setSelectedOptionAdr] = useState();
    const [prepSideEffect, setPrepSideEffect] = useState([]);
    const [mmdType, setmmdType]=useState();
    const [showmmdType, setShowmmdType]=useState(false);
    const [showDsdModel, setShowDsdModel] = useState(false);
    const [showAdr, setShowAdr] = useState(false);
    const [showRegimen, setShowRegimen] = useState(false);
    const [regimen, setRegimen] = useState([]);
    const [regimenList, setRegimenList] = useState([]);
    const [regimenType, setRegimenType] = useState([]);
    const [regimenDrug, setRegimenDrug] = useState([]);
    const [eacStatusObj, setEacStatusObj] = useState()
    const [showCurrentVitalSigns, setShowCurrentVitalSigns] = useState(false)
    const [currentVitalSigns, setcurrentVitalSigns] = useState({})
    const [objValues, setObjValues] = useState({
            adherence: "",
            adrScreened: "",
            adverseDrugReactions: {},
            dsdModel:"",
            isDevolve:"",
            extra: {},
            facilityId: 2,
            mmdType:null,
            nextAppointment: null,
            personId: props.patientObj.id,
            refillPeriod:null,
            prescriptionError: null,
            regimenId: [],
            visitDate: null,
            visitId: 0,
            refill:"",
            refillType:""
    });
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
    useEffect(() => {
        RegimenLine();
        PrepSideEffect();
        VitalSigns();
        setRegimenList(
            Object.entries(selectedOption && selectedOption.length>0? selectedOption : []).map(([key, value]) => ({
                id: value.value,
                name: value.label,
                dispenseQuantity:objValues.refillPeriod!==null ? objValues.refillPeriod: ""
              })))
        CheckEACStatus();
        VitalSigns()
    }, [selectedOption]);
    //Check for the last Vital Signs
    const VitalSigns = () => {
        axios
          .get(`${baseUrl}patient/vital-sign/person/${props.patientObj.id}`,
            { headers: { "Authorization": `Bearer ${token}` } }
          )
          .then((response) => {
             const lastVitalSigns = response.data[response.data.length - 1]
             //console.log(lastVitalSigns)
            if (lastVitalSigns.captureDate >= moment(new Date()).format("YYYY-MM-DD")) {
                setVitalSignDto(lastVitalSigns)
              setShowCurrentVitalSigns(true)
            }
          })
          .catch((error) => {
            //console.log(error);
          });
        }
    //Get EAC Status
    const CheckEACStatus =()=>{
        axios
           .get(`${baseUrl}hiv/eac/open/patient/${props.patientObj.id}`,
               { headers: {"Authorization" : `Bearer ${token}`} }
           )
           .then((response) => {
               console.log(response.data);
               setEacStatusObj(response.data);
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
            
            setRegimen(response.data);
        })
        .catch((error) => {
        //console.log(error);
        });
    
    }
    //Get list of PrepSideEffect
    const PrepSideEffect =()=>{
        axios
           .get(`${baseUrl}application-codesets/v2/PREP_SIDE_EFFECTS`,
               { headers: {"Authorization" : `Bearer ${token}`} }
           )
           .then((response) => {
               //console.log(response.data);
               setPrepSideEffect(Object.entries(response.data).map(([key, value]) => ({
                label: value.display,
                value: value.id,
              })));
           })
           .catch((error) => {
           //console.log(error);
           });
       
    }
    function RegimenType(id) {
        async function getCharacters() {
            try{
            const response = await axios.get(`${baseUrl}hiv/regimen/types/${id}`,
            { headers: {"Authorization" : `Bearer ${token}`} })
            if(response.data.length >0){
                setRegimenType(
                    Object.entries(response.data).map(([key, value]) => ({
                    label: value.description,
                    value: value.id,
                    })))
            }
            }catch(e) {

            }
        }
        getCharacters();
    }
    function RegimenDrug(id) {
        async function getCharacters() {
            try{
            const response = await axios.get(`${baseUrl}hiv/regimen/drugs/${id}`,
            { headers: {"Authorization" : `Bearer ${token}`} })
            if(response.data.length >0){
                setRegimenDrug(response.data)
            }
            }catch(e) {

            }
        }
        getCharacters();
    }
    const handleInputChange = e => {
        setObjValues ({...objValues,  [e.target.name]: e.target.value});
       
    }
    const handleSelectedRegimen = e => {
        const regimenId= e.target.value
        if(regimenId!==""){
            RegimenType(regimenId)
            setShowRegimen(true)
        }else{
            setRegimenType([])
            setShowRegimen(false)
        }
    }
    const handleSelectedRegimenCombination = e => {
        const regimenId= e.target.value
        if(regimenId!==""){
            RegimenDrug(regimenId)
            //setShowRegimen(true)
        }else{
            setRegimenType([])
            //setShowRegimen(false)
        }
    }
    const handleCheckBox =e =>{
        if(e.target.checked){
            setShowDsdModel(true)
            setObjValues ({...objValues,  isDevolve: true});
        }else{
            setShowDsdModel(false)
            setObjValues ({...objValues,  isDevolve: false});
        }
    } 
    const handlePrescriptionErrorCheckBox =e =>{
        if(e.target.checked){
            setObjValues ({...objValues,  prescriptionError: true});
        }else{
            setObjValues ({...objValues,  prescriptionError: false});
        }
    } 
    const handleCheckBoxAdverseDrugReactions =e =>{
        if(e.target.checked){
            setShowAdr(true)
            setObjValues ({...objValues,  adrScreened:true});
        }else{
            setShowAdr(false)
            setObjValues ({...objValues,  adrScreened:false});
        }
    } 
    const handlRefillPeriod = e =>{
        const refillcount= e.target.value
        refillPeriodValue=refillcount
        
        const visitDate = objValues.visitDate
        const nextrefillDate= moment(visitDate, "YYYY-MM-DD").add(refillcount, 'days').toDate();
        const nextDate =moment(nextrefillDate).format("YYYY-MM-DD")
        objValues.refillPeriod= e.target.value
        setObjValues ({...objValues,  nextAppointment: nextDate})

        if(refillcount==="90"){
            setShowmmdType(true)
            setmmdType("MMD-3")
        }else if(refillcount==="120"){
            setShowmmdType(true)
            setmmdType("MMD-4")
        }else if(refillcount==="150"){
            setShowmmdType(true)
            setmmdType("MMD-5")
        }else if(refillcount==="180"){
            setShowmmdType(true)
            setmmdType("MMD-6")
        }else{
            setShowmmdType(false)
            setmmdType("")
        }

    }
    const handleFormChange = (index, event) => {
        let data = [...regimenList];
        data[index][event.target.name] = event.target.value;
        setRegimenList(data);
     }

    const handleSubmit = (e) => {        
        e.preventDefault();
        setSaving(true);
        objValues.adverseDrugReactions=selectedOptionAdr
        objValues.personId=props.patientObj.id
        //objValues.extra=regimenList 
        objValues.mmdType=mmdType
        //delete regimenList['name']
        objValues.regimen=regimenList

        axios.post(`${baseUrl}hiv/art/pharmacy`,objValues,
        { headers: {"Authorization" : `Bearer ${token}`}},)
        .then(response => {
            setSaving(false);
            toast.success("Pharmacy drug refill successful");
            props.setActiveContent({...props.activeContent, route:'recent-history'})
        })
        .catch(error => {
            setSaving(false);
            if(error.response && error.response.data){
                let errorMessage = error.response.data && error.response.data.apierror.message!=="" ? error.response.data.apierror.message :  "Something went wrong, please try again";
                toast.error(errorMessage); 
            }
                       
        }); 
    }
console.log(eacStatusObj)

  return (      
      <div>
 
        <div className="row">
        <div className="col-md-6">
        <h2>Pharmacy Drug Refill</h2> 
        </div>

        <Card className={classes.root}>
            <CardBody>
            <form >
            <div className="row">
            <div className="row">
                <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                    <Label for="artDate">Encounter Date * </Label>
                    <Input
                        type="date"
                        name="visitDate"
                        id="visitDate"
                        onChange={handleInputChange}
                        value={objValues.visitDate}
                        min={enrollDate}
                        max= {moment(new Date()).format("YYYY-MM-DD") }
                        style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                        required
                    />
                    </FormGroup>
                </div>
            </div>
            {vital.bodyWeight!=='' && vital.height!=='' && (<>
                <div className="row">
                <div className=" mb-3 col-md-3">
                    <FormGroup>
                    <Label >Body Weight</Label>
                    <InputGroup> 
                        <Input 
                            type="text"
                            name="bodyWeight"
                            id="bodyWeight"
                            min="3"
                            value={vital.bodyWeight}
                            max="150"
                            disabled
                            style={{border: "1px solid #014D88", borderRadius:"0rem"}}
                        />
                        <InputGroupText addonType="append" style={{ backgroundColor:"#014D88", color:"#fff", border: "1px solid #014D88", borderRadius:"0rem"}}>
                            kg
                        </InputGroupText>
                    </InputGroup>
                    
                    </FormGroup>
                </div>                                   
                <div className="form-group mb-3 col-md-3">
                    <FormGroup>
                    <Label >Height</Label>
                    <InputGroup> 
                    <InputGroupText
                            addonType="append"
                            
                            style={{ backgroundColor:"#014D88", color:"#fff", border: "1px solid #014D88", borderRadius:"0rem"}}
                            >
                            cm
                    </InputGroupText>
                        <Input 
                            type="text"
                            name="height"
                            id="height"
                            disabled
                            value={vital.height}
                            min="48.26"
                            max="216.408"
                            style={{border: "1px solid #014D88", borderRadius:"0rem"}}
                        />
                            <InputGroupText
                            addonType="append"
                            
                            style={{ backgroundColor:"#992E62", color:"#fff", border: "1px solid #992E62", borderRadius:"0rem"}}
                            >
                            {vital.height!=='' ? (vital.height/100).toFixed(2) + "m" : "m"}
                        </InputGroupText>
                    </InputGroup>
                    
                    </FormGroup>
                </div>
                <div className="form-group mb-3 mt-2 col-md-3">
                    {vital.bodyWeight!=="" && vital.height!=='' && (
                        <FormGroup>
                        <Label> </Label>
                        <InputGroup> 
                        <InputGroupText addonType="append" style={{ backgroundColor:"#014D88", color:"#fff", border: "1px solid #014D88", borderRadius:"0rem"}}>
                            BMI : {(vital.bodyWeight/((vital.height * vital.height)/100)).toFixed(2)}
                        </InputGroupText>                   
                        
                        </InputGroup>                
                        </FormGroup>
                    )}
                </div>
                {/* <div className="form-group mb-3 mt-2 col-md-3">
                    <FormGroup>
                        <Label >Pregnant Status  : Yes</Label>                                    
                    </FormGroup>
                </div> */}
                </div>
            </>)}
            <div className="row">
                <div className="form-group mb-3 col-md-3">
                <FormGroup>
                    <Label >Refill</Label>
                    <Input
                        type="select"
                        name="refill"
                        id="refill"
                        value={objValues.refill}
                        onChange={handleInputChange}   
                        style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}                 
                        >
                        <option value="">Select </option>
                        <option value="Yes">Yes</option>
                        <option value="No">No </option>
                    
                    </Input>
                    
                    </FormGroup>
                </div>
                {objValues.refill==='Yes' && (
                <div className="form-group mb-3 col-md-3">
                <FormGroup>
                    <Label >Refill Type</Label>
                    <Input
                        type="select"
                        name="refillType"
                        id="refillType"
                        value={objValues.refillType}
                        onChange={handleInputChange}   
                        style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}                 
                        >
                        <option value="">Select </option>
                        <option value="Substitution">Substitution</option>
                        <option value="Switch">Switch </option>
                    
                    </Input>
                    
                    </FormGroup>
                </div>
                )}
                {/* <div className="form-group mb-3 col-md-12">
                        
                        <div className="form-check custom-checkbox ml-1 ">
                            <input
                            type="checkbox"
                            className="form-check-input"                       
                            name="devolvePatient"
                            id="devolvePatient"
                            onChange={handleCheckBox}
                            style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                            />
                            <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            >
                            Devolve Patient
                            </label>
                        </div>
                </div> */}
                
                <div className="form-group mb-3 col-md-3">
                <FormGroup>
                    <Label >Refill Period(days) *</Label>
                    <Input
                        type="select"
                        name="refillPeriod"
                        id="refillPeriod"
                        disabled={objValues.visitDate!==null? false : true}
                        onChange={handlRefillPeriod}   
                        style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}                 
                        >
                        <option value="">Select </option>
                        <option value="15">15</option>
                        <option value="30">30 </option>
                        <option value="60">60 </option>
                        <option value="90">90 </option>
                        <option value="120">120 </option>
                        <option value="150">150 </option>
                        <option value="180">180 </option>
                    </Input>
                    
                    </FormGroup>
                </div>
                <div className="form-group mb-3 col-md-3">
                <FormGroup>
                    <Label for="artDate"> Date of Next Appointment* </Label>
                    <Input
                        type="date"
                        name="nextAppointment"
                        id="nextAppointment"
                        disabled={objValues.refillPeriod!==null? false : true}
                        onChange={handleInputChange}
                        value={objValues.nextAppointment}
                        style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                        required
                    />
                    </FormGroup>
                </div>
            </div>
            <div className="form-group mb-3 col-md-6">
                <FormGroup>
                    <Label >DSD Model</Label>
                    <Input
                        type="select"
                        name="deliveryPoint"
                        id="deliveryPoint"
                        value={objValues.deliveryPoint}
                        onChange={handleInputChange} 
                        style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}                   
                        >
                        <option value="">Select </option>
                        <option value="Facility">Facility </option>
                        <option value="Community">Community </option>
                        
                    </Input>
                    
                </FormGroup>
            </div>
            <div className="form-group mb-3 col-md-6">
                <FormGroup>
                    <Label >DSD Model Type</Label>
                    <Input
                        type="select"
                        name="deliveryPoint"
                        id="deliveryPoint"
                        value={objValues.deliveryPoint}
                        onChange={handleInputChange} 
                        style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}                   
                        >
                        <option value="">Select </option>
                        <option value="Facility">Facility </option>
                        <option value="Community">Community </option>
                        
                    </Input>
                    
                </FormGroup>
            </div>
            {/* <div className="form-group mb-3 col-md-6">
                <FormGroup>
                    <Label >DSD Model Type</Label>
                    <Input
                        type="select"
                        name="deliveryPoint"
                        id="deliveryPoint"
                        value={objValues.deliveryPoint}
                        onChange={handleInputChange} 
                        style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}                   
                        >
                        <option value="">Select </option>
                        <option value="Facility">Facility </option>
                        <option value="Community">Community </option>
                        
                    </Input>
                    
                </FormGroup>
            </div>
             */}
             {eacStatusObj && eacStatusObj.eacsession && eacStatusObj.eacsession!=='Default' && (<>
                <h3>Ehanced Adherance Counseling</h3>
                <div className="row">
                <div className="form-group mb-3 col-md-3">
                    <FormGroup>
                        <Label >Viral Load Result</Label>
                        <Input
                            type="date"
                            name="deliveryPoint"
                            id="deliveryPoint"
                            disabled
                        />
                        
                    </FormGroup>
                </div>
                <div className="form-group mb-3 col-md-3">
                    <FormGroup>
                        <Label >Date of Last Viral Load</Label>
                        <Input
                            type="date"
                            name="deliveryPoint"
                            id="deliveryPoint"
                            disabled
                    />
                        
                    </FormGroup>
                </div>
                
                <div className="form-group mb-3 col-md-3">
                    <FormGroup>
                        <Label >EAC Status</Label>
                        <p>Second Session</p>
                        
                    </FormGroup>
                </div>
                <div className="form-group mb-3 col-md-3">
                    <FormGroup>
                        <Label >Date of EAC</Label>
                        <Input
                            type="date"
                            name="deliveryPoint"
                            id="deliveryPoint"
                            disabled
                        />
                        
                    </FormGroup>
                </div>
                </div>
            </>)}
            <hr/>
            <div className="form-group mb-3 col-md-6">
                <FormGroup>
                <Label >Select Regimen Line *</Label>
                <Input
                    type="select"
                    name="regimen"
                    id="regimen"
                    value={objValues.drugName}
                    onChange={handleSelectedRegimen}  
                    style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                    disabled={objValues.refillPeriod!==null? false : true}                 
                    >
                    <option value="">Select </option>
                                    
                        {regimen.map((value) => (
                            <option key={value.id} value={value.id}>
                                {value.description}
                            </option>
                        ))}
                </Input>
                
                </FormGroup>
            </div>
            {showRegimen && (
            <div className="form-group mb-3 col-md-6">
                <FormGroup>
                <Label >Regimen *</Label>
                
                <Input
                    type="select"
                    name="regimen"
                    id="regimen"
                    value={objValues.drugName}
                    onChange={handleSelectedRegimenCombination}  
                    style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                    disabled={objValues.refillPeriod!==null? false : true}                 
                    >
                    <option value="">Select </option>
                                    
                        {regimenType.map((value) => (
                            <option key={value.id} value={value.value}>
                                {value.label}
                            </option>
                        ))}
                </Input>
                
                </FormGroup>
            </div>
            )}
            {regimenDrug && regimenDrug.length >0 ? 

                (
                    <>
                        <Card>
                        <CardBody>
                        <h4>Drugs Information </h4>
                        <div className="row">
                            <div className="form-group mb-3 col-md-2"  >Regimen Name </div>
                            <div className="form-group mb-3 col-md-2"  >Strength </div>
                            <div className="form-group mb-3 col-md-2"  >Frequency </div>
                            <div className="form-group mb-3 col-md-2"  >Duration </div>
                            <div className="form-group mb-3 col-md-2"  >Quantity Prescribed</div>
                            <div className="form-group mb-3 col-md-2"  >Quantity Dispensed</div>
                        </div>
                        {regimenDrug.map((input, index) => (
                            <>
                                <div className="row">
                                <div className="form-group mb-3 col-md-2"  >
                                    <FormGroup>
                                    <Label ><b>{input.name}</b></Label>
                                    <Input
                                        type="hidden"
                                        name="id"
                                        id="id"
                                        value={input.id}  
                                        onChange={event => handleFormChange(index, event)}                                    
                                        required
                                        >                                       
                                    </Input>
                                    </FormGroup>
                                </div>

                                <div className="form-group mb-3 col-md-2">
                                    <FormGroup>
                                    <Input
                                        type="number"
                                        name="dispenseQuantity"
                                        id="dispenseQuantity"
                                        value={input.dispenseQuantity}
                                        style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                        onChange={event => handleFormChange(index, event)}
                                        required
                                        >
                                        
                                    </Input>
                                
                                    </FormGroup>
                                </div>
                                <div className="form-group mb-3 col-md-2">
                                    <FormGroup>
                                    <Input
                                        type="number"
                                        name="dispenseQuantity"
                                        id="dispenseQuantity"
                                        value={input.dispenseQuantity}
                                        style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                        onChange={event => handleFormChange(index, event)}
                                        required
                                        >
                                        
                                    </Input>
                                
                                    </FormGroup>
                                </div>
                                <div className="form-group mb-3 col-md-2">
                                    <FormGroup>
                                    <Input
                                        type="number"
                                        name="dispenseQuantity"
                                        id="dispenseQuantity"
                                        value={input.dispenseQuantity}
                                        style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                        onChange={event => handleFormChange(index, event)}
                                        required
                                        >
                                        
                                    </Input>
                                
                                    </FormGroup>
                                </div>
                                <div className="form-group mb-3 col-md-2">
                                    <FormGroup>
                                    <Input
                                        type="number"
                                        name="dispenseQuantity"
                                        id="dispenseQuantity"
                                        value={input.dispenseQuantity}
                                        style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                        onChange={event => handleFormChange(index, event)}
                                        required
                                        >
                                        
                                    </Input>
                                
                                    </FormGroup>
                                </div>
                                <div className="form-group mb-3 col-md-2">
                                    <FormGroup>
                                    <Input
                                        type="number"
                                        name="dispenseQuantity"
                                        id="dispenseQuantity"
                                        value={input.dispenseQuantity}
                                        style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                        onChange={event => handleFormChange(index, event)}
                                        required
                                        >
                                        
                                    </Input>
                                
                                    </FormGroup>
                                </div>
                                </div>
                            </>
                        ))}
                       
                        </CardBody>
                        </Card>
                        <br/>
                        <br/>
                    </>                  
                    )
                    :
                    ""
                }
            </div>                              
            {saving ? <Spinner /> : ""}
            <br />
                {regimenList.length >0 && (
                <MatButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    onClick={handleSubmit}
                    style={{backgroundColor:"#014d88"}}
                    
                    >
                    {!saving ? (
                    <span style={{ textTransform: "capitalize" }}>Save</span>
                    ) : (
                    <span style={{ textTransform: "capitalize" }}>Saving...</span>
                    )}
                </MatButton>
                )}
                </form>
            </CardBody>
        </Card> 
    </div>
    </div>
  );
}

export default Pharmacy;
