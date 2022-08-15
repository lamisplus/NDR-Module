import React, { useState } from "react";
import { render } from "react-dom";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import drilldown from "highcharts/modules/drilldown.js";

// Load Highcharts modules
require("highcharts/modules/exporting")(Highcharts);
drilldown(Highcharts);

const RITAByTestPoint = () => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
        type: 'column'
    },
    title: {
        text: '% RITA Recent and Long Term by Testing Point'
    },
    xAxis: {
        categories: ['CT', 'TI', 'TB', 'OutReach', 'STI']
    },
    yAxis: {
        min: 0,
        title: {
            text: '% Recent'
        }
    },
    tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
        shared: true
    },
    plotOptions: {
        column: {
            stacking: 'percent'
        }
    },
    series: [{
        name: 'RITA Recent',
        data: [5, 3, 4, 7, 2]
    }, {
        name: 'RITA Long Term',
        data: [2, 2, 3, 2, 1]
    }, ]
  });

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};
export default RITAByTestPoint;
