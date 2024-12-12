import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Option1Component } from './option1/option1.component';
import { Option2Component } from './option2/option2.component';

const routes: Routes = [
{path:'', component:Option1Component},
{path:'option1', component:Option1Component},
{path:'option2', component:Option2Component}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntopsRoutingModule { }
