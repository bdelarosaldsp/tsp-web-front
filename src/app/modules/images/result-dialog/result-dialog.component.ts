import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Factura } from 'src/app/models/facturas';

@Component({
  selector: 'app-result-dialog',
  templateUrl: './result-dialog.component.html',
  styleUrls: ['./result-dialog.component.scss']
})
export class ResultDialogComponent {

  displayedColumns: string[];
  dataSource:any[];

  displayedErrColumns: string[];
  dataError:any[];

  constructor(
    public dialogRef: MatDialogRef<ResultDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Array<any>
  ) { 

    this.displayedColumns = ['planilla','remesa','factura','cantimg'];
    this.dataSource = data;

    //this.displayedErrColumns = ['nombre','factura','error'];
    //this.dataError = data[1];
  }


}
