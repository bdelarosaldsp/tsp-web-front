import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { Client } from 'src/app/models/client';
import { ClientsService } from 'src/app/services/clients.service';
import { CumImagesService } from 'src/app/services/cum-images.service';
import { TrazabilityService } from 'src/app/services/trazability.service';
import { Constant } from 'src/app/shared/constant';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})



export class SearchComponent implements OnInit {

  control : FormControl  = new FormControl('', [Validators.required])
  controlDoc : FormControl  = new FormControl('', [Validators.required]);
  controlType : FormControl  = new FormControl('', [Validators.required]);

  avanza:boolean;
  clients : Array<Client>;
  selectedcli:string;
  progressbar:boolean=false;
  options: Client[];
  datosrndc: Array<any>=[]
  filteredOptions: Observable<any[]>;
  label:string="";
  user:string=Constant.AUTH.getUser()?.email;

  FacturaCabeza : Array<CabezaFac>=[];
  MasivoFac: Array<Masivo>=[{'origen':'','ossm':'','salida':'','placa':'','tipo_vehiculo':'','conductor':''}];
  PedidosFac:Array<PedFac>=[{
    'orden_carga':'','pedido':'','documento_ref':'','fecha_pedido':'','cajas':'','peso':'','vol':'','cod_bodega':'',
    'fecha_ent_cliente':'','programado':'','usuario_prog':'','anulado':'','OD_anulado':'','usuario_anula':''
  }];
  OrdenesDes: Array<Ordendes>=[{
    'cod_manifi':'','OC':'','fechaOC':'','OD':'','fechaOD':'','remesa':'','placa':'',
    'destino':'','cajas':'','usuario':'','despachador':'','anula':''
  }];
  Novedades: Array<Novedad>=[{
    'cod_manifi':'','oc':'','codnov':'','novedad':'','fecnov':'','fecha_cierre':'','tipo_novedad':'',
    'cajas_ajus':'','cierre_solucion':''
  }];
  NovedadesConf: Array<NovConf>=[{
    'cod_manifi':'','usuario_confirma':'','observacion_confirma':'','fecnov':'','fecha_cierre':'','cajas_confirma':'',
    'unidades_confirma':'','cierre_solucion':'','SOLUCION_TRATAMIENTO':''
  }];
  Cumplidos: Array<Cumplidos>=[{
    'cod_manifi':'','feccumldsp':'','usuario':'','fecsistema':'','fecha':'','comentario':'','factura':''
  }];
  Images:Array<any>=[];

  constructor(
    private clientService:ClientsService, 
    public dialog:MatDialog,
    private toastr:ToastrService,
    private cdr: ChangeDetectorRef,
    private traza :TrazabilityService,
    private router: Router,
    private imgservice:CumImagesService
  ) {
    this.getClients(); 

    }

  ngOnInit(): void {
    if (typeof(Constant.AUTH.getAgency()?.vus_codage)=='undefined'){
      this.toastr.warning('Debe seleccionar una agencia');
      this.router.navigate(['/']);
    }
    
    this.filteredOptions = this.control.valueChanges.pipe(
      map((value) => {
        const client = typeof value === 'string' ? value.toLowerCase() : value?.cliente_cod.toLowerCase();
        return this.options.filter((option)=>
          option.cliente_cod.toLowerCase().includes(client)
        );
      })
    );
  }

  getClients(){
    
    this.clientService.getClients(this.user).subscribe(
      res => {
        this.options = res.data;
      }
      
    )
  }

  displayFn(client: Client): string {
    return client && client.cliente_cod ? client.cliente_cod : '';
  }
  
  onSearch(){


    
  }

  onClear(){
    this.Images.length=0;
    this.FacturaCabeza.length=0;
    //this.dataImage.length=0;
    this.cdr.detectChanges();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/rndc']);
  });
  }
}

export interface CabezaFac{

  estado:string;
  custodia:string;
  nom_cli:string;
  factura:string;
  fecha_fac:string;
  fecha_rec:string;
  cartaporte:string;
  manifiesto:string;
  fecha_de_entrega:string;
  destinatario_cli:string;
  Estado_Manifiesto:string;
  nom_suc:string;
}
export interface Masivo{

  ossm:string;
  origen:string;
  salida:string;
  placa:string;
  tipo_vehiculo:string;
  conductor:string;
  
}

export interface PedFac{

  orden_carga:string	
  pedido:string
  documento_ref:string
  fecha_pedido:string
  cajas:string
  peso:string
  vol:string
  cod_bodega:string
  fecha_ent_cliente:string
  programado:string
  usuario_prog:string	
  anulado:string
  OD_anulado:string	
  usuario_anula:string
}

export interface Ordendes{

  cod_manifi:string;
  OC:string;
  fechaOC:string;
  OD:string;
  fechaOD:string;
  remesa:string;
  placa:string;	
  destino:string;	
  cajas:string;	
  usuario:string;
  despachador:string;
  anula:string;
			
}

export interface Novedad{
  cod_manifi:string;
  oc:string;
  codnov:string;
  novedad:string;
  fecnov:string;
  fecha_cierre:string;
  tipo_novedad:string;
  cajas_ajus:string;
  cierre_solucion:string;
}

export interface NovConf{
  cod_manifi:string;
  usuario_confirma:string;
  observacion_confirma:string;
  fecnov:string;
  fecha_cierre:string;
  cajas_confirma:string;
  unidades_confirma:string;
  cierre_solucion:string;
  SOLUCION_TRATAMIENTO:string;
}
export interface Cumplidos{
  cod_manifi:string;
  feccumldsp:string;
  usuario:string;
  fecsistema:string;
  factura:string;
  fecha:string;
  comentario:string
}


