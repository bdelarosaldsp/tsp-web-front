import { Injectable, Injector } from '@angular/core';
import { ConfigService } from './config.service';
import { BaseService } from './core/base.service';
import { Constant } from '../shared/constant';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService extends BaseService{

  constructor(injector: Injector,config:ConfigService) {
    let apiBase:string;
    apiBase=config.getConfig().apiUrl;
    super(apiBase+Constant.Endpoints.REPORTS.BASE, injector);
  }

  public GetTransmisiones(objeto_id:string,trm_estado:string){
    return this.globalService.get(`${this.urlBase}${Constant.Endpoints.REPORTS.GET_TRANSMISIONES}/${objeto_id}/${trm_estado}`).pipe(
      map(res => {
        
       return res;
      })
    );
  }

  public GetTransmisionesProcesos(){
    return this.globalService.get(`${this.urlBase}${Constant.Endpoints.REPORTS.GET_PROCESOS}`).pipe(
      map(res => {
        
       return res;
      })
    );
  }

  public GetHistorialTransmisiones(){
    return this.globalService.get(`${this.urlBase}${Constant.Endpoints.REPORTS.GET_HISTORIAL}`).pipe(
      map(res => {
        
       return res;
      })
    );
  }

  public GetRangosResumen(){
    return this.globalService.get(`${this.urlBase}${Constant.Endpoints.REPORTS.GET_RANGOSREUMEN}`).pipe(
      map(res => {
        
       return res;
      })
    );
  }

  public GetResumenOp(feci:string ,fecf:string,codins:string,anticipo:string,agrupar:string,mesdia:string,rango:string,campo:string){
   
    let data={
      feci:feci ,
      fecf:fecf,
      codins:codins,
      anticipo:anticipo,
      agrupar:agrupar,
      mesdia:mesdia,
      rango:rango,
      campo:campo
    }
    return this.globalService.post(this.urlBase+Constant.Endpoints.REPORTS.GET_RESUMENOTM,data).pipe(
      map(res => {
  
        return res;
      },(err:any) => {
        return  err;
      }),catchError((err:any)=>{
        return throwError (err);
      })
    );
  }

  public GetPlanillasIntra(planillas:string){
   
    let data={
      planillas:planillas
    }
    return this.globalService.post(this.urlBase+Constant.Endpoints.REPORTS.GET_PLANILLASINTRA,data).pipe(
      map(res => {
  
        return res;
      },(err:any) => {
        return  err;
      }),catchError((err:any)=>{
        return throwError (err);
      })
    );
  }
}
