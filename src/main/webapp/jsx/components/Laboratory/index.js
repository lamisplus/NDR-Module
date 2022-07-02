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
import { url as baseUrl, token } from "../../../api";
import moment from "moment";
import {Icon, List, Label as LabelSui} from 'semantic-ui-react'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { toast} from "react-toastify";


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
let visitId=""
let testGroupObj=""

const Laboratory = (props) => {
    const classes = useStyles();
    const [saving, setSaving] = useState(false);
    const [buttonHidden, setButtonHidden]= useState(false);
    const [testGroup, setTestGroup] = useState([]);
    const [test, setTest] = useState([]);
    const [priority, setPriority]=useState([])
    const [currentVisit, setCurrentVisit]=useState(true)
    const [vLIndication, setVLIndication] = useState([]);
    const [testOrderList, setTestOrderList] = useState([]);//Test Order List
    const [showVLIndication, setShowVLIndication] = useState(false);
    const [objValues, setObjValues] = useState({
                                                orderDate:null,
                                                patientId: "",
                                                tests: "",
                                                visitId: ""
                                            });
    const [tests, setTests]=useState({
                                        description: "",
                                        labTestGroupId: "",
                                        labTestId: "",
                                        labTestOrderStatus: "",
                                        orderPriority: "",
                                        viralLoadIndication:""
                                    })
    useEffect(() => {
            TestGroup();
            PriorityOrder();
            ViraLoadIndication();
            PatientVisit();
            CheckLabModule();
        }, []);
    //Get list of Test Group
    const TestGroup =()=>{
        axios
            .get(`${baseUrl}laboratory/labtestgroups`,
                { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then((response) => {
                setTestGroup(response.data);
                testGroupObj=response.data
            })
            .catch((error) => {
            //console.log(error);
            });
        
    }
    //Get list of Test Group
    const PriorityOrder =()=>{
        axios
            .get(`${baseUrl}application-codesets/v2/TEST_ORDER_PRIORITY`,
                { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then((response) => {
                setPriority(response.data);
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
                    setButtonHidden(false)
                    }
                    else{
                        toast.error("Laboratory module is not install")
                        setButtonHidden(true)
                    }
                }).catch((error) => {
                //console.log(error);
              });
          
        }
    //Get Patiet Visit 
    const PatientVisit =()=>{
        axios
            .get(`${baseUrl}patient/visit/visit-detail/${props.patientObj.id}`,
                { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then((response) => {
                const lastVisit = response.data[response.data.length - 1]
                if(lastVisit.status==="PENDING"){
                    visitId= lastVisit.id
                    setCurrentVisit(true)
                    setButtonHidden(false)
                }else{
                    toast.error("Patient do not have any active visit")
                    setButtonHidden(true)
                    setCurrentVisit(false)
                }

            })
            .catch((error) => {
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
    }
    const handleInputChange = e => {
        setObjValues ({...objValues,  [e.target.name]: e.target.value});               
    }
    const handleInputChangeTest = e => {
        if(e.target.value==="16"){
            setShowVLIndication(true)
            setTests ({...tests,  labTestId: e.target.value});
        }else{
            //setShowVLIndication(false)
            setTests ({...tests,  labTestId: e.target.value});
        }
        //setObjValues ({...objValues,  [e.target.name]: e.target.value});       
    }
    const addOrder = e => { 
        setTestOrderList([...testOrderList, tests])
      }
      /* Remove ADR  function **/
      const removeOrder = index => {       
        testOrderList.splice(index, 1);
        setTestOrderList([...testOrderList]);
         
      };
    
    const handleSubmit = (e) => {        
        e.preventDefault();  
        objValues.patientId=props.patientObj.id  
        objValues.tests= testOrderList
        objValues.visitId= visitId 
        axios.post(`${baseUrl}laboratory/orders`,objValues,
            { headers: {"Authorization" : `Bearer ${token}`}},
            
            )
            .then(response => {
                setSaving(false);
                toast.success("Laboratory test order created successful");
                props.setActiveContent('recent-history')
            })
            .catch(error => {
                setSaving(false);
                if(error.apierror){
                    toast.error(error.apierror.message);
                }else{
                    toast.error("Something went wrong. Please try again...");
                }    
                
            }); 

    }

console.log(testGroupObj)

  return (      
      <div >
        <h2>Laboratory Test Order</h2>
                   
        <Card >
            <CardBody>
            {currentVisit &&(
                <form >
                <div className="row">
                    
                    <Row>
                        <Col md={6} className="form-group mb-3">
                            <FormGroup>
                                <Label for="encounterDate">Encounter Date & Time*</Label>
                                <Input
                                    type="date"
                                    name="orderDate"
                                    id="orderDate"
                                    value={objValues.orderDate}
                                    max= {moment(new Date()).format("YYYY-MM-DD") }
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6} className="form-group mb-3">
                            <FormGroup>
                                <Label for="testGroup">Select Test Group*</Label>
                                <Input
                                    type="select"
                                    name="labTestGroupId"
                                    id="labTestGroupId"
                                    value={tests.labTestGroupId}
                                    onChange={handleSelectedTestGroup}                   
                                    >
                                    <option value="">Select </option>
                                                    
                                        {testGroup.map((value) => (
                                            <option key={value.id} value={value.id}>
                                                {value.groupName}
                                            </option>
                                        ))}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={6} className="form-group mb-3">
                            <FormGroup>
                                <Label for="testGroup">Select Test*</Label>
                                <Input
                                    type="select"
                                    name="labTestId"
                                    id="labTestId"
                                    value={test.labTestId}
                                    onChange={handleInputChangeTest}                   
                                    >
                                    <option value="">Select </option>
                                                    
                                        {test.map((value) => (
                                            <option key={value.id} value={value.id}>
                                                {value.labTestName}
                                            </option>
                                        ))}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={6} className="form-group mb-3">
                            <FormGroup>
                                <Label for="priority">Select Priority*</Label>
                                <Input
                                    type="select"
                                    name="orderPriority"
                                    id="orderPriority"
                                    value={test.orderPriority}
                                    onChange={handleInputChange}                   
                                    >
                                    <option value="">Select </option>
                                                    
                                        {priority.map((value) => (
                                            <option key={value.id} value={value.id}>
                                                {value.display}
                                            </option>
                                        ))}
                                </Input>
                            </FormGroup>
                        </Col>
                        {showVLIndication && (
                        <Col md={6} className="form-group mb-3">
                                <FormGroup>
                                    <Label for="vlIndication">VL Indication*</Label>
                                    <Input
                                    type="select"
                                    name="viralLoadIndication"
                                    id="viralLoadIndication"
                                    value={test.viralLoadIndication}
                                    onChange={handleInputChange}                   
                                    >
                                    <option value="">Select </option>
                                                    
                                        {vLIndication.map((value) => (
                                            <option key={value.id} value={value.id}>
                                                {value.display}
                                            </option>
                                        ))}
                                </Input>
                                </FormGroup>
                        </Col>
                        )}

                        <Col md={12}>                  
                            <LabelSui as='a' color='black'  className="float-end" onClick={addOrder}  size='tiny' style={{ marginTop:20, marginBottom:20}}>
                                <Icon name='plus' /> Add Test
                            </LabelSui>
                            
                        </Col>
                        <hr/>
                        {/* List of Test Order */}
                        {testOrderList.length >0 
                            ?
                            
                            <List>
                            <Table  striped responsive>
                                <thead >
                                    <tr>
                                        <th>Test Group</th>
                                        <th>Test</th>
                                        <th>Priority</th>
                                        {showVLIndication ?  (<th>Vira Load Indication</th>) :""}
                                        <th ></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {testOrderList.map((tests,showVLIndication, index, testGroup) => (

                                <TestOrdersList
                                    key={index}
                                    index={index}
                                    order={tests}
                                    showVLIndication={showVLIndication}
                                    testGroupObjList={testGroup}
                                    removeOrder={removeOrder}
                                />
                                ))}
                                </tbody>
                                </Table>
                            </List>
                            :
                            ""
                        } 
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
            )}
            </CardBody>
        </Card> 
                   
    </div>
  );
}
function TestOrdersList({
    order,
    index,
    removeOrder,
    showVLIndication,
    testGroupObjList
  }) {
    console.log(testGroupObjList)
   //const labgroupName= testGroup;
  
    return (
            <tr>
                <th>{order.labTestGroupId}</th>
                <th>{order.labTestId}</th>
                {showVLIndication ?  (<th>{order.viralLoadIndication}</th>) :""}
                <th></th>
                <th >
                    <IconButton aria-label="delete" size="small" color="error" onClick={() =>removeOrder(index)}>
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                    
                </th>
            </tr> 
    );
  }

export default Laboratory;
