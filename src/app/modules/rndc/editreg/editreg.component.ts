import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../images/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-editreg',
  templateUrl: './editreg.component.html',
  styleUrls: ['./editreg.component.scss']
})
export class EditregComponent implements OnInit {
  displayedColumns: string[];
  dataSource:any[];

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {cabecera:Array<any>,detalle:Array<any>,proceso:number}
  ) { 

  }

  ngOnInit(): void {
  }

}
