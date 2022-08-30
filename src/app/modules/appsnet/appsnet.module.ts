import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AppsnetRoutingModule } from './appsnet-routing.module';
import { AppsnetComponent } from './appsnet/appsnet.component';


@NgModule({
  declarations: [
    AppsnetComponent
  ],
  imports: [
    CommonModule,
    AppsnetRoutingModule,
    MatCardModule
  ]
})
export class AppsnetModule { }
