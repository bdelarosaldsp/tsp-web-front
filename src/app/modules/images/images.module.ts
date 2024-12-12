import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImagesRoutingModule } from './images-routing.module';
import { ImguploadComponent } from './imgupload/imgupload.component';
import { ImgsearchComponent } from './imgsearch/imgsearch.component';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule, } from 'ngx-dropzone';
import { ImglistComponent } from './imglist/imglist.component'
import {MatInputModule } from '@angular/material/input';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTableModule} from '@angular/material/table';
import { ResultDialogComponent } from './result-dialog/result-dialog.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material/radio';
import {MatGridListModule} from '@angular/material/grid-list';
import { ImageViewerModule } from '@nghacks/image-viewer';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImgpreviewComponent } from './imgpreview/imgpreview.component';
import { PdfviewerComponent } from './pdfviewer/pdfviewer.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { SharedModule } from '../shared/shared.module';
import { OtmvalimgComponent } from './otmvalimg/otmvalimg.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ImguploadotmComponent } from './imguploadotm/imguploadotm.component';
import { ImgtopdfComponent } from './imgtopdf/imgtopdf.component';


@NgModule({
  declarations: [
    ImguploadComponent,
    ImgsearchComponent,
    //ImglistComponent,
    ConfirmDialogComponent,
    ResultDialogComponent,
    ImgpreviewComponent,
    PdfviewerComponent,
    OtmvalimgComponent,
    ImguploadotmComponent,
    ImgtopdfComponent
  ],
  imports: [
    CommonModule,
    ImagesRoutingModule,
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
    NgxExtendedPdfViewerModule,
    PdfJsViewerModule,
    SharedModule,
    MatTooltipModule,
    MatExpansionModule,
  ]
})
export class ImagesModule { }
