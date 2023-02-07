import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagesComponent } from './messages/messages.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path:'users', component : UsersComponent},
  {path:'messages',component: MessagesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
