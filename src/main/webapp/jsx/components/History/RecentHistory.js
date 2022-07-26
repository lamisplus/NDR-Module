import React, { Fragment, useState, useEffect } from "react";
// BS
import { Dropdown,} from "react-bootstrap";
/// Scroll
import { makeStyles } from '@material-ui/core/styles';
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link } from "react-router-dom";
import axios from "axios";
import { url as baseUrl, token } from "../../../api";
import { Alert } from "react-bootstrap";
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {  Label,  List, } from 'semantic-ui-react';
import { Row, Col, Card,Accordion } from "react-bootstrap";


const useStyles = makeStyles((theme) => ({
  root: {
      width: '100%',
  },
  heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: 'bolder',
  },
}));
const RecentHistory = (props) => {
  const classes = useStyles();
  const [vitaLoad, setViralLoad]=useState([])
  const [refillList, setRefillList] = useState([])
  const [clinicVisitList, setClinicVisitList] = useState([])
  const [loading, setLoading] = useState(true)
  const [
    activeAccordionHeaderShadow,
    setActiveAccordionHeaderShadow,
  ] = useState(0);

  useEffect(() => {
    LaboratoryHistory();
    PharmacyList();
    ClinicVisitList();
  }, []);

  //Get list of LaboratoryHistory
  const LaboratoryHistory =()=>{
    axios
       .get(`${baseUrl}laboratory/orders/patients/${props.patientObj.id}`,
           { headers: {"Authorization" : `Bearer ${token}`} }
       )
       .then((response) => {
           let LabObject= []
                response.data.forEach(function(value, index, array) {
                    const dataOrders = value.labOrder.tests                    
                    if(dataOrders[index]) {
                        dataOrders.forEach(function(value, index, array) {
                            LabObject.push(value)
                        })                       
                    }                   
                });
              setViralLoad(LabObject)
       })
       .catch((error) => {
       //console.log(error);
       });
   
  }
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
   //GET LIST Drug Refill
   async function ClinicVisitList() {
    setLoading(true)
    axios
        .get(`${baseUrl}hiv/art/clinic-visit/person?pageNo=0&pageSize=10&personId=${props.patientObj.id}`,
        { headers: {"Authorization" : `Bearer ${token}`} }
        )
        .then((response) => {
            setLoading(false)
            setClinicVisitList(response.data);                
        })
        .catch((error) => {  
            setLoading(false)  
        });        
  }
  const labStatus =(status)=> {
    console.log(status)
      if(status===0){
        return "timeline-badge info"
      }else if(status===1){
        return "timeline-badge warning"
      }else if(status===2){
        return "timeline-badge success"
      }else if(status===3){
        return "timeline-badge danger"
      }else if(status===4){
        return "timeline-badge primary"
      }else if(status===5){
        return "timeline-badge info"
      }else {
        return "timeline-badge secondary"
      }
  }
  const regimenName =(regimenObj)=> {
    let regimenArr = []
    regimenObj.forEach(function (value, index, array) {
      //console.log(value)
        regimenArr.push(value['name'])
    })
    return regimenArr.toString();
    }

    const defaultAccordion = [
      {
        title: "Accordion Header One",
        text:
          "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.",
        bg: "primary",
      },
      {
        title: "Accordion Header Two",
        text:
          "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.",
  
        bg: "info",
      },
      {
        title: "Accordion Header Three",
        text:
          "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.",
  
        bg: "success",
      },
    ];
  
  return (
    <Fragment>
      {/* <Ext /> */}
     
      <div className="row">
      <div className="col-xl-4 col-xxl-4 col-lg-4">
          <div className="card">
            <div className="card-header  border-0 pb-0">
              <h4 className="card-title"> Clinic Visits</h4>
            </div>
            <div className="card-body">
              <PerfectScrollbar
                style={{ height: "370px" }}
                id="DZ_W_Todo1"
                className="widget-media dz-scroll ps ps--active-y"
              >
                <ul className="timeline">
                { clinicVisitList.length > 0 ?(
                  
                <Accordion
                    className="accordion accordion-header-bg accordion-header-shadow accordion-rounded "
                    defaultActiveKey="0"
                  >
                    <>
                    {clinicVisitList.map((visit, i)=>
                  <div className="accordion-item" key={i}>
                    <Accordion.Toggle
                      as={Card.Text}
                      eventKey={`${i}`}
                      className={`accordion-header ${
                        activeAccordionHeaderShadow === 1 ? "" : "collapsed"
                      } accordion-header-info`}
                      onClick={() =>
                        setActiveAccordionHeaderShadow(
                          activeAccordionHeaderShadow === 1 ? -1 : i
                        )
                      }
                    >
                      <span className="accordion-header-icon"></span>
                      <span className="accordion-header-text">Visit Date : <span className="float-end">{visit.visitDate}</span> </span>
                      <span className="accordion-header-indicator "></span>
                    </Accordion.Toggle>
                    <Accordion.Collapse
                      eventKey={`${i}`}
                      className="accordion__body"
                    >
                      <div className="accordion-body-text">
                    
                          <List celled style={{width:'100%'}}>
                              {visit.vitalSignDto && visit.vitalSignDto.pulse!==null && (<List.Item style={{paddingBottom:'10px', paddingTop:'10px',borderTop:'1px solid #fff', marginTop:'-5px' }}>Pulse <span style={{color:'rgb(153, 46, 98)'}} className="float-end"><b>{visit.vitalSignDto.pulse} bpm</b></span></List.Item>)}
                              {visit.vitalSignDto && visit.vitalSignDto.respiratoryRate!==null && (<List.Item style={{paddingBottom:'10px', paddingTop:'10px'}}>Respiratory Rate <span className="float-end"><b style={{color:'rgb(153, 46, 98)'}}>{visit.vitalSignDto.respiratoryRate} bpm</b></span></List.Item>)}
                              {visit.vitalSignDto && visit.vitalSignDto.temperature!==null && (<List.Item style={{paddingBottom:'10px', paddingTop:'10px'}}>Temperature <span className="float-end"><b style={{color:'rgb(153, 46, 98)'}}>{visit.vitalSignDto.temperature} <sup>0</sup>C</b></span></List.Item>)}
                              {visit.vitalSignDto && visit.vitalSignDto.systolic!==null && visit.vitalSignDto.diastolic!==null && (<List.Item style={{paddingBottom:'10px', paddingTop:'10px'}}>Blood Pressure <span  className="float-end"><b style={{color:'rgb(153, 46, 98)'}}>{visit.vitalSignDto.systolic}/{visit.vitalSignDto.diastolic}</b></span></List.Item>)}
                              {visit.vitalSignDto && visit.vitalSignDto.height!==null && (<List.Item style={{paddingBottom:'10px', paddingTop:'10px'}}>Height <span  className="float-end"><b style={{color:'rgb(153, 46, 98)'}}>{visit.vitalSignDto.height} cm</b></span></List.Item>)}
                              {visit.vitalSignDto && visit.vitalSignDto.bodyWeight!==null && (<List.Item style={{paddingBottom:'10px', paddingTop:'10px'}}>Weight <span  className="float-end"><b style={{color:'rgb(153, 46, 98)'}}>{visit.vitalSignDto.bodyWeight} kg</b></span></List.Item>)}
                              {visit.vitalSignDto && visit.vitalSignDto.bodyWeight!==null && visit.vitalSignDto.height!==null && (<List.Item style={{paddingBottom:'10px', paddingTop:'10px'}}>BMI <span  className="float-end"><b style={{color:'rgb(153, 46, 98)'}}>{Math.round(visit.vitalSignDto.bodyWeight/(visit.vitalSignDto.height/100))} kg</b></span></List.Item>)}
                          </List>
                          <p><strong>Clinic Notes : </strong>{visit.clinicalNote}</p>
                      </div>
                    </Accordion.Collapse>
                  </div>
                )}
                </>
              </Accordion>             

            ):
            (
            <Alert
                  variant="info"
                  className="alert-dismissible solid fade show"
                >
                  <p>No clinic visit</p>
                </Alert>
            )}
                </ul>
              </PerfectScrollbar>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-xxl-4 col-lg-4">
          <div className="card">
            <div className="card-header border-0 pb-0">
              <h4 className="card-title">Laboratory Orders</h4>
            </div>
            <div className="card-body">
              <PerfectScrollbar
                style={{ height: "370px" }}
                id="DZ_W_TimeLine"
                className="widget-timeline dz-scroll height370 ps ps--active-y"
              >
                <ul className="timeline">
                  {vitaLoad.length >0 ? (
                    <>
                     {vitaLoad.map((test,index) => ( 
                      <>
                        <li key={index}>
                        <div className={labStatus(test.labTestOrderStatus)}></div>
                        <Link
                          className="timeline-panel text-muted"
                          to="/widget-basic"
                        >
                          <h6 className="mb-0">
                            Test Order Date{" "}<br/>
                            <strong className="text-primary">{test.orderDate}</strong>
                          </h6>
                          {test.labTestGroupName!=='others' &&(<h6 className="mb-0">
                            Test Order{" "}<br/>
                            <strong className="text-primary">{test.labTestGroupName + " - " + test.labTestName}</strong>.
                          </h6>
                           )}
                           {test.labTestGroupName==='others' &&(<h6 className="mb-0">
                            Test Order{" "}<br/>
                            <strong className="text-primary">{test.labTestName + " - " + test.viralLoadIndicationName}</strong>.
                          </h6>
                           )}
                          
                          <h6 className="mb-0">
                            Status{" "}<br/>
                            <strong className="text-primary">{test.labTestOrderStatusName}</strong>.
                          </h6>
                          
                        </Link>
                        </li>
                      </>

                     ))}
                    
                    </>
                    ) 
                    :
                    <Alert
                      variant="info"
                      className="alert-dismissible solid fade show"
                    >
                      <p>No Laboratory Test Order Yet</p>
                    </Alert>
                  }
                </ul>
              </PerfectScrollbar>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-xxl-4 col-lg-4">
          <div className="card">
            <div className="card-header border-0 pb-0">
              <h4 className="card-title">Refill Summary</h4>
            </div>
            <div className="card-body">
              <PerfectScrollbar
                style={{ height: "370px" }}
                id="DZ_W_TimeLine1"
                className="widget-timeline dz-scroll style-1 height370 ps ps--active-y"
              >
                <ul className="timeline">
                {refillList && refillList.length >0 ? (
                    <>
                     {refillList.map((regimen,index) => ( 
                      <>
                        <li key={index}>
                          <div className={index % 2 == 0 ? "timeline-badge info" : "timeline-badge success"}></div>
                          <Link
                            className="timeline-panel text-muted"
                            to="/widget-basic"
                          >
                            <h6 className="mb-0">
                             Regimen
                             {regimenName(regimen.extra.regimens)}
                             
                            </h6>
                            <strong className="text-teal">
                              Refill Duration<br/>
                               {regimen.refillPeriod}
                            </strong><br/> 
                            <strong className="text-warning">
                                Next Appointment<br/>
                                {regimen.nextAppointment}
                            </strong>                    

                          </Link>
                        </li>
                      </>

                     ))}
                    
                    </>
                    ) 
                    :
                    <Alert
                      variant="info"
                      className="alert-dismissible solid fade show"
                    >
                      <p>No Pharmacy Drug Refill</p>
                    </Alert>
                  }

                </ul>
              </PerfectScrollbar>
            </div>
          </div>
        </div>
       

 </div>
      
    </Fragment>
  );
};

export default RecentHistory;
