//import React from 'react';
import Highcharts from 'highcharts';

export const birthChart = {

chart: {
  type: 'column',
  options3d: {
      enabled: true,
      alpha: 10,
      beta: 25,
      depth: 70
  }
},
title: {
  text: 'Total Birth for the pass 6 months'
},
subtitle: {
  text: ''
},
plotOptions: {
  column: {
      depth: 25
  }
},
xAxis: {
  categories: Highcharts.getOptions().lang.shortMonths,
  labels: {
      skew3d: true,
      style: {
          fontSize: '16px'
      }
  }
},
yAxis: {
  title: {
      text: null
  }
},
series: [{
  name: 'Birth Rate',
  data: [2, 3, null, 4, 0, 8]
}]
};