import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RndcService } from 'src/app/services/rndc.service';

const ELEMENT_DATA: Error[] = [];

@Component({
  selector: 'app-errorlist',
  templateUrl: './errorlist.component.html',
  styleUrls: ['./errorlist.component.scss'], 
  
})
export class ErrorlistComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  

  controlMan : FormControl  = new FormControl('')
  controlRem : FormControl  = new FormControl('');
  controlEst : FormControl  = new FormControl('');
  controlFec : FormControl  = new FormControl('');
  label: string='';
  progressbar: boolean=false;
  datasource= new MatTableDataSource<Error>(ELEMENT_DATA);

  datos:Array<any>=[];
  Errores : Array<Error>=[];
  displayedColumnsErr: string[] =['clasificacion','tipo','planilla','remesa','cod_cli','nom_cli','cod_analogia','cod_pto','nom_pto','cod_suc','nom_suc','enviado','cod_error','descripcion_del_error','fec_manifiesto','fec_reg_radicado','fec_reporte','loc_ori_pla','loc_dest_pla','loc_ori_rem','loc_dest_rem','nit_analogia','nit_conductor','nombre_conductor','nit_propietario','propietario','num_doc','peso_remesa','peso_manifiesto','placa','placa_trailer','num_radicado','source_location_gid','tipo_viaje','editar'];

  constructor(private rndcService:RndcService, private cdr:ChangeDetectorRef, private router: Router,) { }
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
   this.rndcService.getErrores(this.controlMan.value===''?null:this.controlMan.value,this.controlRem.value===''?null:this.controlRem.value,this.controlEst.value===''?'S':this.controlEst.value,this.controlFec.value===''?null:this.controlFec.value)
   .subscribe({
    next:(res)=>{
      console.log(res.data)
      this.Errores = res.data.inferr;
      this.datasource.data=this.Errores;
    },complete:()=> {
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