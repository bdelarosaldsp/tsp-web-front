import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RemoteDeskComponent } from './modals/remote-desk/remote-desk.component';

const routes: Routes = [
  {path:'RemoteSupport', component:RemoteDeskComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }