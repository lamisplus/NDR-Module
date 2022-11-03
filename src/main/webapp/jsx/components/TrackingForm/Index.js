import React, {useState, Fragment, useEffect } from "react";
import axios from "axios";
import { Row, Col, Card,  Tab, Tabs, } from "react-bootstrap";
import Tracking from './Tracking';
import TrackingHistory from "./TrackingHistory";
import { url as baseUrl, token } from "../../../api";
//import LaboratoryRDE from "./LaboratoryRDE";

const divStyle = {
  borderRadius: "2px",
  fontSize: 14,
};

const LaboratoryModule = (props) => {
    const [key, setKey] = useState('home');
    const [trackingList, setTrackingList] = useState([])
    const patientObj = props.patientObj
    useEffect ( () => {
      TrackingDetails();
      setKey(props.activeContent.activeTab)
    }, [props.activeContent.id, props.activeContent.activeTab]);
    //GET Patient Lab order history
    async function TrackingDetails() {
      //setLoading(true)
      axios
          .get(`${baseUrl}patient-tracker/patient/${props.patientObj.id}`,
          { headers: {"Authorization" : `Bearer ${token}`} }
          )
          .then((response) => {
              //setLoading(false)
              setTrackingList(response.data);                
          })
          .catch((error) => {  
              //setLoading(false)  
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
                  <Tab eventKey="home" title="TRACKING FORM">                   
                    <Tracking patientObj={patientObj} setActiveContent={props.setActiveContent} trackingList={trackingList} TrackingDetails={TrackingDetails}/>
                  </Tab>
                  
                  <Tab eventKey="history" title="TRACKING HISTORY">                   
                   <TrackingHistory patientObj={patientObj} setActiveContent={props.setActiveContent} trackingList={trackingList} TrackingDetails={TrackingDetails}/> 
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

export default LaboratoryModule;
