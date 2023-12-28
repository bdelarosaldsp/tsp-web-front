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
import { ReportService } from 'src/app/services/report.service';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  progressbar2: boolean=false;
  isLoading: boolean=false;
  datasource= new MatTableDataSource<Error>(ELEMENT_DATA);
  datasource1= new MatTableDataSource<Error>(ELEMENT_DATA);
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
  datos1:Array<any>=[];

  categorias:Array<any>=[];
  valores:Array<any>=[];

  categorias2:Array<any>=[];
  valores2:Array<any>=[];

  displayedColumns: string[] =['nombre_proceso','id_proceso','cantidad'];
  displayedColumns1: string[] =['fecha','cantidad'];

  constructor(private cdr:ChangeDetectorRef, private router: Router,
    public dialog:MatDialog, private generalService:GeneralService,
    private toastr:ToastrService,public datepipe: DatePipe,private reportService:ReportService,private _snackBar: MatSnackBar) { }

    
    ngOnInit() {
    }
    
    openSnackBar() {
      this._snackBar.open("TOTAL PROCESOS PENDIENTE: "+ this.datasource.data.length, "CERRAR");}

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

    this.reportService.GetTransmisionesProcesos()
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
        
          this.datos.forEach(x=>{
            this.categorias.push(x.id_proceso+'-'+x.nombre_proceso);
            let cantidad: Number=x.cantidad;
            this.valores.push(cantidad);
          });

          this.cdr.detectChanges();
          this.openSnackBar();

        },
      })
  }

  historialTransmisiones(){
    this.valores2.length=0;
    this.categorias2.length=0;
    this.datos1.length=0;
    this.label='Obteniendo resultados de la consulta';
    this.progressbar2=true;

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

    this.reportService.GetHistorialTransmisiones()
    .subscribe({
        next:(res)=>{
          console.log(res)
          this.datos1 = res.data.trmotm;
          this.datasource1.data=this.datos1;
          this.datos1.forEach(x=>{
            if (!x.fecha.includes("TOTAL")) {
              this.categorias2.push(x.fecha);
              let cantidad: Number=x.cantidad;
              this.valores2.push(cantidad);
            }
            
          });

          console.log(this.categorias2);
          console.log(this.valores2);
        },
        error:(err)=>{
          console.log(err)
          this.toastr.warning(err?.error?.message)
          this.label='';
          this.progressbar2=false;
          this.cdr.detectChanges()
        }
        ,complete:()=> {
          this.label='';
          this.progressbar2=false;
          
          this.cdr.detectChanges();
          

        },
      })
  }

  onClear(){
    this.datos.values;
    this.categorias.length=0;
    this.valores.length=0;

    this.datos1.values;
    this.categorias2.length=0;
    this.valores2.length=0;
    //this.dataImage.length=0;
    this.cdr.detectChanges();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/report/estproc']);
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


