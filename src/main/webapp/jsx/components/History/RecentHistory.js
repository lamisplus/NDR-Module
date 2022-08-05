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
  const [recentActivities, setRecentActivities] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    LaboratoryHistory();
    PharmacyList();
    //ClinicVisitList();
    RecentActivities();
  }, [props.patientObj.id]);

  //Get list of LaboratoryHistory
  const RecentActivities =()=>{
    axios
       .get(`${baseUrl}hiv/patients/${props.patientObj.id}/activities?full=false`,
           { headers: {"Authorization" : `Bearer ${token}`} }
       )
       .then((response) => {
        //console.log()
          setRecentActivities(response.data[0].activities)
       })
       .catch((error) => {
       //console.log(error);
       });
   
  }
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
  const ActivityName =(name)=> {
      if(name==='HIV Enrollment'){
        return "HE"
      }else if(name==='Pharmacy refill'){
        return "PR"
      }else if(name==='Clinical evaluation'){
        return "CE"
      }else if(name==='Clinic visit follow up'){
        return "CV"
      }else if(name==='ART Commencement'){
        return "AC"
      }else {
        return "RA"
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


  return (
    <Fragment>
      {/* <Ext /> */}
     
      <div className="row">
      <div className="col-xl-4 col-xxl-4 col-lg-4">
          <div className="card">
            <div className="card-header  border-0 pb-0">
              <h4 className="card-title"> Recent Activities</h4>
            </div>
            <div className="card-body">
              <PerfectScrollbar
                style={{ height: "370px" }}
                id="DZ_W_Todo1"
                className="widget-media dz-scroll ps ps--active-y"
              >
                <ul className="timeline">
                {recentActivities.length >0 ? (
                  <>
                    {recentActivities.map((activitiy,index) => ( 
                    <>
                  <li>
                    <div className="timeline-panel">
                      <div className={index % 2 == 0 ? "media me-2 media-info" : "media me-2 media-success"}>{ActivityName(activitiy.name)}</div>
                      <div className="media-body">
                        <h5 className="mb-1">{activitiy.name}</h5>
                        <small className="d-block">
                          {activitiy.date}
                        </small>
                      </div>
                      <Dropdown className="dropdown">
                        <Dropdown.Toggle
                          variant=" light"
                          className="i-false p-0 btn-info sharp"
                        >
                          <svg
                            width="18px"
                            height="18px"
                            viewBox="0 0 24 24"
                            version="1.1"
                          >
                            <g
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <rect x="0" y="0" width="24" height="24" />
                              <circle fill="#000000" cx="5" cy="12" r="2" />
                              <circle fill="#000000" cx="12" cy="12" r="2" />
                              <circle fill="#000000" cx="19" cy="12" r="2" />
                            </g>
                          </svg>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu">
                          {activitiy.viewable && ( <Dropdown.Item
                              className="dropdown-item"
                              to="/widget-basic"
                            >
                              View
                            </Dropdown.Item>
                         )}
                           {activitiy.editable && (<Dropdown.Item
                              className="dropdown-item"
                              to="/widget-basic"
                            >
                              Delete
                            </Dropdown.Item>
                            )}
                            {activitiy.deletable && (<Dropdown.Item
                              className="dropdown-item"
                              to="/widget-basic"
                            >
                              Delete
                            </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
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
