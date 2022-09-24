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

@NgModule({
  declarations: [
    ImguploadComponent,
    ImgsearchComponent,
    ImglistComponent,
    ConfirmDialogComponent,
    ResultDialogComponent,
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
    MatTableModule
  ]
})
export class ImagesModule { }
