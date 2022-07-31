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
//import ChildConsultation from './../ChildConsultation/Home';
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
    const [activeContent, setActiveContent] = useState('recent-history');
    const { classes } = props;
    const patientObj = history.location && history.location.state ? history.location.state.patientObj : {}

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
          {activeContent==='recent-history' &&(<RecentHistory patientObj={patientObj} setActiveContent={setActiveContent}/>)}
          {activeContent==='consultation' &&( <ClinicVisit patientObj={patientObj} setActiveContent={setActiveContent}/>)}
          {/* {activeContent==='child-consultation' &&( <ChildConsultation patientObj={patientObj} setActiveContent={setActiveContent}/>)} */}
          {activeContent==='pharmacy' &&( <Pharmacy patientObj={patientObj} setActiveContent={setActiveContent}/>)}
          {activeContent==='laboratory' &&( <Laboratory patientObj={patientObj} setActiveContent={setActiveContent}/>)}
          {activeContent==='anc-pnc' &&( <AncPnc patientObj={patientObj} setActiveContent={setActiveContent}/>)}
          {activeContent==='anc-enrollment' &&( <AncEnrollement patientObj={patientObj} setActiveContent={setActiveContent}/>)}
          {activeContent==='labour-delivery' &&( <LabourDelivery patientObj={patientObj} setActiveContent={setActiveContent}/>)}
          {activeContent==='prep-commencement' &&( <PrEPCommencementForm patientObj={patientObj} setActiveContent={setActiveContent}/>)}
          {activeContent==='prep-interruptions' &&( <PrEPDiscontinuationsInterruptions patientObj={patientObj} setActiveContent={setActiveContent}/>)}
          {activeContent==='prep-screening' &&( <PrEPEligibiltyScreeningForm patientObj={patientObj} setActiveContent={setActiveContent}/>)}
          {activeContent==='prep-visit' &&( <PrEPVisit />)}
          {activeContent==='prep-registration' &&( <PrEPRegistrationForm patientObj={patientObj} setActiveContent={setActiveContent}/>)} 
          {activeContent==='counseling' &&( <EnhancedAdherenceCounseling patientObj={patientObj} setActiveContent={setActiveContent}/>)}
          {activeContent==='cervical-cancer' &&( <CervicalCancer patientObj={patientObj} setActiveContent={setActiveContent}/>)}
          {activeContent==='status-update' &&( <ClientStatusUpdate patientObj={patientObj} setActiveContent={setActiveContent}/>)}
          {activeContent==='adult-evaluation' &&( <AdultClinicEvaluationFrom patientObj={patientObj} setActiveContent={setActiveContent}/>)}
          {activeContent==='child-evaluation' &&( <ChildClinicEvaluationForm patientObj={patientObj} setActiveContent={setActiveContent}/>)}
          {activeContent==='mhs' &&( <MentalHealthScreening patientObj={patientObj} setActiveContent={setActiveContent}/>)}
          {activeContent==='lab-history' &&( <LabHistory patientObj={patientObj} setActiveContent={setActiveContent}/>)}
         </CardContent>
      </Card>
    </div>
  );
}

PatientCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PatientCard);
