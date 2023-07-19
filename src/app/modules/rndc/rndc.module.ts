import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RndcRoutingModule } from './rndc-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SearchComponent } from './search/search.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { DetailsComponent } from './details/details.component';
import { ErrorlistComponent } from './errorlist/errorlist.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { EditregComponent } from './editreg/editreg.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    SearchComponent,
    DetailsComponent,
    ErrorlistComponent,
    EditregComponent   
  ],
  imports: [
    CommonModule,
    RndcRoutingModule,
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
    MatIconModule,
    MatDialogModule,
    MatIconModule,
    MatTableExporterModule,
    MatPaginatorModule
    

  ]
})
export class RndcModule { }
