import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntegrationComponent } from './integration/integration.component';
import { WmsformatsComponent } from './wmsformats/wmsformats.component';

const routes: Routes = [{path:'', component:WmsformatsComponent},
{path:'Formatos', component:WmsformatsComponent},
{path:'Integracion', component:IntegrationComponent},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRoutingModule { }
