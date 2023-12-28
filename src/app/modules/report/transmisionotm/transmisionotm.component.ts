import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constant } from 'src/app/shared/constant';
import { DetalleotmComponent } from '../detalleotm/detalleotm.component';
import { ReportService } from 'src/app/services/report.service';

const ELEMENT_DATA: any[] = [];

@Component({
  selector: 'app-transmisionotm',
  templateUrl: './transmisionotm.component.html',
  styleUrls: ['./transmisionotm.component.scss']
})
export class TransmisionotmComponent  {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatDateRangePicker) datepicker:MatDateRangePicker<any>;
  
  label: string='';
  progressbar: boolean=false;
  isLoading: boolean=false;
  datasource= new MatTableDataSource<Error>(ELEMENT_DATA);
  fechaEx:Date= new Date();
  fecha:Date= new Date();
  controlMan : FormControl  = new FormControl('')
  controlPlaca : FormControl  = new FormControl('');
  controlEst : FormControl  = new FormControl('');
  controlFecIni : FormControl  = new FormControl(this.datepipe.transform(this.fecha.setDate(this.fecha.getDate()-6),'yyyy-MM-dd'));
  controlFecFin : FormControl  = new FormControl(this.datepipe.transform(this.fecha.setDate(this.fecha.getDate()+7),'yyyy-MM-dd'));
  controlType : FormControl  = new FormControl('', [Validators.required]);

  agencies : Array<any> =  Constant.AUTH.getUser()?.agencies;
  email:string= Constant.AUTH.getUser()?.email;
  datos:Array<any>=[];
  displayedColumns: string[] =['documento','id','transmision_num_origen','id_proceso','trm_estado','respuesta','fecha_creacion','fecha_proceso_final',];

  constructor(private cdr:ChangeDetectorRef, private router: Router,
    public dialog:MatDialog, private reportService:ReportService,
    private toastr:ToastrService,public datepipe: DatePipe) { }


    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      // this.datasource.filterPredicate = (data: Opotmcab, filter: string) => {
      //   return data["planilla"] == filter;
      //  };
      this.datasource.filter = filterValue.trim().toLowerCase();
  
      if (this.datasource.paginator) {
        this.datasource.paginator.firstPage();
      }
    }
  ngAfterViewInit() {
    this.datasource.paginator = this.paginator;
    this.cdr.detectChanges();
  }

  onSearch(){
    this.label='Obteniendo resultados de la consulta';
    this.progressbar=true;

    let fechai:string;
    if(typeof(this.controlFecIni.value)==="string"  && this.controlFecIni.value.includes('-')){
      var vali= this.controlFecIni.value.split('-');
      fechai=(Number(vali[2])!==1?Number(vali[2])-1:Number(vali[2]))+'-'+vali[1]+'-'+vali[0]
      console.log(fechai)
    }else{
      fechai=this.convertDate(this.controlFecIni.value);
    }
    
    let fechaf:string
    if(typeof(this.controlFecFin.value)==="string" && this.controlFecFin.value.includes('-')){
      var val= this.controlFecFin.value.split('-');
      fechaf=(Number(val[2])!==1?Number(val[2])-1:Number(val[2]))+'-'+val[1]+'-'+val[0]
      console.log(fechaf)
    }else{
      fechaf=this.convertDate(this.controlFecFin.value);
    }

    this.reportService.GetTransmisiones(this.controlMan.value===''?null:this.controlMan.value,this.controlEst.value===''?'null':this.controlEst.value)
    .subscribe({
        next:(res)=>{
          console.log(res)
          this.datos = res.data.trmotm;
          this.datasource.data=this.datos;
        },
        error:(err)=>{
          console.log(err)
          this.toastr.warning(err?.error?.message)
          this.label='';
          this.progressbar=false;
          this.cdr.detectChanges()
        }
        ,complete:()=> {
          this.label='';
          this.progressbar=false;
          this.cdr.detectChanges()
        },
      })
  }

  onClear(){
    this.datos.values;
    
    //this.dataImage.length=0;
    this.cdr.detectChanges();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/report/transmisionotm']);
    });
  }

  convertDate(date:Date):string{
    let fecha:string='';
    let day: string = date.getDate().toString();
      day = +day < 10 ? '0' + day : day;
      let month: string = (date.getMonth() + 1).toString();
      month = +month < 10 ? '0' + month : month;
      let year = date.getFullYear();
      fecha=`${day}-${month}-${year}`
      return fecha;
  }


}

export interface Opotmcab{

  id:string, 
  id_proceso:string, 
  trm_estado:string, 
  respuesta:string, 
  fecha_creacion:string, 
  fecha_proceso_final:string, 
  planilla:string
  
}

