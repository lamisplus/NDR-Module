import React, { useState } from "react";
import { Button, Dropdown, Menu } from "semantic-ui-react";
import { makeStyles } from "@material-ui/core/styles";

//import * as CODES from "api/codes";
import { ToastContainer, toast } from "react-toastify";
import {Link} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    navItemText: {
        padding: theme.spacing(2),
    },
}));

function SubMenu(props) {
    const classes = useStyles();


    return (
        <React.Fragment>
            <Menu size="mini" color={"black"} inverted>
                
                <Menu.Item>  <Link  >Clinic Follow Up </Link></Menu.Item>
                <Menu.Item>  <Link  >Enhanced Adherence Counselling</Link></Menu.Item>
                <Menu.Item>  <Link >Differentiated Care </Link></Menu.Item>
                <Menu.Item>  <Link >Clint Status Update</Link></Menu.Item>
                <Menu.Item>  <Link >Laboratory</Link></Menu.Item>
                <Menu.Item>  <Link >Pharmacy Refill</Link></Menu.Item>
            </Menu>
            <ToastContainer />
        </React.Fragment>
    );
}

// const mapStateToProps = (state) => {
//     return {
//         patient: state.patients.patient,
//         relationships: state.applicationCodesets.relationships
//     };
// };

// const mapActionToProps = {
//     checkOutPatient: update,
//     fetchPatientByHospitalNumber: fetchByHospitalNumber,
//     fetchApplicationCodeSet: fetchApplicationCodeSet,
// };

export default SubMenu;
