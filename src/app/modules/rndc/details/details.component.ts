import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @Input() PlanillaCabeza : Array<CabezaPla>;
  @Input() PlaRem : Array<Remesa>;
  @Input() PedidosFac : Array<PedFac>;
  @Input() OrdenesDes : Array<Ordendes>;
  @Input() Novedades : Array<Novedad>;
  @Input() NovedadesConf : Array<NovConf>;
  @Input() Cumplidos : Array<Cumplidos>;
  @Input() Images: Array<any>;
  @Input() TipDoc: string;


  displayedColumnsPlaRem: string[] = ['remesa','valor','costo','cliente','servicio','estado','contrato','subcontrato','sucursal','planilla','ruta','tipo_facturacion','ciu_origen','fecha_despacho','cajas'];
  displayedColumnsPed: string[] = ['oc','pedido','cartaporte','fecha','cajas','peso','vol','bodega','fecha_cita','program','usuario','anulo','odanula','usuanod'];
  displayedColumnsOd: string[] =['manifiesto','oc','fecha_oc','od','fecha_od','remesa','placa','destino','cajas','planillador','despachador','anulo']
  displayedColumnsNov: string[] =['manifiesto','oc','novedad','inicio','fin','tipo','cajas','estado'];
  displayedColumnsNovConf: string[] =['manifiesto','oc','confnovedad','inicio','fin','tipo','cajas','unidades','estado','solucion'];
  displayedColumnsCum: string[] =['manifiesto','remesa','fecha','usuario','fecha_sist','fecha_envio','factura','comentario'];


  constructor() { }

  ngOnInit(): void {
  }

}

export interface CabezaPla{

  fecha:string;
  poliza:string;
  placa:string;
  aseguradora:string;
  semiremolque:string;
  ruta:string;
  vigencia:string;
  estado:string;
  ciudad_de_pago:string;
  observaciones:string;
  configuracion:string;
  cc_conductor:string;
  nombre:string;
  fecha_de_pago:string;
  radicado_rndc:string;
}
export interface Remesa{

  remesa:string;
  valor:string;
  costo:string;
  origen:string;
  cliente:string;
  servicio:string;
  estado:string;
  contrato:string;
  subcontrato:string;
  sucursal:string;
  planilla:string;
  ruta:string;
  tipo_de_facturacion:string;
  ciu_de_origen:string;
  fecha_de_despacho:string;
  cajas:string;
  
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
  fecha:string;
  comentario:string;
  factura:string;
}