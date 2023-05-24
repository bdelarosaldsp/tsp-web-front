import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActdesComponent } from './actdes/actdes.component';
import { MastermsgComponent } from './mastermsg/mastermsg.component';
import { MessagesComponent } from './messages/messages.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path:'users', component : UsersComponent},
  {path:'messages',component: MastermsgComponent},
  {path:'actdest',component:ActdesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
