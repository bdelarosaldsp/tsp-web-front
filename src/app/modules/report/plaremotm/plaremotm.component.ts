import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from 'src/app/services/report.service';
import { Constant } from 'src/app/shared/constant';

const ELEMENT_DATA: any[] = [];

@Component({
  selector: 'app-plaremotm',
  templateUrl: './plaremotm.component.html',
  styleUrls: ['./plaremotm.component.scss']
})
export class PlaremotmComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatDateRangePicker) datepicker:MatDateRangePicker<any>;
  
  label: string='';
  progressbar: boolean=false;
  isLoading: boolean=false;
  selectedRowIndex:any;

  datasource= new MatTableDataSource<Error>(ELEMENT_DATA);
  datasourcePlarem= new MatTableDataSource<Error>(ELEMENT_DATA);
  datasourceRemesa= new MatTableDataSource<Error>(ELEMENT_DATA);
  fechaEx:Date= new Date();
  fecha:Date= new Date();
  controlMan : FormControl  = new FormControl('')
  controlPlaca : FormControl  = new FormControl('');
  controlEst : FormControl  = new FormControl('');
  controlFecIni : FormControl  = new FormControl(this.datepipe.transform(this.fecha.setDate(this.fecha.getDate()-6),'yyyy-MM-dd'));
  controlFecFin : FormControl  = new FormControl(this.datepipe.transform(this.fecha.setDate(this.fecha.getDate()+7),'yyyy-MM-dd'));

  agencies : Array<any> =  Constant.AUTH.getUser()?.agencies;
  email:string= Constant.AUTH.getUser()?.email;
  datos:Array<any>=[];
  displayedColumns: string[] =['position','planilla','placa','Fecha_Planilla','valor_planilla',
  'cedula_conductor','nombre_conductor','nombre_beneficiario','beneficiario_anticipo',
  'servprov','cliente','nit_propietario','valor_anticipo','estado','procesado',
  'fecha_procesado','fecha_creacion','valor_dummy'];

  displayedColumnsRem: string[] =['position','planilla','remesa','valor_remesa',
  'codigo_cliente','nit_cliente','servprov','cod_suc',
  'peso_remesa','tipo_unidad_remesa','volumen_remesa','tipo_volumen_remesa',
  'fecha_remesa','fecha_creacion','fecha_modificacion','reg_status','valor_dummy'];

  displayedColumnsPlarem: string[] =['position','planilla','remesa','compania',
  'porcentaje_contabilizacion','estado','usuario_creacion',
  'fecha_creacion','dummy','secundaria'];

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

    this.reportService.GetPlanillasIntra(this.controlMan.value===''?null:this.controlMan.value)
    .subscribe({
        next:(res)=>{
          console.log(res)
          this.datos = res.data.placost;
          this.datasource.data=this.datos;
          this.datasourceRemesa.data=res.data.remotm;
          this.datasourcePlarem.data=res.data.plarem;
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
    
    //this.dataImage.length=0;
    this.cdr.detectChanges();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/report/plaremotm']);
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

  highlight(row:any){
    this.selectedRowIndex=row.planilla;
  }
}
