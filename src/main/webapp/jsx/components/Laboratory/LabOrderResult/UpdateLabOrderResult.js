import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Input, Label, FormGroup,Row, Col , CardBody, Card, Table } from "reactstrap";
import MatButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import "react-widgets/dist/css/react-widgets.css";
//import moment from "moment";
import { Spinner } from "reactstrap";
import { url as baseUrl, token } from "../../../../api";
import moment from "moment";
import { List, Label as LabelSui} from 'semantic-ui-react'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { toast} from "react-toastify";
import {Alert } from "react-bootstrap";
import { Icon,Button, } from 'semantic-ui-react'


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

const Laboratory = (props) => {
    let visitId=""
    const patientObj = props.patientObj;
    const enrollDate = patientObj && patientObj.enrollment ? patientObj.enrollment.dateOfRegistration : null
    const classes = useStyles();
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});
    const [buttonHidden, setButtonHidden]= useState(false);
    const [moduleStatus, setModuleStatus]= useState("0")
    const [testGroup, setTestGroup] = useState([]);
    const [test, setTest] = useState([]);
    const [vlRequired, setVlRequired]=useState(false)
    //const [currentVisit, setCurrentVisit]=useState(true)
    const [vLIndication, setVLIndication] = useState([]);
    const [testOrderList, setTestOrderList] = useState([]);//Test Order List
    const [showVLIndication, setShowVLIndication] = useState(false);
    const [eacStatusObj, setEacStatusObj] = useState()
    let temp = { ...errors }
    const [tests, setTests]=useState({

                                        comments: "",
                                        dateAssayed: "",
                                        labNumber: "",
                                        labTestGroupId: "",
                                        labTestId: "",
                                        dateResultReceived:"",
                                        patientId:props.patientObj?props.patientObj.id:"",
                                        result: "",
                                        sampleCollectionDate: null,
                                        viralLoadIndication: 0,
                                        visitId:"" ,
                                        checkedBy: "",
                                        clinicianName: "",
                                        dateChecked: "",
                                        dateResultReported: "",
                                        id: "",
                                        orderId: "",
                                        resultReportedBy: "",
                                    })
useEffect(() => {
        TestGroup();
        ViraLoadIndication();
        //PatientVisit();
        CheckLabModule();
        CheckEACStatus();
        setTests({...props.activeContent.obj})
        tests.sampleCollectionDate=moment(props.activeContent.obj.sampleCollectionDate).format("YYYY-MM-DD HH:MM:SS")
        tests.dateResultReceived=moment(props.activeContent.obj.dateResultReceived).format("YYYY-MM-DD HH:MM:SS")
        //setTest(props.activeContent.obj.labTestId)
    }, [props.patientObj.id, props.activeContent.obj]);
    console.log(props.activeContent.obj)
     //Get EAC Status
     const CheckEACStatus =()=>{
        axios
           .get(`${baseUrl}hiv/eac/open/patient/${props.patientObj.id}`,
               { headers: {"Authorization" : `Bearer ${token}`} }
           )
           .then((response) => {
               setEacStatusObj(response.data);
           })
           .catch((error) => {
           //console.log(error);
           });
       
    }
    //Get list of Test Group
    const TestGroup =()=>{
        axios
            .get(`${baseUrl}laboratory/labtestgroups`,
                { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then((response) => {
                setTestGroup(response.data);
                const getTestList= response.data.filter((x)=> x.id===parseInt(props.activeContent.obj.labTestGroupId))
                setTest(getTestList[0].labTests)
            })
            .catch((error) => {
            //console.log(error);
            });
        
    }

    //Check if Module Exist
    const CheckLabModule =()=>{
        axios
            .get(`${baseUrl}modules/check?moduleName=laboratory`,
                { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then((response) => {
                if(response.data===true){
                setModuleStatus("1")
                setButtonHidden(false)
                }
                else{
                    setModuleStatus("2")
                    //toast.error("Laboratory module is not install")
                    setButtonHidden(true)
                }
            }).catch((error) => {
            //console.log(error);
            });
        
    }
    
    //Get list of Test Group
    const ViraLoadIndication =()=>{
        axios
            .get(`${baseUrl}application-codesets/v2/VIRAL_LOAD_INDICATION`,
                { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then((response) => {
                setVLIndication(response.data);
            })
            .catch((error) => {
            //console.log(error);
            });        
    }
    const handleSelectedTestGroup = e =>{

        setTests ({...tests,  labTestGroupId: e.target.value});
        const getTestList= testGroup.filter((x)=> x.id===parseInt(e.target.value))
        setTest(getTestList[0].labTests)
        if(e.target.value==='4'){            
            setVlRequired(true)
        }else{
            setVlRequired(false) 
        }
        //setTests ({...tests,  [e.target.name]: e.target.value}); 
    }
    const handleInputChangeObject = e => {
        setErrors({...temp, [e.target.name]:""})//reset the error message to empty once the field as value
        setTests ({...tests,  [e.target.name]: e.target.value});               
    }
    const handleInputChange = e => {
        setErrors({...temp, [e.target.name]:""})//reset the error message to empty once the field as value
        setTests ({...tests,  [e.target.name]: e.target.value});               
    }
    const handleInputChangeTest = e => {
        setErrors({...temp, [e.target.name]:""})//reset the error message to empty once the field as value
        if(e.target.value==="16"){
            setShowVLIndication(true)
            setTests ({...tests,  labTestId: e.target.value});
        }else{
            setShowVLIndication(false)
            setTests ({...tests,  labTestId: e.target.value});
        }
        //setObjValues ({...objValues,  [e.target.name]: e.target.value});       
    }
    const addOrder = e => {   
        if(validate()){            
            tests.visitId=visitId
            setTestOrderList([...testOrderList, tests])
        }
      }
      /* Remove ADR  function **/
      const removeOrder = index => {       
        testOrderList.splice(index, 1);
        setTestOrderList([...testOrderList]);
         
      };
      //Validations of the forms
      const validate = () => {        
        temp.dateAssayed = tests.dateAssayed ? "" : "This field is required"
        temp.labTestGroupId = tests.labTestGroupId ? "" : "This field is required"
        temp.labTestId = tests.labTestId ? "" : "This field is required"
        temp.labNumber = tests.labNumber ? "" : "This field is required"
        temp.dateResultReceived =  tests.dateResultReceived ? "" : "This field is required"
        tests.labTestId==='16' && (temp.viralLoadIndication = tests.viralLoadIndication ? "" : "This field is required")
        temp.result = tests.result ? "" : "This field is required"
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x == "")
    }
    
    const handleSubmit = (e) => {        
        e.preventDefault();            
        setSaving(true);
        tests.sampleCollectionDate = moment(tests.sampleCollectionDate).format("YYYY-MM-DD HH:MM:SS") 
        tests.dateResultReceived = moment(tests.dateResultReceived).format("YYYY-MM-DD HH:MM:SS")
        axios.put(`${baseUrl}laboratory/rde-orders/tests/${props.activeContent.obj.id}`,tests,
            { headers: {"Authorization" : `Bearer ${token}`}},)
            .then(response => {
                setSaving(false);
                toast.success("Laboratory test order updated successful");
                props.setActiveContent({...props.activeContent, route:'laboratoryOrderResult', id:props.activeContent.obj.id, activeTab:"history", actionType:"update", obj:props.activeContent.obj})
            })
            .catch(error => {
                setSaving(false);
                if(error.response && error.response.data){
                    let errorMessage = error.response.data && error.response.data.apierror.message!=="" ? error.response.data.apierror.message :  "Something went wrong, please try again";
                    toast.error(errorMessage); 
                }                  
            }); 
    }


  return (      
      <div >

        <div className="row">
        <div className="col-md-6">
        <h2>Laboratory Order & Result </h2>
        </div>
     
        <br/>
        <br/>
        <Card className={classes.root}>
            <CardBody>
            {/* {moduleStatus==="1" && ( */}
                <form >
                <div className="row">
                    
                    <Row>
                        <Col md={4} className="form-group mb-3">
                            <FormGroup>
                                <Label for="encounterDate">laboratory Number(Sample Numbe)* </Label>
                                <Input
                                    type="text"
                                    name="labNumber"
                                    id="labNumber"
                                    value={tests.labNumber}
                                    onChange={handleInputChange}
                                    style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                    required
                                />
                                {errors.labNumber !=="" ? (
                                    <span className={classes.error}>{errors.labNumber}</span>
                                ) : "" }
                            </FormGroup>
                        </Col>
                        <Col md={4} className="form-group mb-3">
                            <FormGroup>
                                <Label for="testGroup">Select Test Group*</Label>
                                <Input
                                    type="select"
                                    name="labTestGroupId"
                                    id="labTestGroupId"
                                    value={tests.labTestGroupId}
                                    onChange={handleSelectedTestGroup} 
                                    style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}                  
                                    >
                                    <option value="">Select </option>
                                                    
                                        {testGroup.map((value) => (
                                            <option key={value.id} value={value.id}>
                                                {value.groupName}
                                            </option>
                                        ))}
                                </Input>
                                {errors.labTestGroupId !=="" ? (
                                    <span className={classes.error}>{errors.labTestGroupId}</span>
                                ) : "" }
                            </FormGroup>
                        </Col>
                        <Col md={4} className="form-group mb-3">
                            <FormGroup>
                                <Label for="testGroup">Select Test*</Label>
                                <Input
                                    type="select"
                                    name="labTestId"
                                    id="labTestId"
                                    value={tests.labTestId}
                                    onChange={handleInputChangeTest} 
                                    style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}                  
                                    >
                                    <option value="">Select </option>
                                                    
                                        {test.map((value) => (
                                            <option key={value.id} value={value.id}>
                                                {value.labTestName}
                                            </option>
                                        ))}
                                </Input>
                                {errors.labTestId !=="" ? (
                                    <span className={classes.error}>{errors.labTestId}</span>
                                ) : "" }
                            </FormGroup>
                        </Col>
                        <Col md={4} className="form-group mb-3">
                            <FormGroup>
                                <Label for="encounterDate"> Date Sample Collected*</Label>
                                <Input
                                    type="datetime-local"
                                    name="sampleCollectionDate"
                                    id="sampleCollectionDate"
                                    value={tests.sampleCollectionDate}
                                    onChange={handleInputChange}
                                    min={eacStatusObj && eacStatusObj.eacsession && eacStatusObj.eacsession!=='Default' ? eacStatusObj.eacsessionDate :enrollDate}
                                    max= {moment(new Date()).format("YYYY-MM-DD") }
                                    style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                    required
                                />
                                {errors.sampleCollectionDate !=="" ? (
                                    <span className={classes.error}>{errors.sampleCollectionDate}</span>
                                ) : "" }
                            </FormGroup>
                        </Col>
                        <Col md={4} className="form-group mb-3">
                            <FormGroup>
                                <Label for="encounterDate">Date Result Received*</Label>
                                <Input
                                    type="datetime-local"
                                    name="dateResultReceived"
                                    id="dateResultReceived"
                                    value={tests.dateResultReceived}
                                    onChange={handleInputChange}
                                    min={tests.sampleCollectionDate}
                                    max= {moment(new Date()).format("YYYY-MM-DD") }
                                    style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                    required
                                />
                                {errors.dateResultReceived !=="" ? (
                                    <span className={classes.error}>{errors.dateResultReceived}</span>
                                ) : "" }
                            </FormGroup>
                        </Col>                       
                        <Col md={4} className="form-group mb-3">
                            <FormGroup>
                                <Label for="priority">Result*</Label>
                                <Input
                                    type="text"
                                    name="result"
                                    id="result"
                                    value={tests.result}
                                    onChange={handleInputChange}  
                                    style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}                 
                                    >
                                   
                                </Input>
                                {errors.result !=="" ? (
                                    <span className={classes.error}>{errors.result}</span>
                                ) : "" }
                            </FormGroup>
                        </Col>
                       {tests.labTestId==='16' || tests.labTestId===16 && (
                        <Col md={4} className="form-group mb-3">
                                <FormGroup>
                                    <Label for="vlIndication">VL Indication*</Label>
                                    <Input
                                    type="select"
                                    name="viralLoadIndication"
                                    id="viralLoadIndication"
                                    value={tests.viralLoadIndication}
                                    onChange={handleInputChange}  
                                    style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}                 
                                    >
                                    <option value="">Select </option>
                                                    
                                        {vLIndication.map((value) => (
                                            <option key={value.id} value={value.id}>
                                                {value.display}
                                            </option>
                                        ))}
                                </Input>
                                {errors.viralLoadIndication !=="" ? (
                                    <span className={classes.error}>{errors.viralLoadIndication}</span>
                                ) : "" }
                                </FormGroup>
                        </Col>
                        )}
                        <Col md={4} className="form-group mb-3">
                            <FormGroup>
                                <Label for="encounterDate">Reported by</Label>
                                <Input
                                    type="text"
                                    name="resultReportedBy"
                                    id="resultReportedBy"
                                    value={tests.resultReportedBy}
                                    onChange={handleInputChange}
                                    style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                    required
                                />
                                {errors.resultReportedBy !=="" ? (
                                    <span className={classes.error}>{errors.resultReportedBy}</span>
                                ) : "" }
                            </FormGroup>
                        </Col>
                        <Col md={4} className="form-group mb-3">
                            <FormGroup>
                                <Label for="encounterDate">Reported Date</Label>
                                <Input
                                    type="date"
                                    name="dateResultReported"
                                    id="dateResultReported"
                                    value={tests.dateResultReported}
                                    onChange={handleInputChange}
                                    style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                    required
                                />
                                {errors.dateResultReported !=="" ? (
                                    <span className={classes.error}>{errors.dateResultReported}</span>
                                ) : "" }
                            </FormGroup>
                        </Col>
                        <Col md={4} className="form-group mb-3">
                            <FormGroup>
                                <Label for="encounterDate">Checked by</Label>
                                <Input
                                    type="text"
                                    name="checkedBy"
                                    id="checkedBy"
                                    value={tests.checkedBy}
                                    onChange={handleInputChange}
                                    style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                    required
                                />
                                {errors.checkedBy !=="" ? (
                                    <span className={classes.error}>{errors.checkedBy}</span>
                                ) : "" }
                            </FormGroup>
                        </Col>
                        <Col md={4} className="form-group mb-3">
                            <FormGroup>
                                <Label for="encounterDate">Checked Date</Label>
                                <Input
                                    type="date"
                                    name="dateChecked"
                                    id="dateChecked"
                                    value={tests.dateChecked}
                                    onChange={handleInputChange}
                                    style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                    required
                                />
                                {errors.dateChecked !=="" ? (
                                    <span className={classes.error}>{errors.dateChecked}</span>
                                ) : "" }
                            </FormGroup>
                        </Col>
                        <Col md={4} className="form-group mb-3">
                            <FormGroup>
                                <Label for="encounterDate">Clinician Name</Label>
                                <Input
                                    type="text"
                                    name="clinicianName"
                                    id="clinicianName"
                                    value={tests.clinicianName}
                                    onChange={handleInputChange}
                                    style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                    required
                                />
                                {errors.clinicianName !=="" ? (
                                    <span className={classes.error}>{errors.clinicianName}</span>
                                ) : "" }
                            </FormGroup>
                        </Col> 
                    </Row>
                       
                    </div>

                    
                    {saving ? <Spinner /> : ""}
                    <br />
                    {props.activeContent.actionType==='update' ? (
                        <MatButton
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<SaveIcon />}
                            hidden={buttonHidden}
                            style={{backgroundColor:"#014d88"}}
                            
                            onClick={handleSubmit}
                            >
                            {!saving ? (
                            <span style={{ textTransform: "capitalize" }}>Update</span>
                            ) : (
                            <span style={{ textTransform: "capitalize" }}>Updating...</span>
                            )}
                        </MatButton>
                        )
                        :""
                    }
                
                </form>
            {/* )}
            {moduleStatus==="2" && (
            <>
            <Alert
                variant="warning"
                className="alert-dismissible solid fade show"
            >
                <p>Laboratory Module is not install</p>
            </Alert>
           
            </>
            )}  */}
            </CardBody>
        </Card> 
        </div>             
    </div>
  );
}


export default Laboratory;
