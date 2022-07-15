import React, {useState, useEffect} from 'react';
import { Form,Row, Card,CardBody, FormGroup, Label, Input} from 'reactstrap';
import MatButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
// import { Alert } from 'reactstrap';
// import { Spinner } from 'reactstrap';
import axios from "axios";
import { toast} from "react-toastify";
import { url as baseUrl } from "./../../../api";
import { token as token } from "./../../../api";
import { useHistory } from "react-router-dom";
import {  Modal, Button } from "react-bootstrap";
import "react-widgets/dist/css/react-widgets.css";
import { DateTimePicker } from "react-widgets";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import moment from "moment";
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
        }
    },
    input: {
        display: 'none'
    } 
}))

const Enrollment = (props) => {

    const patientObj = props.patientObj;
    let history = useHistory();
    const classes = useStyles()
    const [transferStatus, setTransferStatus] = useState([])
    const [values, setValues] = useState([]);
    const [objValues, setObjValues] = useState({patient_id: "", eacDate1:"", eacDate2:""});
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});
 
    const handleInputChange = e => {
        setObjValues ({...objValues,  [e.target.name]: e.target.value});
        }
          
    /**** Submit Button Processing  */
    const handleSubmit = (e) => {        
        e.preventDefault();        
          objValues.patient_id= patientObj.id
          setSaving(true);
          axios.post(`${baseUrl}covid/patientstatus`,objValues,
           { headers: {"Authorization" : `Bearer ${token}`}},
          
          )
              .then(response => {
                  setSaving(false);
                  toast.success("Record save successful");
                  props.toggle()
                  props.loadPatients()
                  //history.push("/")

              })
              .catch(error => {
                  setSaving(false);
                  toast.success("Record save successful");
                  //toast.error("Something went wrong");
              });
          
    }

  return (      
        <div>                   
            <Card >
                <CardBody>
                <form >
                    <div className="row">
                    <h2>Enhanced Adherence Counselling </h2>
                    <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label for="participant_id">Date of 1st EAC Session </Label>
                            <Input
                                type="date"
                                name="eacDate1"
                                id="eacDate1"
                                value={objValues.eacDate1}
                                onChange={handleInputChange}
                                max= {moment(new Date()).format("YYYY-MM-DD") }
                                required
                            />
                            {errors.eacDate1 !=="" ? (
                                <span className={classes.error}>{errors.eacDate1}</span>
                            ) : "" }
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label for="participant_id">Date of 1st EAC Completion </Label>
                            <Input
                                type="date"
                                name="eacDate2"
                                id="eacDate2"
                                value={objValues.eacDate2}
                                onChange={handleInputChange}
                                max= {moment(new Date()).format("YYYY-MM-DD") }
                                required
                            />
                            {errors.eacDate2 !=="" ? (
                                <span className={classes.error}>{errors.eacDate2}</span>
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
                    onClick={handleSubmit}
                    disabled={objValues.eacDate1==="" || objValues.eacDate2==="" ? true : false}
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

export default Enrollment;
