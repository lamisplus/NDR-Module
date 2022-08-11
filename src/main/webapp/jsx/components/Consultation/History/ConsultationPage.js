import React, { useState, useEffect } from "react";
import { Grid, Segment, Label,} from 'semantic-ui-react'
// Page titie
import { FormGroup, Label as FormLabelName, InputGroup,
          InputGroupText,
          InputGroupButtonDropdown,
          Input,
          DropdownToggle,
          DropdownMenu,
          DropdownItem
        } from "reactstrap";
import ADR from './../ADR/Index'
import OpportunisticInfection from './../OpportunisticInfection/Index'
import TBScreening from './../TBScreening/Index'
import { url as baseUrl, token } from "../../../../api";
import MatButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import axios from "axios";
//import AddVitals from './Vitals/AddVitals'
import AddAllergy from './../Allergies/AddAllergy'
import AddCondition from './../Conditions/AddCondition'
import PostPatient from './../PostPatient/Index'
import moment from "moment";
import { toast } from "react-toastify";
import { Row, Col,   } from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { MdDashboard } from "react-icons/md";
import { Button as ButtonSMUI, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom';
//import { objectValues } from "react-toastify/dist/utils";


let adherenceLevelObj = []
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



const ClinicVisit = (props) => {
  const patientObj = props.patientObj ? props.patientObj : {}
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [splitButtonOpen, setSplitButtonOpen] = React.useState(false);
  const toggleDropDown = () => setDropdownOpen(!dropdownOpen);
  const toggleSplit = () => setSplitButtonOpen(!splitButtonOpen);
  const [heightValue, setHeightValue]= useState("cm")
  const [enableUpdate, setEnableUpdate]= useState(false)
  const [enableEdit, setEnableEdit]= useState(true)
  const [errors, setErrors] = useState({});
  const [clinicVisitList, setClinicVisitList] = useState([])
  const [loading, setLoading] = useState(true)
  let temp = { ...errors }
  const classes = useStyles()
  // the visit date history 
  //end of the visit date history
  const [getPatientObj, setGetPatientObj] = useState({});
  const [saving, setSaving] = useState(false);
  const [clinicalStage, setClinicalStage] = useState([]);
  const [functionalStatus, setFunctionalStatus] = useState([]);
  const [adherenceLevel, setAdherenceLevel] = useState([]);
  const [tbStatus, setTbStatus] = useState([]);
  const [TBForms, setTBForms] = useState(false)
  // const [addVitalModal, setAddVitalModal] = useState(false);
  // const AddVitalToggle = () => setAddVitalModal(!addVitalModal)
  const [addConditionModal, setAddConditionModal] = useState(false);
  const AddConditionToggle = () => setAddConditionModal(!addConditionModal)
  const [addAllergyModal, setAddAllergyModal] = useState(false);
  const AddAllergyToggle = () => setAddAllergyModal(!addAllergyModal)
  const [postPatientModal, setPostPatientModal] = useState(false);
  const PostPatientToggle = () => setPostPatientModal(!postPatientModal)
  const [currentVitalSigns, setcurrentVitalSigns] = useState({})
  const [showCurrentVitalSigns, setShowCurrentVitalSigns] = useState(false)
  //opportunistic infection Object
  const [infection, setInfection] = useState({ illnessInfection: "", ondateInfection: "" });
  const [infectionList, setInfectionList] = useState([]);
  //ADR array Object 
  const [adrObj, setAdrObj] = useState({ adr: "", adrOnsetDate: "" });
  const [adrList, setAdrList] = useState([]);
  //Vital signs clinical decision support 
  const [vitalClinicalSupport, setVitalClinicalSupport] = useState({
                                                                    bodyWeight: "",
                                                                    diastolic: "",
                                                                    height: "",
                                                                    systolic: ""
                                                                  })
  const [objValues, setObjValues] = useState({
    adherenceLevel: "",
    adheres: {},
    adrScreened: "",
    adverseDrugReactions: {},
    artStatusId: "" ,
    cd4: "",
    cd4Percentage: "",
    clinicalNote: "",
    clinicalStageId: "",
    facilityId: 0,
    functionalStatusId: "",
    hivEnrollmentId: "",
    nextAppointment: "",
    lmpDate: "",
    oiScreened: "",
    opportunisticInfections: {},
    personId: patientObj.id,
    tbScreen: {},
    stiIds: "",
    stiTreated: "",
    uuid: "",
    visitDate: "",
    whoStagingId: ""
  });
  const [vital, setVitalSignDto] = useState({
    bodyWeight: "",
    diastolic: "",
    encounterDate: "",
    facilityId: 1,
    height: "",
    personId: props.patientObj.id,
    serviceTypeId: 1,
    systolic: ""
  })
  const [tbObj, setTbObj] = useState({
    currentOnIpt: "",
    coughing: "",
    antiTBDrug: "",
    nightSweat: "",
    fever: "",
    contactWithTBCase: "",
    lethergy: "",
    tbStatusId: ""
  });

  useEffect(() => {
    FunctionalStatus();
    WhoStaging();
    AdherenceLevel();
    TBStatus();
    VitalSigns()
    GetPatientObj();
    ClinicVisitListHistory();
  }, []);
     //GET LIST Drug Refill
     async function ClinicVisitListHistory() {
      setLoading(true)
      axios
          .get(`${baseUrl}hiv/art/clinic-visit/person?pageNo=0&pageSize=10&personId=${props.patientObj.id}`,
          { headers: {"Authorization" : `Bearer ${token}`} }
          )
          .then((response) => {
              setLoading(false)
              setClinicVisitList(response.data);              
          })
          .catch((error) => {  
              setLoading(false)  
          });        
    }
  //Check for the last Vital Signs
  const VitalSigns = () => {
    axios
      .get(`${baseUrl}patient/vital-sign/person/${props.patientObj.id}`,
        { headers: { "Authorization": `Bearer ${token}` } }
      )
      .then((response) => {

        const lastVitalSigns = response.data[response.data.length - 1]
        if (lastVitalSigns.encounterDate === moment(new Date()).format("YYYY-MM-DD") === true) {
          setcurrentVitalSigns(lastVitalSigns)
          setShowCurrentVitalSigns(true)
        }
      })
      .catch((error) => {
        //console.log(error);
      });
  }
    //Get The updated patient objeect
    const GetPatientObj = () => {
      axios
        .get(`${baseUrl}hiv/patients`,
          { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then((response) => {
          const patObJ= response.data.filter((x)=> x.id===props.patientObj.id)

          setGetPatientObj(patObJ[0])
        })
        .catch((error) => {
          //console.log(error);
        });
    }

  //Get list of WhoStaging
  const WhoStaging = () => {
    axios
      .get(`${baseUrl}application-codesets/v2/CLINICAL_STAGE`,
        { headers: { "Authorization": `Bearer ${token}` } }
      )
      .then((response) => {
        //console.log(response.data);
        setClinicalStage(response.data);
      })
      .catch((error) => {
        //console.log(error);
      });

  }
  ///GET LIST OF FUNCTIONAL%20_STATUS
  // TB STATUS
  const TBStatus = () => {
    axios
      .get(`${baseUrl}application-codesets/v2/TB_STATUS`,
        { headers: { "Authorization": `Bearer ${token}` } }
      )
      .then((response) => {
        //console.log(response.data);
        setTbStatus(response.data);
      })
      .catch((error) => {
        //console.log(error);
      });

  }

  async function FunctionalStatus() {
    axios
      .get(`${baseUrl}application-codesets/v2/FUNCTIONAL%20_STATUS`,
        { headers: { "Authorization": `Bearer ${token}` } }
      )
      .then((response) => {

        setFunctionalStatus(response.data);
        //setValues(response.data)
      })
      .catch((error) => {
      });
  }
  ///Level of Adherence
  async function AdherenceLevel() {
    axios
      .get(`${baseUrl}application-codesets/v2/PrEP_LEVEL_OF_ADHERENCE`,
        { headers: { "Authorization": `Bearer ${token}` } }
      )
      .then((response) => {
        setAdherenceLevel(response.data);

      })
      .catch((error) => {
      });
  }
  const handleInputChange = e => {
    setObjValues({ ...objValues, [e.target.name]: e.target.value });
    if (e.target.name === "whoStagingId") {
      if (e.target.value === "NO") {
        setTBForms(true)
      } else {
        setTBForms(false)
      }
    }
  }
  const handleInputChangeVitalSignDto = e => {
    setVitalSignDto({ ...vital, [e.target.name]: e.target.value });
  }

  const addConditionsModal = () => {
    //setpatientObj({...patientObj, ...row});
    setAddConditionModal(!addConditionModal)
  }
  const addAllergiesModal = () => {
    //setpatientObj({...patientObj, ...row});
    setAddAllergyModal(!addAllergyModal)
  }
  const PostPatientService = (row) => {
    //setpatientObj({...patientObj, ...row});
    setPostPatientModal(!postPatientModal)
  }
  //Handle CheckBox 
  const handleCheckBox = e => {
    if (e.target.checked) {
      //currentVitalSigns.personId === null ? props.patientObj.id : currentVitalSigns.personId
      setVitalSignDto({ ...currentVitalSigns })
    } else {
      setVitalSignDto({
        bodyWeight: "",
        diastolic: "",
        encounterDate: "",
        facilityId: "",
        height: "",
        personId: props.patientObj.id,
        serviceTypeId: 1,
        systolic: ""
      })
    }
  }
  //to check the input value for clinical decision 
  const handleInputValueCheckHeight =(e)=>{
    if(e.target.name==="height" && (e.target.value < 48.26 || e.target.value>216.408)){
      const message ="Height cannot be greater than 216.408 and less than 48.26"
      setVitalClinicalSupport({...vitalClinicalSupport, height:message})
    }else{
      setVitalClinicalSupport({...vitalClinicalSupport, height:""})
    }
  }
  const handleInputValueCheckBodyWeight =(e)=>{
    if(e.target.name==="bodyWeight" && (e.target.value < 3 || e.target.value>150)){      
      const message ="Body weight must not be greater than 150 and less than 3"
      setVitalClinicalSupport({...vitalClinicalSupport, bodyWeight:message})
    }else{
      setVitalClinicalSupport({...vitalClinicalSupport, bodyWeight:""})
    }
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
  //Validations of the forms
  const validate = () => {        
    temp.encounterDate = vital.encounterDate ? "" : "This field is required"
    temp.nextAppointment = objValues.nextAppointment ? "" : "This field is required"
    temp.whoStagingId = objValues.whoStagingId ? "" : "This field is required"
    temp.clinicalNote = objValues.clinicalNote ? "" : "This field is required"
    temp.functionalStatusId = objValues.functionalStatusId ? "" : "This field is required"
    temp.adherenceLevel = objValues.adherenceLevel ? "" : "This field is required"
    temp.labTestGroupId = vital.diastolic ? "" : "This field is required"
    temp.systolic = vital.systolic ? "" : "This field is required"
    temp.height = vital.height ? "" : "This field is required"
    temp.bodyWeight = vital.bodyWeight ? "" : "This field is required"
    setErrors({
        ...temp
    })
    return Object.values(temp).every(x => x == "")
  }

  const  heightFunction =(e)=>{
    if(e==='cm'){
        setHeightValue('cm')
        if(vital.height!==""){
            const newHeightValue= (vital.height * 100)
            setVitalSignDto ({...vital,  height: newHeightValue});
        }
    }else if(e==='m'){
        setHeightValue('m')
        if(vital.height!==""){
            const newHeightValue= (vital.height/100)
            setVitalSignDto ({...vital,  height: newHeightValue});
        }
        
    }

  }
  /**** Submit Button Processing  */
  const handleSubmit = (e) => {
    e.preventDefault();
    if(validate()){
    setSaving(true)
    objValues.visitDate = vital.encounterDate
    objValues.adverseDrugReactions = adrList
    objValues.artStatusId = getPatientObj.artCommence.id
    objValues.hivEnrollmentId = getPatientObj.enrollment.id
    objValues.opportunisticInfections = infectionList
    objValues.tbScreen = tbObj
    objValues['vitalSignDto'] = vital
    axios.post(`${baseUrl}hiv/art/clinic-visit/`, objValues,
      { headers: { "Authorization": `Bearer ${token}` } },

    )
      .then(response => {
        setSaving(false);
        toast.success("Clinic Visit save successful");
        props.setActiveContent('recent-history')
      })
      .catch(error => {
        setSaving(false);
        if(error.response && error.response.data){
          let errorMessage = error.response.data.apierror && error.response.data.apierror.message!=="" ? error.response.data.apierror.message :  "Something went wrong, please try again";
          toast.error(errorMessage);
        }
        else{
          toast.error("Something went wrong. Please try again...");
        }
       
      });
    }
  }
  //Get visit by ID
  async function GetVisitById(visitID) {
    axios
      .get(`${baseUrl}hiv/art/clinic-visit/${visitID}`,
        { headers: { "Authorization": `Bearer ${token}` } }
      )
      .then((response) => {
          const e = response.data
          setVitalSignDto({ ...e.vitalSignDto })
          objValues.clinicalNote = e.clinicalNote
          objValues.functionalStatusId= e.functionalStatusId
          objValues.whoStagingId= e.whoStagingId 
          objValues.nextAppointment= e.nextAppointment
          objValues.adherenceLevel = e.adherenceLevel
          setTbObj({...e.tbScreen})
          setAdrList([...e.adverseDrugReactions])
          setInfectionList([...e.opportunisticInfections])
          // console.log(e)
          // console.log(e.adverseDrugReactions)

      })
      .catch((error) => {
      });
  }
  const getVisitDetail=(e)=>{
     setEnableEdit(false)
      GetVisitById(e.id)
      
  }


  return (
    <div>
        <div className="row">
            <div className="col-xl-4 col-xxl-4 col-lg-4" >
                <div className="card" style={{ height: "500px" }}>
                    <div className="card-header  border-0 pb-2" style={{backgroundColor:"#014D88"}}>
                    <h4 className="card-title" style={{color:"#fff"}}> Clinic Visits</h4>
                    </div>
                    <div className="card-body" >
                    <PerfectScrollbar
                        style={{ height: "370px" }}
                        id="DZ_W_Todo1"
                        className="widget-media dz-scroll ps ps--active-y"
                    >
                    {clinicVisitList.map((visit,index)=>(	
                    <div className="media pb-3 border-bottom mb-0 align-items-center" key={index}>								
                      <div className="media-body">
                            <ButtonSMUI
                                color='black'
                                content='Visit Date'
                                icon='calendar alternate'
                                onClick={()=>getVisitDetail(visit)}
                                label={{ basic: true, color: 'grey', pointing: 'left', content: `${moment(visit.visitDate).format('dddd, MMMM, YYYY ')}` }}
                            />
                      </div>
                    </div>
						        ))}
                    </PerfectScrollbar>
                    </div>
                </div>
            </div>

            <div className="col-xl-8 col-xxl-8 col-lg-8">
                <div className="card">
                    <div className="card-header  border-0 pb-2" style={{backgroundColor:"#014D88"}}>
                    <h4 className="card-title" style={{color:"#fff"}}> </h4>
                   
                      <ButtonSMUI color='facebook' hidden={enableEdit}>
                        <Icon name='edit' /> Edit Visit 
                      </ButtonSMUI>
                   
                    </div>
                    <div className="card-body">
                    <Grid columns='equal'>
                    <Grid.Column >
                    <Segment>
                        <div className="row">
                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <FormLabelName >Date of Visit *</FormLabelName>
                            <Input
                                type="date"
                                name="encounterDate"
                                id="encounterDate"
                                value={vital.encounterDate}
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                onChange={handleInputChangeVitalSignDto}
                                max={moment(new Date()).format("YYYY-MM-DD")}
                                disabled={!enableUpdate}
                                required
                            />
                            {errors.encounterDate !=="" ? (
                                <span className={classes.error}>{errors.encounterDate}</span>
                            ) : "" }

                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-6">
                            {showCurrentVitalSigns && (
                            <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"
                                name="currentVitalSigns"
                                id="currentVitalSigns"
                                onChange={handleCheckBox} 
                                disabled={!enableUpdate}
                                                    
                                />
                                <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                use current Vital Signs
                                </label>
                            </div>
                            )}
                        </div>
                        <div className="mb-3 col-md-6">
                            <FormGroup>
                            <FormLabelName >Body Weight</FormLabelName>

                            <InputGroup>
                                <InputGroupText addonType="append" style={{ backgroundColor:"#014D88", color:"#fff", border: "1px solid #014D88", borderRadius:"0rem"}}>
                                kg
                                </InputGroupText>
                                <Input
                                type="number"
                                name="bodyWeight"
                                id="bodyWeight"
                                onChange={handleInputChangeVitalSignDto}
                                style={{border: "1px solid #014D88", borderRadius:"0rem"}}
                                min="3"
                                max="150"
                                value={vital.bodyWeight}
                                onKeyUp={handleInputValueCheckBodyWeight}
                                disabled={!enableUpdate}
                                />
                            </InputGroup>
                            {vitalClinicalSupport.bodyWeight !=="" ? (
                                <span className={classes.error}>{vitalClinicalSupport.bodyWeight}</span>
                            ) : ""}
                            {errors.bodyWeight !=="" ? (
                                <span className={classes.error}>{errors.bodyWeight}</span>
                            ) : "" }
                            </FormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <FormLabelName >Height</FormLabelName>
                            <InputGroup>
                                
                                <Input
                                type="number"
                                name="height"
                                id="height"
                                onChange={handleInputChangeVitalSignDto}
                                value={vital.height}
                                min="48.26"
                                max="216.408"
                                onKeyUp={handleInputValueCheckHeight}
                                style={{border: "1px solid #014D88", borderRadius:"0rem"}}
                                disabled={!enableUpdate}
                                />
                                <InputGroupButtonDropdown
                                    addonType="append"
                                    isOpen={dropdownOpen}
                                    toggle={toggleDropDown}
                                    style={{ backgroundColor:"#014D88"}}
                                    disabled={!enableUpdate}
                                    >
                                    <DropdownToggle caret style={{ backgroundColor:"#014D88"}}>{heightValue ==='cm'? 'cm' : 'm'}</DropdownToggle>
                                    <DropdownMenu>
                                
                                        <DropdownItem onClick={()=>heightFunction(heightValue ==='cm'? 'm' : 'cm')}>{heightValue ==='cm'? 'm' : 'cm'}</DropdownItem>
                                            
                                    </DropdownMenu>
                                </InputGroupButtonDropdown>
                            </InputGroup>
                            {vitalClinicalSupport.height !=="" ? (
                                <span className={classes.error}>{vitalClinicalSupport.height}</span>
                            ) : ""}
                            {errors.height !=="" ? (
                                <span className={classes.error}>{errors.height}</span>
                            ) : "" }
                            </FormGroup>
                        </div>
                        {vital.bodyWeight!=="" && vital.height!=="" && (
                        <div className="form-group mb-3 col-md-6">
                        <FormGroup>
                            <FormLabelName >BMI</FormLabelName>
                            
                            <InputGroup> 
                            <InputGroupText addonType="append" style={{ backgroundColor:"#014D88", color:"#fff", border: "1px solid #014D88", borderRadius:"0rem"}}>
                                BMI
                            </InputGroupText>                   
                            <Input
                            type="number"
                            disabled
                            value={Math.round(vital.bodyWeight/(vital.height/100))}
                            style={{border: "1px solid #014D88", borderRadius:"0rem"}}
                            
                            />
                            </InputGroup>                
                            </FormGroup>
                        </div>
                        )}
                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <FormLabelName >Blood Pressure</FormLabelName>
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
                                disabled={!enableUpdate}
                                />

                            </InputGroup>
                            {vitalClinicalSupport.systolic !=="" ? (
                                <span className={classes.error}>{vitalClinicalSupport.systolic}</span>
                            ) : ""}
                            {errors.systolic !=="" ? (
                                <span className={classes.error}>{errors.systolic}</span>
                            ) : "" }
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <FormLabelName >Blood Pressure</FormLabelName>

                            <InputGroup>
                                <InputGroupText addonType="append" style={{ backgroundColor:"#014D88", color:"#fff", border: "1px solid #014D88", borderRadius:"0rem"}}>
                                diastolic(mmHg)
                                </InputGroupText>
                                <Input
                                type="text"
                                name="diastolic"
                                id="diastolic"
                                onChange={handleInputChangeVitalSignDto}
                                value={vital.diastolic}
                                onKeyUp={handleInputValueCheckDiastolic}
                                style={{border: "1px solid #014D88", borderRadius:"0rem"}}
                                disabled={!enableUpdate}
                                />

                            </InputGroup>
                            {vitalClinicalSupport.diastolic !=="" ? (
                                <span className={classes.error}>{vitalClinicalSupport.diastolic}</span>
                            ) : ""}
                            {errors.diastolic !=="" ? (
                                <span className={classes.error}>{errors.diastolic}</span>
                            ) : "" }
                            </FormGroup>
                        </div>
                        </div>
                        <Label as='a' color='black' ribbon>
                        <b>CONSULTATION</b>
                        </Label>
                        <br /><br />

                        <div className=" mb-3">
                        <FormLabelName >Clinical Notes</FormLabelName>
                        <textarea
                            name="clinicalNote"
                            className="form-control"
                            value={objValues.clinicalNote}
                            onChange={handleInputChange}
                            style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                            disabled={!enableUpdate}
                        ></textarea>
                        {errors.clinicalNote !=="" ? (
                                <span className={classes.error}>{errors.clinicalNote}</span>
                            ) : "" }
                        </div>
                        <div className="row">

                        <div className=" mb-3 col-md-6">
                            <FormGroup>
                            <FormLabelName >WHO Staging *</FormLabelName>
                            <Input
                                type="select"
                                name="whoStagingId"
                                id="whoStagingId"
                                value={objValues.whoStagingId}
                                onChange={handleInputChange}
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                disabled={!enableUpdate}
                                required
                            >
                                <option value="select">Select </option>

                                {clinicalStage.map((value) => (
                                <option key={value.id} value={value.id}>
                                    {value.display}
                                </option>
                                ))}
                            </Input>
                            {errors.whoStagingId !=="" ? (
                                <span className={classes.error}>{errors.whoStagingId}</span>
                            ) : "" }
                            </FormGroup>
                        </div>
                        <div className=" mb-3 col-md-6">
                            <FormGroup>
                            <FormLabelName >Functional Status *</FormLabelName>
                            <Input
                                type="select"
                                name="functionalStatusId"
                                id="functionalStatusId"
                                value={objValues.functionalStatusId}
                                onChange={handleInputChange}
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                disabled={!enableUpdate}
                                required
                            >
                                <option value="select">Select </option>

                                {functionalStatus.map((value) => (
                                <option key={value.id} value={value.id}>
                                    {value.display}
                                </option>
                                ))}
                            </Input>
                            {errors.functionalStatusId !=="" ? (
                                <span className={classes.error}>{errors.functionalStatusId}</span>
                            ) : "" }
                            </FormGroup>
                        </div>
                        <div className=" mb-3 col-md-6">
                            <FormGroup>
                            <FormLabelName >Level of Adherence *</FormLabelName>
                            <Input
                                type="select"
                                name="adherenceLevel"
                                id="adherenceLevel"
                                value={objValues.adherenceLevel}
                                onChange={handleInputChange}
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                disabled={!enableUpdate}
                                required
                            >
                                <option value="">Select </option>

                                {adherenceLevel.map((value) => (
                                <option key={value.id} value={value.id}>
                                    {value.display}
                                </option>
                                ))}
                            </Input>
                            {errors.adherenceLevel !=="" ? (
                                <span className={classes.error}>{errors.adherenceLevel}</span>
                            ) : "" }
                            </FormGroup>
                        </div>

                        </div>
                        <br />
                        <Label as='a' color='red' ribbon>
                        OPPORTUNISTIC INFECTION
                        </Label>
                        <br /><br />
                        <OpportunisticInfection setInfection={setInfection} infection={infection} setInfectionList={setInfectionList} infectionList={infectionList} enableUpdate={enableUpdate}/>
                        <br />
                        <Label as='a' color='pink' ribbon>
                        ADR
                        </Label>
                        <br /><br />
                        <ADR setAdrObj={setAdrObj} adrObj={adrObj} setAdrList={setAdrList} adrList={adrList}  enableUpdate={enableUpdate}/>
                        <br />
                        <Label as='a' color='teal' ribbon>
                        TB SCREENING
                        </Label>
                        <br /><br />
                        {/* TB Screening Form */}
                        <TBScreening tbObj={tbObj} setTbObj={setTbObj} enableUpdate={enableUpdate}/>
                        <br />
                        <Label as='a' color='blue' ribbon>
                        NEXT CLINICAL APPOINTMENT DATE
                        </Label>
                        <br /><br />
                        {/* TB Screening Form */}
                        <Input
                                type="date"
                                name="nextAppointment"
                                id="nextAppointment"
                                className="col-md-6"
                                value={objValues.nextAppointment}
                                onChange={handleInputChange}
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                min={moment(new Date()).format("YYYY-MM-DD")}
                                disabled={!enableUpdate}
                                required
                            />
                        {errors.nextAppointment !=="" ? (
                                <span className={classes.error}>{errors.nextAppointment}</span>
                            ) : "" }
                        <br />
                        <MatButton
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        disabled={saving}
                        startIcon={<SaveIcon />}
                        style={{backgroundColor:"#014d88"}}
                        onClick={handleSubmit}
                        >
                        {!saving ? (
                            <span style={{ textTransform: "capitalize" }}>Update</span>
                        ) : (
                            <span style={{ textTransform: "capitalize" }}>Updating...</span>
                        )}
                        </MatButton>
                    </Segment>
                    </Grid.Column>

                </Grid>
                    </div>
                </div>
            </div>
    </div>    
      {/* <AddVitals toggle={AddVitalToggle} showModal={addVitalModal} /> */}
      <AddAllergy toggle={AddAllergyToggle} showModal={addAllergyModal} />
      <AddCondition toggle={AddConditionToggle} showModal={addConditionModal} />
      <PostPatient toggle={PostPatientToggle} showModal={postPatientModal} />
    </div>
  );
};

export default ClinicVisit;
