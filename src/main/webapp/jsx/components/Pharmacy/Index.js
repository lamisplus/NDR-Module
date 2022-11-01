import React, {useState, Fragment, useEffect } from "react";
import { Row, Col, Card,  Tab, Tabs, } from "react-bootstrap";
import PharmacyRefill from './PharmacyRefill';
import axios from "axios";
import PharmacyRefillUpdate from './PharmacyRefillUpdate';
import PharmacyHistory from "./PharmacyHistory";
import PharmacyRefillNew from './PharmacyRefillNew'
import { token as token, url as baseUrl } from "./../../../api";

const divStyle = {
  borderRadius: "2px",
  fontSize: 14,
};

const PharmacyModule = (props) => {
    const [key, setKey] = useState('home');
    const patientObj = props.patientObj
    const [loading, setLoading] = useState(true)
    const [refillList, setRefillList] = useState([])
    useEffect ( () => {
      PharmacyList()
      setKey(props.activeContent.activeTab)
    }, [props.activeContent.id,  props.activeContent.activeTab]);
    //console.log(key)

        //GET LIST Drug Refill
        async function PharmacyList() {
          setLoading(true)
          axios
              .get(`${baseUrl}hiv/art/pharmacy/patient?pageNo=0&pageSize=10&personId=${props.patientObj.id}`,
              { headers: {"Authorization" : `Bearer ${token}`} }
              )
              .then((response) => {
                  
                  setLoading(false)
                  setRefillList(response.data);                
              })
              .catch((error) => {  
                  setLoading(false)  
              });        
      }
     

  return (
    <Fragment>  
      <Row>       
        <Col xl={12}>
          <Card style={divStyle}>            
            <Card.Body>
              {/* <!-- Nav tabs --> */}
              <div className="custom-tab-1">
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                >
                  {/* <Tab eventKey="checked-in" title="Checked In Patients">                   
                    <CheckedInPatients />
                  </Tab> */}
                  <Tab eventKey="home" title="Pharmacy Drug Refill ">
                    {props.activeContent.actionType==='update' ? 
                      (                 
                        <PharmacyRefillUpdate patientObj={patientObj} setActiveContent={props.setActiveContent} activeContent={props.activeContent} PharmacyList={PharmacyList}/>
                      )
                      :
                      (
                        <PharmacyRefillNew patientObj={patientObj} setActiveContent={props.setActiveContent} activeContent={props.activeContent} PharmacyList={PharmacyList}/>
                      )
                    }
                  </Tab>  
                  <Tab eventKey="history" title=" History">                   
                    <PharmacyHistory patientObj={patientObj} setActiveContent={props.setActiveContent} activeContent={props.activeContent} PharmacyList={PharmacyList} refillList={refillList} loading={loading}/>
                  </Tab>                   
                </Tabs>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
      </Row>
    </Fragment>
  );
};

export default PharmacyModule;
