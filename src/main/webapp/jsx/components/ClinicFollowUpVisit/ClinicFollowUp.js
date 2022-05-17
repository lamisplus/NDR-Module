import React, { Fragment, useState, useEffect } from "react";
// import { Link } from 'react-router-dom';
import { Row } from "react-bootstrap";
import {  Modal, Button  } from "react-bootstrap";
import { Input, Label, FormGroup, InputGroupText, InputGroup  } from "reactstrap";
import { Tab, Grid,} from 'semantic-ui-react'
import MatButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { url as baseUrl } from "../../../api";
import { token as token } from "../../../api";
import axios from "axios";

const useStyles = makeStyles(theme => ({ 
    button: {
      margin: theme.spacing(1)
    },
}))

const ClinicFollowUp = (props) => {
  const patientObj = props.patientObj;
  const classes = useStyles();
  const [clinicalStage, setClinicalStage] = useState([]);
  const [functionalStatus, setFunctionalStatus] = useState([]);
  const [adherenceLevel, setAdherenceLevel] = useState([]);
  const [tbStatus, setTbStatus] = useState([]);
  const [prepSideEffect, setPrepSideEffect] = useState([]);
  const [objValues, setObjValues] = useState({
                                                adherenceLevel: "",
                                                adheres: {},
                                                adrScreened: "",
                                                adverseDrugReactions: {},
                                                artStatusId: 0,
                                                cd4: "",
                                                cd4Percentage: 0,
                                                clinicalNote: "",
                                                clinicalStageId: 0,
                                                facilityId: 0,
                                                functionalStatusId: 0,
                                                hivEnrollmentId: 0,
                                                nextAppointment: "",
                                                oiScreened: "",
                                                opportunisticInfections: {},
                                                personId: 0,
                                                stiIds: "",
                                                stiTreated: "",
                                                uuid: "",
                                                visitDate: "",
                                                vitalSignDto: {
                                                  bodyWeight: "",
                                                  diastolic:"",
                                                  encounterDate: "",
                                                  facilityId: 0,
                                                  height: "",
                                                  personId: props.patientObj.id,
                                                  serviceTypeId: "",
                                                  systolic:"" 
                                                },
                                                whoStagingId: 0
                                              });
  useEffect(() => {
    FunctionalStatus();
    WhoStaging();
    AdherenceLevel();
    TBStatus();
    PrepSideEffect();
  }, []);

    //Get list of WhoStaging
    const WhoStaging =()=>{
    axios
       .get(`${baseUrl}application-codesets/v2/CLINICAL_STAGE`,
           { headers: {"Authorization" : `Bearer ${token}`} }
       )
       .then((response) => {
           //console.log(response.data);
           setClinicalStage(response.data);
       })
       .catch((error) => {
       //console.log(error);
       });
   
    }
     //Get list of WhoStaging
    const PrepSideEffect =()=>{
    axios
       .get(`${baseUrl}application-codesets/v2/PREP_SIDE_EFFECTS`,
           { headers: {"Authorization" : `Bearer ${token}`} }
       )
       .then((response) => {
           //console.log(response.data);
           setPrepSideEffect(response.data);
       })
       .catch((error) => {
       //console.log(error);
       });
   
    }
   ///GET LIST OF FUNCTIONAL%20_STATUS
   // TB STATUS
    const TBStatus =()=>{
    axios
       .get(`${baseUrl}application-codesets/v2/TB_STATUS`,
           { headers: {"Authorization" : `Bearer ${token}`} }
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
        { headers: {"Authorization" : `Bearer ${token}`} }
        )
        .then((response) => {
            
            setFunctionalStatus(response.data);
            //setValues(response.data)
        })
        .catch((error) => {    
        });        
    }
    ///Level of Adherence
   async function AdherenceLevel () {
    axios
        .get(`${baseUrl}application-codesets/v2/PrEP_LEVEL_OF_ADHERENCE`,
        { headers: {"Authorization" : `Bearer ${token}`} }
        )
        .then((response) => {           
          setAdherenceLevel(response.data);
            //setValues(response.data)
        })
        .catch((error) => {    
        });        
    }
    //Get li
    const handleInputChange = e => {
    setObjValues ({...objValues,  [e.target.name]: e.target.value});
    if(e.target.name ==="entryPointId" ){
      if(e.target.value==="21"){
          //setTransferIn(true)
      }else{
          //setTransferIn(false)
      }
  }
    }
    const panes = [
    { menuItem: 'VISIT', render: () => 
      <Tab.Pane>
      <form >
        <div className="row">
          <div className="form-group mb-3 col-md-6">
              <FormGroup>
              <Label >Date of Visit </Label>
              <Input
                  type="date"
                  name="visitDate"
                  id="visitDate"
                  value={objValues.visitDate}
                  onChange={handleInputChange}
                  required
                  > 
              </Input>
            
              </FormGroup>
          </div>
          <div className="form-group mb-3 col-md-6"></div>
          <div className="form-group mb-3 col-md-6">
              <FormGroup>
              <Label >Body Weight</Label>
              
              <InputGroup>
              <InputGroupText>
                  kg
              </InputGroupText> 
                  <Input 
                      type="number"
                      name="bodyWeight"
                      id="bodyWeight"
                      onChange={handleInputChange}
                      value={objValues.bodyWeight} 
                  />   
              </InputGroup>
              {objValues.bodyWeight > 200 ? (
                      <span className={classes.error}>{"Body Weight cannot be greater than 200."}</span>
                  ) : "" }
              </FormGroup>
          </div>
          
          <div className="form-group mb-3 col-md-6">
              <FormGroup>
              <Label >Height</Label>
              <InputGroup>
              <InputGroupText>
                  m
              </InputGroupText> 
                  <Input 
                      type="number"
                      name="height"
                      id="height"
                      onChange={handleInputChange}
                      value={objValues.height} 
                  />
                  
              </InputGroup>
              {objValues.height > 3 ? (
                      <span className={classes.error}>{"Height cannot be greater than 3."}</span>
                  ) : "" }
              </FormGroup>
          </div>
          <div className="form-group mb-3 col-md-6">
              <FormGroup>
              <Label >Blood Pressure</Label>
              <InputGroup> 
              <InputGroupText>
                  systolic(mmHg)
              </InputGroupText>
                  <Input 
                      type="number"
                      name="bloodPressureSystolic"
                      id="bloodPressureSystolic"
                      onChange={handleInputChange}
                      value={objValues.bloodPressureSystolic} 
                  />
                  
              </InputGroup>
              {objValues.bloodPressureSystolic > 200 ? (
                      <span className={classes.error}>{"Blood Pressure cannot be greater than 200."}</span>
                  ) : "" }
              </FormGroup>
          </div>
          <div className="form-group mb-3 col-md-6">
              <FormGroup>
              <Label >Blood Pressure</Label>
              
              <InputGroup> 
              <InputGroupText>
                    diastolic(mmHg)
                </InputGroupText>
                  <Input 
                      type="text"
                      name="bloodPressureDiastolic"
                      id="bloodPressureDiastolic"
                      onChange={handleInputChange}
                      value={objValues.bloodPressureDiastolic} 
                  />
                  
              </InputGroup>
              {objValues.bloodPressureDiastolic > 200 ? (
                      <span className={classes.error}>{"Blood Pressure cannot be greater than 200."}</span>
                  ) : "" }
              </FormGroup>
          </div>
      
      </div>
    
      </form>
      </Tab.Pane> 
    },
    { menuItem: 'CONSULTATION', render: () => 
      <Tab.Pane>
        <form>
          <div className="row">
            
            <div className="form-group mb-3 col-md-6">
            <FormGroup>
                <Label >WHO Staging</Label>
                <Input
                    type="select"
                    name="whoStagingId"
                    id="whoStagingId"
                    value={objValues.whoStagingId}
                    onChange={handleInputChange}
                    required
                    >
                      <option value=""> </option>

                        {clinicalStage.map((value) => (
                            <option key={value.id} value={value.id}>
                                {value.display}
                            </option>
                        ))}
                </Input>
                
              </FormGroup>
            </div>
            <div className="form-group mb-3 col-md-6">
            <FormGroup>
              <Label >Functional Status</Label>
              <Input
                  type="select"
                  name="functionalStatusId"
                  id="functionalStatusId"
                  value={objValues.functionalStatusId}
                  onChange={handleInputChange}
                  required
                  >
                    <option value=""> </option>

                      {functionalStatus.map((value) => (
                          <option key={value.id} value={value.id}>
                              {value.display}
                          </option>
                      ))}
              </Input>
            </FormGroup>
            </div>
            <div className="form-group mb-3 col-md-6">
            <FormGroup>
              <Label >Level of Adherence</Label>
              <Input
                  type="select"
                  name="adherenceLevel"
                  id="adherenceLevel"
                  value={objValues.adherenceLevel}
                  onChange={handleInputChange}
                  required
                  >
                    <option value=""> </option>

                      {adherenceLevel.map((value) => (
                          <option key={value.id} value={value.id}>
                              {value.display}
                          </option>
                      ))}
              </Input>
            </FormGroup>
            </div>
            <div className="form-group mb-3 col-md-6"></div>
            <div className="form-group mb-3 col-md-8">
                <FormGroup>
                <Label >Clinical Notes</Label>
                <Input
                    type="textarea"
                    name="clinicalNote"
                    rows="40" cols="50"
                    id="clinicalNote"
                    onChange={handleInputChange}
                    value={objValues.clinicalNote}
                    required
                />
                </FormGroup>
            </div>
          </div>
        </form>
      </Tab.Pane> 
    },
    { menuItem: 'TB SCREENING', render: () => 
      <Tab.Pane>
        <form>
          <div className="row">
            
            <div className="form-group mb-3 col-md-6">
            <FormGroup>
                <Label >Patient on Anti TB Drugs?</Label>
                <Input
                    type="select"
                    name="whoStagingId"
                    id="whoStagingId"
                    value={objValues.whoStagingId}
                    onChange={handleInputChange}
                    required
                    >
                      <option value=""> </option>
                      <option value="YES"> YES</option>
                      <option value="NO">NO </option>

                </Input>
                
              </FormGroup>
            </div>
            <div className="form-group mb-3 col-md-6">
            <FormGroup>
              <Label >Patient Currently on IPT?</Label>
              <Input
                  type="select"
                  name="functionalStatusId"
                  id="functionalStatusId"
                  value={objValues.functionalStatusId}
                  onChange={handleInputChange}
                  required
                  >
                    <option value=""> </option>
                    <option value="YES"> YES</option>
                      <option value="NO">NO </option>
              </Input>
            </FormGroup>
            </div>
            <div className="form-group mb-3 col-md-4">
            <FormGroup>
              <Label >Couching?</Label>
              <Input
                  type="select"
                  name="adherenceLevel"
                  id="adherenceLevel"
                  value={objValues.adherenceLevel}
                  onChange={handleInputChange}
                  required
                  >
                    <option value=""> </option>
                    <option value="YES"> YES</option>
                    <option value="NO">NO </option>
              </Input>
            </FormGroup>
            </div>
            <div className="form-group mb-3 col-md-4">
            <FormGroup>
              <Label >Night Sweat?</Label>
              <Input
                  type="select"
                  name="adherenceLevel"
                  id="adherenceLevel"
                  value={objValues.adherenceLevel}
                  onChange={handleInputChange}
                  required
                  >
                    <option value=""> </option>
                    <option value="YES"> YES</option>
                    <option value="NO">NO </option>
              </Input>
            </FormGroup>
            </div>
            <div className="form-group mb-3 col-md-4">
            <FormGroup>
              <Label >Fever</Label>
              <Input
                  type="select"
                  name="adherenceLevel"
                  id="adherenceLevel"
                  value={objValues.adherenceLevel}
                  onChange={handleInputChange}
                  required
                  >
                    <option value=""> </option>
                    <option value="YES"> YES</option>
                    <option value="NO">NO </option>
              </Input>
            </FormGroup>
            </div>
            <div className="form-group mb-3 col-md-4">
            <FormGroup>
              <Label >Countact with TB Case?</Label>
              <Input
                  type="select"
                  name="adherenceLevel"
                  id="adherenceLevel"
                  value={objValues.adherenceLevel}
                  onChange={handleInputChange}
                  required
                  >
                    <option value=""> </option>
                    <option value="YES"> YES</option>
                    <option value="NO">NO </option>
              </Input>
            </FormGroup>
            </div>
            <div className="form-group mb-3 col-md-4">
            <FormGroup>
              <Label >Lethergy</Label>
              <Input
                  type="select"
                  name="adherenceLevel"
                  id="adherenceLevel"
                  value={objValues.adherenceLevel}
                  onChange={handleInputChange}
                  required
                  >
                    <option value=""> </option>
                    <option value="YES"> YES</option>
                  <option value="NO">NO </option>
              </Input>
            </FormGroup>
            </div>
            <div className="form-group mb-3 col-md-4">
            <FormGroup>
              <Label >TB Status</Label>
              <Input
                  type="select"
                  name="tbStatusId"
                  id="tbStatusId"
                  value={objValues.tbStatusId}
                  onChange={handleInputChange}
                  required
                  >
                    <option value=""> </option>

                      {tbStatus.map((value) => (
                          <option key={value.id} value={value.id}>
                              {value.display}
                          </option>
                      ))}
              </Input>
            </FormGroup>
            </div>
            
          </div>
        </form>
      </Tab.Pane> 
    },
    { menuItem: 'OPPORTUNISTIC INFECTION', render: () => 
      <Tab.Pane>
        <form >
        <div className="row">
          <div className="form-group mb-3 col-md-6">
              <FormGroup>
              <Label >Onset Date </Label>
              <Input
                  type="date"
                  name="visitDate"
                  id="visitDate"
                  value={objValues.visitDate}
                  onChange={handleInputChange}
                  required
                  > 
              </Input>
            
              </FormGroup>
          </div>
          <div className="form-group mb-3 col-md-6">
         
          <FormGroup>
              <Label > Illness</Label>
              <Input
                  type="text"
                  name="visitDate"
                  id="visitDate"
                  value={objValues.visitDate}
                  onChange={handleInputChange}
                  required
                  > 
              </Input>
            
              </FormGroup>
          </div>
         
      </div>
    
        </form>
      </Tab.Pane> 
    },
    { menuItem: 'ADR', render: () => 
      <Tab.Pane>
        <form >
        <div className="row">
          <div className="form-group mb-3 col-md-6">
              <FormGroup>
              <Label >ADR </Label>
              <Input
                  type="select"
                  name="adr"
                  id="adr"
                  value={objValues.adr}
                  onChange={handleInputChange}
                  required
                  >
                    <option value=""> </option>

                      {prepSideEffect.map((value) => (
                          <option key={value.id} value={value.id}>
                              {value.display}
                          </option>
                      ))}
              </Input>
            
              </FormGroup>
          </div>
          <div className="form-group mb-3 col-md-6">
         
          <FormGroup>
              <Label > Onset Date</Label>
              <Input
                  type="date"
                  name="visitDate"
                  id="visitDate"
                  value={objValues.visitDate}
                  onChange={handleInputChange}
                  required
                  > 
              </Input>
            
              </FormGroup>
          </div>
         
        </div>
    
        </form>
      </Tab.Pane> 
    },
  ]

  return (
    <Fragment>
       <Modal show={props.showModal} toggle={props.toggle} className="fade" size="lg">
            <Modal.Header toggle={props.toggle} style={{backgroundColor:"#eeeeee"}}>
                 Clinic Follow Up Visit - <b>{patientObj.firstname + " " + patientObj.surname }</b>
                 <Button
                    variant=""
                    className="btn-close"
                    onClick={props.toggle}
                ></Button>
             </Modal.Header>
                <Modal.Body>       
                  <Row>
                    <Tab panes={panes} />
                    <Grid>
                      <Grid.Column width={4}>
                    <MatButton
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        
                        //onClick={handleSubmit}
                    >
                      Save
                    </MatButton>
                    </Grid.Column>
                    </Grid>
                  </Row>
                </Modal.Body>
          </Modal>
    </Fragment>
  );
};

export default ClinicFollowUp;
