import React, { Component } from "react";
import { findDOMNode, render } from "react-dom";
import Highcharts from "highcharts";
import HighMaps from "highcharts/highmaps";
import drilldown from "highcharts/modules/drilldown";
import map from "highcharts/modules/map";
import usAll from "./NigeriaAll";

class RITAByLocation extends Component {
  componentDidMount() {
    // load modules
    //drilldown(Highcharts);

    let data = [
      ['ng-ri', 0],
    ['ng-kt', 1],
    ['ng-so', 2],
    ['ng-za', 3],
    ['ng-yo', 4],
    ['ng-ke', 5],
    ['ng-ad', 6],
    ['ng-bo', 7],
    ['ng-ak', 8],
    ['ng-ab', 9],
    ['ng-im', 10],
    ['ng-by', 11],
    ['ng-be', 12],
    ['ng-cr', 13],
    ['ng-ta', 14],
    ['ng-kw', 15],
    ['ng-la', 16],
    ['ng-ni', 17],
    ['ng-fc', 18],
    ['ng-og', 19],
    ['ng-on', 20],
    ['ng-ek', 21],
    ['ng-os', 22],
    ['ng-oy', 23],
    ['ng-an', 24],
    ['ng-ba', 25],
    ['ng-go', 26],
    ['ng-de', 27],
    ['ng-ed', 28],
    ['ng-en', 29],
    ['ng-eb', 30],
    ['ng-kd', 31],
    ['ng-ko', 32],
    ['ng-pl', 33],
    ['ng-na', 34],
    ['ng-ji', 35],
    ['ng-kn', 36]
    ];

    const options = {

      title: {
        text: "% RITA Recent by Location"
      },
      plotOptions: {
        map: {
          states: {
            hover: {
              color: "#EEDD66"
            }
          }
        }
      },
      colorAxis: {
        min: 0,
        minColor: "#E6E7E8",
        maxColor: "#005645"
      },
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle"
      },

      subtitle: {
        text: "NIGERIA",
        floating: true,
        align: "right",
        y: 50,
        style: {
          fontSize: "16px"
        }
      },
      series: [
        {
          mapData: usAll,
          data: data,
          name: "NIGERIA",
          dataLabels: {
            enabled: true,
            format: "{point.name}"
          }
        }
      ],
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: "bottom"
        }
      }
    };

    
    this.chart = new HighMaps["Map"](findDOMNode(this), options);

  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  render() {
    return <div className="in-highchart" />;
  }
}

export default RITAByLocation;
