import React, { useEffect, useState } from 'react'
import 'semantic-ui-css/semantic.min.css';
import "@reach/menu-button/styles.css";
import ConsultationPage from './History/ConsultationPage'


const ClinicVisitHistory = (props) => {    
  const patientObj = props.patientObj ? props.patientObj : {}

  return (
    <div>
         <div className="row">
            
                <ConsultationPage patientObj={patientObj}/>  

        </div>   
    </div>
  );
}

export default ClinicVisitHistory;


