import React, { useState } from 'react';

import { Col, Form,CardBody, FormGroup, Input, Label, Row, Alert} from "reactstrap";
import { Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import MatButton from "@material-ui/core/Button";
import ListAltIcon from '@material-ui/icons/ListAlt';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import IndicatorCounts from './IndicatorCounts'
import LineChart from './DashBoardVisualisation/BarDrilldown';
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
    <div  spacing={3} style={{ padding: 10 }} >
    <Breadcrumbs aria-label="breadcrumb">
       
       <Link color="inherit" to={{pathname: "data-analytics"}} >
           <h3>Data Visualisation Analytics</h3>
       </Link>
       <Typography color="textPrimary"> <h3>Clinical Cascade</h3> </Typography>
     </Breadcrumbs>
     <br/>
      <Row>
        <Col md={3}>
          <Card>
            <CardContent>
              <h4>Apply Filter Below to Load Data</h4>
              <br/>
            <FormGroup>
                <Label for="maritalStatus"><ListAltIcon />Select MER Indicator</Label>
                    <Input
                        type="select"
                        name="genderId"
                        id="genderId"                        
                    >
                      <option  value=""> Treatment New</option>
                      <option  value=""> Treatment Current</option> 
                      <option  value=""> Treatment PVLS</option>
                      <option  value=""> Treatment HTS,TST</option>  
                    </Input>
            </FormGroup>                                    
            <FormGroup>
                <Label for="maritalStatus"><AcUnitIcon />{" "}Implementing Partners</Label>
                    <Input
                        type="select"
                        name="genderId"
                        id="genderId"                        
                    >
                      <option  value=""> Abuja</option>
                      <option  value="">Uyo</option> 
                      <option  value="">Lagos</option>
                      <option  value="">Kano</option>  
                    </Input>
            </FormGroup>
           
            <MatButton
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
               
            >
                <span style={{textTransform: 'capitalize', }}>Load Data</span>
            </MatButton>
             {" "}
            <MatButton
                variant="contained"
                className={classes.button}
               
            >
                <span style={{textTransform: 'capitalize'}}>Cancel</span>
            </MatButton>
            </CardContent>
          </Card>
        </Col>

        <Col md={9}>
          {/* The second Column Card Layout  */}
            <Row>
                <Col  lg={12} md={12} sm={12} xs={12} className="mb-2">
                  <IndicatorCounts />
                </Col>
                <Col  lg={12} md={12} sm={12} xs={12} className="mb-2">
                      <Alert color="danger">
                        <h4 className="alert-heading">IMPORTANT NOTE: !</h4>
                        <p>
                        Spectrum Estimates are for States and LGAs not Facilities. This becomes important when filtering by Implementing Partners.
                        </p>
                        <hr />
                        <p className="mb-0">
                        Implementing Partners support facilities and there may be one partner supporting facilities in an LGA or State.
                        </p>
                      </Alert>
                  </Col>
                  <Col  lg={12} md={12} sm={12} xs={12} className="mb-2">
                  <Card><CardBody>
                     <LineChart />
                  </CardBody></Card>
                  </Col>
                 
              </Row>

           
        </Col>
      </Row>

    </div>
  );
}

export default Example;
