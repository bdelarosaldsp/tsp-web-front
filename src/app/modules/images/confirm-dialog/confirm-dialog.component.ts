import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


 

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  displayedColumns: string[];
  dataSource:any[];

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {cntprecarga:number,cntcarga:number,cntdif:number}
  ) { 

    this.displayedColumns = ['tipocargue', 'cantidad'];
    this.dataSource = [
      {tipo: 'Imagenes precargadas', cantidad: this.data.cntprecarga },
      {tipo: 'Imagenes validadas', cantidad: this.data.cntcarga },
      {tipo: 'Imagenes descartadas', cantidad: this.data.cntdif }
    ];
  }

  onNoClick() {
    return false;
  }

  onConfirm() {
    return true;
  }

}
