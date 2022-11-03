import React, {useState, useEffect} from 'react';
import { Form,Row, Card,CardBody, FormGroup, Label, Input, InputGroup,InputGroupText} from 'reactstrap';
import MatButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import axios from "axios";
import { toast} from "react-toastify";
import { url as baseUrl } from "../../../api";
import { token as token } from "../../../api";
import { useHistory } from "react-router-dom";
import {  Modal, Button } from "react-bootstrap";
import "react-widgets/dist/css/react-widgets.css";
import moment from "moment";
import 'react-summernote/dist/react-summernote.css'; // import styles
import { Spinner } from "reactstrap";

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
        },
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

const CervicalCancer = (props) => {
    const patientObj = props.patientObj;
    let history = useHistory();
    const classes = useStyles();
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});
    const [result, setResult] = useState([]);
    const [method, setMethod] = useState([]);
    const [type, setType] = useState([]);
    const [enrollDate, setEnrollDate] = useState("");
    const [objValues, setObjValues] = useState({
                                                    personId:patientObj.id,
                                                    screeningResult:"",
                                                    screenMethod:"",
                                                    screenType:"",
                                                    dateOfScreening:"",                                                  

                                                });
    const [observation, setObservation]=useState({
            data: {},
            dateOfObservation: "",
            facilityId: null,
            personId: patientObj.id,
            type: "Cervical cancer",
            visitId: null
    })

    useEffect(() => {
        //FunctionalStatus();
        Result();
        Type();
        Method();
        GetDetail();
        GetPatientDTOObj();
    }, [props.activeContent.id]);
    const GetPatientDTOObj =()=>{
        axios
           .get(`${baseUrl}hiv/patient/${props.patientObj.id}`,
               { headers: {"Authorization" : `Bearer ${token}`} }
           )
           .then((response) => {
               const patientDTO= response.data.enrollment
               setEnrollDate (patientDTO && patientDTO.dateOfRegistration ? patientDTO.dateOfRegistration :"")
               //setEacStatusObj(response.data);
               //console.log(enrollDate)
           })
           .catch((error) => {
           //console.log(error);
           });
       
    }
     //Get Cervical Cancer  Object
     const GetDetail =()=>{
        axios
           .get(`${baseUrl}observation/${props.activeContent.id}`,
               { headers: {"Authorization" : `Bearer ${token}`} }
           )
           .then((response) => {            
                const cancerObj= response.data
                console.log(response.data)
                setObjValues({...cancerObj.data})
                  //setViralLoad(LabObject)
           })
           .catch((error) => {
           //console.log(error);
           });
       
    }
    const Method =()=>{
            axios
                .get(`${baseUrl}application-codesets/v2/CERVICAL_CANCER_SCREENING_METHOD`,
                    { headers: {"Authorization" : `Bearer ${token}`} }
                )
                .then((response) => {
                    //console.log(response.data);
                    setMethod(response.data);
                })
                .catch((error) => {
                //console.log(error);
                });
            
    }
    const Type =()=>{
        axios
            .get(`${baseUrl}application-codesets/v2/CERVICAL_CANCER_TREATMENT`,
                { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then((response) => {
                //console.log(response.data);
                setType(response.data);
            })
            .catch((error) => {
            //console.log(error);
            });
        
    }
    const Result =()=>{
        axios
            .get(`${baseUrl}application-codesets/v2/CERVICAL_CANCER_RESULT`,
                { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then((response) => {
                //console.log(response.data);
                setResult(response.data);
            })
            .catch((error) => {
            //console.log(error);
            });
        
    }
    const handleInputChange = e => {
        setObjValues ({...objValues,  [e.target.name]: e.target.value});
    }

    //FORM VALIDATION
    const validate = () => {
        let temp = { ...errors }
        //temp.name = details.name ? "" : "This field is required"
        //temp.description = details.description ? "" : "This field is required"
        setErrors({
            ...temp
            })    
        return Object.values(temp).every(x => x == "")
    }
        
    /**** Submit Button Processing  */
    const handleSubmit = (e) => {                  
        e.preventDefault();                     
        setSaving(true);
        observation.dateOfObservation= objValues.dateOfScreening       
        observation.personId =patientObj.id
        observation.data=objValues
        axios.put(`${baseUrl}observation/${props.activeContent.id}`,observation,
           { headers: {"Authorization" : `Bearer ${token}`}},          
          )
            .then(response => {
                setSaving(false);
                toast.success("Record save successful");
                props.setActiveContent({...props.activeContent, route:'recent-history'})
            })
            .catch(error => {
            setSaving(false);
            let errorMessage = error.response.data && error.response.data.apierror.message!=="" ? error.response.data.apierror.message :  "Something went wrong, please try again";
            toast.error(errorMessage);
            });
        
    }

  return (      
         <div>                 
            <Card className={classes.root}>
                <CardBody>
                <form >
                    <div className="row">
                        <h2> Cervical Cancer </h2>
                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label for="artDate">Date of Screening * </Label>
                            <Input
                                type="date"
                                name="dateOfScreening"
                                id="dateOfScreening"
                                onChange={handleInputChange}
                                min={enrollDate}
                                max= {moment(new Date()).format("YYYY-MM-DD") }
                                value={objValues.dateOfScreening}
                                required
                            />
                            {errors.screenType !=="" ? (
                                <span className={classes.error}>{errors.screenType}</span>
                            ) : "" }
                            </FormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-6">
                        <FormGroup>
                        <Label >Screen Type</Label>
                        <Input
                                type="select"
                                name="screenType"
                                id="screenType"
                                value={objValues.screenType}
                                onChange={handleInputChange}
                                required
                                >
                                    <option value="Select"> Select</option>
            
                                    {type.map((value) => (
                                        <option key={value.id} value={value.code}>
                                            {value.display}
                                        </option>
                                    ))}
                            </Input>
                            {errors.screenType !=="" ? (
                                <span className={classes.error}>{errors.screenType}</span>
                            ) : "" }
                        </FormGroup>
                        </div>
                        
                        <div className="form-group mb-3 col-md-6">
                        <FormGroup>
                        <Label >Screening Method</Label>
                        <Input
                                type="select"
                                name="screenMethod"
                                id="screenMethod"
                                value={objValues.screenMethod}
                                onChange={handleInputChange}
                                required
                                >
                                    <option value="Select"> Select</option>
            
                                    {method.map((value) => (
                                        <option key={value.id} value={value.code}>
                                            {value.display}
                                        </option>
                                    ))}
                            </Input> 
                        {errors.screenMethod !=="" ? (
                                <span className={classes.error}>{errors.screenMethod}</span>
                            ) : "" }
                        </FormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Screening Result *</Label>
                            <Input
                                type="select"
                                name="screeningResult"
                                id="screeningResult"
                                value={objValues.screeningResult}
                                onChange={handleInputChange}
                                required
                                >
                                    <option value="Select"> </option>
            
                                    {result.map((value) => (
                                        <option key={value.id} value={value.code}>
                                            {value.display}
                                        </option>
                                    ))}
                            </Input>
                            {errors.screeningResult !=="" ? (
                                <span className={classes.error}>{errors.screeningResult}</span>
                            ) : "" }
                            </FormGroup>
                        </div>


                    </div>
                    
                    {saving ? <Spinner /> : ""}
                <br />
                
                    <MatButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    disabled={objValues.screeningResult==="" || objValues.screenMethod==="" || objValues.screenType==="" || objValues.dateOfScreening===""  ? true : false}
                    onClick={handleSubmit}
                >
                    {!saving ? (
                    <span style={{ textTransform: "capitalize" }}>Update</span>
                    ) : (
                    <span style={{ textTransform: "capitalize" }}>Updating...</span>
                    )}
                </MatButton>
                
                <MatButton
                    variant="contained"
                    className={classes.button}
                    startIcon={<CancelIcon />}
                    
                >
                    <span style={{ textTransform: "capitalize" }}>Cancel</span>
                </MatButton>
                
                    </form>
                </CardBody>
            </Card>                     
        </div>
  );
}

export default CervicalCancer;
