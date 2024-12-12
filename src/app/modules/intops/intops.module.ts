import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntopsRoutingModule } from './intops-routing.module';
import { Option1Component } from './option1/option1.component';
import { Option2Component } from './option2/option2.component';


@NgModule({
  declarations: [
    Option1Component,
    Option2Component
  ],
  imports: [
    CommonModule,
    IntopsRoutingModule
  ]
})
export class IntopsModule { }
