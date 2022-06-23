import React, {useState, useEffect} from 'react';
import { Input, Label, FormGroup, InputGroupText, InputGroup,Row, Col , CardBody, Card } from "reactstrap";
import MatButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
//import {  Modal, Button } from "react-bootstrap";
import "react-widgets/dist/css/react-widgets.css";
//import { DateTimePicker } from "react-widgets";
// import Moment from "moment";
// import momentLocalizer from "react-widgets-moment";
//import moment from "moment";
import { Spinner } from "reactstrap";
import Select from "react-select";
import {Icon, List, Label as LabelSui} from 'semantic-ui-react'

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
    const [regimenDrugs, setRegimenDrug] = useState([])
    const [objValues, setObjValues] = useState({ visitDate: "",whoStagingId: 0});
    const handleSubmit = (e) => {        
        e.preventDefault();         
        console.log(objValues)
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
                        
                        name="ovc_enrolled"
                        id="ovc_enrolled"
                        //onChange={handleCheckBox}
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
                    type="datetime-local"
                    name="visitDate"
                    id="visitDate"
                    // onChange={handleInputChange}
                    // value={objValues.visitDate}
                    required
                />
                </FormGroup>
            </div>
            <div className="form-group mb-3 col-md-4">
            <FormGroup>
                <Label >Refill Period *</Label>
                <Input
                    type="select"
                    name="drugName"
                    id="drugName"
                    // value={objValues.drugName}
                    // onChange={handleSelectedRegimen}
                    
                    >
                    <option value="">Select </option>
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
                    name="visitDate"
                    id="visitDate"
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
            <div className="form-group mb-3 col-md-6">
            <FormGroup>
                <Label >DSD Models*</Label>
                <Input
                    type="select"
                    name="drugName"
                    id="drugName"
                    // value={objValues.drugName}
                    // onChange={handleSelectedRegimen}
                    
                    >
                    <option value="">Select </option>
                    <option value="30">30 </option>
                    <option value="60">60 </option>
                    <option value="90">90 </option>
                    <option value="90">120 </option>
                </Input>
                
                </FormGroup>
            </div>
            <div className="form-group mb-3 col-md-6">
                    
                    <div className="form-check custom-checkbox ml-1 ">
                        <input
                        type="checkbox"
                        className="form-check-input"
                        
                        name="ovc_enrolled"
                        id="ovc_enrolled"
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
                        
                        name="ovc_enrolled"
                        id="ovc_enrolled"
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
                        name="drugName"
                        id="drugName"
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
                <Label >Select Regimen *</Label>
                <Input
                    type="select"
                    name="drugName"
                    id="drugName"
                    // value={objValues.drugName}
                    // onChange={handleSelectedRegimen}
                    
                    >
                    <option value="Select"> </option>
                    {/*                 
                        {regimens.map((value) => (
                            <option key={value.id} value={value.id}>
                                {value.name}
                            </option>
                        ))} */}
                </Input>
                
                </FormGroup>
            </div>
            {regimenDrugs.length >0 ? 
                (
                    <>
                        <Card>
                        <CardBody>
                        <h4>Enter Drugs Information </h4>
                        <div className="row">
                        {regimenDrugs.map((drugsInfo) => (
                            <>
                        <div className="form-group mb-3 col-md-4">
                        <FormGroup>
                        <Label >Drug </Label>
                        <Input
                                type="text"
                                // name={drugsInfo.name}
                                // id={drugsInfo.name}
                                // value={drugsInfo.name}
                                // onChange={handleInputChangeOtherDetails}
                                // required
                                ></Input>
                        </FormGroup>
                        </div>
                        
                        <div className="form-group mb-3 col-md-4">
                        <FormGroup>
                        <Label >	Dosage Strength - {drugsInfo.abbrev}</Label>
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
                    
                        <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                            <Label >Dosage Unit *</Label>
                            <Input
                                type="select"
                                // name={drugsInfo.code}
                                // id={drugsInfo.code}
                                // onChange={handleInputChangeOtherDetails}
                                // value=""
                                required
                            >
                                <option value="Select"> </option>
        
                                    {/* {dosageUnit.map((value) => (
                                        <option key={value.id} value={value.id}>
                                            {value.display}
                                        </option>
                                    ))} */}
                            </Input>
                            
                            </FormGroup>
                        </div>
                        </>
                        ))
                        }
                        </div>
                        </CardBody>
                        </Card>
                        <br/>
                    </>
                )
                :
                ""
            }
            <div className="form-group mb-3 col-md-6">
                <FormGroup>
                <Label >Dose Frequency</Label>
                <Input
                    type="number"
                    name="dosageFrequency"
                    id="dosageFrequency"
                    // value={objValues.dosageFrequency}
                    // onChange={handleInputChange}
                    required
                    >
                    
                </Input>
                {/* {errors.dosageFrequency !=="" ? (
                    <span className={classes.error}>{errors.dosageFrequency}</span>
                ) : "" } */}
                </FormGroup>
            </div>
            
            <div className="form-group mb-3 col-md-6">
                <FormGroup>
                <Label >Start Date </Label>
                <Input
                    type="date"
                    name="startDate"
                    id="startDate"
                    // value={objValues.startDate}
                    // onChange={handleInputChange}
                    required
                    >
                        
                </Input>
                </FormGroup>
            </div>
            <div className="form-group mb-3 col-md-6">
                <FormGroup>
                <Label >Duration </Label>
                <Input
                    type="number"
                    name="duration"
                    id="duration"
                    // value={objValues.duration}
                    // onChange={handleInputChange}
                    required
                    >
                    
                </Input>
                </FormGroup>
            </div>
            <div className="form-group mb-3 col-md-6">
                <FormGroup>
                <Label >Duration Unit </Label>
                <InputGroup> 
                    <Input 
                        type="number"
                        name="durationUnit"
                        id="durationUnit"
                        // onChange={handleInputChange}
                        // value={objValues.durationUnit} 
                    />
                    
                    
                </InputGroup>
                {/* {objValues.bodyWeight > 200 ? (
                        <span className={classes.error}>{"Body Weight cannot be greater than 200."}</span>
                    ) : "" } */}
                </FormGroup>
            </div>
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
