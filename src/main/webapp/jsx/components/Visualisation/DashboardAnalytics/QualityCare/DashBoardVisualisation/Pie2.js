import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

// Load Highcharts modules
require("highcharts/modules/exporting")(Highcharts);
// Age categories
var categories = [
    '0-4', '5-9', '10-14', '15-19',
    '20-24', '25-29', '30-34', '35-39', '40-44',
    '45-49', '50-54', '55-59', '60-64', '65-69',
    '70-74', '75-79', '80-84', '85-89', '90-94',
    '95-99', '100 + '
];

//var Highcharts  = Highcharts

var options = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    
    title: {
        text: 'Patient Currently Receiving ART by Age Group'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            },
            showInLegend: true
        }


    },
    series: [{
        name: '',
        colorByPoint: true,
        data: [{
            name: 'Male',
            y: 61.41,
            sliced: true,
            selected: true
        }, {
            name: 'Female',
            y: 11.84
        }]
    }]
}


 const Pie = () => {
return (

    <div>
  <HighchartsReact
    highcharts={Highcharts}
    options={options}
  />
</div>
)
}

export default Pie;