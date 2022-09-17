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
import {MatInputModule } from '@angular/material/input'
import { MatFormField, MatLabel } from '@angular/material/form-field';


@NgModule({
  declarations: [
    ImguploadComponent,
    ImgsearchComponent,
    ImglistComponent,
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
  
  ]
})
export class ImagesModule { }
