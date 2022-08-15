
import React  from "react";
import { FaUserPlus, FaCalendarAlt, FaUserCheck} from 'react-icons/fa'; 
import { MdAirlineSeatIndividualSuite} from 'react-icons/md';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {Card,CardBody,CardHeader,CardTitle,Col,Row,} from 'reactstrap';
import { Link } from 'react-router-dom'

// Load Highcharts modules
require("highcharts/modules/exporting")(Highcharts);

const cardStyle = {
  borderColor: '#fff',
  color: '#fff',
  padding: '-10px, 0px'
};



const  IndicatorCounts = (props) => {
  window.scrollTo(0, 0);

  return (
      <>
               {/* Card stats */}
            <Row className={"p-3"}>
              
                <Col lg={4} md={6} sm={6} xs={12} >
                  <Card  className="card-stats mb-4 mb-xl-0 " style={{backgroundColor: '#FFBF43', color: '#fff',  boxShadow: '1px 2px #eee'}}>
                    <CardBody >
                      <Row >
                      
                        <div className="col">
                          <CardTitle
                           tag="h6"
                            className=" text-uppercase text-muted mb-0" 
                            style={{ color: 'white'}}
                          >
                              <div className="icon icon-shape   " style={{ color: 'white'}}>
                                <FaUserPlus size={25} className={"text-primary"} style={{paddingRight: 10}}/> 
                                <b>SPECTRUM ESTIMATE</b>
                              </div>

                          </CardTitle>
                          <span className="h2 font-weight-bold  center" style={{ color: 'white', textAlign:'left'}}>
                           <h1>67</h1>
                          </span>
                        </div>
                      </Row>
                      
                    </CardBody>
                  </Card>
                </Col>
               
                <Col lg={4} md={6} sm={6} xs={12}>
                  <Card style={cardStyle} className="card-stats mb-4 mb-xl-0 " style={{backgroundColor: '#7DC2AF', color: '#fff'}}>
                    <CardBody>
                      <Row>
                      
                        <div className="col">
                          <CardTitle
                            tag="h6"
                            className="text-uppercase text-muted mb-0"
                            style={{ color: 'white'}}
                          >
                                <div className="icon icon-shape  " style={{ color: 'white'}}>
                                  <FaUserCheck className="text-black" size={25} />
                                  <b>CURRENT ON ART</b>
                                </div>

                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0" style={{ color: 'white'}}>54</span>
                        </div>
                      </Row>
                      
                    </CardBody>
                  </Card>
                </Col>
                <Col lg={4} md={6} sm={6} xs={12}>
                  <Card style={cardStyle} className="card-stats mb-4 mb-xl-0  " style={{backgroundColor: '#05396B', color: '#fff'}}>
                    <CardBody style={{ color: 'white'}}>
                      <Row>
                     
                        <div className="col">
                          <CardTitle
                            tag="h6"
                            className="text-uppercase text-muted mb-0"
                            >
                            <div className="icon icon-shape" style={{ color: 'white'}}>
                                <FaCalendarAlt className=" text-warning" size={25} /> 
                                <b>VIRALLY SUPPRESSED</b>
                            </div>
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                           56
                          </span>
                        </div>
                    </Row>
                      
                    </CardBody>
                  </Card>
                </Col>
          </Row>

         
      </>
  ); 
}

export default IndicatorCounts;
