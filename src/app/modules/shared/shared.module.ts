import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgencyModalComponent } from './modals/agency-modal/agency-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { ImglistComponent } from '../images/imglist/imglist.component';
import { RemoteDeskComponent } from './modals/remote-desk/remote-desk.component';
import { SharedRoutingModule } from './shared-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [AgencyModalComponent, ImglistComponent, RemoteDeskComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatDividerModule,
    ReactiveFormsModule,
    SharedRoutingModule,
    Ng2SmartTableModule
  ],
  exports: [AgencyModalComponent,ImglistComponent],
})
export class SharedModule {}
