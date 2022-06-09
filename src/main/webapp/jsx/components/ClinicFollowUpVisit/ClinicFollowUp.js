import React, { Fragment, useState, useEffect } from "react";
// import { Link } from 'react-router-dom';
import { Row } from "react-bootstrap";
import {  Modal, Button, Table  } from "react-bootstrap";
import { Input, Label, FormGroup, InputGroupText, InputGroup  } from "reactstrap";
import { Tab, Grid,} from 'semantic-ui-react'
import MatButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { url as baseUrl } from "../../../api";
import { token as token } from "../../../api";
import axios from "axios";
import {Icon, List, Label as LabelSui} from 'semantic-ui-react'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@material-ui/icons/Delete'

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
let adherenceLevelObj= []

const ClinicFollowUp = (props) => {
  const patientObj = props.patientObj;
  const classes = useStyles();
  const [clinicalStage, setClinicalStage] = useState([]);
  const [functionalStatus, setFunctionalStatus] = useState([]);
  const [adherenceLevel, setAdherenceLevel] = useState([]);
  const [tbStatus, setTbStatus] = useState([]);
  const [prepSideEffect, setPrepSideEffect] = useState([]);
  const [adrObj, setAdrObj] = useState({adr:"", adrOnsetDate:""});
  const [adrList, setAdrList] = useState([]);
  const [infection, setInfection] = useState({illnessInfection:"", ondateInfection:""});
  const [infectionList, setInfectionList] = useState([]);
  const [TBForms, setTBForms] = useState(false)
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
                                                lmpDate:"",
                                                oiScreened: "",
                                                opportunisticInfections: {},
                                                personId: 0,
                                                stiIds: "",
                                                stiTreated: "",
                                                uuid: "",
                                                visitDate: "",
                                                
                                                whoStagingId: 0
                                              });
  const [vital, setVitalSignDto]= useState({
                                            bodyWeight: "",
                                            diastolic:"",
                                            encounterDate: "",
                                            facilityId: 1,
                                            height: "",
                                            personId: props.patientObj.id,
                                            serviceTypeId: 1,
                                            systolic:"" 
                                            })
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
           adherenceLevelObj=response.data
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
          
        })
        .catch((error) => {    
        });        
    }
    //Get li
    const handleInputChange = e => {
    setObjValues ({...objValues,  [e.target.name]: e.target.value});
    if(e.target.name ==="whoStagingId" ){
      if(e.target.value==="NO"){
          setTBForms(true)
      }else{
          setTBForms(false)
      }
    }
  }
  const handleInputChangeVitalSignDto = e => {            
    setVitalSignDto ({...vital,  [e.target.name]: e.target.value});
  }
  const handAdrleInputChange = e => {
    setAdrObj ({...adrObj,  [e.target.name]: e.target.value});
  }
  const handleInfectionInputChange = e => {
    setInfection ({...infection,  [e.target.name]: e.target.value});
  }
  const addADR = e => { 
    setAdrList([...adrList, adrObj])
  }
  /* Remove ADR  function **/
  const removeRelativeLocation = index => {       
      adrList.splice(index, 1);
      setAdrList([...adrList]);
     
  };
  const addInfection = e => { 
    setInfectionList([...infectionList, infection])
  }
  /* Remove ADR  function **/
  const removeInfection = index => {       
  infectionList.splice(index, 1);
  setInfectionList([...infectionList]);
     
  };

  const panes = [
  { menuItem: 'VISIT', render: () => 
    <Tab.Pane>

      <div className="row">
        <div className="form-group mb-3 col-md-6">
            <FormGroup>
            <Label >Date of Visit </Label>
            <Input
                type="date"
                name="encounterDate"
                id="encounterDate"
                value={vital.encounterDate}
                onChange={handleInputChangeVitalSignDto}
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
                    onChange={handleInputChangeVitalSignDto}
                    value={vital.bodyWeight} 
                />   
            </InputGroup>
            {vital.bodyWeight > 200 ? (
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
                    onChange={handleInputChangeVitalSignDto}
                    value={vital.height} 
                />
                
            </InputGroup>
            {vital.height > 3 ? (
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
                    name="systolic"
                    id="systolic"
                    onChange={handleInputChangeVitalSignDto}
                    value={vital.systolic} 
                />
                
            </InputGroup>
            {vital.systolic > 200 ? (
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
                    name="diastolic"
                    id="diastolic"
                    onChange={handleInputChangeVitalSignDto}
                    value={vital.diastolic} 
                />
                
            </InputGroup>
            {vital.diastolic > 200 ? (
                    <span className={classes.error}>{"Blood Pressure cannot be greater than 200."}</span>
                ) : "" }
            </FormGroup>
        </div>
    
    </div>
    </Tab.Pane> 
  },
  { menuItem: 'CONSULTATION', render: () => 
    <Tab.Pane>

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
      
    </Tab.Pane> 
  },
  { menuItem: 'TB SCREENING', render: () => 
    <Tab.Pane>

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
          {TBForms===true ? (
            <>
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
          </>
          )
          :
          ""
          }
        </div>
      
    </Tab.Pane> 
  },
  { menuItem: 'OPPORTUNISTIC INFECTION', render: () => 
    <Tab.Pane>
      <div className="row">
        <div className="form-group mb-3 col-md-5">
            <FormGroup>
            <Label >Onset Date </Label>
            <Input
                type="date"
                name="ondateInfection"
                id="ondateInfection"
                value={infection.ondateInfection}
                onChange={handleInfectionInputChange}
                required
                > 
            </Input>
          
            </FormGroup>
        </div>
        <div className="form-group mb-3 col-md-5">        
        <FormGroup>
            <Label > Illness</Label>
            <Input
                type="text"
                name="illnessInfection"
                id="illnessInfection"
                value={infection.illnessInfection}
                onChange={handleInfectionInputChange}
                required
                > 
            </Input>
          
            </FormGroup>
        </div>
        <div className="form-group mb-3 col-md-2">
        <LabelSui as='a' color='black'  onClick={addInfection}  size='tiny' style={{ marginTop:35}}>
            <Icon name='plus' /> Add
        </LabelSui>
        </div>
        {infectionList.length >0 
          ?
            <List>
            <Table  striped responsive>
                  <thead >
                      <tr>
                          <th>Illness</th>
                          <th>OnSetDate</th>
                          <th ></th>
                      </tr>
                  </thead>
                  <tbody>
                {infectionList.map((relative, index) => (

                  <InfectionList
                      key={index}
                      index={index}
                      relative={relative}
                      removeInfection={removeInfection}
                  />
                  ))}
                  </tbody>
                  </Table>
                </List>
                :
                ""
            } 
    </div>

    </Tab.Pane> 
  },
  { menuItem: 'ADR', render: () => 
    <Tab.Pane>

      <div className="row">
        <div className="form-group mb-3 col-md-5">
            <FormGroup>
            <Label >ADR </Label>
            <Input
                type="select"
                name="adr"
                id="adr"
                value={adrObj.adr}
                onChange={handAdrleInputChange}
                required
                >
                  <option value=""> </option>

                    {prepSideEffect.map((value) => (
                        <option key={value.id} value={value.display}>
                            {value.display}
                        </option>
                    ))}
            </Input>
          
            </FormGroup>
        </div>
        <div className="form-group mb-3 col-md-5">        
        <FormGroup>
            <Label > Onset Date</Label>
            <Input
                type="date"
                name="adrOnsetDate"
                id="adrOnsetDate"
                value={adrObj.adrOnsetDate}
                onChange={handAdrleInputChange}
                required
                > 
            </Input>
          
            </FormGroup>
        </div>
        
        <div className="form-group mb-3 col-md-2">
        <LabelSui as='a' color='black'  onClick={addADR}  size='tiny' style={{ marginTop:35}}>
            <Icon name='plus' /> Add
        </LabelSui>
        </div>

        {adrList.length >0 
          ?
            <List>
            <Table  striped responsive>
                  <thead >
                      <tr>
                          <th>ADR</th>
                          <th>OnSetDate</th>
                          <th ></th>
                      </tr>
                  </thead>
                  <tbody>
                {adrList.map((relative, index) => (

                  <RelativeList
                      key={index}
                      index={index}
                      relative={relative}
                      removeRelativeLocation={removeRelativeLocation}
                  />
                  ))}
                  </tbody>
                  </Table>
                </List>
                :
                ""
            }       
              </div>

    </Tab.Pane> 
  },
]

/**** Submit Button Processing  */
const handleSubmit = (e) => {        
    e.preventDefault();         
    console.log(objValues)
}

  return (
    <Fragment>
       <Modal show={props.showModal} toggle={props.toggle} className="fade" size="xl">
             <Modal.Header toggle={props.toggle} style={{backgroundColor:"#eeeeee"}}>
                 Clinic Follow Up Visit
                 <Button
                    variant=""
                    className="btn-close"
                    onClick={props.toggle}
                ></Button>
             </Modal.Header>
                <Modal.Body>       
                  <Row>
                  <form>
                    <Tab panes={panes} />
                  </form>
                    <Grid>
                      <Grid.Column width={4}>
                    <MatButton
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={handleSubmit}
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

function RelativeList({
  relative,
  index,
  removeRelativeLocation,
}) {


  return (
          <tr>
              <th>{relative.adr}</th>
              <th>{relative.adrOnsetDate}</th>
              <th></th>
              <th >
                  <IconButton aria-label="delete" size="small" color="error" onClick={() =>removeRelativeLocation(index)}>
                      <DeleteIcon fontSize="inherit" />
                  </IconButton>
                  
              </th>
          </tr> 
  );
}

function InfectionList({
  relative,
  index,
  removeInfection,
}) {

 
  return (
          <tr>

              <th>{relative.illnessInfection}</th>
              <th>{relative.ondateInfection}</th>
              <th></th>
              <th >
                  <IconButton aria-label="delete" size="small" color="error" onClick={() =>removeInfection(index)}>
                      <DeleteIcon fontSize="inherit" />
                  </IconButton>
                  
              </th>
          </tr> 
  );
}
export default ClinicFollowUp;
