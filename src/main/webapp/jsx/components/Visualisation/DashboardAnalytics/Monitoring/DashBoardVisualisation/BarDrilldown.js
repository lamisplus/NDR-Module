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
      type: "column",
      events: {
        drilldown: function(e) {
          console.log(e.seriesOptions)
          if (!e.seriesOptions) {
            var chart = this,
              drilldowns = {
                Animals: {
                  name: "Kano",
                  color: "#3150b4",
                  data: [["Cows", 2], ["Sheep", 3]]
                },
                Fruits: {
                  name: "Abuja",
                  color: "#3150b4",
                  data: [["Oranges", 3], ["Bananas", 2]]
                }
              },
              drilldowns2 = {
                Animals: {
                  name: "Kano",
                  color: "#50B432",
                  data: [["Cows", 8], ["Sheep", 7]]
                },
                Fruits: {
                  name: "Abuja",
                  color: "#50B432",
                  data: [
                    {
                      name: "Oranges",
                      y: 6,
                      drilldown: true
                    },
                    {
                      name: "Bananas",
                      y: 1,
                      drilldown: true
                    }
                  ]
                }
              },
              series = drilldowns[e.point.name],
              series2 = drilldowns2[e.point.name];
            chart.addSingleSeriesAsDrilldown(e.point, series);
            chart.addSingleSeriesAsDrilldown(e.point, series2);
            chart.applyDrilldown();
          }
        }
      }
    },
    title: {
      text: "Patient Currently Receiving ART by Location"
    },
    xAxis: {
      type: "category"
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      column: {
        stacking: "normal"
      },
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          style: {
            textShadow: false,
            fontSize: "1vw"
          }
        }
      }
    },
    series: [
      {
        name: "Things",
        color: "#3150b4",
        data: [
          {
            name: "Kano",
            y: 5,
            drilldown: true
          },
          {
            name: "Abuja",
            y: 5,
            drilldown: true
          }
        ]
      },
      {
        name: "MyThings",
        color: "#50B432",
        data: [
          {
            name: "Kano",
            y: 15,
            drilldown: 'sad'
          },
          {
            name: "Abuja",
            y: 7,
            drilldown: 'dsa'
          }
        ]
      }
    ],
    drilldown: {
      series: []
    }
  });

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};
export default LineChart;
