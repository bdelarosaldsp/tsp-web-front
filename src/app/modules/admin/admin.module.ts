import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './users/users.component';
import { MatTableModule } from '@angular/material/table';
import {MatCheckboxModule } from '@angular/material/checkbox'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MessagesComponent } from './messages/messages.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { PoliticadatosComponent } from './politicadatos/politicadatos.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MastermsgComponent } from './mastermsg/mastermsg.component';
import { MatTab, MatTabsModule } from '@angular/material/tabs';
import { ListmsgComponent } from './listmsg/listmsg.component';
import { ViewmsgComponent } from './viewmsg/viewmsg.component';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    UsersComponent,
    MessagesComponent,
    PoliticadatosComponent,
    MastermsgComponent,
    ListmsgComponent,
    ViewmsgComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    InlineSVGModule,
    MatTooltipModule,
    MatDividerModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    MatRadioModule,
    HttpClientModule,
    AngularEditorModule,
    FormsModule,
    MatDialogModule,
    MatSortModule,
    MatTabsModule
  ]
})
export class AdminModule { }
