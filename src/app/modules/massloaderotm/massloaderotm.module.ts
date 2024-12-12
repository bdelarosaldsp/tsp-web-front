import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MassloaderotmRoutingModule } from './massloaderotm-routing.module';
import { MassuploadComponent } from './massupload/massupload.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageViewerModule } from '@nghacks/image-viewer';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MassuploadComponent
  ],
  imports: [
    CommonModule,
    MassloaderotmRoutingModule,
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
    NgxExtendedPdfViewerModule,
    PdfJsViewerModule,
    SharedModule,
    MatTooltipModule,
    MatExpansionModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule

  ]
})
export class MassloaderotmModule { }
