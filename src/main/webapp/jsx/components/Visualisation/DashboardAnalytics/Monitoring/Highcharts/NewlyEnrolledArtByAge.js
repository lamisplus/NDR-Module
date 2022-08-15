import Highcharts from 'highcharts';



export const NewlyEnrolledArtByAge = {
    chart: {
        
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Number of Adults and Children newly enrolled on ART '
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
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                connectorColor: 'black'
            },
            startAngle: 0,
            endAngle: 0,
            center: ['50%', '50%'],
            size: '50%',
            showInLegend: true
        }
    },
    series: [{
        name: 'Newly Enrolled on ART by Age',
        data: [
            
            { name: '25 + ', y: 61.41 },
            { name: '20-24 ', y: 11.84 },
            { name: '10-19 ', y: 10.85 },
            { name: '≤ 9 ', y: 4.67 },
        ]
    }]
};