import axios from "axios";
import React, { useState, useEffect } from "react";
import MatButton from "@material-ui/core/Button";
import {

    FormGroup,
    Input,
    Label,
    FormFeedback, Form,
} from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import { ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import { Spinner } from "reactstrap";
import {Link, useHistory} from "react-router-dom";
import Button from "@material-ui/core/Button";
//import { FaArrowLeft } from "react-icons/fa";
import { TiArrowBack } from 'react-icons/ti'
import {useForm} from "react-hook-form";
import {token, url as baseUrl} from "../../../api";



const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(20),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  cardBottom: {
    marginBottom: 20,
  },
  Select: {
    height: 45,
    width: 300,
  },
  button: {
    margin: theme.spacing(1),
  },
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.default,
  },
  inline: {
    display: "inline",
  },
}));
//let  arrVal = [];

const UserRegistration = (props) => {
    const { register, setValue, handleSubmit, formState: { errors } } = useForm();
    const [dateOfRegistration, setDateOfRegistration] = useState("");
    const [patientId, setPatientId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [sex, setSex] = useState("");
    const [pnumber, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const userDetail = props.location && props.location.state ? props.location.state.user : null;
    const classes = useStyles();
    const history = useHistory();

  const [values, setValues] = useState({});
  const [saving, setSaving] = useState(false);
  const setPatientDateOfRegistration = (e) => {
      setDateOfRegistration(e.target.value);
      setValue('dateOfRegistration', e.target.value);
  };

  const setPatientRegId = (e) => {
      setPatientId(e.target.value);
      setValue('patientId', e.target.value);
  };

  const setPatientFirstName = (e) => {
      setFirstName(e.target.value);
      setValue('firstName', e.target.value);
  };

    const setPatientMiddleName = (e) => {
        setMiddleName(e.target.value);
        setValue('middleName', e.target.value);
    }

    const setPatientLastName = (e) => {
        setLastName(e.target.value);
        setValue('lastName', e.target.value);
    }

    const setPatientAge = (e) => {
        setAge(e.target.value);
        setValue('age', e.target.value);
    }

    const setPatientSex = (e) => {
        setSex(e.target.value);
        setValue('sex', e.target.value);
    }

    const setPatientPhone = (e) => {
        setPhone(e.target.value);
        setValue('pnumber', e.target.value);
    }

    const setPatientAddress = (e) => {
        setAddress(e.target.value);
        setValue('address', e.target.value);
    }

    const onSubmit = async (data) => {
      try {
          const response = await axios.post(`${baseUrl}patient/`, data, { headers: {"Authorization" : `Bearer ${token}`} });
          history.push('/');
      } catch (e) {
          console.log(e);
      }
    };

    const handleCancel = () => {
        history.push('/');
    }

  return (
    <>
    <ToastContainer autoClose={3000} hideProgressBar />
       
        <Card className={classes.cardBottom}>
        <CardContent>
            <Link
                  to ={{
                    pathname: "/",
                    state: 'users'
                  }}
            >
              <Button
                variant="contained"
                color="primary"
                className=" float-right ms-1"
                startIcon={<TiArrowBack />}
              >
                <span style={{ textTransform: "capitalize" }}>Back </span>
              </Button>
            </Link>
            <br />
          
          <br />
      <ToastContainer autoClose={3000} hideProgressBar />
      
      <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">{userDetail===null ? "Basic Information" : "Edit User Information"}</h5>
            </div>
            <div className="card-body">
              <div className="basic-form">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="form-group mb-3 col-md-4">
                        <FormGroup>
                          <Label for="dateOfRegistration">Date of Registration*</Label>
                          <Input
                            type="date"
                            name="dateOfRegistration"
                            id="dateOfRegistration"
                            {...register("dateOfRegistration")}
                            value={dateOfRegistration}
                            onChange={setPatientDateOfRegistration}
                            required
                          />
                        </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                        <FormGroup>
                          <Label for="patientId">Patient ID * </Label>
                          <Input
                            type="text"
                            name="patientId"
                            id="patientId"
                            {...register("patientId")}
                            value={patientId}
                            onChange={setPatientRegId}
                            required
                          />
                        </FormGroup>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                      <Label for="firstName">First Name *</Label>
                      <Input
                        type="text"
                        name="firstName"
                        id="firstName"
                        {...register("firstName")}
                        value={firstName}
                        onChange={setPatientFirstName}
                        required
                      />
                      </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                      <Label >Middle Name</Label>
                      <Input
                        type="text"
                        name="middleName"
                        id="middleName"
                        {...register("middleName")}
                        value={middleName}
                        onChange={setPatientMiddleName}
                        required
                      />
                      </FormGroup>
                    </div>
                    
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                      <Label >Last Name *</Label>
                      <Input
                        type="text"
                        name="lastName"
                        id="lastName"
                        {...register("lastName")}
                        value={lastName}
                        onChange={setPatientLastName}
                        required
                      />
                      </FormGroup>
                    </div>
                   </div>
                   <div className="row">
                    <div className="form-group mb-3 col-md-4">
                        <FormGroup>
                          <Label >Age*</Label>
                          <Input
                            type="number"
                            name="age"
                            id="age"
                            {...register("age")}
                            value={age}
                            onChange={setPatientAge}
                            required
                          />
                        </FormGroup>
                    </div>
                    <div className="form-group  col-md-4">
                        <FormGroup>
                          <Label >Sex *</Label>
                          <Input
                            type="select"
                            name="sex"
                            id="sex"
                            {...register("sex")}
                            value={sex}
                            onChange={setPatientSex}
                            required>
                              <option value={""}></option>
                              <option value={"Male"}>Male</option>
                              <option value={"Female"}>Female</option>
                          </Input>
                        </FormGroup>
                    </div>
                    
                    <div className="form-group  col-md-4">
                        <FormGroup>
                          <Label >Phone Number *</Label>
                          <Input
                            type="number"
                            name="pnumber"
                            id="pnumber"
                            {...register("pnumber")}
                            value={pnumber}
                            onChange={setPatientPhone}
                            required
                          />
                        </FormGroup>
                    </div>

                       <div className="form-group  col-md-4">
                           <FormGroup>
                               <Label >Address *</Label>
                               <Input
                                   type="text"
                                   name="address"
                                   id="address"
                                   {...register("address")}
                                   value={address}
                                   onChange={setPatientAddress}
                                   required
                               />
                           </FormGroup>
                       </div>


                   </div>
                
                  {saving ? <Spinner /> : ""}
              <br />
              {userDetail ===null ? (

                <MatButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<SaveIcon />}
                
                >
                  {!saving ? (
                    <span style={{ textTransform: "capitalize" }}>Save</span>
                  ) : (
                    <span style={{ textTransform: "capitalize" }}>Saving...</span>
                  )}
                </MatButton>
              )
              :
              (
                <MatButton
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<SaveIcon />}
                
              >
                {!saving ? (
                  <span style={{ textTransform: "capitalize" }}>Save</span>
                ) : (
                  <span style={{ textTransform: "capitalize" }}>Saving...</span>
                )}
              </MatButton>
              )
            }
              <MatButton
                variant="contained"
                className={classes.button}
                startIcon={<CancelIcon />}
                onClick={handleCancel}
              >
                <span style={{ textTransform: "capitalize" }}>Cancel</span>
              </MatButton>
                </Form>
              </div>
            </div>
            
          </div>
        </div>
        </CardContent>
        </Card>
    </>
  );
};



export default UserRegistration