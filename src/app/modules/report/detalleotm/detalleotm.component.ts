import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detalleotm',
  templateUrl: './detalleotm.component.html',
  styleUrls: ['./detalleotm.component.scss']
})
export class DetalleotmComponent implements OnInit {

  displayedColumns: string[];
  dataSource:any[];

  constructor(public dialogRef: MatDialogRef<DetalleotmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Array<any>) 
    { 
      this.displayedColumns = ['cod_cliente','cliente','fehocierre','pedido_ol','divped_ol','pedido_otm','estado_integ','estado','estado_wms','fh_confotm',
      'servicio_ol','sitped_ol','factur_ol'];
      this.dataSource = data;
    }

  ngOnInit(): void {
  }

}
