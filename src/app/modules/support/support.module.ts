import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportRoutingModule } from './support-routing.module';
import { IntegrationComponent } from './integration/integration.component';
import { WmsformatsComponent } from './wmsformats/wmsformats.component';


@NgModule({
  declarations: [
    IntegrationComponent,
    WmsformatsComponent
  ],
  imports: [
    CommonModule,
    SupportRoutingModule
  ]
})
export class SupportModule { }
