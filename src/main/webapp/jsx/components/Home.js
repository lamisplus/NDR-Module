import React, {useState, Fragment } from "react";
import { Row, Col, Card,  Tab, Tabs, } from "react-bootstrap";
import Dashboard from './Patient/PatientList'
import VisualisationHome from './Visualisation/Index'
import PageTitle from "./../layouts/PageTitle";
const divStyle = {
  borderRadius: "2px",
  fontSize: 14,
};

const Home = () => {
    const [key, setKey] = useState('home');


  return (
    <Fragment>  
      <br/><br/>
      <PageTitle motherMenu="HIV" /> 
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
                  
                  <Tab eventKey="home" title="Find Patients">                   
                    <Dashboard />
                  </Tab>
                  <Tab eventKey="checked-in" title="Data Visualisation">                   
                    <VisualisationHome />
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

export default Home;
