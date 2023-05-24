import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { EntradasComponent } from './entradas/entradas.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBar, MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatGridListModule } from '@angular/material/grid-list';
import { ImageViewerModule } from '@nghacks/image-viewer';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { SharedModule } from '../shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    EntradasComponent
  ],
  imports: [
    CommonModule,
    PedidosRoutingModule,
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
export class PedidosModule { }
