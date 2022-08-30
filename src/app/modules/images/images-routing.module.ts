import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImgsearchComponent } from './imgsearch/imgsearch.component';
import { ImguploadComponent } from './imgupload/imgupload.component';

const routes: Routes = [
  {path:'upload', component : ImguploadComponent},
  {path:'search', component : ImgsearchComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImagesRoutingModule { }
