import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-imgpreview',
  templateUrl: './imgpreview.component.html',
  styleUrls: ['./imgpreview.component.scss']
})
export class ImgpreviewComponent implements OnInit {
  
  images:Array<any>=[];
  

  constructor(public dialogRef: MatDialogRef<ImgpreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Array<any>,
    private config:NgbCarouselConfig,
    private sanitizer: DomSanitizer) {
      this.images=data;
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = true;
    config.pauseOnHover = true;
  }

  ngOnInit(): void {
  }

  
}
