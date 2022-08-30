import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppsnetComponent } from './appsnet/appsnet.component';

const routes: Routes = [
  {path:'', component : AppsnetComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppsnetRoutingModule { }
