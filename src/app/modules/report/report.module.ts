import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { Report1Component } from './report1/report1.component';
import { Report2Component } from './report2/report2.component';
import { OperacionotmComponent } from './operacionotm/operacionotm.component';

import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { DetalleotmComponent } from './detalleotm/detalleotm.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    Report1Component,
    Report2Component,
    OperacionotmComponent,
    DetalleotmComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatTableModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    MatTableExporterModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
  providers: [DatePipe]
})
export class ReportModule { }
