import React, {useState, Fragment, useEffect } from "react";
import axios from "axios";
import { Row, Col, Card,  Tab, Tabs, } from "react-bootstrap";
import ConsultationPage from './Home';
import ClinicHistoryPage from "./ViewUpdate/ClinicHistory";
import { url as baseUrl, token } from "../../../api";

const divStyle = {
  borderRadius: "2px",
  fontSize: 14,
};

const ClinicVisitPage = (props) => {
    const [key, setKey] = useState('home');
    const patientObj = props.patientObj
    const [loading, setLoading] = useState(true)
    const [clinicVisitList, setClinicVisitList] = useState([])
    useEffect ( () => {
      ClinicVisitListHistory();
      setKey(props.activeContent.activeTab)
    }, [props.activeContent.id, props.activeContent.activeTab]);
    async function ClinicVisitListHistory() {
      setLoading(true)
      axios
          .get(`${baseUrl}hiv/art/clinic-visit/person?pageNo=0&pageSize=1000&personId=${props.patientObj.id}`,
          { headers: {"Authorization" : `Bearer ${token}`} }
          )
          .then((response) => {
              setLoading(false)
              setClinicVisitList(response.data.filter((x)=> x.isCommencement!==true));              
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

                  <Tab eventKey="home" title="CLINIC VISIT ">                   
                    <ConsultationPage patientObj={patientObj} setActiveContent={props.setActiveContent}/>
                  </Tab>  
                  <Tab eventKey="history" title=" HISTORY">                   
                    <ClinicHistoryPage patientObj={patientObj} activeContent={props.activeContent} setActiveContent={props.setActiveContent} clinicVisitList={clinicVisitList} ClinicVisitListHistory={ClinicVisitListHistory}/>
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

export default ClinicVisitPage;
