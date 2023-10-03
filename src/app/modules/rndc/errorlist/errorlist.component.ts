import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RndcService } from 'src/app/services/rndc.service';
import { EditregComponent } from '../editreg/editreg.component';
import { Constant } from 'src/app/shared/constant';
import { DeterrComponent } from '../deterr/deterr.component';
import { ToastrService } from 'ngx-toastr';




const ELEMENT_DATA: Error[] = [];

@Component({
  selector: 'app-errorlist',
  templateUrl: './errorlist.component.html',
  styleUrls: ['./errorlist.component.scss'], 
 
  
})
export class ErrorlistComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  fecha:Date= new Date();
  controlMan : FormControl  = new FormControl('')
  controlRem : FormControl  = new FormControl('');
  controlEst : FormControl  = new FormControl('');
  controlFecIni : FormControl  = new FormControl(`${this.fecha.getFullYear()}-${('0'+(this.fecha.getMonth()+1)).slice(-2)}-${('0'+(this.fecha.getDay()+0)).slice(-2)}`);
  controlFecFin : FormControl  = new FormControl(`${this.fecha.getFullYear()}-${('0'+(this.fecha.getMonth()+1)).slice(-2)}-${('0'+(this.fecha.getDay()+7)).slice(-2)}`);
  controlSuc : FormControl  = new FormControl('');
  controlType : FormControl  = new FormControl('3', [Validators.required]);

  label: string='';
  progressbar: boolean=false;
  datasource= new MatTableDataSource<Error>(ELEMENT_DATA);
  agencies : Array<any> =  Constant.AUTH.getUser()?.agencies;

  datos:Array<any>=[];
  Errores : Array<Error>=[];
  displayedColumnsErr: string[] =['clasificacion','tipo','planilla','remesa','cod_cli','nom_cli','cod_analogia','cod_pto','nom_pto','cod_suc','nom_suc','enviado','cod_error','descripcion_del_error','fec_manifiesto','fec_reg_radicado','fec_reporte','loc_ori_pla','loc_dest_pla','loc_ori_rem','loc_dest_rem','nit_analogia','nit_conductor','nombre_conductor','nit_propietario','propietario','num_doc','peso_remesa','peso_manifiesto','placa','placa_trailer','num_radicado','source_location_gid','tipo_viaje','editar'];


  constructor(private rndcService:RndcService, private cdr:ChangeDetectorRef, private router: Router,
    public dialog:MatDialog,
    private toastr:ToastrService,) { }
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  ngAfterViewInit() {
    this.datasource.paginator = this.paginator;
    this.cdr.detectChanges();
  }

  

  ngOnInit(): void {
  }

  onSearch(){
    this.label='Obteniendo resultados de la consulta';
    this.progressbar=true;

    let fechai:string;
    if(typeof(this.controlFecIni.value)==="string"  && this.controlFecIni.value.includes('-')){
      fechai=this.controlFecIni.value;
    }else{
      fechai=this.convertDate(this.controlFecIni.value);
    }
    
    let fechaf:string
    if(typeof(this.controlFecFin.value)==="string" && this.controlFecFin.value.includes('-')){
      fechaf=this.controlFecFin.value;
    }else{
      fechaf=this.convertDate(this.controlFecFin.value);
    }

   this.rndcService.getErrores(this.controlMan.value===''?null:this.controlMan.value,this.controlRem.value===''?null:this.controlRem.value,this.controlEst.value===''?'E':this.controlEst.value,fechai===''?'null':fechai,fechaf===''?'null':fechaf,this.controlSuc.value===''?null:this.controlSuc.value.vus_codage,this.controlType.value===''?null:this.controlType.value)
.subscribe({
    next:(res)=>{
      console.log(res)
      this.Errores = res.data.inferr;
      this.datasource.data=this.Errores;
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
    this.Errores.values;
    
    //this.dataImage.length=0;
    this.cdr.detectChanges();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/rndc/errorlist']);
  });


  }

  editReg(reg:any){
    let id:number=reg.id_otm;
    let proceso_id:number=reg.proceso_id;
    let sucursal:string= reg.cod_suc;

    let cabeza:Array<any>=[]
    let detalle:Array<any>=[];

    this.rndcService.getCabeza(proceso_id).subscribe(
      {
        next: (res) => { console.log(res)
        cabeza=res.data.cabeza;},
        error: (err) => {
          // treat error
        },
        
    });

    this.rndcService.getDetalle(id).subscribe(
      {
        next: (res) => {
        console.log(res)
        detalle=res.data.detalle;
        },
        error: (err) => {
          // treat error
        },
        complete: () => {
          const dialogRef = this.dialog.open(EditregComponent, {
            width: '400px',
            data:{cabecera:cabeza,detalle:detalle,proceso_id:id.toString(),sucursal:sucursal}
          });
        
          dialogRef.afterClosed().subscribe(
            {
              next: (response) => {
             cabeza=[];
              detalle=[];   
            },
              error: (error) => {
                cabeza=[];
                detalle=[]; 
              },
              complete: () => {
                cabeza=[];
                detalle=[]; 
            }

            });
        }
    });

    

    
  }

  detalleError(id:number){
    let detalle:Array<any>;
    this.rndcService.getDetalleError(id).subscribe(
      {
        next: (res) => {
          detalle=res.data.detalle;
        },
        error: (err) => {
          // treat error
        },
        complete: () => {
          const dialogRef = this.dialog.open(DeterrComponent, {
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

  convertDate(date:Date):string{
    let fecha:string='';
    let day: string = date.getDate().toString();
      day = +day < 10 ? '0' + day : day;
      let month: string = (date.getMonth() + 1).toString();
      month = +month < 10 ? '0' + month : month;
      let year = date.getFullYear();
      fecha=`${year}-${month}-${day}`
      return fecha;
  }
}

export interface Error{
  clasificacion:string;
  tipo:string;
  planilla:string;
  remesa:string;
  cod_cli:string;
  nom_cli:string;
  cod_analogia:string;
  cod_pto:string;
  cod_suc:string;
  nom_suc:string;
  enviado:string;
  cod_error:string;
  descripcion_del_error:string;
  fec_manifiesto:string;
  fec_reg_radicado:string;
  fec_reporte:string;
  loc_ori_pla:string;
  loc_dest_pla:string;
  loc_ori_rem:string;
  loc_dest_rem:string;
  nit_analogia:string;
  nit_conductor:string;
  nombre_conductor:string;
  nit_propietario:string;
  propietario:string;
  num_doc:string;
  peso_remesa:string;
  peso_manifiesto:string;
  placa:string;
  placa_tailer:string;
  num_radicado:string;
  source_location_gid:string;
  tipo_viaje:string;
  editar:string;

}

export interface remesa{
  NUMNITEMPRESATRANSPORTE:string,
CONSECUTIVOREMESA:string,
CODOPERACIONTRANSPORTE:string,
CODTIPOEMPAQUE:string,
CODNATURALEZACARGA:string,
DESCRIPCIONCORTAPRODUCTO:string,
MERCANCIAREMESA:string,
CANTIDADCARGADA:string,
UNIDADMEDIDACAPACIDAD:string,
PESOCONTENEDORVACIO:string,
NUMIDREMITENTE:string,
CODTIPOIDREMITENTE:string,
CODSEDEREMITENTE:string,
NUMIDDESTINATARIO:string,
CODTIPOIDDESTINATARIO:string,
CODSEDEDESTINATARIO:string,
CODTIPOIDPROPIETARIO:string,
NUMIDPROPIETARIO:string,
CODSEDEPROPIETARIO:string,
DUENOPOLIZA:string,
NUMPOLIZATRANSPORTE:string,
FECHAVENCIMIENTOPOLIZACARGA:string,
COMPANIASEGURO:string,
HORASPACTODESCARGUE:string,
MINUTOSPACTODESCARGUE:string,
FECHACITAPACTADACARGUE:string,
HORACITAPACTADACARGUE:string,
FECHACITAPACTADADESCARGUE:string,
HORACITAPACTADADESCARGUEREMESA:string,
HORASPACTOCARGA:string
}

export interface planilla{
CODIDCONDUCTOR:string,
CODIDTITULARMANIFIESTO:string,
CODMUNICIPIODESTINOMANIFIESTO:string,
CODMUNICIPIOORIGENMANIFIESTO:string,
CODMUNICIPIOPAGOSALDO:string,
CODOPERACIONTRANSPORTE:string,
CODRESPONSABLEPAGOCARGUE:string,
CODRESPONSABLEPAGODESCARGUE:string,
FECHAEXPEDICIONMANIFIESTO:string,
FECHAPAGOSALDOMANIFIESTO:string,
NUMIDCONDUCTOR:string,
NUMIDTITULARMANIFIESTO:string,
NUMMANIFIESTOCARGA:string,
NUMNITEMPRESATRANSPORTE:string,
NUMPLACA:string,
RETENCIONICAMANIFIESTOCARGA:string,
VALORANTICIPOMANIFIESTO:string,
VALORFLETEPACTADOVIAJE:string,
}

