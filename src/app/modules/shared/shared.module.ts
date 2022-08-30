import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgencyModalComponent } from './modals/agency-modal/agency-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AgencyModalComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatDividerModule,
    ReactiveFormsModule,
  ],
  exports: [AgencyModalComponent],
})
export class SharedModule {}
