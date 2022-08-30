import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { Report1Component } from './report1/report1.component';
import { Report2Component } from './report2/report2.component';


@NgModule({
  declarations: [
    Report1Component,
    Report2Component
  ],
  imports: [
    CommonModule,
    ReportRoutingModule
  ]
})
export class ReportModule { }
