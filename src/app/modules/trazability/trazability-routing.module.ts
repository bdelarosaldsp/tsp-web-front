import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocsfindComponent } from './docsfind/docsfind.component';

const routes: Routes = [
  {path:'', component:DocsfindComponent},
  {path:'Facturas', component:DocsfindComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrazabilityRoutingModule { }
