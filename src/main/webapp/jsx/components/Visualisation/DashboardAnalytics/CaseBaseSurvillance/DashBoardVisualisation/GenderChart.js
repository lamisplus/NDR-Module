import React, {  useEffect } from "react";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { url } from "../../api";
const jsonFormat = [
    {
      "data": [
        ['Male', 45.0],
        ['Female', 26.8],
        ['pediatric', 26.8]
      ],
      "name": "TOTAL REGISTERED PATIENTS (MALE AND FEMALE)",
      "type": "pie",
      "title": "TOTAL REGISTERED PATIENTS (MALE AND FEMALE)  In The Last 4 Months"
    }
  ]

  
  export const genderChart = {
    chart: {
        type: jsonFormat[0].type,
        options3d: {
            enabled: true,
            alpha: 45,
            beta: 0
        }
    },
    title: {
        text: ''
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            depth: 35,
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }
    },
    series: [{
        
        name: jsonFormat[0].name,
        data: jsonFormat[0].data
    }]
 }


 