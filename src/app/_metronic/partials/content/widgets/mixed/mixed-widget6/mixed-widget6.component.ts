import { Component, Input, OnInit } from '@angular/core';
import { getCSSVariableValue } from '../../../../../kt/_utils';
@Component({
  selector: 'app-mixed-widget6',
  templateUrl: './mixed-widget6.component.html',
})
export class MixedWidget6Component implements OnInit {
  @Input() chartColor: string = '';
  @Input() chartHeight: string;

  @Input() nombre:string;
  @Input() categorias:Array<any>;
  @Input() valores:Array<number>;

  chartOptions: any = {};

  constructor() {}

  ngOnInit(): void {
    this.chartOptions = this.getChartOptions(this.chartHeight, this.chartColor);
  }
  getChartOptions(chartHeight: string, chartColor: string) {
    const labelColor = getCSSVariableValue('--bs-gray-800');
    const strokeColor = getCSSVariableValue('--bs-gray-300');
    const baseColor = getCSSVariableValue('--bs-' + chartColor);
    const lightColor = getCSSVariableValue('--bs-light-' + chartColor);
  
    return {
      series: [
        {
          name: this.nombre,
          data: [312, 54, 14, 128, 26, 71, 145, 1097, 238],
        },
      ],
      chart: {
        fontFamily: 'inherit',
        type: 'area',
        height: chartHeight,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {},
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: 'solid',
        opacity: 1,
      },
      stroke: {
        curve: 'smooth',
        show: true,
        width: 3,
        colors: [baseColor],
      },
      xaxis: {
        categories: ['00H', '01H', '02H', '03H', '04H', '05H', '06H', '07H', '08H'],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          style: {
            colors: labelColor,
            fontSize: '12px',
          },
        },
        crosshairs: {
          show: false,
          position: 'front',
          stroke: {
            color: strokeColor,
            width: 1,
            dashArray: 3,
          },
        },
        tooltip: {
          enabled: false,
        },
      },
      yaxis: {
        min: 0,
        max: 60,
        labels: {
          show: false,
          style: {
            colors: labelColor,
            fontSize: '12px',
          },
        },
      },
      states: {
        normal: {
          filter: {
            type: 'none',
            value: 0,
          },
        },
        hover: {
          filter: {
            type: 'none',
            value: 0,
          },
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: 'none',
            value: 0,
          },
        },
      },
      tooltip: {
        style: {
          fontSize: '12px',
        },
        y: {
          formatter: function (val: number) {
            return val + ' Registros';
          },
        },
      },
      colors: [lightColor],
      markers: {
        colors: [lightColor],
        strokeColors: [baseColor],
        strokeWidth: 3,
      },
    };
  }
  
}