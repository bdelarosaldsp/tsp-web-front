import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-wmsreports',
  templateUrl: './wmsreports.component.html',
  styleUrls: ['./wmsreports.component.scss']
})
export class WmsreportsComponent  {

  controlReport : FormControl  = new FormControl('');
  reportes:Array<any>=[];

  constructor() { }

  onSearch(){

  }

}
