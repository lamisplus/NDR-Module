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
import 'react-toastify/dist/ReactToastify.css';
import 'react-widgets/dist/css/react-widgets.css';
import { makeStyles } from '@material-ui/core/styles'
import Button from "@material-ui/core/Button";
import { MdDashboard } from "react-icons/md";
import {Menu,MenuList,MenuButton,MenuItem,} from "@reach/menu-button";
import "@reach/menu-button/styles.css";
import { Label } from 'semantic-ui-react'
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import moment from "moment";
import { FaUserPlus } from "react-icons/fa";
import {TiArrowForward} from 'react-icons/ti'

//Dtate Picker package
Moment.locale("en");
momentLocalizer();

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

    useEffect(() => {
        LabOrders()
      }, [props.patientObj.id]);
    //GET LIST OF Patients
    async function LabOrders() {
        setLoading(true)
        axios
            .get(`${baseUrl}laboratory/orders/patients/${props.patientObj.id}`,
            { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then((response) => {
                setLoading(false)
                let LabObject= []
                response.data.forEach(function(value, index, array) {
                    const dataOrders = value.labOrder.tests                    
                    if(dataOrders[index]) {
                        dataOrders.forEach(function(value, index, array) {
                            LabObject.push(value)
                        })                       
                    }                   
                });
                setOrderList(LabObject);                
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

  return (
    <div>
            <br/>
        
            <MaterialTable
            icons={tableIcons}
              title="Clinic Visit History"
              columns={[
              // { title: " ID", field: "Id" },
                {
                  title: "Test Group",
                  field: "testGroup",
                },
                { title: "Test Name", field: "testName", filtering: false },
                { title: "Order Priority", field: "orderPriority", filtering: false },
                { title: "Order Date", field: "orderDate", filtering: false },
                { title: "Status", field: "status", filtering: false },

              ]}
              isLoading={loading}
              data={ orderList.map((row) => ({
                  //Id: manager.id,
                  testGroup:row.labTestGroupName,
                  testName: row.labTestName,
                  orderPriority: row.orderPriorityName,
                  orderDate: row.orderDate,                    
                  status: (<Label color={labStatus(row.labTestOrderStatus)} size="mini">{row.labTestOrderStatusName}</Label>), 
                  
                  }))}
            
                        options={{
                          headerStyle: {
                              //backgroundColor: "#9F9FA5",
                              color: "#000",
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
       
    </div>
  );
}

export default LabHistory;


