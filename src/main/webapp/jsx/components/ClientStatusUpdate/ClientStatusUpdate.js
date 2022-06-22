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

const ClientStatusUpdate = (props) => {

    const patientObj = props.patientObj;
    let history = useHistory();
    const classes = useStyles()
    const [transferStatus, setTransferStatus] = useState([])
    const [values, setValues] = useState([]);
    const [objValues, setObjValues] = useState({patient_id: "",current_status:""});
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
                  toast.success("Transfer successful");
                  props.toggle()
                  props.loadPatients()
                  //history.push("/")

              })
              .catch(error => {
                  setSaving(false);
                  toast.error("Something went wrong");
              });
          
    }

  return (      
        <div>                  
            <Card >
                <CardBody>
                <form >
                    <div className="row">
                        <h2> Client Status Update </h2>
                    <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >New Status</Label>
                            <Input
                                type="select"
                                name="gender"
                                id="gender"
                                value={values.gender}
                                onChange={handleInputChange}
                                required
                                >
                                <option value=""> Please Select</option>
                                <option value="1"> Male</option>
                                <option value="2"> Female</option>
                            </Input>
                            {errors.gender !=="" ? (
                                <span className={classes.error}>{errors.gender}</span>
                            ) : "" }
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label for="participant_id">Date of New Status </Label>
                            <DateTimePicker
                                time={false}
                                name="dateRegistration"
                                id="dateRegistration"
                                value={values.regDate}
                                onChange={value1 =>
                                    setValues({ ...values, dob: moment(value1).format("YYYY-MM-DD") })
                                }
                                
                                    max={new Date()}
                            />
                            {errors.participant_id !=="" ? (
                                <span className={classes.error}>{errors.participant_id}</span>
                            ) : "" }
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Tracking Outcome</Label>
                            <Input
                                type="select"
                                name="gender"
                                id="gender"
                                value={values.gender}
                                onChange={handleInputChange}
                                required
                                >
                                <option value=""> Please Select</option>
                                <option value="1"> Male</option>
                                <option value="2"> Female</option>
                            </Input>
                            {errors.gender !=="" ? (
                                <span className={classes.error}>{errors.gender}</span>
                            ) : "" }
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label for="participant_id">Date of Tracked</Label>
                            <DateTimePicker
                                time={false}
                                name="dateRegistration"
                                id="dateRegistration"
                                value={values.regDate}
                                onChange={value1 =>
                                    setValues({ ...values, dob: moment(value1).format("YYYY-MM-DD") })
                                }
                                
                                    max={new Date()}
                            />
                            {errors.participant_id !=="" ? (
                                <span className={classes.error}>{errors.participant_id}</span>
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

export default ClientStatusUpdate;
