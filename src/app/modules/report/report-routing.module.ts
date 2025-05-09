import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperacionotmComponent } from './operacionotm/operacionotm.component';
import { Report1Component } from './report1/report1.component';
import { Report2Component } from './report2/report2.component';
import { EstprocComponent } from './estproc/estproc.component';
import { TransmisionotmComponent } from './transmisionotm/transmisionotm.component';
import { ResuopComponent } from './resuop/resuop.component';
import { PlaremotmComponent } from './plaremotm/plaremotm.component';
import { WmsreportsComponent } from './wmsreports/wmsreports.component';

const routes: Routes = [
  {path:'', component:Report1Component},
  {path:'report1', component:Report1Component},
  {path:'report2', component:Report2Component},
  {path:'operacionotm',component:OperacionotmComponent},
  {path:'estproc',component:EstprocComponent},
  {path:'transmisionotm',component:TransmisionotmComponent},
  {path:'resuopotm',component:ResuopComponent},
  {path:'plaremotm',component:PlaremotmComponent},
  {path:'wmsreport',component:WmsreportsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
