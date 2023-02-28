import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImgsearchComponent } from './imgsearch/imgsearch.component';
import { ImguploadComponent } from './imgupload/imgupload.component';
import { ImguploadotmComponent } from './imguploadotm/imguploadotm.component';
import { OtmvalimgComponent } from './otmvalimg/otmvalimg.component';

const routes: Routes = [
  {path:'', component : ImguploadComponent},
  {path:'upload', component : ImguploadComponent},
  {path:'uploadotm', component : ImguploadotmComponent},
  {path:'search', component : ImgsearchComponent},
  {path:'valimg', component: OtmvalimgComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImagesRoutingModule { }
