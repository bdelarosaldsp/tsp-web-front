import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ImgpreviewComponent } from '../imgpreview/imgpreview.component';
import { PdfviewerComponent } from '../pdfviewer/pdfviewer.component';

@Component({
  selector: 'app-imglist',
  templateUrl: './imglist.component.html',
  styleUrls: ['./imglist.component.scss']
})
export class ImglistComponent {

  @Input() images:Array<any>;
 

  constructor(
    private sanitizer:DomSanitizer, 
    private config:NgbCarouselConfig,
    public dialog:MatDialog) {
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = true;
    config.pauseOnHover = true;
        
  }

  previewImage(name:string,content:string){
    
    if(name.includes('pdf') || name.includes('pdf') ){
      return "./assets/media/icons/pdficon.png";
    }else{
      return this.sanitizer.bypassSecurityTrustResourceUrl(content);
    }
  }

  carrousel(name:string,content:string){
    if(name.includes('pdf') || name.includes('pdf') ){

      
      const dialogRef = this.dialog.open(PdfviewerComponent, {
      
        minHeight:'100vh',
        minWidth:'100vw',
        data: this.covertB64PDf(content)
      });
    }else{
      const dialogRef = this.dialog.open(ImgpreviewComponent, {
      
        minHeight:'100vh',
        minWidth:'100vw',
        data:this.images
      });
    }
    
  }

  covertB64PDf(content:string) {
    const byteArray = new Uint8Array(
      atob(content)
        .split("")
        .map(char => char.charCodeAt(0))
    );
    const file = new Blob([byteArray], { type: "application/pdf" });
    const fileURL = URL.createObjectURL(file);
    console.log(fileURL);
    return file
  }
}
