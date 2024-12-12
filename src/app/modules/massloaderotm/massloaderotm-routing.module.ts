import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MassuploadComponent } from './massupload/massupload.component';

const routes: Routes = [
  {path:'massload',component:MassuploadComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MassloaderotmRoutingModule { }
