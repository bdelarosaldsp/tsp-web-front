import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResultDialogComponent } from '../../images/result-dialog/result-dialog.component';

@Component({
  selector: 'app-deterr',
  templateUrl: './deterr.component.html',
  styleUrls: ['./deterr.component.scss']
})
export class DeterrComponent implements OnInit {

  displayedColumns: string[];
  dataSource:any[];

  constructor(public dialogRef: MatDialogRef<ResultDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Array<any>) 
    { 
      this.displayedColumns = ['iderr','coderr','descripcion','creation_date'];
      this.dataSource = data;
    }

  ngOnInit(): void {
  }

}
