import React from 'react';
import ReactApexChart from 'react-apexcharts';

class AgeChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [{
        name: 'Age',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }],
      options: {
        chart: {
          height: 350,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: ['0-10', '11-20', '21-30', '31-40', '41-50', '51-60', '61-70', '71-80'],
        },
      },
    };
  }

  render() {
    return (
      <div>
        <div id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
        </div>
      </div>
    );
  }
}

export default AgeChart;
