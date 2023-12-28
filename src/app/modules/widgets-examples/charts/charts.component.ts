import { Component } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
})
export class ChartsComponent {

  categorias: Array<any>=["enero","febrero","marzo","abril","mayo"];
  datos: Array<any>=[50,35,80,10,20];
  constructor() {}
}
