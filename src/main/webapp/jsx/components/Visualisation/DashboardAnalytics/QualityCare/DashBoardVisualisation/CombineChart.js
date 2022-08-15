//import React from 'react';
import Highcharts from 'highcharts';

export const combineChart = {
    chart: {
        type: 'column'
    },
  title: {
    text: 'Combination chart'
},
xAxis: {
    categories: ['Jan.', 'Feb.', 'March', 'April', 'May', 'June']
},
labels: {
    items: [{
        html: 'Total Appointment , Attendance and Emergencies',
        style: {
            left: '50px',
            top: '2px',
            color: ( // theme
                Highcharts.defaultOptions.title.style &&
                Highcharts.defaultOptions.title.style.color
            ) || 'black'
        }
    }]
},
series: [{
    
    name: 'Appointment',
    data: [3, 2, 1, 3, 4,5]
}, {
    
    name: 'Attendance',
    data: [2, 3, 5, 7, 6,5]
}, {
    
    name: 'Emergencies',
    data: [4, 3, 3, 9, 0,4]
} ]
};
