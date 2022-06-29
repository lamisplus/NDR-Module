import React, { useState, useEffect } from "react";
import { Input, Label, FormGroup} from "reactstrap";
import { makeStyles } from '@material-ui/core/styles'
import { token, url as baseUrl } from "./../../../../api";
import axios from "axios";



const TBScreeningForm = (props) => {
  const [tbStatus, setTbStatus] = useState([]); 
  const [TBForms, setTBForms] = useState(false) 


  useEffect(() => {
    TBStatus();
    }, []);

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

    const handleInputChange = e => {
      props.setTbObj ({...props.tbObj,  [e.target.name]: e.target.value});
        if(e.target.name ==="antiTBDrug" ){
          if(e.target.value==="NO"){
              setTBForms(true)
          }else{
              setTBForms(false)
          }
        }
      }

  return (
    <div>
       <div className="row">
          
          <div className="form-group mb-3 col-md-6">
          <FormGroup>
              <Label >Patient on Anti TB Drugs?</Label>
              <Input
                  type="select"
                  name="antiTBDrug"
                  id="antiTBDrug"
                  value={props.tbObj.antiTBDrug}
                  onChange={handleInputChange}
                  required
                  >
                    <option value="">Select </option>
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
                    name="currentOnIpt"
                    id="currentOnIpt"
                    value={props.tbObj.currentOnIpt}
                    onChange={handleInputChange}
                    required
                    >
                      <option value=""> Select</option>
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
                    name="couching"
                    id="couching"
                    value={props.tbObj.couching}
                    onChange={handleInputChange}
                    required
                    >
                      <option value=""> Select</option>
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
                    name="nightSweat"
                    id="nightSweat"
                    value={props.tbObj.nightSweat}
                    onChange={handleInputChange}
                    required
                    >
                      <option value=""> Select</option>
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
                    name="fever"
                    id="fever"
                    value={props.tbObj.fever}
                    onChange={handleInputChange}
                    required
                    >
                      <option value="">Select </option>
                      <option value="YES"> YES</option>
                      <option value="NO">NO </option>
                </Input>
              </FormGroup>
              </div>
              <div className="form-group mb-3 col-md-4">
              <FormGroup>
                <Label >Contact with TB Case?</Label>
                <Input
                    type="select"
                    name="contactWithTBCase"
                    id="contactWithTBCase"
                    value={props.tbObj.contactWithTBCase}
                    onChange={handleInputChange}
                    required
                    >
                      <option value=""> Select</option>
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
                    name="lethergy"
                    id="lethergy"
                    value={props.tbObj.lethergy}
                    onChange={handleInputChange}
                    required
                    >
                      <option value="">Select </option>
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
                    value={props.tbObj.tbStatusId}
                    onChange={handleInputChange}
                    required
                    >
                      <option value="">Select </option>

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
    </div>
     
  );
};



export default TBScreeningForm;
