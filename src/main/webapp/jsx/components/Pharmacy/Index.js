import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Input, Label, FormGroup, InputGroup,Row, Col , CardBody, Card } from "reactstrap";
import MatButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
//import {  Modal, Button } from "react-bootstrap";
import "react-widgets/dist/css/react-widgets.css";
import moment from "moment";
import { Spinner } from "reactstrap";
import Select from "react-select";
import {Icon, Label as LabelSui} from 'semantic-ui-react'
import { url as baseUrl, token } from "../../../api";


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
}))

const Pharmacy = (props) => {
    const classes = useStyles();
    const [saving, setSaving] = useState(false);
    const [selectedOption, setSelectedOption] = useState();
    const [showDsdModel, setShowDsdModel] = useState(false);
    const [regimen, setRegimen] = useState([]);
    const [regimenType, setRegimenType] = useState([]);
    const [objValues, setObjValues] = useState({
                                                adherence: "",
                                                adrScreened: "",
                                                adverseDrugReactions: {},
                                                extra: {},
                                                facilityId: 2,
                                                mmdType:null,
                                                nextAppointment: null,
                                                personId: 0,
                                                prescriptionError: null,
                                                regimenId: [
                                                0
                                                ],
                                                visitDate: null,
                                                visitId: 0
                                            });
    useEffect(() => {
        RegimenLine();
        }, []);
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
    //Get list of RegimenLine
    // const RegimenType =(id)=>{
    // axios
    //     .get(`${baseUrl}hiv/regimen/types/${id}`,
    //         { headers: {"Authorization" : `Bearer ${token}`} }
    //     )
    //     .then((response) => {

    //         setRegimenType(
    //             Object.entries(response.data).map(([key, value]) => ({
    //               label: value.description,
    //               value: value.id,
    //             })))
    //     })
    //     .catch((error) => {
    //     //console.log(error);
    //     });
    
    // }
    function RegimenType(id) {
        async function getCharacters() {
            const response = await axios.get(`${baseUrl}hiv/regimen/types/${id}`,
            { headers: {"Authorization" : `Bearer ${token}`} })
            setRegimenType(
                Object.entries(response.data).map(([key, value]) => ({
                  label: value.description,
                  value: value.id,
                })))
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
        }else{
            setRegimenType([])
        }
    }
    const handleCheckBox =e =>{
        if(e.target.checked){
            setShowDsdModel(true)
        }else{
            setShowDsdModel(false)
        }
    } 
    const handlRefillPeriod = e =>{
        const refillcount= e.target.value
        const visitDate = objValues.visitDate
        const nextrefillDate= moment(visitDate, "DD-MM-YYYY").add(refillcount, 'days');
       // console.log(nextrefillDate)
    }
    const handleSubmit = (e) => {        
        e.preventDefault();         
        //console.log(objValues)
    }



  return (      
      <div >
        <h2>Pharmacy Drug Refill</h2>        
        <Card >
            <CardBody>
            <form >
            <div className="row">
            <div className="form-group mb-3 col-md-12">
                    
                    <div className="form-check custom-checkbox ml-1 ">
                        <input
                        type="checkbox"
                        className="form-check-input"
                        
                        name="devolvePatient"
                        id="devolvePatient"
                        onChange={handleCheckBox}
                        //value={values.ovc_enrolled}
                        />
                        <label
                        className="form-check-label"
                        htmlFor="basic_checkbox_1"
                        >
                        Devolve Patient
                        </label>
                    </div>
                </div>
            <div className="form-group mb-3 col-md-4">
                <FormGroup>
                <Label for="artDate">Encounter Date * </Label>
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
                <Label >Refill Period(days) *</Label>
                <Input
                    type="select"
                    name="refillPeriod"
                    id="refillPeriod"
                    // value={objValues.drugName}
                    onChange={handlRefillPeriod}                    
                    >
                    <option value="">Select </option>
                    <option value="30">15</option>
                    <option value="30">30 </option>
                    <option value="60">60 </option>
                    <option value="90">90 </option>
                    <option value="90">120 </option>
                </Input>
                
                </FormGroup>
            </div>
        
            <div className="form-group mb-3 col-md-4">
            <FormGroup>
                <Label for="artDate"> Date of Next Appointment* </Label>
                <Input
                    type="datetime-local"
                    name="nextAppointment"
                    id="nextAppointment"
                    // onChange={handleInputChange}
                    // value={objValues.visitDate}
                    required
                />
                </FormGroup>
            </div>
            <div className="form-group mb-3 col-md-6">
            <FormGroup>
                <Label >Service Delivery Point *</Label>
                <Input
                    type="select"
                    name="drugName"
                    id="drugName"
                    // value={objValues.drugName}
                    // onChange={handleSelectedRegimen}
                    
                    >
                    <option value="">Select </option>
                    
                </Input>
                
                </FormGroup>
            </div>
            {showDsdModel && (
            <div className="form-group mb-3 col-md-6">
            <FormGroup>
                <Label >DSD Models*</Label>
                <Input
                    type="select"
                    name="dsdModel"
                    id="dsdModel"
                    // value={objValues.drugName}
                    // onChange={handleSelectedRegimen}
                    >
                    <option value="">Select </option>
                   
                </Input>
                
                </FormGroup>
            </div>
            )}
            <div className="form-group mb-3 col-md-6">
                    
                    <div className="form-check custom-checkbox ml-1 ">
                        <input
                        type="checkbox"
                        className="form-check-input"
                        
                        name="prescriptionError"
                        id="prescriptionError"
                        //onChange={handleCheckBox}
                        //value={values.ovc_enrolled}
                        />
                        <label
                        className="form-check-label"
                        htmlFor="basic_checkbox_1"
                        >
                        Any Prescription Error?
                        </label>
                    </div>
                    <br/>
                    <div className="form-check custom-checkbox ml-1 ">
                        <input
                        type="checkbox"
                        className="form-check-input"
                        
                        name="adverseDrugReactions"
                        id="adverseDrugReactions"
                        //onChange={handleCheckBox}
                        //value={values.ovc_enrolled}
                        />
                        <label
                        className="form-check-label"
                        htmlFor="basic_checkbox_1"
                        >
                        Advanced Drug Reactions
                        </label>
                    </div>
                </div>
                <div className="form-group mb-3 col-md-6">
                <FormGroup>
                    <Label >ADR</Label>
                    <Input
                        type="select"
                        name="adr"
                        id="adr"
                        // value={objValues.drugName}
                        // onChange={handleSelectedRegimen}
                        
                        >
                        <option value="">Select </option>
                        
                    </Input>
                    
                </FormGroup>
            </div>
            <hr/>
            <div className="form-group mb-3 col-md-12">
                <FormGroup>
                <Label >Select Regimen Type *</Label>
                <Input
                    type="select"
                    name="regimen"
                    id="regimen"
                    value={objValues.drugName}
                    onChange={handleSelectedRegimen}                   
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
            <div className="form-group mb-3 col-md-12">
                <FormGroup>
                <Label >Regimen *</Label>
                <Select
                    onChange={setSelectedOption}
                    value={selectedOption}
                    options={regimenType}
                    isMulti="true"
                    noOptionsMessage="true"
                />
                </FormGroup>
            </div>
            
            {regimenType.length >0 ? 

                (
                    <>
                        <Card>
                        <CardBody>
                        <h4>Enter Drugs Information </h4>
                        <div className="row">

                                <div className="form-group mb-3 col-md-6">
                                    <FormGroup>
                                    <Label >Regimen Name selected </Label>
                                    <Input
                                        type="number"
                                        // name={drugsInfo.code}
                                        // id={drugsInfo.code}
                                        // value=""
                                        // onChange={handleInputChangeOtherDetails}
                                        required
                                        >
                                        
                                    </Input>
                                
                                    </FormGroup>
                                </div>

                                <div className="form-group mb-3 col-md-3">
                                    <FormGroup>
                                    <Label >Quantity Dispsend</Label>
                                    <Input
                                        type="number"
                                        // name={drugsInfo.code}
                                        // id={drugsInfo.code}
                                        value="30"
                                        // onChange={handleInputChangeOtherDetails}
                                        required
                                        >
                                        
                                    </Input>
                                
                                    </FormGroup>
                                </div>
                                <div className="form-group mb-3 col-md-3"></div>
                                <div className="form-group mb-3 col-md-3"></div>
                       
                        </div>
                        </CardBody>
                        </Card>
                        <br/>
                    </>                  
                    )
                    :
                    ""
                }

            <Col md={12}>                  
                    <LabelSui as='a' color='black'  className="float-end" size='tiny' style={{ marginTop:20}}>
                    <Icon name='plus' /> Add Drug
                </LabelSui>
                    
            </Col>

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
                onClick={props.toggle}
                
            >
                <span style={{ textTransform: "capitalize" }}>Cancel</span>
            </MatButton>
            
                </form>
            </CardBody>
        </Card> 
    </div>
  );
}

export default Pharmacy;
