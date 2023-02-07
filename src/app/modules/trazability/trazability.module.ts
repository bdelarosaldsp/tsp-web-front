import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrazabilityRoutingModule } from './trazability-routing.module';
import { DocsfindComponent } from './docsfind/docsfind.component';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule, } from 'ngx-dropzone';
import {MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material/radio';
import {MatGridListModule} from '@angular/material/grid-list';
import { ImageViewerModule } from '@nghacks/image-viewer';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DetailsComponent } from './details/details.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    DocsfindComponent,
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    TrazabilityRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatDividerModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    MatInputModule,
    MatDialogModule,
    MatProgressBarModule,
    MatTableModule,
    MatTabsModule,
    MatRadioModule,
    MatGridListModule,
    ImageViewerModule,
    MatAutocompleteModule,
    NgbModule,
    PdfViewerModule,
    MatExpansionModule,
    SharedModule
    
  ]
})
export class TrazabilityModule { }
