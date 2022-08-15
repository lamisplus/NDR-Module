import Highcharts from 'highcharts';

export const QualityOfCare = {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Paediatric Regimen Analysis'
    },
    
    xAxis: {
        categories: ['3GT-7DT-6GH', '3GT-2DT-6GH', '3GT-5DT-6GH', '3GT-1DT-6GH', '3GT-$DT-6GH'],
        title: {
            text: 'Regimens'
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Number of Patients',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    // tooltip: {
    //     valueSuffix: ' millions'
    // },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true
    },
    credits: {
        enabled: false
    },
    series: [
     {
        name: 'Number of Patients',
        data: [1216, 1001, 4436, 738, 40]
    }
]
};