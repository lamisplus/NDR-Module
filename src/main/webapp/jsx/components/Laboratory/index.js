import React, {useState, useEffect} from 'react';
import { Input, Label, FormGroup, InputGroupText, InputGroup,Row, Col , CardBody, Card } from "reactstrap";
import MatButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import {  Modal, Button } from "react-bootstrap";
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

const Laboratory = (props) => {
    const classes = useStyles();
    const [saving, setSaving] = useState(false);
    const handleSubmit = (e) => {        
        e.preventDefault();         
        console.log(objValues)
    }
    const [objValues, setObjValues] = useState({ visitDate: "",whoStagingId: 0});


  return (      
      <div >
        <h3>Laboratory Test Order</h3>
                   
        <Card >
            <CardBody>
            <form >
            <div className="row">
                <Row>
                    <Col md={6} className="form-group mb-3">
                        <FormGroup>
                            <Label for="encounterDate">Encounter Date & Time*</Label>
                            <Input
                            type="datetime-local"
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6} className="form-group mb-3">
                        <FormGroup>
                            <Label for="testGroup">Select Test Order*</Label>
                            <Select
                                required
                                isMulti={false}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6} className="form-group mb-3">
                        <FormGroup>
                            <Label for="testGroup">Select Test*</Label>

                            <Select
                                required
                                isMulti={false}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6} className="form-group mb-3">
                        <FormGroup>
                            <Label for="priority">Select Priority*</Label>
                            <Select
                                required
                                isMulti={false}
                            />
                        </FormGroup>
                    </Col>

                        <Col md={6} className="form-group mb-3">
                            <FormGroup>
                                <Label for="vlIndication">VL Indication*</Label>
                                <Select
                                required
                                isMulti={false}
                            />
                            </FormGroup>
                        </Col>

                    <Col md={6} className="form-group mb-3">
                        <FormGroup>
                            <Label for="sampleOrderedBy">Test Ordered By*</Label>
                            <Input
                                required
                                name="sampleOrderedBy"
                                id="sampleOrderedBy"
                                
                            />
                        </FormGroup>
                    </Col>

                    <Col md={12}>                  
                        <LabelSui as='a' color='black'  className="float-end"   size='tiny' style={{ marginTop:20}}>
                            <Icon name='plus' /> Add Test
                        </LabelSui>
                        
                    </Col>
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

export default Laboratory;
