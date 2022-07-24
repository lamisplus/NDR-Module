import React, {useState, useEffect} from 'react';
import { Card,CardBody, FormGroup, Label, Input} from 'reactstrap';
import MatButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import axios from "axios";
import { toast} from "react-toastify";
import { url as baseUrl } from "./../../../api";
import { token as token } from "./../../../api";
import "react-widgets/dist/css/react-widgets.css";
import moment from "moment";
import { Spinner } from "reactstrap";
import { Icon,Button, } from 'semantic-ui-react'
import FirstEAC from './EnhancedAdherenceCounseling';
import ContinueEAC from './EacContinue';

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

const EAC = (props) => {
    //const patientObj = props.patientObj;
    const classes = useStyles()
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});
    const [objValues, setObjValues]=useState({
                                                dateOfEac: "",
                                                dateOfLastViralLoad: "",
                                                lastViralLoad:"",
                                                note: "",
                                                personId: props.patientObj.id,
                                                status: "First",
                                                visitId:""
                                            })
 
    const handleInputChange = e => {
        setObjValues ({...objValues,  [e.target.name]: e.target.value});
    }          
    /**** Submit Button Processing  */
    const handleSubmit = (e) => {        
        e.preventDefault();        
          setSaving(true);
          axios.post(`${baseUrl}observation/eac`,objValues,
           { headers: {"Authorization" : `Bearer ${token}`}},
          
          )
              .then(response => {
                  setSaving(false);
                  toast.success(" Save successful");

              })
              .catch(error => {
                setSaving(false);
                let errorMessage = error.response.data && error.response.data.apierror.message!=="" ? error.response.data.apierror.message :  "Something went wrong, please try again";
                toast.error(errorMessage);
              });
          
    }

  return (      
        <div>                   
            <Card >
                <CardBody>
                <form >
                    <div className="row">
                    <h2>Enhanced Adherence Counselling </h2>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label for="">Date of EAC </Label>
                            <Input
                                type="date"
                                name="dateOfEac"
                                id="dateOfEac"
                                value={objValues.dateOfEac}
                                onChange={handleInputChange}
                                max= {moment(new Date()).format("YYYY-MM-DD") }
                                required
                            />
                            {errors.dateOfEac !=="" ? (
                                <span className={classes.error}>{errors.dateOfEac}</span>
                            ) : "" }
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label for="">Date Of Last Viral Load</Label>
                            <Input
                                type="date"
                                name="dateOfLastViralLoad"
                                id="dateOfLastViralLoad"
                                value={objValues.dateOfLastViralLoad}
                                onChange={handleInputChange}
                                max= {moment(new Date()).format("YYYY-MM-DD") }
                                required
                            />
                            
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label for="">lastViralLoad</Label>
                            <Input
                                type="number"
                                name="lastViralLoad"
                                id="lastViralLoad"
                                value={objValues.lastViralLoad}
                                onChange={handleInputChange}
                                required
                            />
                            
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label for="">note</Label>
                            <Input
                                type="textarea"
                                name="note"
                                id="note"
                                value={objValues.note}
                                onChange={handleInputChange}
                            />
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
                    disabled={objValues.dateOfEac==="" ? true : false}
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

export default EAC;
