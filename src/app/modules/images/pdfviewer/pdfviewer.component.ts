import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-pdfviewer',
  templateUrl: './pdfviewer.component.html',
  styleUrls: ['./pdfviewer.component.scss']
})
export class PdfviewerComponent {

  pdfdata:string='';

  constructor(
    public dialogRef: MatDialogRef<PdfviewerComponent>,
    private sanitizer:DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.pdfdata=data;
      console.log(this.pdfdata);
  }


  close() {
    this.dialogRef.close()
  }
  

}
