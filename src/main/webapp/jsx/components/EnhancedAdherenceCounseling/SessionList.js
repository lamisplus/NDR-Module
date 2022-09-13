import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table';
import axios from "axios";

import { token as token, url as baseUrl } from "./../../../api";
import { forwardRef } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Link } from 'react-router-dom'
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import {  Card,CardBody,} from 'reactstrap';
import ButtonMui from "@material-ui/core/Button";
import 'react-toastify/dist/ReactToastify.css';
import 'react-widgets/dist/css/react-widgets.css';
import { makeStyles } from '@material-ui/core/styles'
import "@reach/menu-button/styles.css";
import "@reach/menu-button/styles.css";
import 'semantic-ui-css/semantic.min.css';
import "react-widgets/dist/css/react-widgets.css";
import { toast} from "react-toastify";
import StopEac from './StopEac'

const tableIcons = {
Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const useStyles = makeStyles(theme => ({
    card: {
        margin: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    cardBottom: {
        marginBottom: 20
    },
    Select: {
        height: 45,
        width: 350
    },
    button: {
        margin: theme.spacing(1)
    },

    root: {
        '& > *': {
            margin: theme.spacing(1)
        }
    },
    input: {
        display: 'none'
    },
    error: {
        color: "#f85032",
        fontSize: "11px",
    },
    success: {
        color: "#4BB543 ",
        fontSize: "11px",
    }, 
}))


const LabHistory = (props) => {    
    const [orderList, setOrderList] = useState([])
    const [loading, setLoading] = useState(true)
    const [artModal, setArtModal] = useState(false);
    const Arttoggle = () => setArtModal(!artModal);

    useEffect(() => {
        LabOrders()
      }, [props.patientObj.id]);
    //GET LIST OF Patients
    async function LabOrders() {
        setLoading(true)
        axios
            .get(`${baseUrl}laboratory/rde-orders/patients/${props.patientObj.id}`,
            { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then((response) => {
                setLoading(false)
                setOrderList(response.data);                
            })
            .catch((error) => {  
                setLoading(false)  
            });        
    }

    const labStatus =(status)=> {
        console.log(status)
          if(status===0){
            return "blue"
          }else if(status===1){
            return "teal"
          }else if(status===2){
            return "green"
          }else if(status===3){
            return "red"
          }else if(status===4){
            return "orange"
          }else if(status===5){
            return "dark"
          }else {
            return "grey"
          }
      }

    const AddNewSession = (row, actionType) =>{  
        // props.setActiveContent({...props.activeContent, route:'pharmacy', activeTab:"hsitory"})
         props.setActiveContent({...props.activeContent, route:'new-eac-session', id:row.id, activeTab:"history", actionType:actionType, obj:row})
     }
     const LoadEacOutCome = (row, actionType) =>{  
        // props.setActiveContent({...props.activeContent, route:'pharmacy', activeTab:"hsitory"})
         props.setActiveContent({...props.activeContent, route:'eac-outcome', id:row.id, activeTab:"history", actionType:actionType, obj:row})
     }
     const loadEacStop =()=> {
            setArtModal(!artModal)
    }
   const LabObj = [{"id":16,"orderId":13,"patientId":9,"visitId":0,"labTestGroupId":4,"labTestGroupName":"Others","labTestId":16,"labTestName":"Viral Load","labNumber":"788","sampleCollectionDate":"2022-09-08","dateAssayed":"2022-09-09","result":"78","dateResultReceived":"2022-09-09","comments":"good","viralLoadIndication":297,"viralLoadIndicationName":"Targeted Monitoring"}]
   
  return (
    <div>
            <ButtonMui
                variant="contained"
                color="primary"
                className=" float-end ms-2 mr-2 mt-2"
                //startIcon={<FaUserPlus size="10"/>}
                //startIcon={<TiArrowBack  />}
                onClick={() => loadEacStop()}
                style={{backgroundColor:"#000", color:'#fff', height:'35px'}}

            >
                <span style={{ textTransform: "capitalize" }}>Stop EAC</span>
            </ButtonMui>
            <ButtonMui
                variant="contained"
                color="primary"
                className=" float-end ms-2 mr-2 mt-2"
                //startIcon={<FaUserPlus size="10"/>}
                //startIcon={<TiArrowBack  />}
                onClick={LoadEacOutCome}
                style={{backgroundColor:"rgb(153, 46, 98)", color:'#fff', height:'35px'}}

            >
                <span style={{ textTransform: "capitalize" }}>Outcome</span>
            </ButtonMui>
            <ButtonMui
                variant="contained"
                color="primary"
                className=" float-end ms-2 mr-2 mt-2 "
                //startIcon={<FaUserPlus size="10"/>}
                //startIcon={<TiArrowBack  />}
                onClick={AddNewSession}
                style={{backgroundColor:"#014D88", color:'#fff', height:'35px'}}

            >
                <span style={{ textTransform: "capitalize" }}>Add Session</span>
            </ButtonMui>
            <br/> <br/> <br/>
        
            <MaterialTable
            icons={tableIcons}
              title="EAC Sessions"
              columns={[
              // { title: " ID", field: "Id" },
                {
                  title: "Session Date",
                  field: "testGroup",
                },
                { title: "Follow Up Date", field: "testName", filtering: false },
                { title: " Barriers ", field: "sampleCollectionDate", filtering: false },
                { title: "Interventions", field: "dateAssayed", filtering: false },
                // { title: "EAC Status", field: "dateResultReceived", filtering: false },


              ]}
              isLoading={loading}
              data={ LabObj.map((row) => ({
                  //Id: manager.id,
                  testGroup:row.labTestGroupName,
                  testName: row.labTestName,
                  labNumber: row.labNumber,
                  sampleCollectionDate: "",    
                //   dateAssayed: row.dateAssayed,
                 
                  }))}
            
                        options={{
                          headerStyle: {
                              backgroundColor: "#014d88",
                              color: "#fff",
                          },
                          searchFieldStyle: {
                              width : '200%',
                              margingLeft: '250px',
                          },
                          filtering: false,
                          exportButton: false,
                          searchFieldAlignment: 'left',
                          pageSizeOptions:[10,20,100],
                          pageSize:10,
                          debounceInterval: 400
                      }}
            />
       <StopEac  toggle={Arttoggle} showModal={artModal}  />
    </div>
  );
}

export default LabHistory;


