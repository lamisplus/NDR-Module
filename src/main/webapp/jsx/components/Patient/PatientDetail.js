import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import ButtonMui from "@material-ui/core/Button";
import 'semantic-ui-css/semantic.min.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PatientCardDetail from './PatientCard'
import { useHistory } from "react-router-dom";
import SubMenu from './SubMenu';
import RecentHistory from './../History/RecentHistory';
import ClinicVisit from '../Consultation/Index'
import Pharmacy from './../Pharmacy/Index';
import Laboratory from './../Laboratory/index';
import AncPnc from './../PmtctServices/AncPnc';
import AncEnrollement from './../PmtctServices/AncEnrollement';
import LabourDelivery from './../PmtctServices/LabourDelivery';
import PrEPCommencementForm from './../PrepServices/PrEPCommencementForm';
import PrEPDiscontinuationsInterruptions from './../PrepServices/PrEPDiscontinuationsInterruptions';
import PrEPEligibiltyScreeningForm from './../PrepServices/PrEPEligibiltyScreeningForm';
import PrEPVisit from './../PrepServices/PrEPVisit';
import PrEPRegistrationForm from './../PrepServices/PrEPRegistrationForm';
import EnhancedAdherenceCounseling from './../EnhancedAdherenceCounseling/Index';
import CervicalCancer from './../CervicalCancer/Index';
import ClientStatusUpdate from './../ClientStatusUpdate/ClientStatusUpdate'
import AdultClinicEvaluationFrom from '../InitailClinicEvaluation/index'
import ChildClinicEvaluationForm from '../InitailClinicEvaluation/ChildClinicEvaluationForm'
import MentalHealthScreening from '../MentalHealthScreening/index'
import LabHistory from './../Laboratory/LabHistory'
import PatientHistory from './../History/PatientHistory'
import ArtCommencement from './../ArtCommencement/ArtCommencement'
//History of patient
import ViewMentalHealthScreening from './../MentalHealthScreening/ViewMhs'
import ViewAdultClinicEvaluationFrom from './../InitailClinicEvaluation/ViewAdultClinicEvaluationFrom'
import ViewArtCommencement from './../ArtCommencement/ViewArtCommencement'
import FirstEac from './../EnhancedAdherenceCounseling/ViewEAC/FirstEac'
import SecondEac from './../EnhancedAdherenceCounseling/ViewEAC/SecondEac'
import ThirdEac from './../EnhancedAdherenceCounseling/ViewEAC/ThirdEac'
import ViewLaboratory from './../Laboratory/ViewLaboratory'
import PharmacyRefillUpdate from './../Pharmacy/PharmacyRefillUpdate'

import { TiArrowBack } from 'react-icons/ti'

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '20.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});


function PatientCard(props) {
    let history = useHistory();
    const [art, setArt] = useState(false);
    const [activeContent, setActiveContent] = useState({route:"recent-history", id:"", activeTab:"home", actionType:"create", obj:{}});
    const { classes } = props;
    const patientObj = history.location && history.location.state ? history.location.state.patientObj : {}
    console.log(activeContent)
  return (
    <div className={classes.root}>
      <Card >
        <CardContent>
            <PatientCardDetail patientObj={patientObj} setArt={setArt} setActiveContent={setActiveContent}/>            
            <SubMenu patientObj={patientObj} art={art} setActiveContent={setActiveContent}/>
            <br/>
            <Link to={"/"} >
            <ButtonMui
                variant="contained"
                color="primary"
                className=" float-end ms-2"
                //startIcon={<FaUserPlus size="10"/>}
                startIcon={<TiArrowBack  />}
                style={{backgroundColor:"rgb(153, 46, 98)", color:'#fff', height:'35px'}}

            >
                <span style={{ textTransform: "capitalize" }}>Back</span>
            </ButtonMui>
          </Link>
          <br/><br/>
          {activeContent.route==='recent-history' &&(<RecentHistory patientObj={patientObj} setActiveContent={setActiveContent}/>)}
          {activeContent.route==='consultation' &&( <ClinicVisit patientObj={patientObj} setActiveContent={setActiveContent}/>)}
          {/* {activeContent==='child-consultation' &&( <ChildConsultation patientObj={patientObj} setActiveContent={setActiveContent}/>)} */}
          {activeContent.route==='pharmacy' &&( <Pharmacy patientObj={patientObj} setActiveContent={setActiveContent} activeContent={activeContent}/>)}
          {activeContent.route==='laboratory' &&( <Laboratory patientObj={patientObj} setActiveContent={setActiveContent} activeContent={activeContent}/>)}
          {activeContent.route==='anc-pnc' &&( <AncPnc patientObj={patientObj} setActiveContent={setActiveContent}/>)}
          {activeContent.route==='anc-enrollment' &&( <AncEnrollement patientObj={patientObj} setActiveContent={setActiveContent}/>)}
          {activeContent.route==='labour-delivery' &&( <LabourDelivery patientObj={patientObj} setActiveContent={setActiveContent}/>)}
          {activeContent.route==='prep-commencement' &&( <PrEPCommencementForm patientObj={patientObj} setActiveContent={setActiveContent}/>)}
          {activeContent.route==='prep-interruptions' &&( <PrEPDiscontinuationsInterruptions patientObj={patientObj} setActiveContent={setActiveContent}/>)}
          {activeContent.route==='prep-screening' &&( <PrEPEligibiltyScreeningForm patientObj={patientObj} setActiveContent={setActiveContent}/>)}
          {activeContent.route==='prep-visit' &&( <PrEPVisit />)}
          {activeContent.route==='prep-registration' &&( <PrEPRegistrationForm patientObj={patientObj} setActiveContent={setActiveContent}/>)} 
          {activeContent.route==='counseling' &&( <EnhancedAdherenceCounseling patientObj={patientObj} setActiveContent={setActiveContent}/>)}
          {activeContent.route==='cervical-cancer' &&( <CervicalCancer patientObj={patientObj} setActiveContent={setActiveContent}/>)}
          {activeContent.route==='status-update' &&( <ClientStatusUpdate patientObj={patientObj} setActiveContent={setActiveContent}/>)}
          {activeContent.route==='adult-evaluation' &&( <AdultClinicEvaluationFrom patientObj={patientObj} setActiveContent={setActiveContent}/>)}
          {activeContent.route==='child-evaluation' &&( <ChildClinicEvaluationForm patientObj={patientObj} setActiveContent={setActiveContent}/>)}
          {activeContent.route==='mhs' &&( <MentalHealthScreening patientObj={patientObj} setActiveContent={setActiveContent}/>)}
          {activeContent.route==='lab-history' &&( <LabHistory patientObj={patientObj} setActiveContent={setActiveContent} activeContent={activeContent}/>)}
          {activeContent.route==='patient-history' &&( <PatientHistory patientObj={patientObj} setActiveContent={setActiveContent} activeContent={activeContent}/>)}
          {activeContent.route==='art-commencement' &&( <ArtCommencement patientObj={patientObj} setActiveContent={setActiveContent} activeContent={activeContent}/>)}
          {/* History Pages */}
          {activeContent.route==='mental-health-view' &&( <ViewMentalHealthScreening patientObj={patientObj} setActiveContent={setActiveContent} activeContent={activeContent}/>)}
          {activeContent.route==='adult-clinic-eveluation-view' &&( <ViewAdultClinicEvaluationFrom patientObj={patientObj} setActiveContent={setActiveContent} activeContent={activeContent}/>)}
          {activeContent.route==='art-commencement-view' &&( <ViewArtCommencement patientObj={patientObj} setActiveContent={setActiveContent} activeContent={activeContent}/>)}
          {activeContent.route==='first-eac-history' &&( <FirstEac patientObj={patientObj} setActiveContent={setActiveContent} activeContent={activeContent}/>)}
          {activeContent.route==='second-eac-history' &&( <SecondEac patientObj={patientObj} setActiveContent={setActiveContent} activeContent={activeContent}/>)}
          {activeContent.route==='completed-eac-history' &&( <ThirdEac patientObj={patientObj} setActiveContent={setActiveContent} activeContent={activeContent}/>)}
          {activeContent.route==='lab-view' &&( <ViewLaboratory patientObj={patientObj} setActiveContent={setActiveContent} activeContent={activeContent}/>)}
          {activeContent.route==='pharmacy-update' &&( <PharmacyRefillUpdate patientObj={patientObj} setActiveContent={setActiveContent} activeContent={activeContent}/>)}
         </CardContent>
      </Card>
    </div>
  );
}

PatientCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PatientCard);
