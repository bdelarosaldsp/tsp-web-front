import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-viewmsg',
  templateUrl: './viewmsg.component.html',
  styleUrls: ['./viewmsg.component.scss']
})
export class ViewmsgComponent {

  constructor(
    public dialogRef: MatDialogRef<ViewmsgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) { 

    
  }

  onNoClick() {
    return false;
  }

  onConfirm() {
    return true;
  }

}
