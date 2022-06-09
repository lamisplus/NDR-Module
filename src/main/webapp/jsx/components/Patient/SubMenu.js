import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import { makeStyles } from "@material-ui/core/styles";
import EnhancedAdherenceCounseling from './../EnhancedAdherenceCounseling/EnhancedAdherenceCounseling'
import DifferentiatedCare from './../DifferentiatedCare/DifferentiatedCare';
import StatusUpdate from './../ClientStatusUpdate/ClientStatusUpdate';
import ClinicFollowUp from './../ClinicFollowUpVisit/ClinicFollowUp';


const useStyles = makeStyles((theme) => ({
    navItemText: {
        padding: theme.spacing(2),
    },
}));

function SubMenu(props) {
    const classes = useStyles();
    const patientObjs = props.patientObj ? props.patientObj : {}
    const [patientObj, setpatientObj] = useState(patientObjs)
    const [ancModal, setAncModal] = useState(false);
    const Anctoggle = () => setAncModal(!ancModal);
    const [careModal, setCareModal] = useState(false);
    const Caretoggle = () => setCareModal(!careModal);
    const [clientStatusUpdateModal, setClientStatusUpdateModal] = useState(false);
    const ClientStatusUpdatetoggle = () => setClientStatusUpdateModal(!clientStatusUpdateModal);
    const [clinicFollowUpModal, setClinicFollowUpModal] = useState(false);
    const ClinicFollowUptoggle = () => setClinicFollowUpModal(!clinicFollowUpModal);

    const loadAnc =(row)=> {
        setpatientObj({...patientObj, ...row});
            setAncModal(!ancModal)
    }
    const loadCare =(row)=> {
        setpatientObj({...patientObj, ...row});
            setCareModal(!careModal)
    }
    const loadStatusUpdate =(row)=> {
        setpatientObj({...patientObj, ...row});
        setClientStatusUpdateModal(!clientStatusUpdateModal)
    }
    const loadClinicFolowUp = (row) =>{
        setpatientObj({...patientObj, ...row});
        setClinicFollowUpModal(!clinicFollowUpModal)
    }

    return (
        <div>
            {patientObj.enrolled===true ?
                (
                <Menu size="mini" color={"black"} inverted>
                    
                    <Menu.Item onClick={() => loadClinicFolowUp(patientObj)}>  Clinic Follow Up </Menu.Item>
                    <Menu.Item onClick={() => loadAnc(patientObj)}> Enhanced Adherence Counselling</Menu.Item>
                    <Menu.Item onClick={() => loadStatusUpdate(patientObj)}>Clint Status Update</Menu.Item>
                    <Menu.Item>Laboratory</Menu.Item>
                    <Menu.Item>Pharmacy Refill</Menu.Item>
                    
                </Menu>
               )
               :
               (
                <Menu size="mini" color={"black"} inverted>
                    
                    <Menu.Item onClick={() => loadClinicFolowUp(patientObj)}>  Clinic Follow Up </Menu.Item>
                    <Menu.Item onClick={() => loadAnc(patientObj)}> Enhanced Adherence Counselling</Menu.Item>
                    <Menu.Item onClick={() => loadStatusUpdate(patientObj)}>Clint Status Update</Menu.Item>
                    <Menu.Item>PMTCT</Menu.Item>
                    <Menu.Item>HEI</Menu.Item>
                    <Menu.Item>Cervical Cancer</Menu.Item>
                    <Menu.Item>PREP</Menu.Item>
                    
                </Menu>
               )
           }
            <ClinicFollowUp toggle={ClinicFollowUptoggle} showModal={clinicFollowUpModal} patientObj={patientObj}/>
            <EnhancedAdherenceCounseling  toggle={Anctoggle} showModal={ancModal} patientObj={patientObj} /> 
            <DifferentiatedCare toggle={Caretoggle} showModal={careModal} patientObj={patientObj} />
            <StatusUpdate toggle={ClientStatusUpdatetoggle} showModal={clientStatusUpdateModal} patientObj={patientObj} />
           
        </div>
    );
}



export default SubMenu;
