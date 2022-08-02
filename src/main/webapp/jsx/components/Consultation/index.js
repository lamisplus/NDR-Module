import React, {useState, Fragment } from "react";
import { Row, Col, Card,  Tab, Tabs, } from "react-bootstrap";
import ConsultationPage from './Home';
import ClinicHistoryPage from "./ClinicHistory";

const divStyle = {
  borderRadius: "2px",
  fontSize: 14,
};

const ClinicVisitPage = (props) => {
    const [key, setKey] = useState('home');
    const patientObj = props.patientObj

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

                  <Tab eventKey="home" title="Clinic Visit">                   
                    <ConsultationPage patientObj={patientObj} setActiveContent={props.setActiveContent}/>
                  </Tab>  
                  {/* <Tab eventKey="history" title=" History">                   
                    <ClinicHistoryPage patientObj={patientObj} setActiveContent={props.setActiveContent}/>
                  </Tab>                    */}
                </Tabs>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
      </Row>
    </Fragment>
  );
};

export default ClinicVisitPage;
