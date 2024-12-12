import { Component, OnInit, Input } from '@angular/core';
import { LayoutService } from '../../../../../layout';

@Component({
  selector: 'app-tiles-widget1',
  templateUrl: './tiles-widget1.component.html',
})
export class TilesWidget1Component implements OnInit {
  @Input() nombre:string;
  @Input() categorias:Array<any>;
  @Input() valores:Array<number>;
  @Input() cssClass = '';
  @Input() chartColor = 'primary';
  chartOptions: any = {};
  fontFamily = '';
  colorsGrayGray500 = '';
  colorsGrayGray200 = '';
  colorsGrayGray300 = '';
  colorsThemeBaseDanger = '';
  colorsThemeBaseColor = '';
  colorsThemeLightColor = '';

  constructor(private layout: LayoutService) {}

  setupLayoutProps() {
    this.fontFamily = this.layout.getProp('js.fontFamily') as string;
    this.colorsGrayGray500 = this.layout.getProp(
      'js.colors.gray.gray500'
    ) as string;
    this.colorsGrayGray200 = this.layout.getProp(
      'js.colors.gray.gray200'
    ) as string;
    this.colorsGrayGray300 = this.layout.getProp(
      'js.colors.gray.gray300'
    ) as string;
    this.colorsThemeBaseDanger = this.layout.getProp(
      'js.colors.theme.base.danger'
    ) as string;
    this.colorsThemeBaseColor = this.layout.getProp(
      `js.colors.theme.base.${this.chartColor}`
    ) as string;
    this.colorsThemeLightColor = this.layout.getProp(
      `js.colors.theme.light.${this.chartColor}`
    ) as string;
  }

  ngOnInit(): void {
    this.setupLayoutProps();
    this.chartOptions = this.getChartOptions();
  }

  getChartOptions() {
    const height = '120px';
    return {
      series: [
        {
          name: this.nombre,
          data: this.valores,
        },
      ],
      chart: {
        type: 'area',
        height,
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
        type: 'gradient',
        opacity: 1,
        gradient: {
          type: 'vertical',
          shadeIntensity: 0.55,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 0.2,
          stops: [25, 50, 100],
          colorStops: [],
        },
      },
      stroke: {
        curve: 'smooth',
        show: true,
        width: 3,
        colors: [this.colorsThemeBaseColor],
      },
      xaxis: {
        categories: this.categorias,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          style: {
            colors: this.colorsGrayGray500,
            fontSize: '12px',
            fontFamily: this.fontFamily,
          },
        },
        crosshairs: {
          show: false,
          position: 'front',
          stroke: {
            color: this.colorsGrayGray300,
            width: 1,
            dashArray: 3,
          },
        },
        tooltip: {
          enabled: true,
          formatter: undefined,
          offsetY: 0,
          style: {
            fontSize: '12px',
            fontFamily: this.fontFamily,
          },
        },
      },
      yaxis: {
        min: 0,
        max: 37,
        labels: {
          show: false,
          style: {
            colors: this.colorsGrayGray500,
            fontSize: '12px',
            fontFamily: this.fontFamily,
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
          fontFamily: this.fontFamily,
        },
        y: {
          formatter: (val: number) => {
            return `$ ${val} thousands`;
          },
        },
      },
      colors: [this.colorsThemeLightColor],
      markers: {
        colors: [this.colorsThemeLightColor],
        strokeColor: [this.colorsThemeBaseColor],
        strokeWidth: 3,
      },
      padding: {
        top: 0,
        bottom: 0,
      },
    };
  }
}
