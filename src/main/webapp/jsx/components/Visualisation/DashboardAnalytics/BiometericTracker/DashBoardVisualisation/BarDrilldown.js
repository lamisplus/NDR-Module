import React, { useState } from "react";
import { render } from "react-dom";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import drilldown from "highcharts/modules/drilldown.js";

// Load Highcharts modules
require("highcharts/modules/exporting")(Highcharts);
drilldown(Highcharts);

const LineChart = () => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'column'
  },
  title: {
      text: 'Biometric Tracker Analysis'
  },
  accessibility: {
      announceNewData: {
          enabled: true
      }
  },
  xAxis: {
      type: 'category'
  },
  yAxis: {
      title: {
          text: 'Values'
      }

  },
  legend: {
      enabled: false
  },
  plotOptions: {
      series: {
          borderWidth: 0,
          dataLabels: {
              enabled: true,
              format: '{point.y:.1f}%'
          }
      }
  },

  tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
  },

  series: [
      {
          name: "Browsers",
          colorByPoint: true,
          data: [
              {
                  name: "APIN",
                  y: 62.74,
                  drilldown: "APIN"
              },
              {
                  name: "CCFN",
                  y: 10.57,
                  drilldown: "CCFN"
              },
              
          ]
      }
  ],
  drilldown: {
      series: [
          {
              name: "APIN",
              id: "APIN",
              data: [
                  [
                      "v65.0",
                      0.1
                  ],
                  [
                      "v64.0",
                      1.3
                  ],
                  [
                      "v63.0",
                      53.02
                  ],
                  [
                      "v62.0",
                      1.4
                  ],
                  [
                      "v61.0",
                      0.88
                  ],
                  [
                      "v60.0",
                      0.56
                  ],
                  [
                      "v59.0",
                      0.45
                  ],
                  [
                      "v58.0",
                      0.49
                  ],
                  [
                      "v57.0",
                      0.32
                  ]
              ]
          },
          {
              name: "CCFN",
              id: "CCFN",
              data: [
                  [
                      "v58.0",
                      1.02
                  ],
                  [
                      "v57.0",
                      7.36
                  ],
                  [
                      "v56.0",
                      0.35
                  ],
                  [
                      "v55.0",
                      0.11
                  ],
                  [
                      "v54.0",
                      0.1
                  ]
              ]
          }
       
      ]
  }
  });

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};
export default LineChart;
