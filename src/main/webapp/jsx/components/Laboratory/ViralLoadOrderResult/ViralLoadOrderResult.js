import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Input, Label, FormGroup,Row, Col , CardBody, Card, Table, InputGroupText, InputGroup } from "reactstrap";
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
    const enrollDate = patientObj && patientObj.artCommence ? patientObj.artCommence.visitDate : null
    const classes = useStyles();
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});
    const [buttonHidden, setButtonHidden]= useState(false);
    const [moduleStatus, setModuleStatus]= useState("0")
    const [testGroup, setTestGroup] = useState([]);
    const [test, setTest] = useState([]);
    const [vlRequired, setVlRequired]=useState(false)
    const [showResult, setShowResult]=useState(false)
    //const [currentVisit, setCurrentVisit]=useState(true)
    const [vLIndication, setVLIndication] = useState([]);
    const [testOrderList, setTestOrderList] = useState([]);//Test Order List
    const [showVLIndication, setShowVLIndication] = useState(false);
    const [labTestDetail, setLabTestDetail]=useState([])
    const [eacStatusObj, setEacStatusObj] = useState()
    let temp = { ...errors }
    const [tests, setTests]=useState({
            approvedBy: "",
            assayedBy: "",
            checkedBy: "",
            comment: "",
            dateApproved: "",
            dateAssayedBy: "",
            dateCheckedBy: "",
            dateCollectedBy: "",
            dateOrderBy: "",
            dateReceivedAtPcrLab: "",
            dateResultReceived: "",
            dateSampleLoggedRemotely: "",
            id: "",
            labNumber: "",
            labTestGroupId: "",
            labTestId: "",
            orderBy: "",
            patientId: props.patientObj?props.patientObj.id:"",
            pcrLabName: "",
            pcrLabSampleNumber: "",
            result: "",
            sampleCollectedBy: "",
            sampleCollectionDate: "",
            sampleLoggedRemotely: "",
            sampleTypeId: "",
            viralLoadIndication: ""
    })
    useEffect(() => {
           
        CheckLabModule();
        ViraLoadIndication();
        LabTestDetail();
        CheckEACStatus();    
    }, [props.patientObj.id]);
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
    const LabTestDetail =()=>{
        axios
            .get(`${baseUrl}laboratory/labtests/viral%20load`,
                { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then((response) => {      
                setLabTestDetail(response.data.sampleType);
                setTestOrderList(response.data)
                tests.labTestGroupId= response.data.labTestGroupId
                tests.labTestId= response.data.id 
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
   
    // const PatientVisit =()=>{
    //     axios
    //         .get(`${baseUrl}patient/visit/visit-detail/${props.patientObj.id}`,
    //             { headers: {"Authorization" : `Bearer ${token}`} }
    //         )
    //         .then((response) => {
    //             const lastVisit = response.data[response.data.length - 1]
    //             if(lastVisit.status==="PENDING"){
    //                 visitId= lastVisit.id
    //                 //setCurrentVisit(true)
    //                 setButtonHidden(false)
    //             }else{
    //                 toast.error("Patient do not have any active visit")
    //                 setButtonHidden(true)
    //                 //setCurrentVisit(false)
    //             }

    //         })
    //         .catch((error) => {
    //         //console.log(error);
    //         });        
    // }
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
        // if(e.target.value==='4'){            
        //     setVlRequired(true)
        // }else{
        //     setVlRequired(false) 
        // }
    }
    const handleInputChangeObject = e => {
        setErrors({...temp, [e.target.name]:""})//reset the error message to empty once the field as value
        setTests ({...tests,  [e.target.name]: e.target.value});               
    }
    const handleInputChange = e => {
        setErrors({...temp, [e.target.name]:""})//reset the error message to empty once the field as value
        //tests.labNumber
        if(e.target.name==='labNumber'){
            const onlyPositiveNumber = e.target.value //Math.abs(e.target.value)
            setTests ({...tests,  [e.target.name]: onlyPositiveNumber});
        }else{
            setTests ({...tests,  [e.target.name]: e.target.value}); 
        }
                      
    }
    const handleInputChangeTest = e => {
        setErrors({...temp, [e.target.name]:""})//reset the error message to empty once the field as value
        
        if(e.target.value==="16"){
            setShowVLIndication(true)
            setVlRequired(true)
            setErrors({...temp, viralLoadIndication:""})
            
            setTests ({...tests,  labTestId: e.target.value});
        }else{
            setShowVLIndication(false)
            setVlRequired(false) 
            setTests ({...tests,  labTestId: e.target.value});
        }
        //setObjValues ({...objValues,  [e.target.name]: e.target.value});       
    }

      //Validations of the forms
      const validate = () => {  
        
        temp.sampleTypeId = tests.sampleTypeId ? "" : "This field is required"
        temp.sampleCollectionDate =  tests.sampleCollectionDate ? "" : "This field is required"
        temp.viralLoadIndication = tests.viralLoadIndication ? "" : "This field is required"
        temp.labNumber = tests.labNumber ? "" : "This field is required"
       temp.sampleCollectedBy = tests.sampleCollectedBy ? "" : "This field is required"
       showResult && (temp.approvedBy = tests.approvedBy ? "" : "This field is required")
       showResult && (temp.assayedBy = tests.assayedBy ? "" : "This field is required")
       showResult && (temp.sampleLoggedRemotely = tests.sampleLoggedRemotely ? "" : "This field is required")
       showResult && (temp.result = tests.result ? "" : "This field is required")
       showResult && (temp.pcrLabSampleNumber = tests.pcrLabSampleNumber ? "" : "This field is required")
       showResult && (temp.pcrLabName =  tests.pcrLabName ? "" : "This field is required")
       showResult && (temp.orderBy = tests.orderBy ? "" : "This field is required")

       showResult && (temp.dateSampleLoggedRemotely = tests.dateSampleLoggedRemotely ? "" : "This field is required")
       showResult && (temp.dateResultReceived = tests.dateResultReceived ? "" : "This field is required")
       showResult && (temp.dateReceivedAtPcrLab = tests.dateReceivedAtPcrLab ? "" : "This field is required")
       showResult && (temp.dateOrderBy = tests.dateOrderBy ? "" : "This field is required")
       showResult && (temp.dateCollectedBy =  tests.dateCollectedBy ? "" : "This field is required")
       showResult && ( temp.dateCheckedBy = tests.dateCheckedBy ? "" : "This field is required")

       showResult && (temp.dateAssayedBy = tests.dateAssayedBy ? "" : "This field is required")
       showResult && (temp.dateApproved = tests.dateApproved ? "" : "This field is required")
        //temp.collectedBy = tests.collectedBy ? "" : "This field is required"
        showResult &&  (temp.checkedBy = tests.checkedBy ? "" : "This field is required")
 
        
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x == "")
    }
    
    const handleSubmit = (e) => {        
        e.preventDefault();
        if(validate()){
            tests.labTestGroupId= testOrderList.labTestGroupId
            tests.labTestId= testOrderList.id
            tests.sampleCollectionDate = moment(tests.sampleCollectionDate).format("YYYY-MM-DD HH:MM:SS")
            tests.dateReceivedAtPcrLab = moment(tests.dateReceivedAtPcrLab).format("YYYY-MM-DD HH:MM:SS")                 
            tests.dateResultReceived = moment(tests.dateResultReceived).format("YYYY-MM-DD HH:MM:SS")
            setSaving(true);        
            //if(showResult){
                axios.post(`${baseUrl}laboratory/vl-results`,tests,
                { headers: {"Authorization" : `Bearer ${token}`}},)
                .then(response => {
                    setSaving(false);
                    props.LabOrders();
                    toast.success("Laboratory test order created successful");
                    props.setActiveContent({...props.activeContent, route:'laboratoryViralLoadOrderResult', activeTab:"history"})
                })
                .catch(error => {
                    setSaving(false);
                    if(error.response && error.response.data){
                        let errorMessage = error.response.data && error.response.data.apierror.message!=="" ? error.response.data.apierror.message :  "Something went wrong, please try again";
                        toast.error(errorMessage); 
                    }                  
                }); 
            
            // }else{
            //     delete tests["approvedBy"]
            //     delete tests["assayedBy"]
            //     delete tests["checkedBy"]
            //     delete tests["comment"]
            //     delete tests["dateApproved"]
            //     delete tests["dateAssayedBy"]
            //     delete tests["dateCheckedBy"]
            //     delete tests["dateCollectedBy"]
            //     delete tests["dateOrderBy"]
            //     delete tests["dateReceivedAtPcrLab"]
            //     delete tests["dateResultReceived"]
            //     delete tests["dateSampleLoggedRemotely"]
            //     delete tests["orderBy"]
            //     delete tests["pcrLabName"]
            //     delete tests["pcrLabSampleNumber"]
            //     delete tests["sampleLoggedRemotely"]
            //     delete tests["result"]
            //     delete tests["orderBy"]
            //     delete tests["pcrLabName"]
                 
            //     tests['labTestGroupId']= testOrderList.labTestGroupId
            //     tests['labTestId']= testOrderList.id
            //     tests['comments']=""
            //     tests['visitId']=""
            //     axios.post(`${baseUrl}laboratory/vl-orders`,tests,
            //     { headers: {"Authorization" : `Bearer ${token}`}},)
            //     .then(response => {
            //         setSaving(false);
            //         props.LabOrders();
            //         toast.success("Laboratory test order created successful");
            //         props.setActiveContent({...props.activeContent, route:'laboratoryViralLoadOrderResult', activeTab:"history"})
            //     })
            //     .catch(error => {
            //         setSaving(false);
            //         if(error.response && error.response.data){
            //             let errorMessage = error.response.data && error.response.data.apierror.message!=="" ? error.response.data.apierror.message :  "Something went wrong, please try again";
            //             toast.error(errorMessage); 
            //         }                  
            //     }); 
            // }
        }
    }
    const handleCheckBox =e =>{
        if(e.target.checked){
            setShowResult(true)
        }else{
            setShowResult(false)
        }
    }

  return (      
      <div >

        <div className="row">
        <div className="col-md-6">
        <h2>Viral Load Order and Result</h2>
        </div>
     
        <br/>
        <br/>
        <Card className={classes.root}>
            <CardBody>
            {/* {moduleStatus==="1" && ( */}
                <form >
                <div className="row">
                    
                    <Row>
                 
                    <Col md={6} className="form-group mb-3">
                            <FormGroup>
                                <Label for="labNumber">Lab Number (Sample Number)*</Label>
                                <Input
                                type="text"
                                name="labNumber"
                                id="labNumber"
                                value={tests.labNumber}
                                onChange={handleInputChange}  
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}                 
                                >
                                
                            </Input>
                            {errors.labNumber !=="" ? (
                                <span className={classes.error}>{errors.labNumber}</span>
                            ) : "" }
                            </FormGroup>
                    </Col>
                    

                    <Col md={6} className="form-group mb-3">
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
                    <Col md={6} className="form-group mb-3">
                            <FormGroup>
                                <Label for="encounterDate">Sample Type *</Label>
                                <Input
                                    type="select"
                                    name="sampleTypeId"
                                    id="sampleTypeId"
                                    //min={0}
                                    value={tests.sampleTypeId}
                                    onChange={handleInputChange}
                                    style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                    required
                                >
                                    <option value="">Select </option>
                                    {labTestDetail.map((value) => (
                                        <option key={value.id} value={value.id}>
                                            {value.sampleTypeName}
                                        </option>
                                    ))}
                                </Input>
                                {errors.sampleTypeId !=="" ? (
                                    <span className={classes.error}>{errors.sampleTypeId}</span>
                                ) : "" }
                            </FormGroup>
                    </Col>
                    <Col md={6} className="form-group mb-3">
                        <FormGroup>
                            <Label for="encounterDate"> Date Sample Collected*</Label>
                            <Input
                                type="datetime-local"
                                name="sampleCollectionDate"
                                id="sampleCollectionDate"
                                value={tests.sampleCollectionDate}
                                onChange={handleInputChange}
                                min={enrollDate}
                                //min={eacStatusObj && eacStatusObj.eacsession && eacStatusObj.eacsession!=='Default' ? eacStatusObj.eacsessionDate :enrollDate}
                                max= {moment(new Date()).format("YYYY-MM-DD") }
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                required
                            />
                            {errors.sampleCollectionDate !=="" ? (
                                <span className={classes.error}>{errors.sampleCollectionDate}</span>
                            ) : "" }
                        </FormGroup>
                    </Col>
                    <Col md={6} className="form-group mb-3">
                        <FormGroup>
                            <Label for="encounterDate">Collected by *</Label>
                            <Input
                                type="text"
                                name="sampleCollectedBy"
                                id="sampleCollectedBy"
                                value={tests.sampleCollectedBy}
                                
                                onChange={handleInputChange}
                                
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                required
                            />
                            {errors.sampleCollectedBy !=="" ? (
                                <span className={classes.error}>{errors.sampleCollectedBy}</span>
                            ) : "" }
                        </FormGroup>
                    </Col>
                    <Col md={6} className="mt-4">
                        <div className="form-check custom-checkbox ml-1 ">
                                <input
                                type="checkbox"
                                className="form-check-input"                       
                                name="asResult"
                                id="asResult"
                                value="asResult"
                                onChange={handleCheckBox}
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                />
                                <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                                >
                                Has Result ?
                                </label>
                        </div>
                    </Col>
                    <hr/>
                {showResult && (<>
                    <Col md={6} className="form-group mb-3">
                            <FormGroup>
                                <Label for="vlIndication">PCR Lab Name *</Label>
                                <Input
                                type="select"
                                name="pcrLabName"
                                id="pcrLabName"
                                value={tests.pcrLabName}
                                onChange={handleInputChange}  
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}                 
                                >
                                <option value="">Select </option>
                                <option value="Abuja">Abuja Hospital </option>             
                                    
                            </Input>
                            {errors.pcrLabName !=="" ? (
                                <span className={classes.error}>{errors.pcrLabName}</span>
                            ) : "" }
                            </FormGroup>
                    </Col>
                    <Col md={6} className="form-group mb-3">
                        <FormGroup>
                            <Label for="encounterDate">PCR Sample No.</Label>
                            <Input
                                type="text"
                                name="pcrLabSampleNumber"
                                id="pcrLabSampleNumber"
                                //min={0}
                                value={tests.pcrLabSampleNumber}
                                onChange={handleInputChange}
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                required
                            />
                            {errors.pcrLabSampleNumber !=="" ? (
                                <span className={classes.error}>{errors.pcrLabSampleNumber}</span>
                            ) : "" }
                        </FormGroup>
                    </Col>
                   
                    <Col md={6} className="form-group mb-3">
                        <FormGroup>
                            <Label for="encounterDate">Sample logged remotely </Label>
                            <Input
                                type="select"
                                name="sampleLoggedRemotely"
                                id="sampleLoggedRemotely"
                                //min={0}
                                value={tests.labNumber}
                                onChange={handleInputChange}
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                required
                                >
                                <option value="">Select </option>
                                <option value="1">Yes </option>
                                <option value="0">No </option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md={6} className="form-group mb-3">
                        <FormGroup>
                            <Label for="encounterDate">Date Sample logged remotely *</Label>
                            <Input
                                type="date"
                                name="dateSampleLoggedRemotely"
                                id="dateSampleLoggedRemotely"
                                //min={0}
                                value={tests.dateSampleLoggedRemotely}
                                onChange={handleInputChange}
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                required
                            />
                            {errors.dateSampleLoggedRemotely !=="" ? (
                                <span className={classes.error}>{errors.dateSampleLoggedRemotely}</span>
                            ) : "" }
                        </FormGroup>
                    </Col>
                    <Col md={6} className="form-group mb-3">
                        <FormGroup>
                            <Label for="encounterDate">Date Sample Received at PCR Lab *</Label>
                            <Input
                                type="datetime-local"
                                name="dateReceivedAtPcrLab"
                                id="dateReceivedAtPcrLab"
                                value={tests.dateReceivedAtPcrLab}
                                min={tests.dateReceivedAtPcrLab}
                                onChange={handleInputChange}
                                //min={moment(tests.sampleCollectionDate).format("YYYY-MM-DD") }
                                max= {moment(new Date()).format("YYYY-MM-DD") }
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                required
                            />
                            {errors.dateReceivedAtPcrLab !=="" ? (
                                <span className={classes.error}>{errors.dateReceivedAtPcrLab}</span>
                            ) : "" }
                        </FormGroup>
                    </Col>
                   
                    <Col md={6} className="form-group mb-3">
                        <FormGroup>
                            <Label for="encounterDate">Date Result Received *</Label>
                            <Input
                                type="datetime-local"
                                name="dateResultReceived"
                                id="dateResultReceived"
                                value={tests.dateResultReceived}
                                min={tests.sampleCollectionDate!==''? tests.sampleCollectionDate :moment(new Date()).format("YYYY-MM-DD")}
                                onChange={handleInputChange}
                                //min={tests.sampleCollectionDate}
                                max= {tests.dateResultReceived!==''? tests.dateResultReceived :moment(new Date()).format("YYYY-MM-DD") }
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                required
                            />
                            {errors.dateResultReceived !=="" ? (
                                <span className={classes.error}>{errors.dateResultReceived}</span>
                            ) : "" }
                        </FormGroup>
                    </Col>
                    <Col md={6} className="form-group mb-3">
                        <FormGroup>
                            <Label for="encounterDate">Order by *</Label>
                            <Input
                                type="text"
                                name="orderBy"
                                id="orderBy"
                                value={tests.orderBy}
                                
                                onChange={handleInputChange}
                                
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                required
                            />
                            {errors.orderBy !=="" ? (
                                <span className={classes.error}>{errors.orderBy}</span>
                            ) : "" }
                        </FormGroup>
                    </Col>
                    <Col md={6} className="form-group mb-3">
                        <FormGroup>
                            <Label for="encounterDate">Date Order by *</Label>
                            <Input
                                type="date"
                                name="dateOrderBy"
                                id="dateOrderBy"
                                value={tests.dateOrderBy}
                                min={tests.sampleCollectionDate!==''? tests.sampleCollectionDate :moment(new Date()).format("YYYY-MM-DD")}
                                onChange={handleInputChange}
                                //min={tests.sampleCollectionDate}
                                max= {tests.dateResultReceived!==''? tests.dateResultReceived :moment(new Date()).format("YYYY-MM-DD") }
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                required
                            />
                            {errors.dateOrderBy !=="" ? (
                                <span className={classes.error}>{errors.dateOrderBy}</span>
                            ) : "" }
                        </FormGroup>
                    </Col>
                   
                    <Col md={6} className="form-group mb-3">
                        <FormGroup>
                            <Label for="encounterDate">Date Collected by *</Label>
                            <Input
                                type="date"
                                name="dateCollectedBy"
                                id="dateCollectedBy"
                                value={tests.dateCollectedBy}
                                min={tests.sampleCollectionDate!==''? tests.sampleCollectionDate :moment(new Date()).format("YYYY-MM-DD")}
                                onChange={handleInputChange}
                                //min={tests.sampleCollectionDate}
                                max= {tests.dateResultReceived!==''? tests.dateResultReceived :moment(new Date()).format("YYYY-MM-DD") }
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                required
                            />
                            {errors.dateCollectedBy !=="" ? (
                                <span className={classes.error}>{errors.dateCollectedBy}</span>
                            ) : "" }
                        </FormGroup>
                    </Col>
                    <Col md={6} className="form-group mb-3">
                        <FormGroup>
                            <Label for="encounterDate">Asseyed by *</Label>
                            <Input
                                type="text"
                                name="assayedBy"
                                id="assayedBy"
                                value={tests.assayedBy}                              
                                onChange={handleInputChange}
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                required
                            />
                            {errors.assayedBy !=="" ? (
                                <span className={classes.error}>{errors.assayedBy}</span>
                            ) : "" }
                        </FormGroup>
                    </Col>
                    <Col md={6} className="form-group mb-3">
                        <FormGroup>
                            <Label for="encounterDate">Date Asseyed by *</Label>
                            <Input
                                type="date"
                                name="dateAssayedBy"
                                id="dateAssayedBy"
                                value={tests.dateAssayedBy}
                                min={tests.sampleCollectionDate!==''? tests.sampleCollectionDate :moment(new Date()).format("YYYY-MM-DD")}
                                onChange={handleInputChange}
                                //min={tests.sampleCollectionDate}
                                max= {tests.dateResultReceived!==''? tests.dateResultReceived :moment(new Date()).format("YYYY-MM-DD") }
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                required
                            />
                            {errors.dateAssayedBy !=="" ? (
                                <span className={classes.error}>{errors.dateAssayedBy}</span>
                            ) : "" }
                        </FormGroup>
                    </Col>
                    <Col md={6} className="form-group mb-3">
                        <FormGroup>
                            <Label for="encounterDate">Checked by * </Label>
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
                    <Col md={6} className="form-group mb-3">
                        <FormGroup>
                            <Label for="encounterDate">Date Checked by *</Label>
                            <Input
                                type="date"
                                name="dateCheckedBy"
                                id="dateCheckedBy"
                                value={tests.dateCheckedBy}
                                min={tests.sampleCollectionDate!==''? tests.sampleCollectionDate :moment(new Date()).format("YYYY-MM-DD")}
                                onChange={handleInputChange}
                                //min={tests.sampleCollectionDate}
                                max= {tests.dateResultReceived!==''? tests.dateResultReceived :moment(new Date()).format("YYYY-MM-DD") }
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                required
                            />
                            {errors.dateCheckedBy !=="" ? (
                                <span className={classes.error}>{errors.dateCheckedBy}</span>
                            ) : "" }
                        </FormGroup>
                    </Col>
                    <Col md={6} className="form-group mb-3">
                        <FormGroup>
                            <Label for="encounterDate">Approved by *</Label>
                            <Input
                                type="text"
                                name="approvedBy"
                                id="approvedBy"
                                value={tests.approvedBy}
                               
                                onChange={handleInputChange}
                                
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                required
                            />
                            {errors.approvedBy !=="" ? (
                                <span className={classes.error}>{errors.approvedBy}</span>
                            ) : "" }
                        </FormGroup>
                    </Col>
                    <Col md={6} className="form-group mb-3">
                        <FormGroup>
                            <Label for="encounterDate">Date Approved by *</Label>
                            <Input
                                type="date"
                                name="dateApproved"
                                id="dateApproved"
                                value={tests.dateApproved}
                                min={tests.sampleCollectionDate!==''? tests.sampleCollectionDate :moment(new Date()).format("YYYY-MM-DD")}
                                onChange={handleInputChange}
                                //min={tests.sampleCollectionDate}
                                max= {tests.dateResultReceived!==''? tests.dateResultReceived :moment(new Date()).format("YYYY-MM-DD") }
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                required
                            />
                            {errors.dateApproved !=="" ? (
                                <span className={classes.error}>{errors.dateApproved}</span>
                            ) : "" }
                        </FormGroup>
                    </Col>

                    <Col md={6} className="form-group mb-3">
                        <FormGroup>
                            <Label for="priority">Result *</Label>
                            <InputGroup>
                            <Input
                                type="number"
                                name="result"
                                id="result"
                                value={tests.result}
                                onChange={handleInputChange}  
                                style={{border: "1px solid #014D88", borderRadius:"0rem"}}                 
                            />

                            {/* <InputGroupText addonType="append" style={{ backgroundColor:"#014D88", color:"#fff", border: "1px solid #014D88", borderRadius:"0rem"}}>
                                
                            </InputGroupText> */}
                            </InputGroup>
                            {errors.result !=="" ? (
                                <span className={classes.error}>{errors.result}</span>
                            ) : "" }
                        </FormGroup>
                    </Col>

                    <Col md={6} className="form-group mb-3">
                        <FormGroup>
                            <Label for="priority">Comment</Label>
                            <Input
                                type="textarea"
                                name="comment"
                                id="comment"
                                value={tests.comment}
                                onChange={handleInputChange}  
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}                 
                                >
                                
                            </Input>
                            
                        </FormGroup>
                    </Col>
                </>)}   
                    </Row>
                </div>
                    
                    {saving ? <Spinner /> : ""}
                    <br />
                
                    <MatButton
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                        hidden={buttonHidden}
                        style={{backgroundColor:"#014d88"}}
                        //disabled={testOrderList.length >0 ? false : true}
                        onClick={handleSubmit}
                        >
                        {!saving ? (
                        <span style={{ textTransform: "capitalize" }}>Save</span>
                        ) : (
                        <span style={{ textTransform: "capitalize" }}>Saving...</span>
                        )}
                    </MatButton>
                
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
