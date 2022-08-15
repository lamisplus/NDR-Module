import React, { useState } from "react";
import { render } from "react-dom";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import drilldown from "highcharts/modules/drilldown.js";

// Load Highcharts modules
require("highcharts/modules/exporting")(Highcharts);
drilldown(Highcharts);

const RTRIByWeekSex = () => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
        type: 'column'
    },
    title: {
        text: '% RTRI Recent by Sex and Age Band'
    },

    xAxis: {
        categories: [
            'AIDs',
            'Malaria',
            'TB',
            'Breast Cancer',
            'Lung Cancer',
            'Stroke',
            'Laser Fever',
            'Preterm Delivery',
            'Falls',
            'Meningitis',
            'Cervical Cancer',
            'Suicide'
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Number of Death'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'Male',
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

    }, {
        name: 'Female',
        data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

    }]
  });

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};
export default RTRIByWeekSex;
