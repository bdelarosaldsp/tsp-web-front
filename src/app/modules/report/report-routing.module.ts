import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Report1Component } from './report1/report1.component';
import { Report2Component } from './report2/report2.component';

const routes: Routes = [
  {path:'', component:Report1Component},
  {path:'report1', component:Report1Component},
  {path:'report2', component:Report2Component}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
