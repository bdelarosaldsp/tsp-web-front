import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CumImage } from 'src/app/models/cum-image';
import { stringSnakeToCamel } from 'src/app/_metronic/kt/_utils';

@Component({
  selector: 'app-imglist',
  templateUrl: './imglist.component.html',
  styleUrls: ['./imglist.component.scss']
})
export class ImglistComponent {

  @Input() images:Array<File>;
  @Input() client :string;

  @Output() addImage: EventEmitter<CumImage> = new EventEmitter<CumImage>();
  @Output() removeImage: EventEmitter<File> = new EventEmitter<File>();

  cumImages :Array<CumImage>=[];
  file: File;

  constructor(private sanitizer:DomSanitizer) { }

  previewImage(image:File){
    this.file=image;    


    let cumimage:CumImage=({ 
      filename:image.name,
      client_id:+this.client,
      company:'LDSP',
      url:'',
      file:image,
      document:''
    });

    this.addImage.emit(cumimage);
    const objectURL = URL.createObjectURL(image);
    
    return this.sanitizer.bypassSecurityTrustResourceUrl(objectURL);
  }

  onRemove(image:File) {
   
    this.removeImage.emit(image);
    this.images.splice(this.images.indexOf(image), 1);
  }

  validateDocument(){

  }

  addCumimage(img:CumImage){
    this.cumImages.push(img);
  }

}
