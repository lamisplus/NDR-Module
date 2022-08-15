import React, { useState } from 'react';

import { Col, Form,CardBody, FormGroup, Input, Label, Row, Alert, FormFeedback, FormText,CardTitle, CardText,
  CardDeck,  CardGroup,CardSubtitle } from "reactstrap";
import { Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {QualityOfCare} from './Highcharts/QualityOfCare';
import {ViralLoadCascade} from './Highcharts/ViralLoadCascade';
import {AdultChildrenOnTreatement} from './Highcharts/AdultChildrenOnTreatement';
import IndicatorCounts from './IndicatorCounts';
import {
  MdPersonPin,
  MdPeople,
  MdShowChart,
  MdDelete
} from 'react-icons/md';
import { IconWidget } from 'components/Widget';
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import { Link } from 'react-router-dom';

const options = [
  'Change to Bar Chart',  
];

const ITEM_HEIGHT = 48;

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: 200,
    },
},
  // card: {
  //   margin: theme.spacing(20),
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
  // },
}));



const Example = (props) => {
  const classes = useStyles();
  const [chartValue, setChartValue] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);
  const [state, setState] = useState({ activeItem: 'gamepad' })

  const handleItemClick = (e, { name }) => setState({ activeItem: name })
  const { activeItem } = state
  const chartPage  = e => {

    setChartValue(e)
  }

  //Menu Icon 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div  spacing={5} style={{ padding: 20 }} >
    <Breadcrumbs aria-label="breadcrumb">
       
       <Link color="inherit" to={{pathname: "data-analytics"}} >
           <h3>Data Visualisation Analytics</h3>
       </Link>
       <Typography color="textPrimary"> <h3>Case-Based Surveillance</h3> </Typography>
     </Breadcrumbs>
     <br/>
      <Row>
        <Col md={12}>
          {/* The second Column Card Layout  */} 
        <Row> 
          <Col  lg={12} md={12} sm={12} xs={12} className="mb-4">
              <IndicatorCounts />
          </Col> 
          <Col  lg={12} md={12} sm={12} xs={12} className="mb-12">
              <CardGroup style={{ marginBottom: '1rem' }}>
                <IconWidget
                    bgColor="white"
                    inverse={false}
                    icon={MdDelete}
                    title="50000"
                    subtitle="NEWLY DIAGNOSED HIV+"
                />
                <IconWidget
                    bgColor="white"
                    inverse={false}
                    icon={MdPersonPin}
                    title="10"
                    subtitle="TESTED BY RTRI"
                />
                <IconWidget
                    bgColor="white"
                    inverse={false}
                    icon={MdPeople}
                    title="20000"
                    subtitle="RTRI RECENT"
                />
                <IconWidget
                    bgColor="white"
                    inverse={false}
                    icon={MdShowChart}
                    title="20000"
                    subtitle="RITA RECENT"
                />
                <IconWidget
                    bgColor="white"
                    inverse={false}
                    icon={MdShowChart}
                    title="20000"
                    subtitle="% RITA RECENT"
                />
          </CardGroup>
        </Col>
          <Col  lg={6} md={6} sm={12} xs={12} className="mb-4">
            <Card>
            <CardBody>
                <HighchartsReact options={AdultChildrenOnTreatement} />               
            </CardBody>
            </Card>
          </Col>                   
          <Col  lg={6} md={6} sm={12} xs={12} className="mb-4">
            <Card>
            <CardBody>
                <HighchartsReact options={ViralLoadCascade} />               
            </CardBody>
            </Card>
          </Col>
            
        </Row>
           
        </Col>

        
      </Row>
    </div>
  );
}

export default Example;
