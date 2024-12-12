import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { ErrorlistComponent } from './errorlist/errorlist.component';

const routes: Routes = [{path:'', component:SearchComponent},
{path:'search', component:SearchComponent},
{path:'errorlist', component:ErrorlistComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RndcRoutingModule { }