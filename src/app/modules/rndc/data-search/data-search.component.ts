import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { RndcService } from 'src/app/services/rndc.service';

const ELEMENT_DATA: any[] = [];
@Component({
  selector: 'app-data-search',
  templateUrl: './data-search.component.html',
  styleUrls: ['./data-search.component.scss']
})
export class DataSearchComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  progressbar: boolean=false;
  datareturn= [];
  datasource= new MatTableDataSource<any>(ELEMENT_DATA);
  displayedColumnsDest: string[] =['cod_pto','nombre_destinatario','otm','instalacion','seleccionar'];
  displayedColumnsProp: string[] =['otm','mintr','sede_mintr','tipodoc_mintr','seleccionar'];

  constructor(
    public dialogRef: MatDialogRef<DataSearchComponent>,
    private cdr:ChangeDetectorRef,
    private rndcService:RndcService,
    private toastr:ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: {nom_campo:string,sucursal:string}
  ) { 
    dialogRef.beforeClosed().subscribe(() => dialogRef.close(this.datareturn))
  }

  ngOnInit(): void {
    console.log(this.data.nom_campo);
    if(this.data.nom_campo==='NUMIDDESTINATARIO'){
      this.progressbar=true;
      this.rndcService.getDestinatarios(this.data.sucursal).subscribe({
        next:(res)=>{
          this.datasource.data=res.data.dest;
          this.datasource.paginator=this.paginator
        },
        error:(err)=>{
          console.log(err)
        },
        complete:()=>{
          this.progressbar= false;
        }
      });
    }else if(this.data.nom_campo==='NUMIDPROPIETARIO'){
      this.progressbar=true;
      this.rndcService.getPropietarios().subscribe({
        next:(res)=>{
          this.datasource.data=res.data.prop;
          this.datasource.paginator=this.paginator
        },
        error:(err)=>{
          console.log(err)
        },
        complete:()=>{
          this.progressbar= false;
        }

    });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();

    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }

  selectValue(reg:any){
    if (this.data.nom_campo==='NUMIDDESTINATARIO') {
      this.rndcService.SetDestinatario(reg.otm).subscribe(
        {
          next:(res)=>{
            //console.log(res.data.analog)
            this.datareturn=res.data.analog[0];
            this.dialogRef.close(this.datareturn); 
          },
          error:(err)=>{
            console.log(err)
          }
        }
      )
    }else if (this.data.nom_campo==='NUMIDPROPIETARIO') {
      this.datareturn=reg;
      this.dialogRef.close(this.datareturn); 
    }
    
  }

}
