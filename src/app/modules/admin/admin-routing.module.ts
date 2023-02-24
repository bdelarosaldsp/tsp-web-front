import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MastermsgComponent } from './mastermsg/mastermsg.component';
import { MessagesComponent } from './messages/messages.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path:'users', component : UsersComponent},
  {path:'messages',component: MastermsgComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
