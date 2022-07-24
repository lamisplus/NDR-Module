import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles'
import axios from "axios";
import { toast} from "react-toastify";
import { url as baseUrl } from "./../../../api";
import { token as token } from "./../../../api";
import "react-widgets/dist/css/react-widgets.css";
import FirstEAC from './EnhancedAdherenceCounseling';
import ContinueEAC from './EacContinue';

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
    } 
}))

const EAC = (props) => {
    const patientObj = props.patientObj;
    const classes = useStyles()
    const [eacList, setEacList] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        EAC()
      }, [props.patientObj.id]);
    //GET LIST OF EAC
    async function EAC() {
        setLoading(true)
        axios
            .get(`${baseUrl}observation/eac/person/${props.patientObj.id}`,
            { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then((response) => {
                setLoading(false)
                setEacList(response.data);                
            })
            .catch((error) => {  
                setLoading(false)  
            });        
    }

  return (      
        <div> 
            {eacList.length < 1 ? (
                <>
                    <FirstEAC patientObj={patientObj}/> 
                </>
            ) :
                <>
                    <ContinueEAC patientObj={patientObj}/> 
                </>
            }                  
                          
        </div>
  );
}

export default EAC;
