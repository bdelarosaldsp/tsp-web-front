import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GeneralService } from 'src/app/services/general.service';
import { Constant } from 'src/app/shared/constant';
import { DetalleotmComponent } from '../detalleotm/detalleotm.component';

const ELEMENT_DATA: any[] = [];


@Component({
  selector: 'app-estproc',
  templateUrl: './estproc.component.html',
  styleUrls: ['./estproc.component.scss']
})
export class EstprocComponent implements OnInit {
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
  controlEst : FormControl  = new FormControl('TODOS');
  controlFecIni : FormControl  = new FormControl(this.datepipe.transform(this.fecha.setDate(this.fecha.getDate()-6),'yyyy-MM-dd'));
  controlFecFin : FormControl  = new FormControl(this.datepipe.transform(this.fecha.setDate(this.fecha.getDate()+7),'yyyy-MM-dd'));
  controlSuc : FormControl  = new FormControl('TODAS');
  
  agencies : Array<any> =  Constant.AUTH.getUser()?.agencies;
  email:string= Constant.AUTH.getUser()?.email;
  datos:Array<any>=[];
  displayedColumns: string[] =['cod_instalacion','instalacion','planilla','fechat','placa','fecha_cierre','estado_integ','fh_confotm','anticipo','a_pend_fec','estado_anticipo',                   
 'v$alor_planilla','dummy','a_pend_cant','a_pend_v$alor','a_ejec_fec', 'a_ejec_cant','a_ejec_v$alor',   
 'estado_remesas','remesas_planilla',
 'fintra_cant_ant','fintra_valor_ant','fintra_cant_ejec','fintra_valor_ejec',  
  'cumplido_wms','cumplidos_fecha','cumplidos_estado','cumplidos_proc_fecha',
  'cumplido_valor_intranet','cumplido_valor_costo', 'cumplido_valor_ajustes','cumplido_valor_saldo',
  'fecha_consulta','detalles'];

  constructor(private cdr:ChangeDetectorRef, private router: Router,
    public dialog:MatDialog, private generalService:GeneralService,
    private toastr:ToastrService,public datepipe: DatePipe) { }

    ngOnInit() {
    }
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

    this.generalService.getOpOtmCab(this.controlMan.value===''?null:this.controlMan.value,this.controlPlaca.value===''?null:this.controlPlaca.value,fechai===''?'null':fechai,fechaf===''?'null':fechaf,this.controlSuc.value==='TODAS'?null:this.controlSuc.value.vus_codins,this.controlEst.value===''?'TODOS':this.controlEst.value)
    .subscribe({
        next:(res)=>{
          console.log(res)
          this.datos = res.data.opotm;
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
      this.router.navigate(['/report/operacionotm']);
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

  detalleOtm(planilla:string){
    this.isLoading=true;
    let detalle:Array<any>;
    this.generalService.getOpOtmDet(planilla).subscribe(
    {
      next: (res) => {
        console.log(res)
        detalle=res.data.opotm;
      },
      error: (err) => {
        // treat error
      },
      complete: () => {
        this.isLoading=false;
        this.cdr.detectChanges();
        const dialogRef = this.dialog.open(DetalleotmComponent, {
          data:detalle
        });
      
        dialogRef.afterClosed().subscribe(
          {
            next: (response) => {
              
            },
            error: (error) => {
              // treat error
            },
            complete: () => {
      
            }
          });
      }
    });


}
}

export interface Opotmcab{

  cod_instalacion:string, 
  instalacion:string, 
  fechat:string, 
  fecha_cierre:string, 
  planilla:string, 
  placa:string, 
  estado_integ:string, 
  fh_confotm:string, 
  anticipo:string, 
  a_pend_fec:string,                        
  a_pend_cant:string, 
  a_pend_v$alor:string, 
  a_ejec_fec:string,
  a_ejec_cant:string, 
  a_ejec_v$alor:string, 
  v$alor_planilla:string,     
  cumplido_wms:string, 
  cumplidos_fecha:string, 
  cumplidos_estado:string, 
  fecha_consulta:string
}

