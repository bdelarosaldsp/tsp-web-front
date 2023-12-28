import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GeneralService } from 'src/app/services/general.service';
import { ReportService } from 'src/app/services/report.service';
import { Constant } from 'src/app/shared/constant';
import { LegendOptions, escapeLabel, formatLabel} from '@swimlane/ngx-charts'
import {LegendPosition} from '@swimlane/ngx-charts'
import { Sort } from '@angular/material/sort';

const ELEMENT_DATA: any[] = [];

@Component({
  selector: 'app-resuop',
  templateUrl: './resuop.component.html',
  styleUrls: ['./resuop.component.scss']
})
export class ResuopComponent {

  @ViewChild(MatDateRangePicker) datepicker:MatDateRangePicker<any>;
  
  single:Array<any>=[];
  datosMes:Array<any>=[];
  datosDia:Array<any>=[];

  view: [number,number] = [900, 300];

  legendPosition:LegendPosition=LegendPosition.Below;
  
  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = true;
  legendTitle:string='Valores';
  
  
   
  label: string='';
  progressbar: boolean=false;
  isLoading: boolean=false;
  datasource= new MatTableDataSource<Error>(ELEMENT_DATA);
  datasourceMes= new MatTableDataSource<any>(ELEMENT_DATA);
  datasourceDia= new MatTableDataSource<any>(ELEMENT_DATA);

  fechaEx:Date= new Date();
  fecha:Date= new Date();

  controlAnt : FormControl  = new FormControl(['TODOS']);
  controlFecIni : FormControl  = new FormControl(this.datepipe.transform(this.fecha.setDate(this.fecha.getDate()-6),'yyyy-MM-dd'));
  controlFecFin : FormControl  = new FormControl(this.datepipe.transform(this.fecha.setDate(this.fecha.getDate()+7),'yyyy-MM-dd'));
  controlSuc : FormControl  = new FormControl(['TODOS']);
  controlCampo : FormControl  = new FormControl('');

  totalgen:number=0;
  totalmeses:number=0;
  totaldias:number=0;
  valrango:string="";
  mes_dias:string="";
  codins:string="";
  anticipo:string="";

  agencies : Array<any> =  Constant.AUTH.getUser()?.agencies;
  campos:Array<any>= [];
  email:string= Constant.AUTH.getUser()?.email;
  datos:Array<any>=[];
  displayedColumns: string[] =['rango_generacion_planilla','cantidad','porcentaje'];
  displayedColumnsMes: string[] =['mes_planilla','cantidad','porcentaje'];
  displayedColumnsDia: string[] =['mes_planilla','cantidad','porcentaje'];

  constructor(private cdr:ChangeDetectorRef, private router: Router,
  public dialog:MatDialog, private reportService:ReportService,
  private toastr:ToastrService,public datepipe: DatePipe) { 
    this.camposResumen();
  }
 

  camposResumen() {
    this.reportService.GetRangosResumen().subscribe({
      next:(res)=>{
        this.campos=res.data.campos;
      },
      error:(err)=>{
        console.log('No se obtuvieron rangos');
      },
      complete:()=>{
        this.cdr.detectChanges(); 
      }
    });

  }

  pieTooltipText({data}:any) {
    const label = formatLabel(data.name);
    const val = formatLabel(data.value);
    const valN:number=Number.parseInt(val);
    const total:number=Number.parseInt(data.extra.totalgen);
    return `
      <span class="tooltip-label">${label.length===2?'MES: '+ escapeLabel(label): escapeLabel(label)}</span>
      <span class="tooltip-val">${val}</span>
      <span class="tooltip-val">${((valN*100)/total).toFixed(2)}%</span>
    `;
  }
  
   onSelect2(event:any){
    if (event.value.includes('TODOS') ) {

      let data=this.controlSuc.value;
      const index=data.indexOf('TODOS');
      console.log(index)
      if (index>-1) {
        data.splice(index,1)
      }
      
      this.controlSuc= new FormControl(data)
      this.cdr.detectChanges();

    }
  }

  onSelect(event:any){

    let res=this.controlSuc.value.toString();
    if (event.source.value==='TODOS' && !res.includes('TODOS')) {
      this.controlSuc= new FormControl(['TODOS'])
      this.cdr.detectChanges();
    }
    
  }
 
  onSearch(){
    if (this.controlCampo.valid && this.controlAnt.valid && this.controlSuc.valid) {
      this.codins="";
      this.anticipo=""
      this.single.length=0;
      this.datosDia.length=0;
      this.datosMes.length=0;
      this.datasource.data.length=0;
      this.datasourceDia.data.length=0;
      this.datasourceMes.data.length=0;
      this.cdr.detectChanges();

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


      let campo=this.controlCampo.value.campos;
      this.controlAnt.value.forEach((x: string) => {
        this.anticipo=this.anticipo+x+',';
      });
      this.anticipo=this.anticipo.substring(0,this.anticipo.length-1);
      
      this.controlSuc.value.forEach((x: string) => {
        this.codins=this.codins+x+',';
      });
      this.codins=this.codins.substring(0,this.codins.length-1);
     
      this.reportService.GetResumenOp(fechai===''?'null':fechai,fechaf===''?'null':fechaf,this.codins,this.anticipo,'TOTAL','','',campo)
      .subscribe({
          next:(res)=>{
            console.log(res)
            this.datos = res.data.opotm;
            this.totalgen=res.data.total;
            this.datos.forEach(x=>{
              let reg={name:x.campo,
                value:x.cantidad,
                extra:{totalgen:this.totalgen}  
              };

              this.single.push(reg);
            })
            // this.datos= this.datos.sort((a,b) => b.cantidad.localeCompare(a.cantidad));
            let rowtot={
              campo:'TOTAL GENERAL ('+ this.datos.length+' Rangos)',
              cantidad:this.totalgen
            }
            this.datos.push(rowtot);
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
        });
    }else{
      this.toastr.warning("Debe seleccionar los campos obligatorios")
    }
  }

  onClear(){
    this.datos.values;
    this.cdr.detectChanges();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/report/resuopotm']);
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

  detalle(rango:any,grupo:string,mes:string,nivel:number){
    console.log(rango+'-'+grupo+'-'+ mes +'-'+nivel)
    this.isLoading=true;
    this.mes_dias=mes;
    if (nivel===1) {
      this.datasourceDia.data.length=0;
      this.datosDia.length=0;
      this.datasourceMes.data.length=0;
      this.datosMes.length=0;
    }else if(nivel===2){
      this.datasourceDia.data.length=0;
      this.datosDia.length=0;
    }
    

    this.valrango=rango;
    let detalle:Array<any>;

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
    
    let campo=this.controlCampo.value.campos;
    this.reportService.GetResumenOp(fechai===''?'null':fechai,fechaf===''?'null':fechaf,this.codins,this.anticipo,grupo,mes,this.valrango,campo).subscribe(
    {
      next: (res) => {
        console.log(res)

        detalle=res.data.opotm;

        if (grupo==='MES') {
          this.datasourceMes.data=detalle;
          this.totalmeses=res.data.total;
          this.datasourceMes.data.forEach(x=>{
            let reg={name:x.mes_planilla,
              value:x.cantidad,
              extra:{totalgen:this.totalmeses}  
            };

            this.datosMes.push(reg);
          });
          let rowtot={
            mes_planilla:'TOTAL GENERAL ('+ this.datasourceMes.data.length+' Meses)',
            cantidad:this.totalmeses
          }
          this.datasourceMes.data.push(rowtot);
        }else if(grupo==='DIA'){
          this.datasourceDia.data=detalle;
          this.totaldias=res.data.total;
          this.datasourceDia.data.forEach(x=>{
            let reg={name:x.dia_planilla,
              value:x.cantidad,
              extra:{totalgen:this.totaldias}  
            };

            this.datosDia.push(reg);
          });
          let rowtot={
            dia_planilla:'TOTAL GENERAL ('+ this.datasourceDia.data.length+' Días)',
            cantidad:this.totaldias
          }
          this.datasourceDia.data.push(rowtot);
        }
      },
      error: (err) => {
        // treat error
      },
      complete: () => {
        this.isLoading=false;
        this.cdr.detectChanges();
      }
    });


}
sortData(sort: Sort,nivel:string) {
  const data = nivel==='GEN'? this.datasource.data.slice():
  (nivel==='MES'?this.datasourceMes.data.slice():this.datasourceDia.data.slice());

  if (!sort.active || sort.direction === '') {
    switch (nivel) {
      case 'GEN':
        return this.datasource.data = data;
      case 'MES':
        return this.datasourceMes.data = data;
      case 'DIA':
        return this.datasourceDia.data = data;
    }
    
    return;
  }

  const sortedData = data.sort((a, b) => {
    const isAsc = sort.direction === 'asc';
    switch (sort.active) {
      case 'rango_generacion_planilla':
        return this.compare(a.name, b.name, isAsc);
      case 'cantidad':
        return this.compare(a.calories, b.calories, isAsc);
      case 'porcentaje':
        return this.compare(a.fat, b.fat, isAsc);
      default:
        return 0;
    }
  });

  switch (nivel) {
    case 'GEN':
      return this.datasource.data = sortedData;
    case 'MES':
      return this.datasourceMes.data = sortedData;
    case 'DIA':
      return this.datasourceDia.data = sortedData;
  }
  
}
compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}

